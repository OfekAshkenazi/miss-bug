import { bugService } from "../services/bug.service.js"

const { useState, useEffect } = React


export function BugSort({ onSetSortBy }) {
    const [sortBy, setSortBy] = useState(bugService.getDefaultSort())

    useEffect(() => {
        onSetSortBy(sortBy)
    }, [sortBy])

    function onSetSort(field) {
        setSortBy((prevSort) => {
            return { ...prevSort, [field]: !prevSort[field] }
        })
    }

    return <div className="">
        <button onClick={() => onSetSort('createdAT')}>By TimeStamp</button>
        <button  onClick={() => onSetSort('Description')}>By Description length</button>
    </div>
}