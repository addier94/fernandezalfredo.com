module.exports = [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  {
    hid: 'description',
    name: 'description',
    content: process.env.APP_DESC,
  },
  {
    hid: 'author',
    author: 'Alfredo Fernandez',
  },
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: 'summary_large_image',
  },
  {
    hid: 'twitter:creator',
    name: 'twitter:creator',
    content: '@addier94',
  },
  {
    hid: 'twitter:domain',
    name: 'twitter:domain',
    content: 'fernandezalfredo.com',
  },
  {
    hid: 'twitter:site',
    name: 'twitter:site',
    content: '@addier94',
  },
  {
    hid: 'twitter:title',
    name: 'twitter:title',
    content: process.env.APP_TITLE,
  },
  {
    hid: 'twitter:description',
    name: 'twitter:description',
    content: process.env.APP_DESC,
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: 'https://fernandezalfredo.com',
  },
  {
    hid: 'og:type',
    property: 'og:type',
    content: 'website',
  },
  {
    hid: 'og:locale',
    property: 'og:locale',
    content: 'es_ES',
  },
  {
    hid: 'og:title',
    property: 'og:title',
    content: process.env.APP_TITLE,
  },
  {
    hid: 'og:description',
    property: 'og:description',
    content: process.env.APP_DESC,
  },
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content: 'fernandezalfredo.com',
  },
  {
    hid: 'og:image',
    property: 'og:image',
    content:
      'https://images.unsplash.com/photo-1618335829737-2228915674e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
  {
    hid: 'og:image:secure_url',
    property: 'og:image',
    content:
      'https://images.unsplash.com/photo-1618335829737-2228915674e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
  {
    hid: 'og:image:alt',
    property: 'og:image:alt',
    content: 'Alfredo Fernandez | Desarrollador de software',
  },
  {
    hid: 'og:image:type',
    property: 'og:image:type',
    content: 'image/jpeg',
  },
  // {
  //   hid: 'google-site-verification',
  //   name: 'google-site-verification',
  //   content: 'stbDTm71faQjfZWQC6edmlVgwdw7EpBB0jWRhYsdRB8',
  // },
]
