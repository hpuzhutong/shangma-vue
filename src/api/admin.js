import tong from "@/utils/baseAxios";

let admin = {

    /**
     * 条件分页查询
     * @param entity
     * @returns {Promise<AxiosResponse<any>>}
     */
    searchPage(entity) {
        return tong.get(`admin/searchPage`, {params: entity})
    },

    findById(id) {
        return tong.get(`admin/${id}`)
    },

    /**
     * 新建一个品牌
     * @param entity
     * @returns {Promise<AxiosResponse<any>>}
     */
    addBrand(entity) {
        return tong.post(`admin`,  entity)
    },

    /**
     * 通过id单个删除
     * @param val
     * @returns {Promise<AxiosResponse<any>>}
     */
    delById(id) {
        return tong.delete(`admin/${id}`,)
    },

    /**
     * 批量删除
     * @param ids
     * @returns {Promise<AxiosResponse<any>>}
     */
    batchDel(ids) {
        return tong.delete(`admin/batch/${ids}`)
    },

    /**
     * 修改品牌信息
     * @param formData
     */
    updateBrand(entity) {
        return tong.put(`admin`,entity)
    },


}
export default admin;