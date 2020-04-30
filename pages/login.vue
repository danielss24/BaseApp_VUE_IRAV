<template>
  <v-container class="fill-height container" fluid>
    <video style="position:fixed; opacity:0.3; left: 0px;" playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
      <source src="/bg.mp4" type="video/mp4">
    </video>
    <v-card width="400" class="mx-auto mt-5" tile>
      <v-card-title>
        <h1 class="display-1">
          Login
        </h1>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            v-model="email"
            masked="true"
            label="Email"
            prepend-icon="mdi-account-circle"
            :rules="emailRules"
            placeholder="user@estudiante.uam.es or user@uam.es"
          />
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Contrasenha"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn
          color="success"
          to="/create"
        >
          Register
        </v-btn>
        <v-spacer />
        <v-btn
          color="info"
          :disabled="!valid"
          @click="login"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data: () => ({
    email: '',
    password: '',
    showPassword: false,
    emailRules: [
      v => !!v || 'El e-mail es obligatorio',
      v =>
        /^\w+([.-]?\w+)*@(uam\.es)+$/.test(v) ||
        /^\w+([.-]?\w+)*@(estudiante\.uam\.es)+$/.test(v) ||
        /^\w+([.-]?\w+)*@(gmail\.com)+$/.test(v) ||
        'E-mail tiene que ser valido'
    ],
    valid: null
  }),
  computed: {
    ...mapState({
      authUser: state => state.user
    }),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    })
  },
  created () {
    // eslint-disable-next-line dot-notation
    const isLoggedIn = this.$store.getters['isLoggedIn']
    if (isLoggedIn) {
      this.$router.push('/profile')
    }
  },
  methods: {
    ...mapActions({
      onAuthStateChanged: 'onAuthStateChanged'
    }),
    ...mapMutations({
      set: 'SET_AUTH_USER'
    }),
    login () {
      this.$fireAuth.signInWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          this.set({ authUser: response.user, claims: response.addicionalUserInfo })
          this.$router.push('/profile')
        })
        .catch((error) => {
          alert(error.message)
        })
    }
  }
}
</script>

<style>
* {
  color: white;
}
</style>
