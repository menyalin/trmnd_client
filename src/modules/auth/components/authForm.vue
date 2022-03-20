<template>
  <div class="form-wrapper">
    <v-alert
      v-if="message"
      type="warning"
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
            v-model.trim="$v.name.$model"
            label="Name"
            :errorMessages="nameErrors"
            @blur="$v.name.$touch()"
          />
          <v-text-field
            v-model.trim="$v.password.$model"
            type="Password"
            label="Password"
            :errorMessages="passwordErrors"
            @blur="$v.password.$touch()"
          />
          <v-text-field
            v-if="type === 'signUp'"
            v-model="$v.confirmPassword.$model"
            type="Password"
            label="Confirm password"
            :errorMessages="confirmPasswordErrors"
            @blur="$v.confirmPassword.$touch()"
          />
        </v-card-text>
        <v-card-actions>
          <router-link
            v-if="type === 'signIn'"
            to="/auth/signUp"
          >
            Sign Up
          </router-link>
          <router-link
            v-if="type === 'signUp'"
            to="/auth/signIn"
          >
            Already registered?
          </router-link>
          <v-spacer />
          <v-btn
            color="primary"
            :disabled="invalidForm || loading"
            :loading="loading"
            @click="submitHandler"
          >
            {{ submitButtonTitle }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>
<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators'

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
      name: null,
      password: null,
      confirmPassword: null,
    }
  },
  computed: {
    invalidForm() {
      return this.$v.$invalid
    },
    nameErrors() {
      let errors = []
      if (this.$v.name.$dirty && !this.$v.name.required)
        errors.push('Name required')
      return errors
    },
    passwordErrors() {
      let errors = []
      if (this.$v.password.$dirty && !this.$v.password.required)
        errors.push('Password required')
      if (this.$v.password.$dirty && !this.$v.password.minLength)
        errors.push('Too short password')
      return errors
    },
    confirmPasswordErrors() {
      let errors = []
      if (this.$v.confirmPassword.$dirty && !this.$v.confirmPassword.required)
        errors.push('Confirm password required')
      if (this.$v.confirmPassword.$dirty && !this.$v.confirmPassword.sameAs)
        errors.push('The entered passwords are not the same')
      return errors
    },
  },
  validations() {
    const baseParams = {
      name: {
        required,
      },
      password: {
        required,
        minLength: minLength(4),
      },
    }
    if (this.type === 'signUp')
      return {
        ...baseParams,
        confirmPassword: {
          required,
          sameAs: sameAs('password'),
        },
      }
    else return baseParams
  },
  methods: {
    submitHandler() {
      if (this.invalidForm) return null
      this.$emit('submit', {
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
.actions-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
