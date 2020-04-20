export const state = () => ({
  recipe: {
    title: '',
    ibu: '',
    alcool: '',
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
    const ref = this.$fireStore.collection('recipes').doc(recipePayload.id)
    await ref.update(recipePayload)
      .then((recipe) => {
        commit('recipes/add', recipe.data())
      })
  }
}
