<template>
  <v-container class="fill-height container" fluid>
    <video style="position:fixed; opacity:0.3; left: 0px;" playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
      <source src="/bg.mp4" type="video/mp4">
    </video>
    <v-row>
      <v-card width="400" class="mx-auto mt-5" tile>
        <v-card-title>
          <h1 class="display-1">
            Nueva cuenta
          </h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="email" label="Email" prepend-icon="mdi-account-circle" />
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
          <v-btn color="success" to="/login">
            Login
          </v-btn>
          <v-spacer />
          <v-btn color="info" @click="create">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <!-- <v-row>
      <nuxt-link class="text-center" to="/recovery">
        recovery passoword
      </nuxt-link>
    </v-row> -->
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
    showPassword: false
  }),
  methods: {
    create () {
      this.$fireAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      )
        .then((response) => {
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
