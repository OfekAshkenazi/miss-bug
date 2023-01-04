const express = require('express')
const cookieParser = require('cookie-parser')
const bugService = require('./services/bug.services.js')

const app = express()

app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

// list
app.get('/api/bug', (req, res) => {
    const queryParams = req.query
    bugService.query(queryParams)
    .then((bugs) => {
        res.send(bugs)
    })
    .catch(err => {
        console.log('eror get bugs',err)
        res.status(400).send('cannot get bugs')
    })
})

/// UPDATE VI
app.put('/api/bug/:bugId', (req, res) => {
    const bug = req.body
    bugService.save(bug)
    .then((savedBug) => { res.send(savedBug) })
    .catch(err => {
        console.log('eror for update',err)
        res.status(400).send('cannot update bug')
    })
})

/// Create VI
app.post('/api/bug', (req, res) => {
    const bug = req.body
    bugService.save(bug)
        .then((savedBug) => { res.send(savedBug) })
        .catch(err => {
            console.log('eror for create', err)
            res.status(400).send('cannot create bug')
        })
})

///READ-GET VI
app.get('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    // console.log('req.cookies', req.cookies)
    bugService.get(bugId)
        .then((bug) => {
            // var visitBugs = req.cookies.visitBugs || []
            // visitBugs.push(bug._id)
            // console.log('userr visited at the following bugs:', visitBugs)
            // if (visitBugs.length >= 4) {
            //     return res.status(401).send('wait for bit')
            // }
            // res.cookie('visitBugs', visitBugs, { maxAge: 1000 * 20 })
            res.send(bug)

        })
        .catch(err => {
            console.log('eror for single get', err)
            res.status(400).send('cannot find bug')
        })
})

///REMOVE VI
app.delete('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    bugService.remove(bugId)
    .then(() => {
        res.send({ msg: 'bug removed successfully', bugId })
    })
    .catch(err => {
        console.log('eror for remove',err)
        res.status(400).send('cannot delete bug')
    })
})

app.listen(3030, () => console.log('Server listening on port 3030!', 'http://127.0.0.1:3030/'))
