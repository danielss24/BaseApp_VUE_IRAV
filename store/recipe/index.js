export const state = () => ({
  recipe: {
    title: '',
    beer_id: '',
    ingredient1: '',
    ingredient2: '',
    temperature: '',
    time: '',
    description: ''
  }
})
export const mutations = {
  set (state, recipe) {
    state.recipe = recipe
  }
}
export const getters = {
  get: (state) => {
    return state.recipe
  }
}
export const actions = {
  async post ({ commit }, recipePayload) {
    await this.$fireStore.collection('recipes').add(recipePayload)
      .then((recipe) => {
        if (recipe.exists) {
          commit('recipes/add', recipe.data())
        }
      })
  },
  async update ({ commit }, recipePayload) {
    const ref = this.$fireStore.collection('recipes').document(recipePayload.id)
    await ref.update(recipePayload)
      .then((recipe) => {
        commit('recipes/add', recipe.data())
      })
  },
  async updateBeerRecipe ({ commit }, recipePayload) {
    const FBDB = this.$fireStore
    await this.$fireStore.collection('beers').doc(recipePayload.beerid).collection('recipe').get().then(
      (recipe) => {
        recipe.forEach((aux) => {
          if (aux.exists) {
            FBDB.collection('beers').doc(recipePayload.beerid).collection('recipe').doc(aux.id).update(recipePayload)
            commit('add', recipePayload)
          }
        })
      }
    )
  }
}
