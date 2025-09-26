function _textMessage({ message }) {
    return message.length < 30? 30: message.length
}

module.exports = {
    messageTimeExpire({ messageType, message }) {
        switch (messageType) {
            case "text":
                return _textMessage({ message })
            default:
                return _textMessage({ message })
        }
    }
}