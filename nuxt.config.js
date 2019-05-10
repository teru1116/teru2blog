import pkg from './package'

export default {
  mode: 'spa',
  srcDir: 'app',
  env: {
    firebaseApiKey: process.env.FIREBASE_API_KEY || 'AIzaSyBmQDrA-OZtpbf-SItU9KvToOpBXOUgYng',
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN || 'teru2blog-staging.firebaseapp.com',
    firebaseDatabaseURL: process.env.FIREBASE_DATABASE_URL || 'https://teru2blog-staging.firebaseio.com',
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID || 'teru2blog-staging',
    firebaseStorageBucket: process.env.STORAGE_BUCKET || 'teru2blog-staging.appspot.com',
    firebaseMessagingSenderId: process.env.MESSAGING_SENDER_ID || '634375775324'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: 'https://fonts.googleapis.com/icon?family=Material+Icons', rel: 'stylesheet' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'reset-css',
    '@/assets/sass/common.scss',
    '@/assets/sass/wysiwyg.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/firebase.js', ssr: false },
    { src: '~/plugins/isMobile.js', ssr: false }
  ],

  router: {
    middleware: [
      'authAdmin'
    ]
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
