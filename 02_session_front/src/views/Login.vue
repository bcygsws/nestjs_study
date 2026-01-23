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
        <el-form-item label="验证码" prop="captcha" class="captcha">
          <img src="https://picsum.photos/100/40" alt=""/>
          <el-input v-model="ruleForm.captcha" type="text" autocomplete="off" class="my-code"/>
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            登录
          </el-button>
          <el-link @click="resetForm(ruleFormRef)">重置</el-link>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue'

import type {FormInstance, FormRules} from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass')
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  user: 'admin',
  pass: '123456',
  captcha: '1234',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{validator: validatePass, trigger: 'blur'}],
  checkPass: [{validator: validatePass2, trigger: 'blur'}],
  age: [{validator: checkAge, trigger: 'blur'}],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<style lang="scss" scoped>
.form-container {
  width: 100%;
  height: 100vh;
  position: relative;

  .content {
    width: 500px;
    height: 280px;
    box-sizing: border-box;
    padding: 15px;
    border-radius: 10px;
    background-color: #dddddd;
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
      .el-form-item.captcha {

        .el-form-item__content {
          width: 100%;
          position: relative;

          img {
            width: 150px;
            height: 30px;
            margin-right: 20px;
          }

          .el-input.my-code {
            width: calc(100% - 170px);
            position: absolute;
            right: 0;
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
