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
          v-model="beer.title"
          label="Nombre"
          placeholder="El nombre de tu cerveza"
          outlined
        />
        <v-text-field
          v-model="beer.ibu"
          label="IBU"
          placeholder="International Bitterness Units scale"
          outlined
        />
        <v-text-field
          v-model="beer.alcool"
          label="% de Alcool"
          outlined
        />
        <v-textarea
          v-model="beer.description"
          outlined
          name="input-7-4"
          label="Receta"
        />
        <v-text-field
          v-model="beer.stock"
          label="Stock"
          placeholder="Uds. of beers"
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
      beer: {
        title: '',
        ibu: '',
        alcool: '',
        description: '',
        stock: '',
        recipe: null
      },
      buttom: 'Adicionar'
    }
  },
  created () {
    if (this.$route.query) {
      this.beer = this.$route.query
      this.buttom = 'Actualizar'
    }
  },
  methods: {
    ...mapActions('beer', ['post', 'update']),
    ...mapActions('recipe', ['state']),
    onMouse () {
      document.getElementById('title').innerHTML = '+ una Cerveza? <img height="50px" src="/felicidades.svg">'
    },
    offMouse () {
      document.getElementById('title').innerHTML = '+ una Cerveza?'
    },
    save () {
      // if (this.beer.title) {
      //   this.$refs.pic.upload(this.beer.title)
      //     .then(snapshot => this.callback(snapshot))
      // }
      this.callback('')
    },
    callback (snapshot) {
      if (this.beer.id) {
        console.log('update')
        this.update(this.beer, this.$store.recipe)
        // this.$router.push('/profile')
      } else {
        console.log('post')
        this.post(this.beer, this.$store.recipe)
        // this.$router.push('/profile')
      }
    }
  }
}
</script>
