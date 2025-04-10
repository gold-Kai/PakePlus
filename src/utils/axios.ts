import axios from 'axios'

const http = axios.create({
    baseURL: 'https://api.github.com',
    // file size limit
    timeout: 60 * 1000 * 10,
})

http.interceptors.request.use((config) => {
    if (!config.headers['Authorization'] && localStorage.getItem('token')) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem(
            'token'
        )}`
    }
    config.headers['Content-Length'] = undefined
    return config
})

http.interceptors.response.use(
    (res) => {
        return Promise.resolve(res)
    },
    (error) => {
        console.log('axios error:', error)
        if (200 <= error.status && error.status < 500) {
            return Promise.resolve({ status: error.status, data: error.data })
        }
        return Promise.reject(error)
    }
)

export default http
