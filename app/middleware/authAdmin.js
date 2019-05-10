import firebase from './../plugins/firebase'

export default (({ route, redirect }) => {
  if (route.name === 'admin-auth') return
  if (route.name.indexOf('admin') !== -1) {
    firebase.auth().onAuthStateChanged(user => {
      if (!user || !user.email) {
        redirect('/admin/auth')
      }
    })
  }
})