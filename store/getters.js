export default {
  isLoggedIn: (state) => {
    try {
      return state.user.email != null
    } catch {
      return false
    }
  },
  email: (state) => {
    return state.user.email
  }
}
