export const state = () => ({
  user: null,
  claims: null
})

export const mutations = {
  RESET_STORE: (state) => {
    state.user = null
    state.claims = null
  },

  SET_AUTH_USER: (state, data) => {
    // console.log(data.claims)
    if (data.authUser) {
      const { uid, email, emailVerified } = data.authUser
      state.user = { uid, email, emailVerified }
    }
  }
}
