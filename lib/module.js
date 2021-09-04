const { resolve } = require('path')
module.exports = function (moduleOptions) {
  const options = {
    ...this.options,
    ...moduleOptions
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'nuxt-setup.js',
    options
  })

  // @nuxtjs/fontawesome
  this.addModule([
    '@nuxtjs/fontawesome',
    {
      icons: {
        solid: true,
        regular: true,
        brands: true
      },
      ...options.fontawesome
    }
  ],
  true
  )

  // @xyz/persist
  this.addModule([
    '@xyz/persist',
    {
      key: options.key || 'storage',
      ...options.persist
    }
  ],
  true
  )

  // https://go.nuxtjs.dev/buefy
  this.addModule([
    'nuxt-buefy',
    {
      css: true,
      // component: 'fas',
      defaultIconComponent: 'font-awesome-icon',
      // defaultIconComponent: 'font-awesome-icon',
      materialDesignIcons: false,
      defaultIconPack: 'fas',
      ...options.buefy
    }
  ])

  // https://strapi.nuxtjs.org
  this.addModule(['@nuxtjs/strapi', {
    ...options.strapi
  }])

  this.nuxt.hook('build:before', (builder) => {
    this.options.build.babel = {
      presets ({ isServer }, [preset, options]) {
        options.loose = true
        return [[preset, { ...options }]]
      }
    }
  })

  this.nuxt.hook('module:before', (builder) => {
    this.addModule([
      // https://go.nuxtjs.dev/pwa
      '@nuxtjs/pwa',
      {
        manifest: {
          lang: 'en'
        },
        ...options.pwa
      }
    ])
  })

  // this.addPlugin({
  //   src: resolve(__dirname, 'plugin.js'),
  //   fileName: 'nuxt-setup.js',
  //   options
  // })

  this.options.router.linkExactActiveClass = 'is-active'
  this.options.router.linkActiveClass = 'is-active'
}

module.exports.meta = require('../package.json')
