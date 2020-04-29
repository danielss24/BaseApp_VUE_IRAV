export const state = () => ({
  beers: []
})
export const mutations = {
  add (state, beer) {
    state.beers.push(beer)
  },
  reset (state) {
    state.beers = []
  }
}
export const getters = {
  get: (state) => {
    return state.beers
  }
}
export const actions = {
  async getBeersFromServer ({ commit }) {
    const BDFB = this.$fireStore
    await this.$fireStore.collection('beers').get().then(
      (beers) => {
        commit('reset')
        beers.forEach((beer) => {
          if (beer.exists) {
            const beerPayload = beer.data()
            beerPayload.id = beer.id
            BDFB.collection('beers').doc(beer.id).collection('recipe').get().then(
              (recipe) => {
                recipe.forEach((aux) => {
                  if (aux.exists) {
                    beerPayload.recipe = aux.data()
                    commit('add', beerPayload)
                  }
                })
              }
            ).catch((Exception) => {
              beerPayload.recipe = { title: '', ingredient1: '', ingredient2: '', temperature: '', time: '', description: '' }
            })
            // console.log('beerPayload', beerPayload)
          }
        })
      })
  }
}
