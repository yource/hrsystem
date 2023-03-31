<template>
    <div class="loginPage">
        <div class="loginCon">
            <div class="title">Login 登陆</div>
            <div class="row">
                <div class="label">用户名：</div>
                <input type="text" v-model="username">
            </div>
            <div class="row">
                <div class="label">密码：</div>
                <input type="password" v-model="password">
            </div>
            <el-button type="primary" @click="login">登陆</el-button>
        </div>
    </div>
</template>
<script>
import { useUserinfoStore } from '../stores/userinfo';
export default {
    setup() {
        const userinfo = useUserinfoStore()
        return {userinfo}
    },
    data: () => ({
        username: "",
        password: ""
    }),
    created() {
        if (this.userinfo.id) {
            this.$router.replace({ name: "home" })
        } else {
            var localName = window.localStorage.getItem("username");
            if (localName) {
                this.username = localName
            }
        }
    },
    methods: {
        login() {
            if (!this.username) {
                this.$message({
                    showClose: true,
                    message: '请输入用户名',
                    type: 'warning',
                })
            } else if (!this.password) {
                this.$message({
                    showClose: true,
                    message: '请输入密码',
                    type: 'warning',
                })
            } else {
                if (this.username == "test" && this.password == "123456") {
                    this.$message.success("登陆成功")
                    window.localStorage.setItem("username", this.username)
                    this.userinfo.$patch({
                        id: 1,
                        name: this.username
                    })
                    this.$router.push({ name: "home" })
                } else {
                    this.$message({
                        showClose: true,
                        message: '用户名test 密码123456',
                        type: 'error',
                    })
                }
            }
        }
    }
}
</script>