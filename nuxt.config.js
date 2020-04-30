require('dotenv').config()

export default {
  router: {
    middleware: 'auth'
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/vuetify',
    ['@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.API_KEY,
          authDomain: process.env.AUTH_DOMAIN,
          databaseURL: process.env.DB_URL,
          projectId: process.env.PROJECT_ID,
          storageBucket: process.env.STORAGE_BUCKET,
          messagingSenderId: process.env.MESSAGING_SENDER_ID,
          appId: process.env.APPID
        // measurementId: process.env.some'
        },
        onFirebaseHosting: false,
        services: {
          auth: {
            persistence: 'local',
            initialize: {
              onAuthStateChangedMutation: 'SET_AUTH_USER',
              onAuthStateChangedAction: 'onAuthStateChanged'
            },
            ssr: true
          },
          firestore: {
            enablePersistence: true
          },
          functions: {
            // emulatorPort: 12345
          },
          storage: true,
          realtimeDb: true,
          performance: true,
          analytics: false//,
          // remoteConfig: {
          //   settings: {
          //     fetchTimeoutMillis: 60000,
          //     minimumFetchIntervalMillis: 43200000
          //   },
          //   defaultConfig: {
          //     welcome_message: 'Welcome'
          //   }
          // },
          // messaging: {
          //   createServiceWorker: true
          // }
        }
      }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
