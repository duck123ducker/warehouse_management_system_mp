<template>
  <div>
    <nut-popup round :close-on-click-overlay="false" v-model:visible="showBasic">
      <view class="login-container">
        <div class="login-title">
          登录
        </div>
        <uni-forms ref="form" validateTrigger="blur" :modelValue="user" :rules="customRules">
          <uni-forms-item required label="账号" name="id">
            <uni-easyinput type="text" v-model="user.id" placeholder="请输入账号" />
          </uni-forms-item>
          <uni-forms-item required label="密码" name="passwd">
            <uni-easyinput type="password" v-model="user.passwd" placeholder="请输入密码" />
          </uni-forms-item>
        </uni-forms>
        <div @click="login_submit" class="login-button">
          登录
        </div>
      </view>
    </nut-popup>
  </div>
</template>

<script setup>
import { use_store } from '../../store'
import { computed, ref } from 'vue'
import { login } from '../../utils'

const store = use_store()
const showBasic = computed(() => !store.token)
const form = ref(null)
const user = ref({
  id: '',
  passwd: ''
})
const customRules = ref({
  id: {
    rules: [
      { required: true, errorMessage: '名称不能为空' },
      { minLength: 2, maxLength: 10, errorMessage: '名称长度在 {minLength} 到 {maxLength} 个字符', }
    ]
  },
  passwd: {
    rules: [
      { required: true, errorMessage: '密码不能为空' },
      { minLength: 5, maxLength: 20, errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符', }
    ]
  },
})
function login_submit() {
  form.value.validate().then(res => {
    uni.showLoading({title: '加载中...', mask: true})
    login(res).then(res_ => {
      if(res_.code === 200) {
        uni.setStorageSync('id&passwd', res)
        uni.setStorageSync('token', res_.data.token)
        store.token = res_.data.token
        user.value = {id: '', passwd: ''}
      }
      uni.showToast({title: res_.message ,icon: 'none',})
    })
  }).catch(err => console.log(err))
}
</script>

<style lang="scss" scoped>
.login-container {
  margin: 20rpx 50rpx;
  .login-title {
    text-align: center;
    font-weight: 900;
    padding-bottom: 20rpx;
  }
  .login-button {
    text-align: center;
    background: #1989fa;
    color: white;
    font-size: 0.9em;
    border-radius: 16rpx;
    padding: 10rpx;
  }
}
</style>
