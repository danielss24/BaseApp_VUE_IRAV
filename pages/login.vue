<template>
  <div class="text-center">
    <v-row>
      <v-col cols="12">
        <v-row
          align="center"
          justify="center"
        >
          <v-card width="400" class="mx-auto mt-5" tile>
            <v-card-title>
              <h1 class="display-1">
                Login
              </h1>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field label="Username" prepend-icon="mdi-account-circle" />
                <v-text-field
                  :type="showPassword ? 'text' : 'password'"
                  label="password"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                />
              </v-form>
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-btn color="success">
                Register
              </v-btn>
              <v-spacer />
              <v-btn color="info">
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  components: {},
  data: () => ({
    showPassword: false
  })
}
</script>

<style>
* {
  color: white;
}
</style>
