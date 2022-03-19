<template>
  <div class="form-wrapper">
    <v-alert
      v-if="message"
      type="info"
      dismissible
      transition="fade-transition"
      @input="closeAlert"
    >
      {{ message }}
    </v-alert>
    <form @submit.prevent="submitHandler">
      <v-card :loading="loading">
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model.trim="$v.email.$model"
            type="Email"
            label="Email"
            :errorMessages="emailErrors"
            @blur="$v.email.$touch()"
          />
          <v-text-field
            v-if="type === 'signUp'"
            v-model.trim="$v.name.$model"
            label="Имя"
            :errorMessages="nameErrors"
            @blur="$v.name.$touch()"
          />
          <v-text-field
            v-model.trim="$v.password.$model"
            type="Password"
            label="Пароль"
            :errorMessages="passwordErrors"
            @blur="$v.password.$touch()"
          />
          <v-text-field
            v-if="type === 'signUp'"
            v-model="$v.confirmPassword.$model"
            type="Password"
            label="Повторите пароль"
            :errorMessages="confirmPasswordErrors"
            @blur="$v.confirmPassword.$touch()"
          />
        </v-card-text>
        <v-card-actions>
          <div class="actions-wrapper">
            <v-btn
              color="primary"
              :disabled="invalidForm || loading"
              :loading="loading"
              @click="submitHandler"
            >
              {{ submitButtonTitle }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>
<script>
import { required, email, sameAs } from 'vuelidate/lib/validators'
export default {
  name: 'AuthForm',
  props: {
    title: String,
    type: {
      type: String,
      required: true,
      validator: function (v) {
        return ['signIn', 'signUp'].includes(v)
      },
    },
    submitButtonTitle: String,
    message: String,
    loading: Boolean,
  },
  data() {
    return {
      email: null,
      name: null,
      password: null,
      confirmPassword: null,
    }
  },
  computed: {
    invalidForm() {
      return this.$v.$invalid
    },
    emailErrors() {
      let errors = []
      if (this.$v.email.$dirty && !this.$v.email.required)
        errors.push('Поле не может быть пустым')
      if (this.$v.email.$dirty && !this.$v.email.email)
        errors.push('Не корректный Email')
      return errors
    },
    nameErrors() {
      let errors = []
      if (this.$v.name.$dirty && !this.$v.name.required)
        errors.push('Поле не может быть пустым')
      return errors
    },
    passwordErrors() {
      let errors = []
      if (this.$v.password.$dirty && !this.$v.password.required)
        errors.push('Поле не может быть пустым')
      return errors
    },
    confirmPasswordErrors() {
      let errors = []
      if (this.$v.confirmPassword.$dirty && !this.$v.confirmPassword.required)
        errors.push('Поле не может быть пустым')
      if (this.$v.confirmPassword.$dirty && !this.$v.confirmPassword.sameAs)
        errors.push('Пароли не совпадают')
      return errors
    },
  },
  validations() {
    if (this.type === 'signUp')
      return {
        email: {
          required,
          email,
        },
        name: {
          required,
        },
        password: {
          required,
        },
        confirmPassword: {
          required,
          sameAs: sameAs('password'),
        },
      }
    else if (this.type === 'signIn')
      return {
        email: {
          required,
          email,
        },
        password: {
          required,
        },
      }
  },
  methods: {
    submitHandler() {
      if (this.invalidForm) return null
      this.$emit('submit', {
        email: this.email,
        name: this.name,
        password: this.password,
      })
    },
    closeAlert() {
      this.$emit('closeAlert')
    },
  },
}
</script>
<style scoped>
.form-wrapper {
  max-width: 800px;
  padding: 10px;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
