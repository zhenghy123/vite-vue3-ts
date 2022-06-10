<template>
  <a-table bordered :data-source="dataSource" :columns="columns">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'operation'">
        <a> 编辑 </a>
        <a> 删除 </a>
      </template>
    </template>
  </a-table>
</template>
<script setup lang="ts">
  //
  const dataSource = ref([
    {
      key: '0',
      name: 'Edward King 0',
      age: 32,
      address: 'London, Park Lane no. 0',
    },
    {
      key: '1',
      name: 'Edward King 1',
      age: 32,
      address: 'London, Park Lane no. 1',
    },
  ]);

  const columns: any = ref([
    {
      title: '姓名',
      dataIndex: 'name',
      width: '30%',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '操作',
      dataIndex: 'operation',
    },
  ]);
</script>
<style lang="less" scoped>
  //
</style>
