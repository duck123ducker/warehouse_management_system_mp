<template>
  <div v-if="(props.operation === '入库')||(props.operation === '出库')">
    <bound :id="props.id" :operation="props.operation"/>
  </div>
</template>

<script setup>
import Bound from '../views/bound.vue'

const props = defineProps(['id', 'operation'])
</script>

<style lang="scss" scoped>
</style>
