const express = require('express')
const cookieParser = require('cookie-parser')

const bugService = require('./services/bug.services.js')
const userService = require('./services/user.service.js')

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
            console.log('eror get bugs', err)
            res.status(400).send('cannot get bugs')
        })
})

/// UPDATE VI
app.put('/api/bug/:bugId', (req, res) => {
    const loggedinUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Cannot update bug')
    const bug = req.body
    bugService.save(bug, loggedinUser)
        .then((savedBug) => { res.send(savedBug) })
        .catch(err => {
            console.log('eror for update', err)
            res.status(400).send('cannot update bug')
        })
})

/// Create VI
app.post('/api/bug', (req, res) => {
    const loggedinUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Cannot add bug')
    const bug = req.body
    bugService.save(bug, loggedinUser)
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
    const loggedinUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Cannot remove bug')
    const { bugId } = req.params
    bugService.remove(bugId, loggedinUser)
        .then(() => {
            res.send({ msg: 'bug removed successfully', bugId })
        })
        .catch(err => {
            console.log('eror for remove', err)
            res.status(400).send('cannot delete bug')
        })
})

///// USER API:
// LIST
app.get('/api/auth', (req, res) => {
    const filterBy = req.body
    userService.query(filterBy)
        .then((users) => {
            res.send(users)
        })
        .catch(err => {
            console.log('Error from get user', err)
            res.status(400).send('cannot get users')
        })
})
/// GET USER
app.get('/api/auth/:userId', (req, res) => {
    const { userId } = req.params
    userService.get(userId)
        .then((user) => {
            res.send(user)
        })
        .catch(err => {
            console.log('Error from get single user', err)
            res.status(400).send('cannot get user')
        })
})
/// LOGIN
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body
    userService.login({ username, password })
        .then((user) => {
            const loginToken = userService.getLoginToken(user)
            res.cookie('loginToken', loginToken)
            res.send(user)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot login')
        })
})
/// SIGNUP
app.post('/api/auth/signup', (req, res) => {
    const { fullname, username, password } = req.body
    userService.signUp({ fullname, username, password })
        .then((user) => {
            const loginToken = userService.getLoginToken(user)
            res.cookie('loginToken', loginToken)
            res.send(user)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot signup')
        })
})
//// LOGOUT
app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('loginToken')
    res.send('Logged out')
})

app.delete('/api/auth/:userId', (req, res) => {
    const { userId } = req.params
    userService.remove(userId)
        .then(() => {
            res.send({ msg: 'user removed successfully', userId })
        })
        .catch(err => console.log(err))
})


app.listen(3030, () => console.log('Server listening on port 3030!', 'http://127.0.0.1:3030/'))
