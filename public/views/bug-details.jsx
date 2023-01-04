const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

import { bugService } from '../services/bug.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'
let arrayOfBugs = ['🐛', '🦟', '🪰', '🪱', '🦗', '🐜', '🪳', '🐝', '🦠', '🐞', '🪲']

export function BugDetails() {

    const [bug, setBug] = useState(null)
    const { bugId } = useParams()

    useEffect(() => {
        bugService.getById(bugId)
            .then(bug => {
                setBug(bug)
            })
            .catch((err) => {
                showErrorMsg('laaa')
            })
    }, [])

    if (bug === null || !bug) return <h1>pls wait 15 sec</h1>
    return bug && <div>
        <h3>Bug Details {arrayOfBugs[utilService.getRandomIntInclusive(0, 10)]}</h3>
        <h4>{bug.title}</h4>
        <p>Severity: <span>{bug.severity}</span></p>
        <p>desc: {bug.description}</p>
        <Link to="/bug">Back to List</Link>
    </div>

}

