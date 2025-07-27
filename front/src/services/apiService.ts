import ky from 'ky'

const api = ky.create({
    prefixUrl: import.meta.env.VITE_API_URL,
    // headers: {
    //     'X-API-Key': import.meta.env.VITE_API_KEY
    // },
    hooks: {
        beforeRequest: [
            (request) => {
                const token = localStorage.getItem('access_token')
                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`)
                }
            }
        ],
        afterResponse: [
            async (request, options, response) => {
                if (!response.ok) {
                    const errorBody = (await response.json()) as { message?: string }
                    throw new Error(errorBody.message || 'Unknown error')
                }
                return response
            }
        ]
    }
})

export default api
