<template>
  <view class="header">
    <image src="/static/header_white.svg" mode="aspectFit" style="height: 50rpx;"/>
  </view>
  <view style="transform: translateY(-100rpx);">
    <view class="scan_button" @click="scan_code">
      <image src="/static/scan.svg" mode="aspectFit" style="height:350rpx; margin-top: 10rpx"/>
      <view style="margin-top: 20rpx; font-size: 1.1em; font-weight: 900;">
        扫描条形码
      </view>
    </view>
    <view class="operation-menu">
      <view class="sub-menu" @click="go_page(op.operation)" v-for="op in operations" :key="op.operation">
        <view class="text-line">
          <view style="display: flex; align-items: center;">
            <i :class="`iconfont ${op.icon_name}`"/>
            <view style="margin-left: 15rpx;">
              {{op.operation}}
            </view>
          </view>
          <i class="iconfont icon-youjiantou"/>
        </view>
        <view class="line"/>
      </view>
    </view>
  </view>
</template>

<script setup>
import {ref} from 'vue'
import {use_store} from '/store'
import {storeToRefs} from 'pinia'
import {get_package_info} from '../../utils'
const store = use_store()
const {request_cache} = storeToRefs(store)
const operations = ref([
  {
    operation: '入库',
    icon_name: 'icon-navicon-rkyw',
  },
  {
    operation: '出库',
    icon_name: 'icon-navicon-ckyw',
  },
  {
    operation: '查询信息',
    icon_name: 'icon-navicon-lymxtj',
  },
  {
    operation: '修改信息',
    icon_name: 'icon-navicon-qgmxtj',
  },
])
function scan_code(){
  uni.scanCode({
    scanType: ['barCode'],
    onlyFromCamera: true,
    success: function (res) {
      get_package_info(res.result.toString(), request_cache).then((res_)=>{
        uni.hideLoading()
        if(!res_) uni.showToast({title: '未查询到该包裹，请完善信息！',icon: 'none',duration: 2000,mask: false,})
        else if(!(res_ === 'expired' || res_ === 'no permission')) uni.navigateTo({url: '/pages/choose_op/choose_op?id=' + res.result + '&pack_info=' + JSON.stringify(res_)})
      })
    }
  });
}
function go_page(name) {
  uni.navigateTo({
    url: `/pages/get_id/get_id?operation=${name}`
  });
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  background: #1989fa;
  height: 200rpx;
  border-radius: 0 0 50% 50%;
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
.operation-menu {
  width: 650rpx;
  box-shadow: 5rpx 5rpx 10rpx #888888;
  margin: 60rpx auto 0;
  border-radius: 30rpx;
  .sub-menu {
    height: 3em;
    padding: 0 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #666666;
    position: relative;
    .text-line {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &:not(:last-child) .line{
      height: 1rpx;
      width: 610rpx;
      background: #dfdfdf;
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
