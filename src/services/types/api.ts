import type { Method } from "axios"

export const PAGE_START = 1
export const PAGE_SIZE = 10
export const PAGE_SIZE_SMALL = 10

export interface PageParams {
  page?: number | string
  pageSize?: number | string
}

export type ApiSuccessType<D> = {
  status: "success"
  result: D
}

export type ApiFailureType = {
  status: "failed"
  detail: any
  code: string
}

export type ErrorType = {
  code: string
  detail: string
}

export type ApiReqType = {
  path: string
  method: Method
  params?: any
  body?: any
  headers?: any
  requiredAuth?: boolean
}

export type ApiListResType<D> = {
  results: D[]
  count: number
  next: string
}
export type ApiShowResType<D> = ApiSuccessType<D> | ApiFailureType
export type ApiResType<D> = ApiShowResType<D>
