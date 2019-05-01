/*
** Firebaseオブジェクト初期化処理
*/
import Vue from 'vue'
import firebase from 'firebase'

firebase.initializeApp({
  apiKey: process.env.firebaseApiKey || 'AIzaSyBmQDrA-OZtpbf-SItU9KvToOpBXOUgYng',
  authDomain: process.env.firebaseAuthDomain || 'teru2blog-staging.firebaseapp.com',
  databaseURL: process.env.firebaseDatabaseURL || 'https://teru2blog-staging.firebaseio.com',
  projectId: process.env.firebaseProjectId || 'teru2blog-staging',
  storageBucket: process.env.firebaseStorageBucket || 'teru2blog-staging.appspot.com',
  messagingSenderId: process.env.firebaseMessagingSenderId || '634375775324'
})

// 初期化後のFirebaseオブジェクトを、全てのVueコンポーネントから利用できるようにする
Vue.prototype.$firebase = firebase

// Vuexストアからも利用できるようexport
export default firebase
