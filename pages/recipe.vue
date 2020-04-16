<template>
  <v-container class="fill-height container" fluid>
    <v-row class="ml-10">
      <p id="title" class="display-3" @mouseover="onMouse" @mouseleave="offMouse">
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
        <v-btn
          block
          color="success"
          dark
          @click="post()"
        >
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
  mounted () {
    if (this.lamp1 === '1') {
      document.getElementById('lamp1').style = 'border-color: yellow; border-style: dotted; color: yellow'
    }
    // document.getElementById('title').style = 'border-color: blue; border-style: dotted; color: blue'
  },
  methods: {
    ...mapActions('recipe', ['post']),
    onMouse () {
      console.log('on')
      // document.getElementById('title').style = 'border-color: red; border-style: dotted; color: red'
      document.getElementById('title').innerHTML = 'CRUD recipe <img height="50px" src="/felicidades.svg">'
    },
    offMouse () {
      console.log('off')
      // document.getElementById('title').style = 'border-color: blue; border-style: dotted; color: blue'
      document.getElementById('title').innerHTML = 'CRUD recipe'
    },
    save () {
      console.log('save')
      this.post({ some: 'thing' })
      // this.$router.push('/profile')
    }
  }
}
</script>
