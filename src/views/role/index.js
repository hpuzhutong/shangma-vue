import role from "@/api/role";

export default {
    name: "index",
    data() {
        return {
            //批量删除的id
            selectIds: [],
            //上传表单数据
            roleFormDate: {
                // roleName: '',
                // roleDesc: '',
            },
            //搜索表单数据
            searchForm: {
                currentPage: 1,
                pageSize: 8,
                roleName: '',
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
                roleName: [
                    {required: true, message: '请输入职位名称', trigger: 'blur'},
                ],
                roleDesc: [
                    {required: true, message: '请输入职位描述', trigger: 'blur'},
                ],

            },
            /*
            * 分配权限
            * */
            defaultProps: {
                children: 'children',
                label: 'menuTitle'
            },
            menuList: [],
            roleId: '',
        }

    },

    created() {
        this.searchPage();
        this.getAllTreeData();
    },

    methods: {
        //条件分页查询
        async searchPage() {
            let response = await role.searchPage(this.searchForm);
            this.total = response.total;
            this.tableData = response.data;
            //清空权限
            this.$refs.tree.setCheckedKeys([]);
        },
        //查询按钮
        searchUser() {
            if (this.searchForm.roleName) {
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
            await role.delById(id);
            this.searchPage();
        },
        //删除多个
        selectChange(e) {
            this.selectIds = e.map(item => item.id);
        },
        async batchDel() {
            await role.batchDel(this.selectIds);
            this.searchPage();
        },
        //点击新建按钮
        addBtnClick() {
            this.createDialog = true;
            //清空表单验证效果
            this.$nextTick(()=>{
                this.$refs.form.resetFields();
            })
            //清空表单
            this.formData = {};
        },
        //新建品牌方法
        addOrEditBtn() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    this.createDialog = false;
                    if (this.formData.id) {
                        //修改
                        await role.updateRole(this.formData);
                    } else {
                        //添加
                        await role.addRole(this.formData);
                    }
                    this.searchPage();
                } else {
                    this.createDialog = true;
                    this.$message.error("表单校验失败");
                    return false;
                }
            });


        },
        // findById
        cancel() {
            //清空表单验证效果
            this.$refs.form.resetFields();
        },
        async findById(id) {
            //清空表单验证效果
            this.createDialog = true;
            this.formData = await role.findById(id);
        },


        /*
        获取所有的权限
         */
        async getAllTreeData() {
            this.menuList = await role.getAllMenuTreeData();
        },

        /*
        给行设置点击事件
         */
        rowClick(row) {
            this.roleId = row.id
            this.getMenusByRoleId()
        },

        /*
        设置角色的权限
         */
        async setRoleMenu() {
            //拿到为这个角色要添加的权限的id
            let id = this.$refs.tree.getCheckedKeys()
            let id1 = this.$refs.tree.getHalfCheckedKeys()
            let ids = id.concat(id1)
            await role.setRoleMenu(this.roleId, ids);
            // 设置成功提示message
            this.$message({
                showClose: true,
                message: '权限设置成功',
                type: 'success'
            });
            //刷新页面去除选中的行  清空权限
            this.searchPage()

        },

        /*
        获取角色对应的权限
         */
        async getMenusByRoleId() {
            let menuIds = await role.getMenusByRoleId(this.roleId)
            this.$refs.tree.setCheckedKeys(menuIds);
        },



        change () {
            this.$forceUpdate()
        },


    }


}