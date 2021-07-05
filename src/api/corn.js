import tong from "@/utils/baseAxios";

let corn = {

    findAll(){
      return tong.get(`corn`)
    },

    findById(id){
      return tong.get(`corn/${id}`)
    },

    addCorn(entity) {
        return tong.post(`corn`,  entity)
    },

    delById(id) {
        return tong.delete(`corn/${id}`,)
    },

    updateCorn(entity) {
        return tong.put(`corn`,entity)
    },

    /**
     * 暂停定时器
     */
    pauseCorn(id){
        return tong.put(`corn/pause/${id}`)
    },

    /**
     * 启动定时器
     */
    playCorn(id){
        return tong.put(`corn/play/${id}`)
    },

    /**
     * 修改定时器
     */
    editCorn(entity){
        return tong.put(`corn`,entity)
    }

}
export default corn;