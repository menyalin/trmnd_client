<template>
  <app-auth-form
    title="Форма регистрации"
    :message="message"
    type="signUp"
    :loading="loading"
    submitButtonTitle="Создать запись"
    @submit="submit"
    @closeAlert="crearError"
  />
</template>
<script>
import AppAuthForm from '../components/authForm.vue'
export default {
  name: 'SignUp',
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
    async submit({ email, password, name }) {
      this.loading = true
      const { user, status, message } = await this.$store.dispatch('signUp', {
        email,
        password,
        name,
      })
      this.loading = false
      if (status === 'error') {
        this.message = message
      }
      if (status === 'success' && !!user?.username)
        this.$router.push({
          name: 'ConfirmEmail',
          params: { username: user?.username },
        })
    },
    crearError() {
      this.message = null
    },
  },
}
</script>
<style scoped></style>
