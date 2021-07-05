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
        async doLogin() {
            await login.doLogin(this.loginForm)
            this.$router.push("/main/index")
        },
    },
}
