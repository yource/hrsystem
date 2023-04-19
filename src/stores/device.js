import { defineStore } from 'pinia'

var screenWidth;
if (window.document && window.document.documentElement && window.document.documentElement.clientWidth) {
	screenWidth = window.document.documentElement.clientWidth
} else if (window.document && window.document.body && window.document.body.clientWidth) {
	screenWidth = window.document.body.clientWidth
} else if (window.screen && window.screen.availWidth) {
	screenWidth = window.screen.availWidth
}

export const useDeviceStore = defineStore('device', {
	state: () => ({
		mobile: screenWidth <= 768,
		pc: screenWidth > 768
	}),
	actions: {},
})
