import tong from "@/utils/baseAxios";

let role = {

    /**
     * 条件分页查询
     */
    searchPage(entity) {
        return tong.get(`role/searchPage`, {params: entity})
    },

    findById(id) {
        return tong.get(`role/${id}`)
    },

    /**
     * 新建一个品牌
     */
    addRole(entity) {
        return tong.post(`role`, entity)
    },

    /**
     * 通过id单个删除
     */
    delById(id) {
        return tong.delete(`role/${id}`,)
    },

    /**
     * 批量删除
     */
    batchDel(ids) {
        return tong.delete(`role/batch/${ids}`)
    },

    /**
     * 修改品牌信息
     */
    updateRole(entity) {
        return tong.put(`role`, entity)
    },

    /**
     * 获取所有权限
     */
    getAllMenuTreeData() {
        return tong.get(`menu/getTreeData`)
    },

    /**
     * 给角色赋予权限
     */
    setRoleMenu(roleId,menuIds) {
        return tong.post(`role/${roleId}/menu/${menuIds}`)
    },

    /**
     *  获取角色拥有的权限
     */
    getMenusByRoleId(roleId) {
        return tong.get(`role/${roleId}/menu`)
    },


}
export default role;