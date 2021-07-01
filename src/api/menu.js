import tong from "@/utils/baseAxios";

let menu = {

    /**
     * 拿到所有的角色
     */
    getAllRoles(){
        return tong.get(`menu`)
    },

    /**
     * 条件分页查询
     */
    searchPage(entity) {
        return tong.get(`menu/searchPage`, {params: entity})
    },

    findById(id) {
        return tong.get(`menu/${id}`)
    },

    /**
     * 新建一个品牌
     */
    addBrand(entity) {
        return tong.post(`menu`,  entity)
    },

    /**
     * 通过id单个删除
     */
    delById(id) {
        return tong.delete(`menu/${id}`,)
    },

    /**
     * 批量删除
     * @param ids
     */
    batchDel(ids) {
        return tong.delete(`menu/batch/${ids}`)
    },

    /**
     * 修改品牌信息
     */
    updateBrand(entity) {
        return tong.put(`menu`,entity)
    },

    /**
     * 获得树形数据
     */
    getAllTreeData(){
        return tong.get(`menu/getTreeData`)
    },



}
export default menu;