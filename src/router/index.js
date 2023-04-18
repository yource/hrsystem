import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue"
import MainLayout from "../views/MainLayout.vue"
import Home from '../views/Home.vue'
import Demo from '../views/Demo.vue'
import { useUserinfoStore } from '../stores/userinfo'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [{
		path: '/',
		redirect: '/login'
	}, {
		path: '/login',
		name: 'login',
		component: Login
	}, {
		path: '/main',
		name: 'main',
		component: MainLayout,
		redirect: '/main/home',
		children: [{
			path: "home",
			name: "home",
			component: Home,
			meta: {
				title: '主页',
				icon: 'home'
			}
		}, {
			path: "account",
			name: "account",
			component: Demo,
			meta: {
				title: '用户设置',
				icon: 'home'
			}
		}, {
			path: "companies",
			name: "companies",
			component: Demo,
			meta: {
				title: '主体管理',
				icon: 'home'
			}
		}, {
			path: "questionnaires",
			name: "questionnaires",
			component: Demo,
			meta: {
				title: '问卷设置',
				icon: 'home'
			}
		}, {
			path: "answerPaper",
			name: "answerPaper",
			component: Demo,
			meta: {
				title: '答卷',
				icon: 'home'
			}
		}, {
			path: "questionnaireStatistic",
			name: "questionnaireStatistic",
			component: Demo,
			meta: {
				title: '问卷统计',
				icon: 'home'
			}
		}, {
			path: "logManage",
			name: "logManage",
			component: Demo,
			meta: {
				title: '日志管理',
				icon: 'home'
			}
		}, {
			path: "information",
			name: "information",
			component: Demo,
			meta: {
				title: '信息发布',
				icon: 'home'
			}
		}, {
			path: "authority",
			name: "authority",
			component: Demo,
			meta: {
				title: '权限设置',
				icon: 'home'
			}
		}, {
			path: "systemParams",
			name: "systemParams",
			component: Demo,
			meta: {
				title: '系统参数',
				icon: 'home'
			}
		}, {
			path: "questionnaireTemplate",
			name: "questionnaireTemplate",
			component: Demo,
			meta: {
				title: '问卷模板',
				icon: 'home'
			}
		}, {
			path: "reportTemplate",
			name: "reportTemplate",
			component: Demo,
			meta: {
				title: '报告模板',
				icon: 'home'
			}
		}, {
			path: "dimensionStore",
			name: "dimensionStore",
			component: Demo,
			meta: {
				title: '维度库',
				icon: 'home'
			}
		}, {
			path: "questionStore",
			name: "questionStore",
			component: Demo,
			meta: {
				title: '题目库',
				icon: 'home'
			}
		}]
	}]
})

router.beforeEach((to) => {
	if (to && to.fullPath && to.fullPath.indexOf("/main")>-1) {
		const userinfo = useUserinfoStore();
		if (!userinfo.logined) {
			return '/login'
		}
	}
})

export default router
