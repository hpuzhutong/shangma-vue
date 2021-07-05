import corn from "@/api/corn";

export default {
    name: "index",
    data() {
        return {
            //修改表单
            editFormData: {},
            //上传表单数据
            formData: {},
            tableData: [],
            //开启关闭上传模态框
            createDialog: false,
            //开启关闭修改模态框
            editDialog: false,
        }

    },

    created() {
        this.findAll()
    },

    methods: {

        //删除单个
        async delById(id) {
            // console.log(id)
            await corn.delById(id);
            this.findAll();
        },
        //点击新建按钮
        addBtnClick() {
            this.createDialog = true;
            //清空表单
            this.formData = {};

        },
        //新建品牌方法
        async addOrEditBtn() {
            this.createDialog = false;
            if (this.formData.cornId) {
                //修改定时器
                await corn.editCorn(this.formData);
                this.findAll();
                // this.play(this.formData.id)
            } else {
                //添加
                await corn.addCorn(this.formData);
                this.findAll();
            }
        },

        // findById
        async findById(id) {
            this.createDialog = true;
            this.formData = await corn.findById(id);
        },

        async findAll() {
            this.tableData = await corn.findAll();
        },

        /*
        暂停定时器
         */
        async pause(id) {
            await corn.pauseCorn(id);
        },

        /*
         启动定时器
        */
        async play(id) {
            await corn.playCorn(id);
        },


    }


}