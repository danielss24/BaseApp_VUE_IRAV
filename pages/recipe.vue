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
        <v-text-field
          v-model="recipe.title"
          label="Nombre"
          placeholder="El nombre de tu cerveza"
          outlined
        />
        <v-text-field
          v-model="recipe.ibu"
          label="IBU"
          placeholder="International Bitterness Units scale"
          outlined
        />
        <v-text-field
          v-model="recipe.alcool"
          label="% de Alcool"
          outlined
        />
        <v-textarea
          v-model="recipe.description"
          outlined
          name="input-7-4"
          label="Receta"
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
        ibu: '',
        alcool: '',
        description: ''
      },
      buttom: 'Adicionar'
    }
  },
  created () {
    if (this.$route.query) {
      this.recipe = this.$route.query
      this.buttom = 'Atualizar'
    }
  },
  mounted () {
    // eslint-disable-next-line dot-notation
    const isLoggedIn = this.$store.getters['isLoggedIn']
    if (!isLoggedIn) {
      this.$router.push('/login')
    }
  },
  methods: {
    ...mapActions('recipe', ['post', 'update']),
    onMouse () {
      document.getElementById('title').innerHTML = '+ una Cerveza? <img height="50px" src="/felicidades.svg">'
    },
    offMouse () {
      document.getElementById('title').innerHTML = '+ una Cerveza?'
    },
    save () {
      if (this.recipe.title) {
        this.$refs.pic.upload(this.recipe.title)
          .then(snapshot => this.callback(snapshot))
      }
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
