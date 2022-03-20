<template>
  <app-auth-form
    title="Sign Up"
    :message="message"
    type="signUp"
    :loading="loading"
    submitButtonTitle="Sign Up"
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
    async submit({ password, name }) {
      this.loading = true
      const { status, message } = await this.$store.dispatch('signUp', {
        password,
        name,
      })
      this.loading = false
      if (status === 'success') {
        this.$router.push('/')
      } else {
        this.message = message
      }
    },
    crearError() {
      this.message = null
    },
  },
}
</script>
<style scoped></style>
