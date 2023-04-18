<script setup>
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useUserinfoStore } from '../stores/userinfo';
import { mainRoutes } from '../router/index.js';
const userinfo = useUserinfoStore()
const router = useRouter()
const logout = () => {
    userinfo.clear()
    router.push({ name: "login" })
}
const isCollapse = ref(false);
var routes = [];
mainRoutes.map(item => {
    if (item.meta && item.meta.title) {
        routes.push(item)
    }
})

const clickMenu = (index)=>{
    router.push({ name: index })
}

</script>

<template>
    <div class="mainLayout">
        <div class="mainLeftContainer">
            <div class="mainMenuHeader">
                <div class="smallLogo" v-if="!isCollapse"></div>
                <div class="collapseBtn" @click="isCollapse = !isCollapse">
                    <i class="iconfont icon-toggle-right" v-if="isCollapse"></i>
                    <i class="iconfont icon-toggle-left" v-else></i>
                </div>
            </div>
            <el-menu class="mainMenu" default-active="1" :collapse="isCollapse"  @select="clickMenu">
                <el-menu-item :index="item.name" :key="item.name" v-for="(item, idx) in routes">
                    <i class="iconfont icon-home"></i>
                    <template #title>{{ item.meta.title }}</template>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="mainRightContainer">
            <div class="mainTopContainer">
                <div class="collapseBtnMobile" @click="isCollapse = !isCollapse">
                    <i class="iconfont icon-liebiao"></i>
                </div>
                header
            </div>
            <div class="mainCenterContainer">
                <RouterView />
            </div>
        </div>
        <el-drawer v-model="isCollapse" direction="ltr">
            <el-menu class="mainMenu" default-active="1" :collapse="isCollapse"  @select="clickMenu">
                <el-menu-item :index="item.name" :key="item.name" v-for="(item, idx) in routes">
                    <i class="iconfont icon-home"></i>
                    <template #title>{{ item.meta.title }}</template>
                </el-menu-item>
            </el-menu>
        </el-drawer>
    </div>
</template>

<style lang="scss">
.mainLayout {
    width: 100%;
    height: 100%;
    display: flex;

    .mainLeftContainer {
        .mainMenu:not(.el-menu--collapse) {
            width: 200px;
            min-height: 400px;
        }
    }

    .mainRightContainer {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;

        .mainTopContainer {
            height: 80px;

            .collapseBtnMobile {
                display: none;
            }
        }

        .mainCenterContainer {
            flex: 1;
            width: 100%;
            overflow: auto;
        }
    }

    @media screen and (max-width:480px) {
        .mainLeftContainer {
            display: none;
        }

        .mainRightContainer {
            .mainTopContainer {
                .collapseBtnMobile {
                    display: flex;
                    width: 50px;
                    height: 50px;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
}
</style>