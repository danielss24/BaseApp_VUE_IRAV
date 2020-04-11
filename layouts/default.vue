<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item to="/team" link>
          <v-list-item-action>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>WHO</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/singin" link>
          <v-list-item-action>
            <v-icon>mdi-account-multiple-plus-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Singin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/login" link>
          <v-list-item-action>
            <v-icon>mdi-login-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group>
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
        <v-list-item to="/profile" link>
          <v-list-item-action>
            <v-icon>mdi-face-profile-woman</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/recipe" link>
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
      <router-link to="/" exact>
        <v-toolbar-title>
          <img height="40px" src="https://brew.sh/assets/img/homebrew-256x256.png">beer4share
        </v-toolbar-title>
      </router-link>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height container" fluid>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; Engienir@ UAM 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },

  data: () => ({
    drawer: null
  }),

  created () {
    this.$vuetify.theme.dark = true
  }
}

</script>

<style>
</style>
