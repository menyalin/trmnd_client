<template>
  <div class="input-wrapper">
    <v-card>
      <v-card-title>Подтверждение регистрации</v-card-title>
      <v-card-subtitle v-if="username">
        {{ username }}
      </v-card-subtitle>
      <v-card-text>
        <v-text-field
          v-model="code"
          label="Введите код"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          :disabled="!code"
          @click="confirmEmail"
        >
          Подтвердить
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'ConfirmEmail',
  props: {
    username: String,
  },
  data() {
    return {
      code: null,
    }
  },
  methods: {
    async confirmEmail() {
      if (!this.code || !this.username) return null
      try {
        this.loading = true
        const { status } = await this.$store.dispatch('confirmSignUp', {
          username: this.username,
          code: this.code,
        })
        this.loading = false
        if (status === 'ok') {
          this.$router.push({
            name: 'HomePage',
            params: {
              message: {
                type: 'info',
                text: 'Email confirmed successfully',
              },
            },
          })
        }
      } catch (e) {
        this.loading = false
        console.log('handled error: ', e)
      }
    },
  },
}
</script>
<style scoped>
.input-wrapper {
  margin: 0 auto;
  margin-top: 100px;
  padding: 15px;
  max-width: 400px;
}
</style>
