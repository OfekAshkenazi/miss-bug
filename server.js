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
    bugService.query(queryParams).then((bugs) => {
        res.send(bugs)
    })
})

/// UPDATE VI
app.put('/api/bug/:bugId', (req, res) => {
    const bug = req.body
    bugService.save(bug).then((savedBug) => {res.send(savedBug)})
})

/// Create VI
app.post('/api/bug', (req, res) => {
    const bug = req.body
    bugService.save(bug).then((savedBug) => {res.send(savedBug)})
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
            res.status(418).send(err.message)
        })
})

///REMOVE VI
app.delete('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    bugService.remove(bugId).then(() => {
        res.send({ msg: 'bug removed successfully', bugId })
    })
})

app.listen(3030, () => console.log('Server listening on port 3030!', 'http://127.0.0.1:3030/'))
