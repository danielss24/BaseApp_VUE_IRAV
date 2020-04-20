export const state = () => ({
  recipes: []
})
export const mutations = {
  add (state, recipe) {
    state.recipes.push(recipe)
  },
  reset (state) {
    state.recipes = []
  }
}
export const getters = {
  get: (state) => {
    return state.recipes
  }
}
export const actions = {
  async getFromServer ({ commit }) {
    await this.$fireStore.collection('recipes').get()
      .then((recipes) => {
        commit('reset')
        recipes.forEach((recipe) => {
          if (recipe.exists) {
            const recipePayload = recipe.data()
            recipePayload.id = recipe.id
            commit('add', recipePayload)
          }
        })
      })
  }
}
