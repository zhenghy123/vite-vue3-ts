<template>
  <div>
    Home
    <a-button @click="increment">increment</a-button>
    {{ count }}
  </div>
</template>
<script setup lang="ts">
  import { useHomeStore } from '/@/store/modules/home';
  import { storeToRefs } from 'pinia';

  // pinia composition api
  const store = useHomeStore();
  const { count } = storeToRefs(store);
  // const count = computed(() => store.count)
  const increment = store.increment;

  // pinia options api
  // const increment = () => {
  //   // store.increment()
  //   store.$patch({ count: store.count + 1 })
  // }
</script>
<style lang="less" scoped>
  .search {
    & :deep(.ant-input) {
      height: 48px;
    }
  }
</style>
