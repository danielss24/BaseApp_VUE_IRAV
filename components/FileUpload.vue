<template>
  <div class="file">
    <form enctype="multipart/form-data">
      <div class="fields">
        <label>Añade una foto de la birra!</label>
        <input
          ref="file"
          type="file"
          @change="onSelect"
        >
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'FileUpload',
  data () {
    return {
      file: '',
      message: ''
    }
  },
  methods: {
    onSelect () {
      const file = this.$refs.file.files[0]
      this.file = file
    },
    upload (beer) {
      if (beer) { // falta un try catch ...
        const storageRef = this.$fireStorage.ref()
        const beerRef = storageRef.child(beer.toLowerCase())
        if (this.file) {
          return beerRef.put(this.file)
        } else {
          // return Promise reject
        }
      }
    }
  }
}
</script>
