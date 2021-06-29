import tong from "@/utils/baseAxios";

let menu = {

    /**
     * 拿到所有的角色
     * @returns {Promise<AxiosResponse<any>>}
     */
    getAllRoles(){
        return tong.get(`menu`)
    },

    /**
     * 条件分页查询
     * @param entity
     * @returns {Promise<AxiosResponse<any>>}
     */
    searchPage(entity) {
        return tong.get(`menu/searchPage`, {params: entity})
    },

    findById(id) {
        return tong.get(`menu/${id}`)
    },

    /**
     * 新建一个品牌
     * @param entity
     * @returns {Promise<AxiosResponse<any>>}
     */
    addBrand(entity) {
        return tong.post(`menu`,  entity)
    },

    /**
     * 通过id单个删除
     * @param val
     * @returns {Promise<AxiosResponse<any>>}
     */
    delById(id) {
        return tong.delete(`menu/${id}`,)
    },

    /**
     * 批量删除
     * @param ids
     * @returns {Promise<AxiosResponse<any>>}
     */
    batchDel(ids) {
        return tong.delete(`menu/batch/${ids}`)
    },

    /**
     * 修改品牌信息
     * @param formData
     */
    updateBrand(entity) {
        return tong.put(`menu`,entity)
    },


}
export default menu;