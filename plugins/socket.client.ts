import io from 'socket.io-client'
import Client from '~~/composables/socket.client'

export default defineNuxtPlugin(() => {
    const socket: Client = new Client(useRuntimeConfig().public.BASE_URL);

    return {
        provide: {
            socket: socket
        }
    }
})