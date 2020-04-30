export default function ({ store, redirect, route }) {
  if (route.path === '/team' || route.path === '/create' || route.path === '/login' || route.path === '/') {
    // silence is golden
  } else if (store.$fireAuth.currentUser) {
    if (route.path === '/profile' || route.path === '/recipe' || route.path === '/beer') {
      // silence is golden
    } else {
      redirect('/login')
    }
  }
}
