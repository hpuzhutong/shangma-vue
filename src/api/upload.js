import tong from "@/utils/baseAxios";

/**
 * 上传头像
 */
export function uploadImg(formData){
    return tong.post(`admin/upload`,formData,{headers:{'Content-Type':"multipart-form-data"}});
}