<template>
  <view v-if="show_index === 0">
    <Home/>
  </view>
  <view v-else-if="show_index === 1">
    <My @logout="show_index = 0"/>
  </view>
  <view style="height: 52px;"/>
  <nut-tabbar v-model:visible="show_index" active-color="#1989fa" :bottom="true" :safe-area-inset-bottom="true">
    <nut-tabbar-item tab-title="首页" icon="home"></nut-tabbar-item>
    <nut-tabbar-item tab-title="我的" icon="my"></nut-tabbar-item>
  </nut-tabbar>
  <login/>
</template>

<script setup>
import { ref } from 'vue'
import Home from '../views/home.vue'
import My from '../views/my.vue'
import Login from '../views/login.vue'

const show_index = ref(0)
</script>

<style>
</style>
