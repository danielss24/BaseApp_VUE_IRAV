<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item to="/team" link>
          <v-list-item-action>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Equipo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="!isLoggedIn"
          to="/create"
          link
        >
          <v-list-item-action>
            <v-icon>mdi-account-multiple-plus-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Nueva cuenta</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="!isLoggedIn"
          to="login"
          link
        >
          <v-list-item-action>
            <v-icon>mdi-login-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="isLoggedIn"
          link
          @click="logout"
        >
          <v-list-item-action>
            <v-icon>mdi-login-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group v-if="false">
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Recovery & Password</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item to="/recovery" link>
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Recovery</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/password" link>
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Password</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-if="isLoggedIn" to="/profile" link>
          <v-list-item-action>
            <v-icon>mdi-face-profile-woman</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="false" to="/recipe" link>
          <v-list-item-action>
            <v-icon>mdi-text-box-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Recipe</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <router-link to="/" exact class="irav-icon">
        <v-toolbar-title>
          <img height="40px" src="/felicidades.svg">beer4share
        </v-toolbar-title>
      </router-link>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height container" fluid>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; Ingenier@s CS UAM 2020</span>
      <a href="https://github.com/danielss24/BaseApp_VUE_IRAV" class="ml-5 mr-3">
        <img src="/github.svg" width="20">
        Vea el fuente en Github
      </a>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    })
  },
  props: {
    source: String
  },

  data: () => ({
    drawer: null
  }),
  created () {
    this.$vuetify.theme.dark = true
  },
  methods: {
    ...mapMutations({
      reset: 'RESET_STORE'
    }),
    logout () {
      console.log('logout')
      this.reset()
      this.$router.push('/')
    }
  }
}
</script>

<style>
.irav-icon:link {
  text-decoration: none;
}

.irav-icon:visited {
  text-decoration: none;
}
</style>
