const fs = require('fs');
var bugs = require('../data/bug.json')
const PAGE_SIZE = 5

module.exports = {
    query,
    get,
    remove,
    save
}

function query(queryParams) {
    const { title, severity, description, createdAt, pageIdx, createdAT, Description, label } = queryParams
    let filteredBugs = bugs

    if (createdAT === 'true') {
        filteredBugs = filteredBugs.sort((b1,b2) => (b2.createdAt - b1.createdAt))
    }
    if (createdAT === 'false') {
        filteredBugs = filteredBugs.sort((b1,b2) => (b1.createdAt - b2.createdAt))
    }
    if (Description === 'true') {
        filteredBugs = filteredBugs.sort((b1,b2) => (b2.description.length - b1.description.length))
    }
    if (Description === 'false') {
        filteredBugs = filteredBugs.sort((b1,b2) => (b1.description.length - b2.description.length))
    }
    if (label) {
        filteredBugs = filteredBugs.filter(bug => bug.label === label)
    }
    if (title) {
        const regex = new RegExp(title, 'i')
        filteredBugs = filteredBugs.filter(bug => regex.test(bug.title))
    }
    if (severity) {
        filteredBugs = filteredBugs.filter(bug => bug.severity > severity)
    }
    if (description) {
        const regex = new RegExp(description, 'i')
        filteredBugs = filteredBugs.filter(bug => regex.test(bug.description))
    }
    if (createdAt) {
        filteredBugs = filteredBugs.filter(bug => bug.createdAt >= createdAt)
    }
    if (pageIdx !== undefined) {
        const startIdx = pageIdx > filteredBugs.length / 5 ? pageIdx = 0 : pageIdx * PAGE_SIZE
        filteredBugs = filteredBugs.slice(startIdx, PAGE_SIZE + startIdx)
    }
    return Promise.resolve(filteredBugs)
}

function get(bugId) {
    const bug = bugs.find(bug => bug._id === bugId)
    if (!bug) return Promise.reject('bug not found')
    return Promise.resolve(bug)
}

function remove(bugId) {
    bugs = bugs.filter(bug => bug._id !== bugId)
    return _writeCarsToFile()
}

function save(bug) {
    if (bug._id) {
        const bugToUpdate = bugs.find(currBug => currBug._id === bug._id)
        bugToUpdate.title = bug.title
        bugToUpdate.severity = bug.severity
        bugToUpdate.description = bug.description
        bugToUpdate.createdAt = bug.createdAt
        bugToUpdate.label = bug.label
    } else {
        bug._id = _makeId()
        bug.createdAt = Date.now()
        bugs.push(bug)
    }
    return _writeCarsToFile().then(() => bug)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _writeCarsToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(bugs, null, 2)
        fs.writeFile('data/bugs.json', data, (err) => {
            if (err) return rej(err)
            res()
        })
    })
}