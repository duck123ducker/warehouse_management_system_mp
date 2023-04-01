<template>
  <div style="margin: 15rpx 25rpx 0">
    <div class="line" v-for="tag in tags" :key="tag.attr">
      <div class="attr">{{ tag.name }}:</div>
      <div class="value">{{ pack_info[tag.attr] }}</div>
    </div>
  </div>
</template>

<script setup>
import {use_store} from '/store'
import {storeToRefs} from 'pinia'
import {ref} from 'vue'
const store = use_store()
const {request_cache} = storeToRefs(store)
const props = defineProps(['id'])
const pack_info = ref(request_cache.value.package_info[props.id])
const tags = [
  {
    name: '编码',
    attr: 'id',
  },
  {
    name: '库存',
    attr: 'num',
  },
  {
    name: '名称',
    attr: 'name',
  },
]
</script>

<style lang="scss" scoped>
.line {
  display: flex;
  &:not(:last-child) {
    margin-bottom: 0.5em;
  }
  .attr {
    font-weight: 900;
    margin-right: 0.5em;
  }
  .value {
    color: #666666;
  }
}
</style>
