import { checkTokenInterceptor } from "@/services/base/axiosInterceptors"
import { ApiListResType, ApiResType } from "@/services/types/api"
import { store } from "../../store"
import axios, { AxiosHeaders, AxiosInstance } from "axios"

type MethodType = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

export interface CreateParams {
  data?: any
  formData?: FormData
}

export interface UpdateParams {
  id?: string | undefined
  data?: any
  method: MethodType
  path?: string
}

export interface RequestAllParams {
  path?: string
  params?: any
}

export interface RequestType {
  method: MethodType
  path: string
  data?: any
  formData?: any
  params?: any
}
const AUTH_METHODS = ["POST", "PUT", "DELETE", "PATCH"]
export class ActiveResource<D> {
  BASE_PATH = ""
  auth = true
  parentId?: string
  https: AxiosInstance

  constructor(BASE_PATH: string) {
    this.BASE_PATH = BASE_PATH
    this.https = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    })
    this.https.interceptors.request.use((config) => {
      // @ts-ignore
      let token = store.getState().user?.auth?.accessToken
      if (
        config.method &&
        AUTH_METHODS.includes(config.method.toString().toUpperCase()) &&
        !window.location.href.includes("/auth/") &&
        !token
      ) {
        store.dispatch({
          type: "user/setShowAuthRequireModal",
          payload: true,
        })
        return Promise.reject("error")
      }
      token = `Bearer ${token}`
      config.headers["Authorization"] = token
      // @ts-ignore
      config.headers["language"] = store.getState().user?.language || "ko"
      return config
    })
    checkTokenInterceptor(this.https)
  }

  withoutAuth() {
    this.auth = false
    return this
  }

  belongTo(parentId: string) {
    this.parentId = parentId
    return this
  }

  find(id: string): Promise<ApiResType<D>> {
    const path = this._urlJoin([id])
    return this.call<D>({ method: "GET", path: path })
  }

  all(req?: RequestAllParams): Promise<ApiResType<any>> {
    const { path, params } = req || {}
    const paths = this._urlJoin(path ? [path] : undefined)
    return this.call<ApiListResType<D>>({ method: "GET", path: paths, params })
  }

  get(path?: string): Promise<ApiResType<D>> {
    const paths = path ? this._urlJoin([path]) : this._urlJoin()
    return this.call<D>({ method: "GET", path: paths })
  }

  list<T>(req?: RequestAllParams): Promise<ApiResType<ApiListResType<T>>> {
    const { path, params } = req || {}
    const paths = path ? this._urlJoin([path]) : ""
    return this.call<ApiListResType<T>>({ method: "GET", path: paths, params })
  }

  update(params: UpdateParams): Promise<ApiResType<any>> {
    const { id, method, data, path } = params
    const paths = []
    if (id) {
      paths.push(id)
    }
    if (path) {
      paths.push(path)
    }
    const url = this._urlJoin(paths)
    return this.call<D>({ method: method, path: url, data: data })
  }

  create(params?: CreateParams): Promise<ApiResType<D>> {
    const path = this._urlJoin()
    return this.call<D>({
      method: "POST",
      path: path,
      data: params?.data,
      formData: params?.formData,
    })
  }

  delete(data?: any): Promise<ApiResType<D>> {
    const path = this._urlJoin()
    return this.call<D>({ method: "DELETE", path: path, data: data })
  }

  // action(action: any, {data = {}, id = null, method = 'POST'}) {
  //     let path = null;
  //     if (id) {
  //         path = this._urlJoin([id, action]);
  //     } else {
  //         path = this._urlJoin([action]);
  //     }
  //
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     return this.call({method: method, path: path, data: data});
  // }

  _urlJoin(args?: string[]) {
    let path = this.BASE_PATH
    let arrPaths = ""
    if (!!args && args.length !== 0) {
      arrPaths = args.join("/")
      path = path + "/" + arrPaths
    }
    if (this.parentId) {
      path = path.replace(":id", this.parentId)
    }
    return path
  }

  get_header(formData = false): AxiosHeaders {
    let headers: any = {
      "Content-Type": "application/json",
    }
    if (formData) {
      headers = {
        "Content-Type": "multipart/form-data",
      }
    }
    return headers
  }

  async call<T>(request: RequestType): Promise<ApiResType<T>> {
    const { method, path, data, formData, params } = request
    try {
      let snakeCasedParams
      let snakeCasedBody = data

      if (params) {
        snakeCasedParams = params
      } else if (data) {
        if (!(data instanceof FormData)) {
          snakeCasedBody = JSON.stringify(data)
        }
      }
      const res = await this.https.request({
        method: method,
        url: path,
        params: snakeCasedParams,
        data: formData || snakeCasedBody,
        headers: this.get_header(!!formData),
      })
      return this._parseData<T>(res)
    } catch (err: any) {
      const errors = this.handleError(err?.response)
      return {
        status: "failed",
        ...errors,
      }
    }
  }

  _parseData<T>(res: any): ApiResType<T> {
    const parsedData = res.data
    return {
      status: "success",
      result: parsedData.data,
    }
  }

  handleError = (errResponse: any) => {
    const errorData = errResponse?.data
    return { detail: errorData?.message, code: errorData?.code }
  }
}
