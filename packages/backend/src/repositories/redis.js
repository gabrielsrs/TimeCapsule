const { client } = require("./redisClient")

module.exports = {
    async getAllDataRepository({ key }){
        const data = await client.hGetAll(key)

        return data
    },
    async getDataRepository({ key, value }){
        const data = await client.hGet(key, value)

        return data
    },
    async hSetDataRepository({ key, value }){
        const data = await client.hSet(key, value)

        return data
    },
    async expireDataRepository({ key, expire }) {
        const data = await client.expire(key, expire)

        return data
    },
    async ttlDataRepository({ key }) {
        const data = await client.ttl(key)

        return data
    },
    async hDelDataRepository({ key, value }){
        const data = await client.hDel(key, value)

        return data
    }
}
