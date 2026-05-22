import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  ssr: false,
  
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  runtimeConfig: {
    public: {
      api_url: process.env.NUXT_API_URL
    }
  },

  i18n: {
    lazy: true,
    langDir: './locales',
    defaultLocale: 'ru',
    locales: [
      {
        code: 'uz',
        file: 'uz.json',
      },
      {
        code: 'ru',
        file: 'ru.json',
      },
      {
        code: 'en',
        file: 'en.json',
      },
    ],
    detectBrowserLanguage: false,
    skipSettingLocaleOnNavigate: false,
  },

  routeRules: {
    '/**': {
      ssr: false
    },
    '/admin/**': {
      ssr: false,
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      title: 'Dental Implantology | Стоматология в Самарканде',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      meta: [ 
        { name:'title', content:'Стоматология Dental Implantology - Ваш путь к здоровой улыбке'},
        { name:'description', content:'Профессиональная стоматология в Самарканде. Специализируемся на имплантологии, предлагаем высококачественные услуги по установке зубных имплантов. Запишитесь на консультацию сегодня!' },
        { name:'keywords', content:'стоматология Самарканд, имплантология, зубные импланты, стоматологические услуги, зубной врач, здоровье зубов, Dental Implantology, dr Ikramov, стоматологи я,имплантация зубов,имплантация зубы,имплантация зуб,стоматита лечение,отбеливание зубов,стоматологическая инструменты,стоматология самарканд,стоматологическая клиника,стоматология это,полости рта,дентал сервіс,импланты зуб,нервы зубов,протезирование зуб,детская стомат,детс стоматология,детские стоматология,инструменты стоматологии,стомат детская,микропротезирование зуба,лечение зубов,стоматология зубов' },
        { name: "author", content: "Dental Implantology" },
        { name: 'og:title', content: "Стоматология в Самарканде - Dental Implantology" },
        { name: 'og:description', content: "Профессиональная стоматология в Самарканде. Специализируемся на имплантологии, предлагаем высококачественные услуги по установке зубных имплантов. Запишитесь на консультацию сегодня!" },
        { name: 'og:image', content: "https://dr-ikramov.uz/favicon.ico" },
        { name: 'og:url', content: "https://dr-ikramov.uz" },
        { name: 'og:type', content: "website" },
        { name: 'og:site_name', content: "Dental Implantology" },
        { name: "google-site-verification", content: "zxd2cPfL_5tXBkMn0XCPp0JMv5BLf3nINNqDijtPMNI" }
      ],
      link: [
        { rel: 'canonical', href: 'https://dr-ikramov.uz' },
        { rel: 'icon', type: 'image/x-icon', href: 'https://dr-ikramov.uz/favicon.ico' }
      ],
      script: [
        // { src: "https://cdn.jsdelivr.net/npm/eruda" },
        // { innerHTML: "eruda.init();" },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Dental Implantology",
            "url": "https://dr-ikramov.uz",
            "description": "Профессиональная стоматология в Самарканде. Специализируемся на имплантологии, предлагаем высококачественные услуги по установке зубных имплантов. Запишитесь на консультацию сегодня!",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Dahbed Street, 168А",
              "addressLocality": "Самарканд",
              "addressRegion": "Самарканд",
              "postalCode": "181307",
              "addressCountry": "Узбекистан"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+998915233344",
              "contactType": "customer service"
            }
          })
        }
      ],
    },
  },

  pwa: {
    registerWebManifestInRouteRules: true,
    // strategies: sw ? 'injectManifest' : 'generateSW',
    // srcDir: sw ? 'service-worker' : undefined,
    // filename: sw ? 'sw.ts' : undefined,
    registerType: "autoUpdate",
    devOptions: {
      enabled: false,
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}"],
      cleanupOutdatedCaches: true,
      navigateFallback: undefined,
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}'],
    },
    client: {
      installPrompt: true,
      // periodicSyncForUpdates: 20,
    },
    manifest: {
      name: "Dr Ikramov",
      short_name: "dr-ikramov",
      theme_color: "#fff",
      background_color: "#fff",
      display: "standalone",
      // orientation: "portrait",
      orientation: "any",
      scope: "/admin",
      start_url: "/admin",
      icons: [
        {
          "src": "images/icons/icon-32x32.png",
          "sizes": "32x32",
          "type": "image/png"
        },
        {
          "src": "images/icons/icon-72x72.png",
          "sizes": "72x72",
          "type": "image/png"
        },
        {
          "src": "images/icons/icon-96x96.png",
          "sizes": "96x96",
          "type": "image/png"
        },
        {
          "src": "images/icons/icon-128x128.png",
          "sizes": "128x128",
          "type": "image/png"
        },
        {
          "src": "images/icons/icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png"
        },
        {
          "src": "images/icons/icon-152x152.png",
          "sizes": "152x152",
          "type": "image/png"
        },
        {
          "src": "images/icons/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "images/icons/icon-384x384.png",
          "sizes": "384x384",
          "type": "image/png"
        },
        {
          "src": "images/icons/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ]
    }
  },

  openFetch: {
    disableNuxtPlugin: true,
    clients: {
      api: {
        baseURL: process.env.NUXT_API_URL
      }
    }
  },

  modules: [
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt',
    '@nuxt/image',
    'nuxt-open-fetch'
  ],
})