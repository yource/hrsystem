<template>
    <div class="mainLayout">
        <div class="mainLeftContainer">
            <div class="mainMenuHeader">
            	<div class="smallLogo" :class="{hide:isCollapse}"></div>
            	<div class="collapseBtn" @click="isCollapse = !isCollapse">
            	    <i class="iconfont icon-toggle-right" v-if="isCollapse"></i>
            	    <i class="iconfont icon-toggle-left" v-else></i>
            	</div>
            </div>
            <el-scrollbar class="mainMenuScroll">
				<el-menu 
					class="mainMenu" 
					:default-active="activeRoute" 
					active-text-color="#ffd04b"
					background-color="#24262c"
					text-color="#fff"
					:collapse="isCollapse"  
					@select="clickMenu">
				    <el-menu-item :index="item.name" :key="item.name" v-for="(item, idx) in routes" class="mainMenuItem">
				        <i class="iconfont icon-home"></i>
				        <template #title><span>{{ item.meta.title }}</span></template>
				    </el-menu-item>
				</el-menu>
			</el-scrollbar>
        </div>
        <div class="mainRightContainer">
            <div class="mainHeaderContainer">
                <div class="mainHeader">
					<div class="collapseBtnMobile" @click="drawer = !drawer">
					    <i class="iconfont icon-liebiao"></i>
					</div>
					<div class="mainHeaderOptions"></div>
					<div class="usericon centerCon" @click="showUserPanel">
						<span>{{userinfo.name}}</span>
						<div class="icon centerCon">
							<i class="iconfont icon-user"></i>
						</div>
					</div>
				</div>
            </div>
            <div class="mainCenterContainer">
                <RouterView />
            </div>
        </div>
        <el-drawer 
			v-model="drawer" 
			direction="ltr" 
			v-if="device.mobile" 
			:size="180"
			:show-close="false"
			class="mainMenuDrawer">
            <el-menu 
				class="mainMenuMobile" 
				:default-active="activeRoute" 
				active-text-color="#ffd04b"
				background-color="#24262c"
				text-color="#fff"
				:collapse="false" 
				@select="clickMenu">
                <el-menu-item :index="item.name" :key="item.name" v-for="(item, idx) in routes" class="mainMenuItem">
                    <i class="iconfont icon-home"></i>
                    <template #title><span>{{ item.meta.title }}</span></template>
                </el-menu-item>
            </el-menu>
        </el-drawer>
		<div class="wraper userPanelWrap" 
			:class="{show: userPanelShow}" 
			v-if="userPanelDisplay" 
			@click.stop="hideUserPanel">
			<div class="userPanelCon" @click.stop="">
				<el-button @click="logout">退出登陆</el-button>
			</div>
		</div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useUserinfoStore } from '../stores/userinfo';
import { useDeviceStore } from '@/stores/device'
const userinfo = useUserinfoStore()
const device = useDeviceStore()
const router = useRouter()
const isCollapse = ref(false);
const drawer = ref(false);
const userPanelShow = ref(false);
const userPanelDisplay = ref(false);

const routes = [];
const routeObj = {};
router.options.routes.map(route=>{
	if(route.name==="main" && route.children && route.children.length){
		route.children.map(item => {
			if(item.name){
				routeObj[item.name] = item;
			}
		    if (item.meta && item.meta.title) {
		        routes.push(item)
		    }
		})
	}
})
const activeRoute = ref(router.currentRoute&&router.currentRoute.value&&router.currentRoute.value.name || "home");
const clickMenu = (name)=>{
	activeRoute.value = name;
    router.push({ name: name })
	drawer.value = false;
}

const showUserPanel = ()=>{
	userPanelDisplay.value = true;
	setTimeout(()=>{
		userPanelShow.value = true;
	},30)
}
const hideUserPanel = ()=>{
	userPanelDisplay.value = false;
	userPanelShow.value = false;
}

const logout = () => {
    userinfo.clear()
    router.push({ name: "login" })
}

</script>

<style lang="scss">
.mainLayout {
    width: 100%;
    height: 100%;
    display: flex;

    .mainLeftContainer {
		height: 100%;
		display: flex;
		flex-direction: column;
		.mainMenuHeader{
			height: 50px;
			background-color: #191a1d;
			color: #fff;
			display: flex;
			justify-content: center;
			overflow: hidden;
			border-bottom: 1px solid #111;
			.smallLogo{
				width: 120px;
				height: 50px;
				overflow: hidden;
				transition: width 0.4s;
				&.hide{
					width: 0px;
				}
			}
			.collapseBtn{
				width: 50px;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				i.iconfont{
					font-size: 24px;
				}
			}
		}
		.mainMenuScroll{
			height: 0;
			flex: 1;
			background-color: #24262c;
		}
		.mainMenu{
			border:	none;
			.mainMenuItem{
				height: 44px;
				span{
					padding-left: 10px;
				}
			}
			&:not(.el-menu--collapse) {
				width: 180px;
				min-height: 400px;
				border: none;
			}
		}
    }

    .mainRightContainer {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;

        .mainHeaderContainer {
			height: 50px;
			position: relative;
			.mainHeader{
				position: absolute;
				width: 100%;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				height: 50px;
				border-bottom: 1px solid #ccc;
				box-shadow: 0 0 8px rgba(0,0,0,0.3);
				display: flex;
				align-items: center;
				.collapseBtnMobile {
				    display: none;
				}
				.mainHeaderOptions{
					flex: 1;
				}
				.usericon{
					cursor: pointer;
					padding-right: 12px;
					.icon{
						width: 18px;
						height: 18px;
						background-color: #5b6b86;
						border-radius: 10px;
						i.icon-user{
							font-size: 16px;
							color: #fff;
						}
					}
					span{
						padding: 0 5px;
						font-size: 15px
					}
				}
			}
            
        }

        .mainCenterContainer {
            flex: 1;
            width: 100%;
            overflow: auto;
			background-color: #e6e9ec;
        }
    }
	
    @media screen and (max-width:768px) {
        .mainLeftContainer {
            display: none;
        }

        .mainRightContainer {
            .mainHeaderContainer {
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

.mainMenuDrawer{
	padding: 0;
	.el-drawer__header{
		display: none;
	}
	.el-drawer__body{
		padding: 0;
		background-color: #24262c;
		.mainMenuMobile{
			width: 180px;
			border: none;
			padding-top: 20px;
			padding-bottom: 20px;
			.mainMenuItem{
				height: 44px;
			}
		}
	}
}

.userPanelWrap{
	background-color: rgba(0,0,0,0);
	transition: background-color 0.3s;
	.userPanelCon{
		min-width: 180px;
		position: fixed;
		top: 48px;
		right: 0;
		background-color: #fff;
		padding: 20px;
	}
	&.show{
		background-color: rgba(0,0,0,0.12);
	}
}
</style>