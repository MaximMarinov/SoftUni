import { getUserData, setUserData, clearUserData } from '../util.js';

const hostName = 'http://localhost:3030';

async function request(url, options) {
    try {
        const response = await fetch(hostName + url, options);

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }   

        // if (response.status == 204) {
        //     return response;
        // } else {
        //     return response.json();
        // }

        try {
            return await response.json();
        } catch (error) {
            return response;
        }

    } catch (error) {
        // alert(error.message);
        alert(error.message);
        throw error;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    if (userData) {
        options.headers['X-Authorization'] = userData.token;
    }

    return options; 
}

export async function get(url) {
    return request(url, createOptions());
}   

export async function post(url, data) {
    return request(url, createOptions('post', data));
}   

export async function put(url, data) {
    return request(url, createOptions('put', data));
}    

export async function del(url) {
    return request(url, createOptions('delete'));
}

export async function login(email, password) {
    const result = await post('/users/login', {email, password});
    
    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    };
    setUserData(userData);

    return result;
}

export async function register(email, password) {
    const result = await post('/users/register', {email, password});

    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    };
    setUserData(userData);

    return result;
}

export async function logout() {
    get('/users/logout');
    clearUserData();
}