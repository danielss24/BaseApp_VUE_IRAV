export default {
  async nuxtServerInit ({ dispatch }, ctx) {
    console.log('onAuthStateChangedjuan')
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user
      await dispatch('onAuthStateChanged', {
        authUser,
        claims
      })
    }
  },

  onAuthStateChanged ({ commit }, { authUser, claims }) {
    if (!authUser) {
      commit('RESET_STORE')
    }
    commit('SET_AUTH_USER', { authUser, claims })
  }
}
