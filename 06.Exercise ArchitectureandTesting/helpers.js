const request = async (method, url, data) => {
    try {
        let token = getToken() // не е написана още 
        let options = {}
        if (method !== 'GET') {
            options = {
                method,
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            }
        } else if (method == 'DELETE') {
            const token = JSON.parse(localStorage('user'))
            options = {
                method,
                headers: {
                    'Content-type': 'application/json',
                }
            }
        }
        if (method != 'GET' && token) {
            options.headers['X-authorization'] = token
        }
        const res = await fetch(url, options)

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.status)
        }
        const data = await res.json()
        return data;
    } catch (err) {
        alert(arr.message)
    }
};
export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const del = request.bind(null, 'DELETE');