/*
** 初期化後のFirebaseオブジェクトを、アプリケーション全体で利用できるようにする
*/
import Vue from 'vue'
import firebase from 'firebase'

firebase.initializeApp({
  apiKey: process.env.firebaseApiKey,
  authDomain: process.env.firebaseAuthDomain,
  databaseURL: process.env.firebaseDatabaseURL,
  projectId: process.env.firebaseProjectId,
  storageBucket: process.env.firebaseStorageBucket,
  messagingSenderId: process.env.firebaseMessagingSenderId
})

console.log(process.env.firebaseApiKey)

Vue.prototype.$firebase = firebase
