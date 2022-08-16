import { extend, RequestOptionsWithResponse, RequestOptionsInit } from 'umi-request'

const instance = extend({
    prefix: '/api',
    timeout: 10000,
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
})
export const post = (url: string, options: RequestOptionsInit) => {
    return instance(url, {
        method: "post",
        ...options
    })
}
export default instance