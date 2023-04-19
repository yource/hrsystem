<script setup>
import { RouterView } from 'vue-router'
import { useDeviceStore } from '@/stores/device'

const device = useDeviceStore()
window.addEventListener('resize',()=>{
	var screenWidth = 768;
	if (window.document && window.document.documentElement && window.document.documentElement.clientWidth) {
		screenWidth = window.document.documentElement.clientWidth
	} else if (window.document && window.document.body && window.document.body.clientWidth) {
		screenWidth = window.document.body.clientWidth
	} else if (window.screen && window.screen.availWidth) {
		screenWidth = window.screen.availWidth
	}
	device.$patch({
		mobile: screenWidth <= 768,
		pc: screenWidth > 768
	})
})

</script>

<template>
  <RouterView />
</template>