// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', 'nuxt-icon'],
	server: {
		port: 3001, // default: 3000
	},

	runtimeConfig: {
		public: {
			BASE_URL: ''
		}
	},
	css: ['vue-toastification/dist/index.css'],
	build: {
		transpile: [
			'vue-toastification'
		]
	}
})
