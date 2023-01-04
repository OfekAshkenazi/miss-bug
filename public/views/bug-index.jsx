const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

import { BugList } from '../cmps/bug-list.jsx'
import { BugFilter } from '../cmps/bug-filter.jsx'

import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugSort } from '../cmps/bug-sort.jsx'
import { UserSign } from '../cmps/user-sign.jsx'

export function BugIndex() {
    const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(bugService.getDefaultSort())
    const [bugs, setBugs] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fixFilterByPage()
        loadBugs()
    }, [sortBy, filterBy])

    function fixFilterByPage() {
        if (filterBy.pageIdx > bugs.length / 5) {
            filterBy.pageIdx = 0
        }
        if (filterBy.pageIdx <= 0) {
            filterBy.pageIdx = 0
        }
    }

    function onSetSortBy(sortBy) {
        setSortBy(sortBy)
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(filterBy)
    }

    function loadBugs() {
        bugService.query(filterBy, sortBy).then(setBugs)
    }

    function onRemoveBug(bugId) {
        bugService.remove(bugId)
            .then(() => {
                console.log('Deleted Succesfully!')
                const bugsToUpdate = bugs.filter(bug => bug._id !== bugId)
                setBugs(bugsToUpdate)
                showSuccessMsg('Bug removed')
            })
            .catch(err => {
                // console.log('Error from onRemoveBug ->', err)
                showErrorMsg('Cannot remove bug')
            })
    }

    function onGoToAdd() {
        navigate('/bug/edit')
    }

    return (
        <main className="bug-index">
            <UserSign />
            <BugFilter onSetFilterBy={onSetFilterBy} />
            <BugSort onSetSortBy={onSetSortBy} />
            <button onClick={onGoToAdd}>Add Bug ⛐</button>

            <section>
                <BugList bugs={bugs} onRemoveBug={onRemoveBug} />
            </section>
        </main>
    )


}
