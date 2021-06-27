import tong from "@/utils/baseAxios";

let role = {

    /**
     * 条件分页查询
     * @param entity
     * @returns {Promise<AxiosResponse<any>>}
     */
    searchPage(entity) {
        return tong.get(`role/searchPage`, {params: entity})
    },

    findById(id) {
        return tong.get(`role/${id}`)
    },

    /**
     * 新建一个品牌
     * @param entity
     * @returns {Promise<AxiosResponse<any>>}
     */
    addRole(entity) {
        return tong.post(`role`,  entity)
    },

    /**
     * 通过id单个删除
     * @param val
     * @returns {Promise<AxiosResponse<any>>}
     */
    delById(id) {
        return tong.delete(`role/${id}`,)
    },

    /**
     * 批量删除
     * @param ids
     * @returns {Promise<AxiosResponse<any>>}
     */
    batchDel(ids) {
        return tong.delete(`role/batch/${ids}`)
    },

    /**
     * 修改品牌信息
     * @param formData
     */
    updateRole(entity) {
        return tong.put(`role`,entity)
    },


}
export default role;