import { auth } from 'Components/Firebase';


const baseURL = process.env.NODE_ENV === 'production' ? 'https://mybackend.herokuapp.com/v1/customer' : 
                    process.env.NODE_ENV === 'staging' ? 'https://mybackend.herokuapp.com/v1/customer' :  
                        'http://localhost:8080/v1/customer';

const getIdToken = async () => {
    return await auth.currentUser?.getIdToken();
}

const openGetHelper = async (url) => {
    return fetch(url, 
        { 
            method: 'get',
            headers: {
                "Content-type": "application/json",
                Accept: "*/*",
                'Referrer-Policy': 'no-referrer'
            }
        })
        .then(async res => {
            if(!res.ok){
                import('@sentry/react').then(Sentry => {
                    Sentry.captureException("API Failure", JSON.stringify(res.url))
                })
                const text = await res.text();
                return text ? {'errorMsg': 'Something went wrong, please try again.'} : false;
            }
            const data = await res.json();
            return data
        })
}

const getHelper = async (url) => {
    return await getIdToken().then(async idToken =>  {
        if(!idToken){
            return false;
        }

        return fetch(url, 
        { 
            method: 'get',
            headers: {
                "Content-type": "application/json",
                Accept: "*/*",
                Authorization: "Bearer " + idToken,
            }
        })
        .then(async res => {
            const data = await res.json();
            if(!res.ok){
                import('@sentry/react').then(Sentry => {
                    Sentry.captureException("API Failure", JSON.stringify(data))
                })
                return false;
            }
            return data
        })
    })
}

const postHelper = async (url, body = {}) => {
    return await getIdToken().then(async idToken => fetch(url, 
        { 
            method: 'post',
            headers: {
                "Content-type": "application/json",
                Accept: "*/*",
                Authorization: "Bearer " + idToken,
            },
            body
        })
        .then(async res => {
            if(!res.ok){
                import('@sentry/react').then(Sentry => {
                    Sentry.captureException("API Failure", JSON.stringify(res.url))
                })
                const text = await res.text();
                return text ? {'errorMsg': 'Something went wrong, please try again.'} : false;
            }
            const data = await res.json();
            return data
        })
    )
}

const putHelper = async (url, body = '') => {
    return await getIdToken().then(async idToken => fetch(url, 
        { 
            method: 'put',
            headers: {
                "Content-type": "application/json",
                Accept: "*/*",
                Authorization: "Bearer " + idToken,
            },
            body
        })
        .then(async res => {
            const data = await res.json();
            if(!res.ok){
                import('@sentry/react').then(Sentry => {
                    Sentry.captureException("API Failure", JSON.stringify(data))
                })
                return false;
            }
            return data
        })
    )
}

const deleteHelper = async (url, body = {}) => {
    return await getIdToken().then(async idToken => fetch(url, 
        { 
            method: 'delete',
            headers: {
                "Content-type": "application/json",
                Accept: "*/*",
                Authorization: "Bearer " + idToken,
            },
            body
        })
        .then(async res => {
            const data = await res.json();
            if(!res.ok){
                import('@sentry/react').then(Sentry => {
                    Sentry.captureException("API Failure", JSON.stringify(data))
                })
                return false;
            }
            return data
        })
    )
}

const getWishTrendData = async () => {
    const getWishTrendUrl = `${baseURL}/wish-trend?page=${1}&pageSize=5`;
    return await openGetHelper(getWishTrendUrl).then(result => {
        if(result.errorMsg){
            return result;
        }
        if(result.successCode !== "SUCC200"){
            return []
        }
        return result.data.contents;
    })
}

const getBestRecommendation = async () => {
    const getWishTrendUrl = `${baseURL}/recommendation/best`;
    return await openGetHelper(getWishTrendUrl).then(result => {
        if(result.successCode !== "SUCC200"){
            return []
        }
        return result.data.contents;
    })
}

const getLatestRecommendation = async () => {
    const getWishTrendUrl = `${baseURL}/recommendation/latest`;
    return await openGetHelper(getWishTrendUrl).then(result => {
        if(result.successCode !== "SUCC200"){
            return []
        }
        return result.data.contents;
    })
}

const getProductList = async (product, page) => {
    const getProductistURL = `${baseURL}/result/product?product=${product}&page=${page}&pageSize=50`;
    return await openGetHelper(getProductistURL).then(result => {
        if(result.errorMsg){
            return result;
        }
        if(result.successCode !== "SUCC200"){
            return []
        }
        return result.data.contents;
    })
}

const getProductType = async () => {
    const getPTypeUrl = `${baseURL}/product-type`;
    return await openGetHelper(getPTypeUrl).then(result => {
        if(result.errorMsg){
            return result;
        }
        if(result.successCode !== "SUCC200"){
            return []
        }
        return result.data.contents;
    })
}

const getAllUserWish = async () => {
    const getWishUrl = `${baseURL}/wish?page=1&pageSize=10`;
    return await getHelper(getWishUrl).then(data => {
        return data;
    })
}

const getRecommendedResult = async ({title, max_budget, keywords, min_budget, brands_included}) => {
    const getUrl = `${baseURL}/result?title=${title}&max_budget=${max_budget}&min_budget=${min_budget}&keywords=${keywords}&brands_included=${brands_included}`;
    return await openGetHelper(getUrl).then(async result => {
        if(result.errorMsg){
            return result;
        }
        if(result.successCode === "SUCC200"){
            return [result.data.contents];
        }
        return []
    })
}


const postUserWish = async (reqObj) => {
    const postUrl = `${baseURL}/wish`;
    const body = JSON.stringify(reqObj);
    return await postHelper(postUrl, body).then(res => {
        return res;
    })
}


const RegisterNewUser = async (token, username) => {
    const registerUrl = `${baseURL}/user/register`;
    const body = JSON.stringify({ token, username });
    return await postHelper(registerUrl, body).then(data => {
        console.log('data')
    })
  }


const CloseUserWish = async (wishId) => {
    var updateStatusURL = `${baseURL}/wish/close?id=${wishId}`;
    return await putHelper(updateStatusURL).then(data => {
        return data;
    })
}


export { getWishTrendData, getAllUserWish, getProductType, postUserWish, RegisterNewUser, CloseUserWish, getRecommendedResult, getBestRecommendation, getLatestRecommendation, getProductList }