import { defineStore } from 'pinia'
import { ref } from 'vue'

export const use_store = defineStore('store', () => {
    const request_cache = ref({
        package_info: {},
    })
    return { request_cache }
})
