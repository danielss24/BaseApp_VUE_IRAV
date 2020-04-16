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
    console.log(recipe)
    state.recipe = recipe
  }
}
export const getters = {
  get: (state) => {
    return state.recipe
  }
}
export const actions = {
  post ({ state, commit, dispatch }, payload) {
    console.log('post', payload)
  }
}
