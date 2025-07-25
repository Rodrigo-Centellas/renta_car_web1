import '../css/app.css'
import './bootstrap'

import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createApp, h } from 'vue'

// Ziggy (solo la función route y el objeto Ziggy)
import route, { Ziggy } from 'ziggy-js'

import '../css/utilidades.css'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.vue`,
      import.meta.glob('./Pages/**/*.vue')
    ),
  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) })
      .use(plugin)

    // Hacer route() accesible en todos los templates
    app.config.globalProperties.route = (...args) => route(...args, Ziggy)

    return app.mount(el)
  },
  progress: { color: '#4B5563' },
})
