<template>
  <app-auth-form
    title="Форма авторизации"
    type="signIn"
    :message="message"
    :loading="loading"
    submitButtonTitle="Войти"
    @submit="submit"
    @closeAlert="crearError"
  />
</template>
<script>
import AppAuthForm from '../components/authForm.vue'
export default {
  name: 'SignIn',
  components: {
    AppAuthForm,
  },
  props: {},
  data() {
    return {
      message: null,
      loading: false,
    }
  },
  methods: {
    async submit({ email, password }) {
      this.loading = true
      const { user, status, message } = await this.$store.dispatch('signIn', {
        email,
        password,
      })
      this.loading = false
      if (status === 'error') {
        this.message = message
      }
      if (status === 'success' && !!user?.username)
        this.$router.push({
          name: 'HomePage',
        })
    },
    crearError() {
      this.message = null
    },
  },
}
</script>
<style scoped></style>
