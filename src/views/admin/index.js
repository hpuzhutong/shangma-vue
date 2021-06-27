import admin from "@/api/admin";
import {uploadImg} from "@/api/upload";

export default {
    name: "index",
    data() {
        return {
            //修改表单
            editFormData: {},
            //批量删除的id
            selectIds: [],
            //上传表单数据
            formData: {
                isAdmin: '0',
                isActive: '0',
                adminAvatar: '',
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
                adminAccount: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                ],
                adminName: [
                    {required: true, message: '请输入管理员姓名', trigger: 'blur'},
                ],
                gender: [
                    {required: true, message: '请选择性别', trigger: 'blur'},
                ],
                adminCode: [
                    {required: true, message: '请输入身份证号', trigger: 'blur'},
                    {  //上面的满足18为
                        pattern: '^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$',
                        message: '请输入正确的身份证格式',
                        trigger: 'blur'
                    },
                ],
                adminEmail: [
                    {required: true, message: '请输入邮箱', trigger: 'blur'},
                    {type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur'},
                ],
                adminSalary: [
                    {required: true, message: '请输入薪资', trigger: 'blur'},
                ],
                adminAddress: [
                    {required: true, message: '请输入地址', trigger: 'blur'},
                ],
                adminPhone: [
                    {required: true, message: '请输入手机号', trigger: 'blur'},
                    {
                        pattern: '^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$',
                        message: '请输入正确的手机号格式',
                        trigger: 'blur'
                    },
                ],
                adminAvatar: [
                    {required: true, message: '头像必选', trigger: 'blur'},
                ],
            },
        }

    },

    created() {
        this.searchPage();
    },

    methods: {
        //条件分页查询
        async searchPage() {
            let response = await admin.searchPage(this.searchForm);
            console.log(response.data.gender)
            this.total = response.total;
            this.tableData = response.data;
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
            await admin.delById(id);
            this.searchPage();
        },
        //删除多个
        selectChange(e) {
            this.selectIds = e.map(item => item.id);
        },
        async batchDel() {
            await admin.batchDel(this.selectIds);
            this.searchPage();
        },
        //点击新建按钮
        addBtnClick() {
            this.createDialog = true;
            //清空表单验证效果
            this.$refs.form.resetFields();
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
                        await admin.updateBrand(this.formData);
                    } else {
                        //添加
                        await admin.addBrand(this.formData);
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
            this.$refs.form.resetFields();
        },
        // findById  编辑按钮
        async findById(id) {
            this.createDialog = true;
            this.formData = await admin.findById(id);
        },


        //-----------------------------上传模态框---------------------------------
        //验证图片的格式与大小
        beforeAvatarUpload(file){
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


    }


}