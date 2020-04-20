export default function ({ store, redirect, route }) {
  console.log(route.path)
  const loginPage = '/login'
  if (!store.$fireAuth.currentUser) {
    store.commit('user/setAfterLogin')
    redirect(loginPage)
  }
}
