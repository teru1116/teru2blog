/*
** Firebaseオブジェクト初期化処理
*/
import Vue from 'vue'
import firebase from 'firebase'

const isProduction = process.env.NUXT_ENV_DESTINATION === 'production'

firebase.initializeApp({
  apiKey: isProduction ? 'AIzaSyBvLnw6ASN5kgutxLJa0g2RaaJ8IL0k4As' : 'AIzaSyBmQDrA-OZtpbf-SItU9KvToOpBXOUgYng',
  authDomain: isProduction ? 'teru2blog.firebaseapp.com' :  'teru2blog-staging.firebaseapp.com',
  databaseURL: isProduction ? 'https://teru2blog.firebaseio.com' :  'https://teru2blog-staging.firebaseio.com',
  projectId: isProduction ? 'teru2blog' :  'teru2blog-staging',
  storageBucket: isProduction ? 'teru2blog.appspot.com' :  'teru2blog-staging.appspot.com',
  messagingSenderId: isProduction ? '257242725693' :  '634375775324',
  appId: isProduction ? '1:257242725693:web:cc119b0235bae7cc' : '1:634375775324:web:3137e95683e15f8b'
})

// 初期化後のFirebaseオブジェクトを、全てのVueコンポーネントから利用できるようにする
Vue.prototype.$firebase = firebase

// Vueコンポーネント以外（VuexストアなどのJavaScriptファイル）からも利用できるように、exportする
export default firebase
