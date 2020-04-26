<template>
  <v-container class="fill-height container" fluid>
    <v-row class="ml-5">
      <p id="title" class="display-1" @mouseover="onMouse" @mouseleave="offMouse">
        + una Cerveza?
      </p>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="6">
        <file-upload ref="pic" />
        <!-- TODO() -->
        <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
          <b-dropdown-item>First Action</b-dropdown-item>
          <b-dropdown-item>Second Action</b-dropdown-item>
          <b-dropdown-item>Third Action</b-dropdown-item>
        </b-dropdown>
        <!-- TODO() -->
        <v-text-field
          v-model="recipe.ingredient1"
          label="Ingredient 1"
          placeholder="Barley"
          outlined
        />
        <v-text-field
          v-model="recipe.ingredient2"
          label="Ingredient 2"
          placeholder="Water"
          outlined
        />
        <v-text-field
          v-model="recipe.temperature"
          label="Temperature"
          placeholder="º C"
          outlined
        />
        <v-text-field
          v-model="recipe.time"
          label="Time"
          placeholder="days hours"
          outlined
        />
        <v-textarea
          v-model="recipe.description"
          label="Description"
          placeholder="Tell about the process ... "
          outlined
        />
        <v-btn
          block
          color="success"
          dark
          @click="save()"
        >
          {{ buttom }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
import FileUpload from '../components/FileUpload'

export default {
  components: {
    FileUpload
  },
  data () {
    return {
      recipe: {
        title: '',
        ingredient1: '',
        ingredient2: '',
        temperature: '',
        time: '',
        description: ''
      },
      buttom: 'Adicionar'
    }
  },
  created () {
    console.log('GOLITA')
    console.log(this.getBeersFromServer())
    if (this.$route.query) {
      this.recipe = this.$route.query
      this.buttom = 'Actualizar'
    }
  },
  methods: {
    ...mapActions('recipe', ['post', 'update', 'getBeersFromServer']),
    onMouse () {
      document.getElementById('title').innerHTML = '+ una Cerveza? <img height="50px" src="/felicidades.svg">'
    },
    offMouse () {
      document.getElementById('title').innerHTML = '+ una Cerveza?'
    },
    save () {
      // if (this.recipe.title) {
      //   this.$refs.pic.upload(this.recipe.title)
      //     .then(snapshot => this.callback(snapshot))
      // }
      this.callback('')
    },
    callback (snapshot) {
      if (this.recipe.id) {
        this.update(this.recipe)
        this.$router.push('/profile')
      } else {
        this.post(this.recipe)
        this.$router.push('/profile')
      }
    }
  }
}
</script>
