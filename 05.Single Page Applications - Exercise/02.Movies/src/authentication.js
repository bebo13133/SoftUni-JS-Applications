
export function login(email,password) {
    const url = 'http://localhost:3030/users/login';

    const bodyData = {
        email: email,
        password: password
    }

    const options = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(bodyData)
    }

    fetch(url, options)
    .then(res=> {
        if(res.status != 200) {
            throw new Error('Incorect email or password'); 
        };
        return res.json()
    }).then(data => {
        const token = data.accessToken;
        sessionStorage.setItem('accessToken', token);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('id',data._id);
        window.location.href="./index.html";

        return data;
    }).catch(err => {
        alert(err);
    })
}


export function signUp(email,password) {
    const url = 'http://localhost:3030/users/register';
    
    const bodyData = {
        email: email,
        password: password
    }

    const options = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(bodyData)
    }

    fetch(url, options)
    .then(res=> {
        if(res.status == 409) {
            throw new Error('User with this email exists'); 
        };
        return res.json();
    }).then(data => {
        const token = data.accessToken;
        const email = data.email
        sessionStorage.setItem('accessToken', token);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('id',data._id);
        window.location.href="./index.html";

        return data;
    }).catch(err => {
        alert(err);
    })
}


export function logout(token) {
    const url = 'http://localhost:3030/users/logout';
    
    const options = {
        method: "GET",
        headers: {"X-Authorization": `${token}`}
    }

    fetch(url,options).then(response=> {
        if(response.status != 204) {
            throw new Error("Failed to logout");
        }
        sessionStorage.clear();
        window.location.href="./index.html";
    }).catch(err => {
        alert(err);
    })
}