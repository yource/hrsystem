<template>
    <div class="loginPage">
        <div class="loginCon">
            <div class="title">Login 登陆</div>
            <div class="row">
                <div class="label">用户名：</div>
                <el-input v-model="username" size="large" placeholder="Please Input" clearable/>
            </div>
            <div class="row">
                <div class="label">密码：</div>
                <el-input v-model="password" size="large" placeholder="Please Input" type="password" show-password/>
            </div>
            <div class="btnCon">
                <el-button type="primary" @click="login" >登陆</el-button>
            </div>
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

<style lang="scss">
.loginPage{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ccc;
    .loginCon{
        width: 420px;
        background-color: #fff;
        border-radius: 12px;
        padding: 20px;
        .title{
            font-size: 18px;
            font-weight: 500;
        }
        .row{
            padding-top: 12px;
            .label{
                font-size: 16px;
                line-height: 32px;
            }
        }
        .btnCon{
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 20px;
            button{
                width: 200px;
                height: 40px;
                font-size: 16px;
                font-weight: 500;
                letter-spacing: 2px;
            }
        }
    }
    @media screen and (max-width: 480px) {
        .loginCon{
            width: 300px;
        }
    }
}
</style>