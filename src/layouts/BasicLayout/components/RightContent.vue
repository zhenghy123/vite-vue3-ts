<template>
  <div class="sys-setting">
    <a-dropdown placement="bottomCenter">
      <template #overlay>
        <a-menu :selectedKeys="selectedKeys" class="menu-box">
          <a-menu-item v-for="item in navs" :key="item.path" @click="handleRoute(item)">
            <template #icon>
              <Icon align="1px" size="20px" :type="item.icon" />
            </template>
            <span>{{ item.name }}</span>
          </a-menu-item>
        </a-menu>
      </template>
      <Space class="wrap" align="baseline" direction="horizontal">
        <Icon align="2px" type="xitongshezhi" />
        <span class="setting">系统设置</span>
        <Icon align="2px" type="xialajiantou" />
      </Space>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
  import { Space } from 'ant-design-vue';
  import { navs as myNavs } from './constant';

  const router = useRouter();

  const navs = ref(myNavs);
  const selectedKeys = ref<string[]>([]);

  watchEffect(() => {
    if (router.currentRoute) {
      const matched = router.currentRoute.value.matched.concat();
      selectedKeys.value = matched.filter((r) => r.name !== 'index').map((r) => r.path);
    }
  });

  const handleRoute = ({ path, name }) => {
    if (path) router.push(path);
    if (name == '退出登录') {
      sessionStorage.clear();
    }
  };
</script>

<style lang="less" scoped>
  .sys-setting {
    height: 100%;
    display: flex;
    justify-content: center;
    padding-right: 16px;

    .wrap {
      display: flex;
      height: 55px;

      .setting {
        font-size: 16px;
        font-weight: 600;
        line-height: 22px;
        color: @font-color;
        margin: 0 8px 0 4px;
      }
    }

    .my-icon {
      font-size: 18px !important;
      color: @font-color;
    }
  }

  .menu-box :deep(.ant-dropdown-menu-item) {
    width: 142px;
    height: 42px;
    line-height: 42px;
    padding: 0 16px;
  }

  .menu-box :deep(.ant-dropdown-menu-item-selected) {
    background: @background-color;
    color: @font-color;
  }
</style>
