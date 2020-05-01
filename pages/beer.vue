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
            :rules="nameRules"
            label="Nombre"
            placeholder="The beer name"
            outlined
            required
          />
          <v-text-field
            v-model="beer.ibu"
            :rules="ibuRules"
            label="IBU"
            placeholder="International Bitterness Units scale"
            outlined
            required
          />
          <v-text-field
            v-model="beer.alcool"
            :rules="alcoolRules"
            label="% de Alcohol"
            outlined
            required
          />
          <v-textarea
            v-model="beer.description"
            outlined
            name="input-7-4"
            :rules="descriptionRules"
            label="Description"
            required
          />
          <v-text-field
            v-model="beer.stock"
            :rules="stockRules"
            label="Stock"
            placeholder="Uds. of beers"
            outlined
            required
          />
          <br>
          <file-upload ref="pic" />
          <br>
        </v-form>
        <v-btn
          :disabled="!valid"
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
      nameRules: [
        v => !!v || 'Can not be empty'
      ],
      ibuRules: [
        v => !!v || 'Can not be empty'
      ],
      alcoolRules: [
        v => !!v || 'Can not be empty'
      ],
      descriptionRules: [
        v => !!v || 'Can not be empty'
      ],
      stockRules: [
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
      if (this.$refs.form.validate()) {
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
