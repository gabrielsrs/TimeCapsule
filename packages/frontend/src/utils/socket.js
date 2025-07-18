import { io } from 'socket.io-client';

const URL = 'http://localhost:5000';

export const socket = (supabaseToken) => {
    return io(URL, {
        auth: {
            token: supabaseToken,
        },
        withCredentials: true,
        autoConnect: false,
    })
}