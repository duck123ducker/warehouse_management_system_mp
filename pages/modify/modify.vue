<template>
  <div v-if="!is_loading">
    <div v-if="!is_new">
      <div v-if="prop.id !== '' && prop.operation === ''">
        <choose_operation @choose="(name) => prop.operation = name"/>
      </div>
      <div v-if="prop.operation !== '' && prop.id === ''">
        <input_id @submit="(id_) => prop.id = id_"/>
      </div>
      <div v-if="prop.operation !== '' && prop.id !== ''">
        <div v-if="prop.operation === '入库'">
          <inbound :id="prop.id"/>
        </div>
      </div>
    </div>
    <div v-else>
      <create_pack/>
    </div>
  </div>
</template>

<script setup>
import {ref,watch} from 'vue'
import {get_package_info} from '/utils'
import Choose_operation from '../views/choose_operation.vue'
import Input_id from '../views/input_id.vue'
import {use_store} from '/store'
import {storeToRefs} from 'pinia'
import Create_pack from '../views/create_pack.vue'
import Inbound from '../views/inbound.vue'
const store = use_store()
const {request_cache} = storeToRefs(store)
const props = defineProps(['id', 'operation'])
const prop = ref(JSON.parse(JSON.stringify(props)))
const pack_info = ref({})
const is_loading = ref(false)
const is_new = ref(false)
watch(
    () => prop.value.id, async (new_id) => {
      if (!!new_id) {
        uni.showLoading({title: '加载中...', mask: true});
        is_loading.value = true
        pack_info.value = await get_package_info(new_id.toString(), request_cache)
        is_loading.value = false
        is_new.value = !pack_info.value
        uni.hideLoading()
        if(is_new.value) {
          uni.showToast({
            title: '未查询到该包裹，请完善信息！',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      }
    },{ immediate: true }
)
</script>

<style lang="scss" scoped>
</style>
