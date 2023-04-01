<template>
  <div v-if="(props.operation === '入库')||(props.operation === '出库')">
    <bound :id="props.id" :operation="props.operation"/>
  </div>
  <div v-else-if="props.operation === '查询信息'">
    <show_info :id="props.id"/>
  </div>
  <div v-else-if="props.operation === '修改信息'">
    <create_pack :id="props.id" :modify="true"/>
  </div>
</template>

<script setup>
import Bound from '../views/bound.vue'
import Show_info from '../views/show_info.vue'
import Create_pack from '../views/create_pack.vue'

const props = defineProps(['id', 'operation'])
</script>

<style lang="scss" scoped>
</style>
