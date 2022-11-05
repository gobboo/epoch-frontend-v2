import io from 'socket.io-client'
import Client from '~~/composables/socket.client'

const socket: Client = new Client();

export default defineNuxtPlugin(() => {
    if (process.client && !socket.isConnected()) {
        socket.setUrl(useRuntimeConfig().public.BASE_URL);
        socket.connect();
    }

    return {
        provide: {
            socket: socket
        }
    }
})