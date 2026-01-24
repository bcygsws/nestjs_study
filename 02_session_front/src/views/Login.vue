<template>
  <div class="form-container">
    <div class="content">
      <div class="title">登录</div>
      <el-form
          ref="ruleFormRef"
          style="max-width: 600px"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm form"
      >
        <el-form-item label="账号" prop="user">
          <el-input v-model="ruleForm.user" type="text" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha" class="code">
          <el-input v-model="ruleForm.code" type="text" autocomplete="off" class="my-code"/>
          <img :src="codeUrl" alt="" @click="changeCode"/>
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            登录
          </el-button>
          <el-link @click="resetForm(ruleFormRef)" type="danger">重置</el-link>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue'

import type {FormInstance, FormRules} from 'element-plus';
import {postCode} from "@/apis";
// 后端请求回来的验证码，只需要给出img标签src值即可，无需创建验证请求api
const codeUrl = ref<string>('api/session/code');
// 实现点击图片，验证码更换
const changeCode = () => {
  codeUrl.value = codeUrl.value + '?' + Math.random() * 10000;
}

const ruleFormRef = ref<FormInstance>();

const validateUser = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入账号名'))
  } else {
    callback()
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    if (ruleForm.pass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('user');
    }
    callback();
  }
}
const validateCaptcha = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入验证码'))
  } else if (value.length !== 6) {
    callback(new Error('输入的验证码不合规，验证码为6位'));
  } else {
    callback();
  }
}

const ruleForm = reactive({
  user: 'admin',
  pass: '123456',
  code: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  user: [{validator: validateUser, trigger: 'blur'}],
  pass: [{validator: validatePass, trigger: 'blur'}],
  code: [{validator: validateCaptcha, trigger: 'blur'}]
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      console.log('submit!')
      const res = await postCode(ruleForm);
      console.log(res);
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
}

</script>

<style lang="scss" scoped>
.form-container {
  width: 100%;
  height: 100vh;
  position: relative;

  .content {
    width: 400px;
    height: 260px;
    box-sizing: border-box;
    padding: 15px;
    border-radius: 10px;
    background-color: #eeeeee;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .title {
      font-size: 24px;
      text-align: center;
      padding-bottom: 10px;
    }

    .form {
      .el-form-item.code {

        .el-form-item__content {
          width: 100%;
          position: relative;

          img {
            position: absolute;
            right: 0;
            margin-left: 10px;
          }

          .el-input.my-code {
            width: calc(100% - 150px);
          }
        }
      }

      .el-form-item.submit {
        height: 32px;

        .el-form-item__content {
          position: relative;

          > button {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }

          > a {
            position: absolute;
            right: 0;
          }
        }
      }


    }
  }

}

</style>
