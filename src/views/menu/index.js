import menu from "@/api/menu";
import {uploadImg} from "@/api/upload";
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'


export default {
    // 注册treeSelect组件
    components: {Treeselect},

    name: "index",
    data() {
        return {
            selectId: -1,
            //角色列表
            roleList: [],
            //上传表单数据
            formData: {
                parentId: 0,
                menuType: 1,
                sort: 1,
            },
            //搜索表单数据
            searchForm: {
                currentPage: 1,
                pageSize: 8,
            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            //所选时间
            choseDate: '',
            tableData: [],
            total: 0,
            search: '',
            //开启关闭上传模态框
            createDialog: false,
            //开启关闭修改模态框
            editDialog: false,
            /*---------------------------------------上传表单校验------------------------------------------*/
            rules: {
                parentId: [
                    {required: true, message: '上级权限为必选项', trigger: 'blur'},
                ],
                menuType: [
                    {required: true, message: '权限类型为必选项', trigger: 'blur'},
                ],
                menuIcon: [
                    {required: true, message: '图标为必选项', trigger: 'blur'},
                    {required: true, message: '图标为必选项', trigger: 'change'},
                ],
                menuTitle: [
                    {required: true, message: '权限名称不能为空', trigger: 'blur'},
                ],
                permSign: [
                    {required: true, message: '权限标识不能为空', trigger: 'blur'},
                ],
                menuRouter: [
                    {required: true, message: '路由地址不能为空', trigger: 'blur'},
                ],
                componentPath: [
                    {required: true, message: '组建地址不能为空', trigger: 'blur'},
                ],
                componentName: [
                    {required: true, message: '组件名称不能为空', trigger: 'blur'},
                ],
                sort: [
                    {required: true, message: '权限排序不能为空', trigger: 'blur'},
                ],
            },
            //
            menuSelectList: [
                {
                    id: 0,
                    menuTitle: "根目录",
                    children: [],
                }
            ],
            normalizer(node) {
                return {
                    id: node.id,
                    label: node.menuTitle,
                    children: node.children,
                }
            },


        }

    },

    created() {
        this.searchPage();

    },

    methods: {
        //条件分页查询
        async searchPage() {
            let response = await menu.searchPage(this.searchForm);
            console.log(response.data.gender)
            this.total = response.total;
            this.tableData = response.data;

            /**
             * 获得所有的树形数据
             */
            this.menuSelectList[0].children = [];
            let allTreeData = await menu.getAllTreeData();
            this.menuSelectList[0].children = allTreeData;
            //
            this.selectId=-1;
        },
        //查询按钮
        searchUser() {
            if (this.searchForm.brandDesc || this.searchForm.brandName) {
                //不设置会出现搜索bug
                this.searchForm.currentPage = 1;
            }
            this.searchPage();
        },
        //---------------------------------页面事件------------------------------------------------
        //分页点击事件
        pageChange(page) {
            this.searchForm.currentPage = page;
            this.searchPage();
        },
        //当用户选择查询时间
        choseDateChange(val) {
            console.log(val)
            this.searchForm.startTime = val[0];
            this.searchForm.endTime = val[1];
        },
        //充值按钮   清空表单
        resetForm() {
            this.searchForm = {
                currentPage: 1,
                pageSize: 8,
            };
            this.choseDate = "";
            this.searchPage();
        },
        //删除单个
        async delById(id) {
            // console.log(id)
            await menu.delById(id);
            this.searchPage();
        },
        // async batchDel() {
        //     await menu.batchDel(this.selectIds);
        //     this.searchPage();
        // },
        //点击新建按钮
        addBtnClick() {
            this.createDialog = true;
            //清空表单验证效果
                this.$refs.form.resetFields();
            //清空表单
            this.formData = {
                parentId: 0,
                menuType: 1,
                sort: 1,
            };


        },
        //新建品牌方法
        addOrEditBtn() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    this.createDialog = false;
                    if (this.formData.id) {
                        //修改
                        await menu.updateBrand(this.formData);
                    } else {
                        //添加
                        await menu.addBrand(this.formData);
                    }
                    this.searchPage();
                } else {
                    this.createDialog = true;
                    this.$message.error("表单校验失败");
                    return false;
                }
            });


        },
        cancel() {
            //清空表单验证效果
            this.$nextTick(()=>{
                this.$refs.form.resetFields();
            })
        },
        // findById  编辑按钮
        async findById(id) {
            this.createDialog = true;
            this.formData = await menu.findById(id);
        },


        //-----------------------------上传模态框---------------------------------
        //验证图片的格式与大小
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 和 png 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        //选择图片  part方式上传
        async choseImg(e) {
            let formData = new FormData();
            formData.append("avatar", e.file);
            this.formData.adminAvatar = await uploadImg(formData);
        },

        /**
         * 点击某一行的点击事件
         */
        rowClick(row) {
            this.selectId = row.id
        }

    }


}