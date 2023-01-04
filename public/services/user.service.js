const BASE_URL = '/api/auth/'

export const userService = {
    get,
    signup,
    login,
    logout,
    getEmptyCredentials,
    getLoggedinUser,
    query,
    remove
}


function remove(userId) {
    return axios.delete(BASE_URL + userId).then(res => res.data)
}

function query(filterBy) {
    return axios.get(BASE_URL).then(res => res.data)
}
function get(userId) {
    return axios.get(BASE_URL + userId).then(res => res.data)
}

function signup(credentials) {
    return axios.post(BASE_URL + 'signup', credentials)
        .then(res => res.data)
        .then((user) => {
            _saveLoggedinUser(user)
            return user
        })
}

function login(credentials) {
    return axios.post(BASE_URL + 'login', credentials)
        .then(res => res.data)
        .then((user) => {
            _saveLoggedinUser(user)
            return user
        })
}

function getEmptyCredentials(fullname = '', username = '', password = '') {
    return { fullname, username, password }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || null)
}

function logout() {
    return axios.post(BASE_URL + 'logout')
        .then(() => {
            sessionStorage.removeItem('loggedinUser')
        })
}

function _saveLoggedinUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
}