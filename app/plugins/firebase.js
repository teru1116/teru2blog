/*
** Firebaseセットアップ処理群
*/
import Vue from 'vue'
import firebase from 'firebase'

export default context => {
  firebase.initializeApp({
    apiKey: process.env.firebaseApiKey,
    authDomain: process.env.firebaseAuthDomain,
    databaseURL: process.env.firebaseDatabaseURL,
    projectId: process.env.firebaseProjectId,
    storageBucket: process.env.firebaseStorageBucket,
    messagingSenderId: process.env.firebaseMessagingSenderId
  })

  // 初期化後のFirebaseオブジェクトを、アプリケーション全体で利用できるようにする
  Vue.prototype.$firebase = firebase

  // 認証完了時の処理を登録
  firebase.auth().onAuthStateChanged(user => {
    // UserオブジェクトをVuexストアにセット
    context.store.dispatch('user/updateUser', user)
  })
}
