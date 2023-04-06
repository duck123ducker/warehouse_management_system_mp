<template>
  <div v-if="!request_cache.package_info[props.id]">
    <create_pack :id="props.id"/>
  </div>
  <div v-else>
    <choose_operation @choose="go_op_page"/>
  </div>
  <login/>
</template>

<script setup>
import {use_store} from '/store'
import {storeToRefs} from 'pinia'
import Create_pack from '../views/create_pack.vue'
import Choose_operation from '../views/choose_operation.vue'
import Login from '../views/login.vue'
const props = defineProps(['id', 'pack_info'])
const store = use_store()
const {request_cache} = storeToRefs(store)
function go_op_page(res) {
  uni.navigateTo({
    url: `/pages/detail_op/detail_op?id=${props.id}&operation=${res}`
  });
}
</script>

<style lang="scss" scoped>
</style>
