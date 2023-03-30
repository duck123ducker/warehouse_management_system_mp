<template>
  <div style="display: flex; justify-content: space-between; margin: 20rpx 150rpx 10rpx;">
    <div>
      请选择入库数量:
    </div>
    <uni-number-box @change="changeValue" />
  </div>
  <div style="font-size: 0.8em; text-align: center; color: #666666;">
    当前库存：{{pack_info.num}}
  </div>
  <div @click="submit" class="my-button">
    确定
  </div>
</template>

<script setup>
import {use_store} from '/store'
import {storeToRefs} from 'pinia'
import {get_package_info} from '../../utils'
import {ref} from 'vue'
const store = use_store()
const {request_cache} = storeToRefs(store)
const props = defineProps(['id'])
const pack_info = ref({})
const input_num = ref(1)
get_package_info(props.id.toString(), request_cache).then(res => {
  pack_info.value = res
})
function changeValue(num_) {
  input_num.value = num_
}
function submit() {

}
</script>

<style lang="scss" scoped>
.my-button {
  width: fit-content;
  padding: 15rpx 150rpx;
  margin: 15rpx auto 0;
  color: white;
  background: #1989fa;
  border-radius: 12rpx;
}
</style>
