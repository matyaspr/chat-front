
const URL_BASE = process.env.REACT_APP_API_URL;

export const fetchWithoutToken = async (endpoint, data, method = 'GET') => {
    
    const URL_API = `${URL_BASE}${endpoint}`;

    

    const response = await fetch( URL_API, {
        method,
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return response.json();
}




export const fetchWithToken = async (endpoint, data, method = 'GET') => {
    
    const URL_API = `${URL_BASE}${endpoint}`;

    

    const response = await fetch( URL_API, {
        method,
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(data),
    });

    return response.json();
}