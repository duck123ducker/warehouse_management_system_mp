<template>
  <div v-if="!is_loading">
    <div v-if="!request_cache.package_info[props.id]">
      <create_pack :id="props.id"/>
    </div>
    <div v-else>
      <choose_operation @choose="go_op_page"/>
    </div>
  </div>
  <login/>
</template>

<script setup>
import {ref} from 'vue'
import {use_store} from '/store'
import {storeToRefs} from 'pinia'
import {get_package_info} from '../../utils'
import Create_pack from '../views/create_pack.vue'
import Choose_operation from '../views/choose_operation.vue'
import Login from '../views/login.vue'
const props = defineProps(['id'])
const is_loading = ref(true)
const store = use_store()
const {request_cache} = storeToRefs(store)
uni.showLoading({title: '加载中...', mask: true})
get_package_info(props.id.toString(), request_cache).then((res_)=>{
  is_loading.value = false
  uni.hideLoading()
  if(!res_) {
    uni.showToast({title: '未查询到该包裹，请完善信息！',icon: 'none',duration: 2000,mask: false,})
  }else if(res_ === 'expired') uni.navigateBack()
})
function go_op_page(res) {
  uni.navigateTo({
    url: `/pages/detail_op/detail_op?id=${props.id}&operation=${res}`
  });
}
</script>

<style lang="scss" scoped>
</style>
