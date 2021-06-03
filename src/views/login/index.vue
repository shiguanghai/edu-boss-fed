<template>
  <div class="login">
    <el-form
      class="login-form"
      label-position="top"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          :loading="isLoginLoading"
          @click="onSubmit"
        >
          登录
        </el-button>
      </el-form-item>
      <el-form-item>
        <p>供测试权限控制：15321919571 | 111111</p>
        <p>没有课程、广告管理权限</p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      isLoginLoading: false
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 1. 表单验证
        await (this.$refs.form as Form).validate()

        // 登录按钮 loading
        this.isLoginLoading = true

        // 2. 验证通过 -> 提交表单
        const { data } = await login(this.form)
        // 3. 处理请求结果
        //      失败 -> 给出提示
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 1.登录成功，记录登录状态，状态需要能够全局访问（放到 Vuex 容器中）
          this.$store.commit('setUser', data.content)
          // 2.然后在访问登录页面的时候判断是否有登录状态（VueRouter 路由拦截器）
          //      成功 -> 跳转到首页
          // this.$router.push({
          //   name: 'home'
          // })
          this.$router.push(this.$route.query.redirect as string || '/')
          this.$message.success('登录成功')
        }
      } catch (error) {
        console.log('登录失败', error)
      }
      // 结束登录按钮的 loading
      this.isLoginLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 300px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
