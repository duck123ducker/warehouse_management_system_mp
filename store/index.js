import { defineStore } from 'pinia'
import { ref } from 'vue'

export const use_store = defineStore('store', () => {
    const token = ref(uni.getStorageSync('token'))
	const request_cache = ref({
		package_info: {}
	})
	const user_info = ref(null)
    return { token, request_cache, user_info }
})
