<template>
  <div style="display: flex; justify-content: space-between; margin: 20rpx 150rpx 10rpx;">
    <div>
      请选择{{props.operation.slice(0,1)}}库数量:
    </div>
    <uni-number-box @change="changeValue" />
  </div>
  <div style="font-size: 0.8em; text-align: center; color: #666666;">
    当前库存：{{request_cache.package_info[props.id].num}}
  </div>
  <div @click="submit" class="my-button">
    确定
  </div>
</template>

<script setup>
import {use_store} from '/store'
import {storeToRefs} from 'pinia'
import {inbound} from '../../utils'
import {ref} from 'vue'
const store = use_store()
const {request_cache} = storeToRefs(store)
const props = defineProps(['id', 'operation'])
const input_num = ref(1)
function changeValue(num_) {
  input_num.value = num_
}
function submit() {
  if(((props.operation === '出库')&&(request_cache.value.package_info[props.id].num >= input_num.value))||(props.operation === '入库')) {
    uni.showLoading({title: '加载中...', mask: true})
    inbound(props.id, input_num.value, props.operation).then(res => {
      if(res === 'success') {
        request_cache.value.package_info[props.id].num = props.operation.slice(0,1)==='入'?request_cache.value.package_info[props.id].num+input_num.value:request_cache.value.package_info[props.id].num-input_num.value
        uni.hideLoading()
        uni.showToast({title: props.operation.slice(0,1) + '库成功！',icon: 'none'})
      }
    })
  }else {
    uni.showToast({title: '失败！',icon: 'none'})
  }
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
