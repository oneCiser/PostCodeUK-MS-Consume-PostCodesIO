

export interface IResponse {
    status: number
}

export interface IResponseSuccess extends IResponse {
    result: any
}

export interface IResponseError extends IResponse {
    error: string
}