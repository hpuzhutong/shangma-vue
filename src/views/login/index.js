import login from "@/api/login";

export default {
    name: "index",
    data() {
        return {
            codeImg: '',
            loginForm: {
                uuid: '',
            },
        }
    },

    created() {
        this.getCode()
    },

    methods: {

        async doLogin() {
            //获得登录的token存放在localStorage中
            let token = await login.doLogin(this.loginForm)
            localStorage.setItem("token", token);

            //将登陆者的权限信息存放在localStorage中
            let response = await login.getUserMenuInfo();
            let admin = response.admin;
            localStorage.setItem("admin",JSON.stringify(admin))
            let menuList = response.menuList;
            localStorage.setItem("menuItems", JSON.stringify(menuList))

            this.$router.push("/main/index")
        },

        async getCode() {
            this.loginForm.uuid = this.getUUid();
            this.codeImg = await login.getCode(this.loginForm.uuid);

        },
        getUUid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },


    },
}
