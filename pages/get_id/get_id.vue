<template>
  <div v-if="!need_info">
    <input_id :id="id_" @submit="go_op_page"/>
  </div>
  <div v-else>
    <create_pack :id="id_" @submit="need_info = false" />
  </div>
  <login/>
</template>

<script setup>
import {ref} from 'vue'
import {use_store} from '/store'
import {storeToRefs} from 'pinia'
import Create_pack from '../views/create_pack.vue'
import Input_id from '../views/input_id.vue'
import {get_package_info} from '../../utils'
import Login from '../views/login.vue'
const store = use_store()
const {request_cache} = storeToRefs(store)
const need_info = ref(false)
const props = defineProps(['operation'])
const id_ = ref('')
function go_op_page(res) {
  id_.value = res
  uni.showLoading({title: '加载中...', mask: true})
  get_package_info(res.toString(), request_cache).then((res_)=>{
    uni.hideLoading()
    if(!res_) {
      need_info.value = true
      uni.showToast({title: '未查询到该包裹，请完善信息！',icon: 'none',duration: 2000,mask: false,})
    }else if(res_ === 'expired' || res_ === 'no permission'){
    }else {
      uni.navigateTo({
        url: `/pages/detail_op/detail_op?id=${res}&operation=${props.operation}`
      })
    }
  })
}
</script>

<style lang="scss" scoped>
</style>
