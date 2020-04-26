export const state = () => ({
  beer: {
    title: '',
    ibu: '',
    alcool: '',
    description: '',
    stock: ''
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
  async post ({ commit }, beerPayload) {
    await this.$fireStore.collection('beers').add(beerPayload)
      .then((beer) => {
        if (beer.exists) {
          commit('beers/add', beer.data())
        }
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
