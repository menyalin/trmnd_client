<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      dense
    >
      <v-toolbar-title
        id="toolbar-title"
        @click="homeClickHandler"
      >
        Test task
      </v-toolbar-title>

      <v-spacer />
      <v-btn
        v-if="$store.getters.loggedIn"
        to="/upload_file"
        text
      >
        <v-icon left>
          mdi-tray-arrow-up
        </v-icon>
        Upload File
      </v-btn>
      <v-btn
        v-if="$store.getters.loggedIn"
        to="/files"
        text
      >
        <v-icon left>
          mdi-format-list-bulleted-square
        </v-icon>
        File List
      </v-btn>

      <v-btn
        v-if="!$store.getters.loggedIn"
        to="/auth/signIn"
        text
      >
        <v-icon left>
          mdi-login
        </v-icon>
        sign in
      </v-btn>

      <v-btn
        v-if="$store.getters.loggedIn"
        text
        @click="logoutHandler"
      >
        <v-icon left>
          mdi-logout
        </v-icon>
        logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <div
        v-if="$store.getters.appLoading || !$store.getters.authChecked"
        id="spinner"
        class="text-center"
      >
        <v-progress-circular
          :size="120"
          :width="1"
          color="primary"
          indeterminate
        />
      </div>
      <router-view v-else />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({}),
  methods: {
    homeClickHandler() {
      if (this.$route.path !== '/') this.$router.push('/')
    },
    
    async logoutHandler() {
      await this.$store.dispatch('logout')
      this.$router.push('/auth/signIn')
    },
  },
}
</script>
<style scoped>
#toolbar-title {
  cursor: pointer;
}
#spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
}
</style>
