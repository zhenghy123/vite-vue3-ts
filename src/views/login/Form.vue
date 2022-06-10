<template>
  <div class="form_box">
    <a-form :model="formModel" :rules="rules" @finish="handleFinish">
      <p class="text">用户名</p>
      <a-form-item name="username">
        <a-input class="reset-input" v-model:value="formModel.username" placeholder="zhy">
          <template #prefix>
            <Icon size="24px" type="shoujihaodenglu" class="icon" />
          </template>
        </a-input>
      </a-form-item>
      <p class="text">密码</p>
      <a-form-item name="password">
        <a-input
          class="reset-input"
          v-model:value="formModel.password"
          type="password"
          placeholder="zhy"
        >
          <template #prefix>
            <Icon size="24px" type="shurumimadenglu" class="icon" />
          </template>
        </a-input>
      </a-form-item>
      <p class="text">验证码</p>
      <a-form-item name="password">
        <a-row type="flex">
          <a-col flex="auto">
            <a-input
              class="reset-input"
              v-model:value="formModel.code"
              type="password"
              placeholder="请输入验证码"
            />
          </a-col>
          <a-col flex="100px">
            <img @click="flushCode" :src="formModel.msgCode" alt="s" class="img-code" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" class="btn" block :loading="loading">立即登录</a-button>
      </a-form-item>
    </a-form>
    <p class="copyright">@copyright by wondertek</p>
  </div>
</template>
<script setup lang="ts">
  import { get_imgCode, post_login } from '/@/api/user/index';
  import md5 from 'js-md5';

  const router = useRouter();
  const loading = ref(false);

  const rules = {
    username: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
    password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
  };

  const formModel = reactive({
    username: '',
    password: '',
    code: '',
    timestamp: 0,
    msgCode: '',
  });

  const flushCode = () => {
    formModel.timestamp = new Date().getTime();
    formModel.msgCode = get_imgCode(formModel.timestamp);
  };

  onMounted(flushCode);

  const handleFinish = () => {
    loading.value = true;
    let params = {
      username: formModel.username,
      password: md5(formModel.password),
      captchaCode: formModel.code,
      captchaId: String(formModel.timestamp),
      tenantId: 'ivoddev',
    };

    post_login(params)
      .then(({ result }: any) => {
        sessionStorage.setItem('token', result.token);
        sessionStorage.setItem('userInfo', JSON.stringify(result));
        let authorities = result.authorities.map((item) => item.authority);
        sessionStorage.setItem('authorities', JSON.stringify(authorities));
        router.replace('/');
      })
      .finally(() => {
        loading.value = false;
        flushCode();
      });
  };
</script>
<style lang="less">
  .form_box {
    margin-top: 30px;

    .btn {
      height: 54px;
      background: linear-gradient(90deg, #00c3fd 0%, #3662f4 100%);
      border-radius: 6px;
      color: #ffffff;
      font-size: 20px;

      &:hover {
        opacity: 0.85;
        border: none;
      }
    }

    .icon {
      color: #666666;
    }

    .text {
      font-size: 14px;
      line-height: 20px;
      color: #999999;
      letter-spacing: 1.1px;
      margin-bottom: 10px;
    }

    .reset-input {
      height: 50px;
      line-height: 50px;
      border: 1px solid #707070;
      border-radius: 6px;
    }

    .copyright {
      margin-top: 20px;
      font-size: 12px;
      color: #999999;
      opacity: 0.85;
    }
  }
</style>
