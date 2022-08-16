import request, { post } from "@/util/request"
import umi from 'umi-request'
// umi()
export const queryTableData = (params: any) => {
    return request("/transfile/after", {
        method: "post",
        data: params
    })
}
// export const queryTableData = (params: any) => {
//     return request("/transfile/after", {
//         method: "post",
//         data: params
//     })
// }
export const transFileUpload = (params: any) => {
    return request("/", {
        method: "post",
        data: params,
        headers:{
            "Content-type":"multipart/form-data"
        }
    })
}