<template>
  <view style="margin: 20rpx 25rpx 0">
    <uni-forms ref="form" :modelValue="formData" :rules="customRules">
      <uni-forms-item required label="编号" name="id">
        <uni-easyinput disabled type="text" v-model="formData.id" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item required label="名称" name="name">
        <uni-easyinput type="text" v-model="formData.name" placeholder="请输入名称" />
      </uni-forms-item>
      <uni-forms-item required label="库存" name="num">
        <uni-number-box v-model="formData.num" @change="changeValue"/>
      </uni-forms-item>
    </uni-forms>
    <div @click="submit" class="my-button">
      确定
    </div>
  </view>
</template>

<script setup>
import {use_store} from '/store'
import {storeToRefs} from 'pinia'
import {ref} from 'vue'
import {create, modify} from '../../utils'
const store = use_store()
const {request_cache} = storeToRefs(store)
const form = ref(null)
const props = defineProps(['id', 'modify'])
const emit = defineEmits(['submit'])
const formData = ref({
  id: props.id,
  name: !!props.modify?request_cache.value.package_info[props.id].name:'',
  num: !!props.modify?request_cache.value.package_info[props.id].num:1,
})
const customRules = ref({
  name: {
    rules: [
      {
        required: true,
        errorMessage: '名称不能为空'
      },
      {
        minLength: 2,
        maxLength: 10,
        errorMessage: '名称长度在 {minLength} 到 {maxLength} 个字符',
      }
    ]
  },
})
function changeValue(num_) {
  formData.value.num = num_
}
function submit() {
  form.value.validate().then(res => {
    uni.showLoading({title: '加载中...', mask: true})
    if(!!props.modify) {
      modify(res).then(res_ => {
        if(res_==='success') {
          uni.hideLoading()
          uni.showToast({title: '修改信息成功！',icon: 'none'})
          request_cache.value.package_info[props.id] = res
        }
      })
    }else {
      create(res).then(res_ => {
        if(res_==='success') {
          uni.hideLoading()
          uni.showToast({title: '新建包裹成功！',icon: 'none'})
          request_cache.value.package_info[props.id] = res
          emit('submit')
        }
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.my-button {
  padding: 15rpx 150rpx;
  margin: 15rpx auto 0;
  color: white;
  background: #1989fa;
  border-radius: 12rpx;
  text-align: center;
}
</style>
