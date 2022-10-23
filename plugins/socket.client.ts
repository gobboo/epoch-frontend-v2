import io from 'socket.io-client'
import Client from '~~/composables/socket.client'

export default defineNuxtPlugin(() => {
    const socket: Client = new Client('http://localhost:3000');

    return {
        provide: {
            socket: socket
        }
    }
})