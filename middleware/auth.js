export default function ({ store, redirect, route }) {
  // console.log('User: ', store.$fireAuth.currentUser)
  if (route.path === '/team' || route.path === '/create' || route.path === '/login' || route.path === '/') {
    // do notthing
  } else if (!store.$fireAuth.currentUser) {
    if (route.path === 'profile') {
      // silence is golden
    } else {
      redirect('/login')
    }
  }
}
