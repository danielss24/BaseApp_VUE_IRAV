<template>
  <v-container class="fill-height container" fluid>
    <video style="position:fixed; opacity:0.3; left: 0px;" playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
      <source src="/bg.mp4" type="video/mp4">
    </video>
    <v-card width="400" class="mx-auto mt-5" tile>
      <v-card-title>
        <h1 class="display-1">
          Recovery password
        </h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="email" label="Email" prepend-icon="mdi-account-circle" />
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn color="success">
          Login
        </v-btn>
        <v-spacer />
        <v-btn color="info" @click="recovery">
          Recovery
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

export default {
  components: {},
  data: () => ({
    email: '',
    showPassword: false
  }),
  methods: {
    recovery () {
      // console.log('Recovery', this.email)
    }
  }
}
</script>

<style>
* {
  color: white;
}
</style>
