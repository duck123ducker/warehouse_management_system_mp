<template>
  <div style="padding: 10rpx 25rpx 0;">
    <div style="text-align: center; font-weight: 900;">
      请输入包裹编码
    </div>
    <view style="display: flex; margin-top: 25rpx; align-items: center">
      <input :style="{'border-color': border_color}" placeholder="手动输入包裹编码" @focus="on_focus" @blur="on_blur" :value="input_content" @input="onKeyInput" class="input-name">
      <uni-icons @click="is_checked&&$emit('submit', input_content.toString())" type="checkmarkempty" :color="is_checked?'#1989fa':'#666666'" size="24"></uni-icons>
    </view>
    <div style="text-align: center; font-weight: 900; margin: 20rpx 0;">
      或
    </div>
    <view class="scan_button" @click="scan_code">
      <image src="/static/scan.svg" mode="aspectFit" style="height:350rpx; margin-top: 10rpx"/>
      <view style="margin-top: 20rpx; font-size: 1.1em; font-weight: 900;">
        扫描条形码
      </view>
    </view>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue'
const emit = defineEmits(['submit'])
const input_content = ref('')
const is_checked = computed(()=>{return input_content.value.length <= 20 &&/^[a-zA-Z0-9_]+$/.test(input_content.value)})
function onKeyInput(event) {
  input_content.value = event.target.value.trim()
}
const border_color = ref('#666666')
function on_focus() {
  border_color.value = '#1989fa'
}
function on_blur() {
  border_color.value = '#666666'
}
function scan_code(){
  uni.scanCode({
    scanType: ['barCode'],
    onlyFromCamera: true,
    success: function (res) {
      emit('submit', res.result.toString())
    }
  });
}
</script>

<style lang="scss" scoped>
.input-name {
  transition: 0.2s ease;
  border: 1px solid;
  padding: 10rpx;
  border-radius: 12rpx;
  font-size: 0.9em;
  flex: 1 1;
  margin-right: 15rpx;
}
.scan_button {
  width: 450rpx;
  height: 450rpx;
  border-radius: 50rpx;
  margin: 0 auto;
  background: white;
  box-shadow: 10rpx 10rpx 30rpx #888888;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
