const BASE_URL = '/api/bug/'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    getEmptyBug,
    getDefaultSort,
}

function getDefaultFilter() {
    return { title: '', description: '', severity: '', createdAt: '', pageIdx: 0, label: '' }
}

function getDefaultSort() {
    return { createdAT: false, Description: false }
}

function getEmptyBug() {
    const bug = {
        title: '',
        severity: '',
        description: '',
        createdAt: Date.now(),
        label: ''
    }
    return bug
}

function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
    const queryParams = `?title=${filterBy.title}&severity=${filterBy.severity}&description=${filterBy.description}&createdAt=${filterBy.createdAt}&label=${filterBy.label}&pageIdx=${filterBy.pageIdx}&createdAT=${sortBy.createdAT}&Description=${sortBy.Description}`
    return axios.get(BASE_URL + queryParams).then(res => res.data)
}

function getById(bugId) {
    return axios.get(BASE_URL + bugId).then(res => res.data)
}

function remove(bugId) {
    return axios.delete(BASE_URL + bugId)
}

function save(bug) {
    const url = (bug._id) ? BASE_URL + `${bug._id}` : BASE_URL
    const method = (bug._id) ? 'put' : 'post'
    return axios[method](url, bug).then(res => res.data)
}