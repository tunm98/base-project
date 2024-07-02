import { logoutAll } from "@/services/logout"
import { store } from "../../store"
import type { AxiosInstance } from "axios"
import axios from "axios"

export function checkTokenInterceptor(http: AxiosInstance) {
  const id = http.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const status = error.response?.status
      if (status === 401) {
        // onClearAuth();
        // return Promise.reject(error);
        http.interceptors.response.eject(id)
        // @ts-ignore
        const refresh = store.getState().user?.auth?.refreshToken
        if (refresh) {
          try {
            const res = await axios.request({
              baseURL: process.env.NEXT_PUBLIC_API_URL,
              url: "/refresh-token",
              data: {
                refreshToken: refresh,
              },
              method: "POST",
              headers: {
                Authorization: `Bearer ${refresh}`,
              },
            })
            if (res.status === 200) {
              const originalRequest = error.config
              store.dispatch({
                type: "user/setUserAuth",
                payload: res.data.data,
              })
              checkTokenInterceptor(http)
              return new Promise((resolve) => {
                resolve(http(originalRequest))
              })
            } else {
              checkTokenInterceptor(http)
              onClearAuth()
              return Promise.reject(error)
            }
          } catch (e) {
            checkTokenInterceptor(http)
            onClearAuth()
            return Promise.reject(error)
          }
        } else {
          checkTokenInterceptor(http)
          onClearAuth()
          return Promise.reject(error)
        }
      }
      return Promise.reject(error)
    }
  )
}

function onClearAuth() {
  logoutAll()
}
