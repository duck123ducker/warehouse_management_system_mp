<template>
  <div style="margin: 20rpx 0 50rpx; text-align: center; font-weight: 900;">
    请选择操作
  </div>
  <div class="options-container">
    <div class="option-container" v-for="op in operations" :key="op.operation">
      <div class="option" @click="$emit('choose', op.operation)">
        <i :class="`iconfont ${op.icon_name}`" style="font-size: 4em; font-weight: 900;"/>
        <div style="margin-top: 10rpx; color: #666666; font-size: 0.95em;">
          {{op.operation}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
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
</script>

<style lang="scss" scoped>
.options-container {
  display: flex;
  flex-wrap: wrap;
  .option-container {
    flex: 1 1 50%;
    display: flex;
    justify-content: center;
    &:not(:last-child):not(:nth-last-child(2)) {
      margin-bottom: 50rpx;
    }
    .option {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 200rpx;
      width: 200rpx;
      border: #b0b0b0 solid 1rpx;
      border-radius: 40rpx;
    }
  }
}
</style>
