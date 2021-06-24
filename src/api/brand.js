import tong from "@/utils/baseAxios";

let brand = {

    /**
     * 条件分页查询
     * @param entity
     * @returns {Promise<AxiosResponse<any>>}
     */
    searchPage(entity) {
        return tong.get(`brand/searchPage`, {params: entity})
    },

    findById(id) {
        return tong.get(`brand/${id}`)
    },

    /**
     * 新建一个品牌
     * @param entity
     * @returns {Promise<AxiosResponse<any>>}
     */
    addBrand(entity) {
        return tong.post(`brand`,  entity)
    },

    /**
     * 通过id单个删除
     * @param val
     * @returns {Promise<AxiosResponse<any>>}
     */
    delById(id) {
        return tong.delete(`brand/${id}`,)
    },

    /**
     * 批量删除
     * @param ids
     * @returns {Promise<AxiosResponse<any>>}
     */
    batchDel(ids) {
        return tong.delete(`brand/batch/${ids}`)
    },

    /**
     * 修改品牌信息
     * @param formData
     */
    updateBrand(entity) {
        return tong.put(`brand`,entity)
    }
}
export default brand;