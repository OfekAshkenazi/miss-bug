import { bugService } from "../services/bug.service.js"

const { useState, useEffect } = React

export function BugFilter({ onSetFilterBy }) {
    const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())

    useEffect(() => {
        onSetFilterBy(filterBy)
    }, [filterBy])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterBy((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function onSetPage(diff) {
        setFilterBy((prevFilter) => {
            return { ...prevFilter, pageIdx: prevFilter.pageIdx + diff }
        })
    }

    return <section className="bug-filter">
        <h2 style={{ textAlign: 'center' }}>Filter our bugs</h2>
        <button onClick={() => onSetPage(-1)}>previous</button>
        <button onClick={() => onSetPage(1)}>next</button>
        <div className="flex">

            <label>Title:
                <input type="text"
                    name="title"
                    id="title"
                    onChange={handleChange}
                    placeholder="Enter title..."
                />
            </label>
            <label>Severity:
                <input type="number"
                    name="severity"
                    id="severity"
                    onChange={handleChange}
                    placeholder="Enter severity..."
                />
            </label>
            <label> Description:
                <input type="text"
                    name="description"
                    id="description"
                    onChange={handleChange}
                    placeholder="Enter description..."
                />
            </label>
            <label>Created At:
                <input type="number"
                    name="createdAt"
                    id="createdAt"
                    onChange={handleChange}
                    placeholder="Enter TimeStamp..."
                />
            </label>
            <select name="label" id="label" onChange={handleChange}>
                <option value="">Filter By label</option>
                <option value="critical">critical</option>
                <option value="need-CR">need-CR</option>
                <option value="dev-branch">dev-branch</option>
            </select>
        </div>
    </section>
}
