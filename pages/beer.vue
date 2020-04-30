<template>
  <v-container class="fill-height container" fluid>
    <v-row class="ml-5">
      <p id="title" class="display-1" @mouseover="onMouse" @mouseleave="offMouse">
        + one Beer?
      </p>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="6">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="beer.title"
            label="Nombre"
            placeholder="The beer name"
            :rules="textRules"
            outlined
            required
          />
          <v-text-field
            v-model="beer.ibu"
            label="IBU"
            placeholder="International Bitterness Units scale"
            outlined
            :rules="textRules"
            required
          />
          <v-text-field
            v-model="beer.alcool"
            label="% de Alcohol"
            outlined
            :rules="textRules"
            required
          />
          <v-textarea
            v-model="beer.description"
            outlined
            name="input-7-4"
            label="Recipe"
            :rules="textRules"
            required
          />
          <v-text-field
            v-model="beer.stock"
            label="Stock"
            placeholder="Uds. of beers"
            outlined
            :rules="textRules"
            required
          />
          <br>
          <file-upload ref="pic" />
          <br>
        </v-form>
        <v-btn
          block
          color="success"
          dark
          @click="validate()"
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
      valid: true,
      buttom: 'Add',
      textRules: [
        v => !!v || 'Can not be empty'
      ]
    }
  },
  created () {
    if (this.$route.query) {
      this.beer = this.$route.query
      this.buttom = 'Update'
    }
  },
  methods: {
    ...mapActions('beer', ['post', 'update']),
    ...mapActions('recipe', ['state']),
    onMouse () {
      document.getElementById('title').innerHTML = '+ one Beer? <img height="50px" src="/happiness.svg">'
    },
    offMouse () {
      document.getElementById('title').innerHTML = '+ one Beer?'
    },
    save () {
      // TODO: I removed because is not working very well
      // if (this.beer.title) {
      //   this.$refs.pic.upload(this.beer.title)
      //   .then(snapshot => this.callback(snapshot))
      // }
      this.callback('')
    },
    validate () {
      this.$refs.form.validate()
      if (this.valid === true) {
        this.save()
      }
    },
    callback (snapshot) {
      if (this.beer.id) {
        console.log('update')
        this.update(this.beer, this.$store.recipe)
        this.$router.push('/profile')
      } else {
        console.log('post')
        this.post(this.beer, this.$store.recipe)
        this.$router.push('/profile')
      }
    }
  }
}
</script>
