import { utilService } from "../services/util.service.js"

let arrayOfBugs = ['🐛', '🦟', '🪰', '🪱', '🦗', '🐜', '🪳', '🐝', '🦠', '🐞', '🪲']

export function BugPreview({ bug }) {

    return <article>
        <h4>{bug.title}</h4>
        <h1>{arrayOfBugs[utilService.getRandomIntInclusive(0, 10)]}</h1>
        <p>Severity: <span>{bug.severity}</span></p>
        <p>Owner: {bug.owner.fullname}</p>
    </article>
}