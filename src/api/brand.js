import tong from "@/utils/baseAxios";

let brand = {

    /**
     * 条件分页查询
     */
    searchPage(entity) {
        return tong.get(`brand/searchPage`, {params: entity})
    },

    findById(id) {
        return tong.get(`brand/${id}`)
    },

    /**
     * 新建一个品牌
     */
    addBrand(entity) {
        return tong.post(`brand`,  entity)
    },

    /**
     * 通过id单个删除
     */
    delById(id) {
        return tong.delete(`brand/${id}`,)
    },

    /**
     * 批量删除
     */
    batchDel(ids) {
        return tong.delete(`brand/batch/${ids}`)
    },

    /**
     * 修改品牌信息
     */
    updateBrand(entity) {
        return tong.put(`brand`,entity)
    }
}
export default brand;