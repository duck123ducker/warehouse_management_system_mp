<template>
  <div style="margin: 10rpx 20rpx 0">
    <div class="name">
      {{user_info.nick_name}}
    </div>
    <div class="id">
      {{user_info.id}}
    </div>
    <div class="role">
      权限：{{user_info.role}}
    </div>
    <div @click="logout" class="logout">
      退出登录
    </div>
  </div>
</template>

<script setup>
import request from '../../utils/request'
import { ref } from 'vue'
import {use_store} from '../../store'

const emit = defineEmits(['logout'])
const user_info = ref('')
request.get('/my_user_info').then(res => user_info.value = res.data)
function logout() {
  const store = use_store()
  store.token = null
  uni.removeStorageSync('token')
  emit('logout')
}
</script>

<style lang="scss" scoped>
.name {
  font-size: 1.5em;
  font-weight: 900;
}
.id {
  font-size: 0.9em;
  color: #666666;
}
.role {
  font-size: 0.95em;
  margin-top: 5rpx;
}
.logout {
  color: red;
  text-align: center;
  border: 1rpx solid red;
  margin: 20rpx auto 0;
  padding: 15rpx;
  border-radius: 16rpx;
}
</style>
