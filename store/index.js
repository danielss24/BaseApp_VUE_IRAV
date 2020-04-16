export const state = () => ({
  authUser: null
})

export const mutations = {
  RESET_STORE: (state) => {
    state.authUser = null
  },

  SET_AUTH_USER: (state, authUser) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email
    }
  }
}
