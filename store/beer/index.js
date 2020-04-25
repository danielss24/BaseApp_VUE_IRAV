export const state = () => ({
  recipe: {
    title: '',
    ibu: '',
    alcool: '',
    description: '',
    stock: ''
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
    await this.$fireStore.collection('beers').add(recipePayload)
      .then((recipe) => {
        if (recipe.exists) {
          commit('beers/add', recipe.data())
        }
      })
  },
  async update ({ commit }, recipePayload) {
    const ref = this.$fireStore.collection('beers').doc(recipePayload.id)
    await ref.update(recipePayload)
      .then((recipe) => {
        commit('beers/add', recipe.data())
      })
  }
}
