export const state = () => ({
  beer: {
    title: '',
    ibu: '',
    alcool: '',
    description: '',
    stock: '',
    recipe: { title: '', beer_id: '', ingredient1: '', ingredient2: '', temperature: '', time: '', description: '' }
  }
})
export const mutations = {
  set (state, beer) {
    state.beer = beer
  }
}
export const getters = {
  get: (state) => {
    return state.beer
  }
}
export const actions = {
  post ({ commit }, beerPayload, recipe) {
    const DBFS = this.$fireStore
    this.$fireStore.collection('beers').add(beerPayload)
      .then((beer) => {
        if (beer.id) {
          const beerAux = { title: beer.title, ibu: beer.ibu, alcool: beer.alcool, description: beer.description, stock: beer.stock, id: beer.id, recipe: {} }
          beerAux.recipe = { title: '', ingredient1: '', ingredient2: '', temperature: '', time: '', description: '' }
          console.log('BEER ID', beerAux.id)
          console.log('BEER ID', beerAux.recipe)
          // console.log('emptyRecip', this.$store.getter['recipe/get'])
          DBFS.collection('beers').doc(beerAux.id).collection('recipe').add(beerAux.recipe)
        }
      }).catch((Exception) => {
        console.log(Exception)
      })
  },
  async update ({ commit }, beerPayload) {
    const ref = this.$fireStore.collection('beers').doc(beerPayload.id)
    await ref.update(beerPayload)
      .then((beer) => {
        commit('beers/add', beer.data())
      })
  }
}
