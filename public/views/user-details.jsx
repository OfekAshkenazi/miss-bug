const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

import { BugList } from "../cmps/bug-list.jsx"

import { bugService } from "../services/bug.service.js"
import { userService } from "../services/user.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function UserDetails() {
    const [user, setUser] = useState(userService.getLoggedinUser())
    const [bugs, setBugs] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        onLoadUserBugs()
    }, [])

    function onLoadUserBugs() {
        bugService.query()
            .then((bugs) => {
                let userBugs = bugs.filter(bug => bug.owner._id === user._id)
                setBugs(userBugs)
            })
            .catch(err => {
                console.log('error from remove in user section', err)
                showErrorMsg('cant load bugs pls sign in')
            })

    }

    function onRemoveBug(bugId) {
        bugService.remove(bugId)
            .then(() => {
                const bugsToUpdate = bugs.filter(bug => bug._id !== bugId)
                setBugs(bugsToUpdate)
                showSuccessMsg('Bug removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove bug')
            })
    }

    function onGoToBugIndex() {
        navigate('/bug')
    }
    
    if (user === null) return <section> <h2>if you have acc pls sign in at the bugs page or sign up <a onClick={onGoToBugIndex}>here</a></h2> </section>

    return <section>
        <h2>Hello dear: {user.fullname}</h2>
        <BugList bugs={bugs} onRemoveBug={onRemoveBug} />

    </section>
}