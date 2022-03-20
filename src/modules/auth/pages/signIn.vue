<template>
  <app-auth-form
    title="Sign In"
    type="signIn"
    :message="message"
    :loading="loading"
    submitButtonTitle="sign in"
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
    async submit({ name, password }) {
      this.loading = true
      const { status, message } = await this.$store.dispatch('signIn', {
        name,
        password,
      })
      this.loading = false
      if (status === 'success') this.$router.push('/')
      else if (status === 'error') this.message = message
    },
    crearError() {
      this.message = null
    },
  },
}
</script>
<style scoped></style>
