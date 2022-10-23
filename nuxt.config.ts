// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', 'nuxt-icon'],
	server: {
		port: 3001, // default: 3000
	},

	publicRuntimeConfig: {
		baseUrl: process.env.BASE_URL || 'http://localhost:3000'
	},

	build: {
		transpile: [
			'@fortawesome/fontawesome-svg-core',
			'@fortawesome/pro-solid-svg-icons',
			'@fortawesome/pro-regular-svg-icons',
			'@fortawesome/free-brands-svg-icons'
		]
	}
})
