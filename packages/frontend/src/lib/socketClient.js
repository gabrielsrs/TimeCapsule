import { socket } from "../utils/socket";

export class SocketClient {
    constructor(supabaseToken) {
        this.socket = socket(supabaseToken)
    }

    connect() {
        this.socket.connect()
    }

    disconnect() {
        this.socket.disconnect()
    }

    onStatus(status) {
        this.socket.on("status", status)
    }

    emitStatus() {
        this.socket.emit("status")
    }

    onMessage(callback) {
        this.socket.on("message", callback)
    }

    emitMessage(message) {
        this.socket.emit("message", message)
    }

    on(event, cb) {
        this.socket.on(event, cb)
    }

    emit(event, data) {
        this.socket.emit(event, data)
    }

    off(event, cb) {
        this.socket.off(event, cb)
    }

    isConnected() {
        return this.socket.connected
    }
}