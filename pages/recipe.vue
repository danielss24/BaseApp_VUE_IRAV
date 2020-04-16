<template>
  <v-container class="fill-height container" fluid>
    <v-row class="ml-10">
      <p class="display-3">
        CRUD recipe
      </p>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="title"
          label="Title"
          placeholder="Put some beautful name for your brew..."
          outlined
        />
        <v-text-field
          v-model="ibu"
          label="IBU"
          outlined
        />
        <v-text-field
          v-model="alcool"
          label="% of Alcool"
          outlined
        />
        <v-textarea
          v-model="description"
          outlined
          name="input-7-4"
          label="Recipe"
        />
        <v-btn block color="success" dark @click="post()">
          Save
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      title: '',
      ibu: '',
      alcool: '',
      description: ''
    }
  },
  created () {
    // if (edit)
    // get from server
    // put on the v-model
  },
  methods: {
    ...mapActions('recipe', ['post']),
    save () {
      console.log('save')
      this.post({ some: 'thing' })
      // this.$router.push('/profile')
    }
  }
}
</script>
