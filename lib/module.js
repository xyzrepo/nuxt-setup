const { resolve } = require('path')
module.exports = function (moduleOptions) {
  const options = {
    ...this.options.xyz,
    ...moduleOptions
  }
  // @xyz/persist
  this.addModule(
    [
      '@xyz/persist',
      {
        key: options.key || 'storage',
        ...this.options.persist
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
      ...this.options.buefy
    }
  ])

  // @nuxtjs/fontawesome
  this.addModule(
    [
      '@nuxtjs/fontawesome',
      {
        icons: {
          solid: true,
          regular: true,
          brands: true
        },
        ...this.options.fontawesome
      }
    ],
    true
  )
  // https://strapi.nuxtjs.org
  this.addModule(['@nuxtjs/strapi', {
    ...this.options.strapi
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
        ...this.options.pwa
      }
    ])
  })

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'nuxt-setup.js',
    options
  })

  this.options.router.linkExactActiveClass = 'is-active'
  this.options.router.linkActiveClass = 'is-active'
}

module.exports.meta = require('../package.json')
