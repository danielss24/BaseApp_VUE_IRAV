export default function ({ store, redirect, route }) {
  // eslint-disable-next-line no-console
  console.log('AUTH: ', store.$fireAuth.currentUser)
  // eslint-disable-next-line dot-notation
  // const isLoggedIn = store.getters['isLoggedIn']
  if (route.path === '/team' || route.path === '/create' || route.path === '/login' || route.path === '/') {
    // do nothing
  } else if (store.$fireAuth.currentUser) {
    if (route.path === '/profile' || route.path === '/recipe') {
      // do nothing
    } else {
      redirect('/login')
    }
  }
}
