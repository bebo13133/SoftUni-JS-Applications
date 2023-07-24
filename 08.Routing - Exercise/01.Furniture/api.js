
const host = `http://localhost:3030`

async function callFetch(method,url,data) {
    const options = {
        method,
        headers : {}
    }
    if(data){
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data)
    }
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    if(userData){
        options.headers['X-Authorization'] = userData.accessToken
    }

    try {
        const response = await fetch(`${host}${url}`,options)
        if(!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }
        if(response.status === 204 || response.status === 409){
            return response
        }else{
            return response.json()
        }
    }catch(err){
        alert(err.message)
        throw err
    }



}
const methodsCall = {
    'GET' : 'GET',
    'POST' : 'POST',
    'PUT' : 'PUT',
    'DELETE' : 'DELETE'
}

export function get(url){
    return callFetch(methodsCall.GET,url)
}

export function post(url,data){
    return callFetch(methodsCall.POST,url,data)
}

export function put(url,data){
    return callFetch(methodsCall.PUT,url,data)
}

export function del(url){
    return callFetch(methodsCall.DELETE,url)
}