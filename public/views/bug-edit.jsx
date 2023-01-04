const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

import { bugService } from "../services/bug.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


export function BugEdit() {
    const [bugToEdit, setBugToEdit] = useState(bugService.getEmptyBug())
    const navigate = useNavigate()
    const { bugId } = useParams()

    useEffect(() => {
        if (!bugId) return
        loadBug()
    }, [])

    function loadBug() {
        bugService.getById(bugId)
            .then((bug) => {
                setBugToEdit(bug)
            })
            .catch((err) => { console.log(err), navigate('/bug') })
    }

    function onSaveBug(ev) {
        ev.preventDefault()
        bugService.save(bugToEdit)
            .then(savedBug => {
                navigate('/bug')
                showSuccessMsg('Bug added')
            })
            .catch(err => {
                console.log('Error from onAddBug ->', err)
                showErrorMsg('Cannot add bug')
                navigate('/bug')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setBugToEdit((prevBug) => ({ ...prevBug, [field]: value }))
    }

    if (!bugToEdit) return <h2>loading...</h2>

    return <section>
        <form onSubmit={(ev) => onSaveBug(ev)} className="edit-form">
            <label>Title:
                <input type="text"
                    name="title"
                    id="title"
                    onChange={handleChange}
                    placeholder="Enter title..."
                    value={bugToEdit.title}
                />
            </label>
            <label>Severity:
                <input type="number"
                    name="severity"
                    id="severity"
                    onChange={handleChange}
                    placeholder="Enter severity..."
                    value={bugToEdit.severity}
                />
            </label>
            <label>Description:
                <textarea
                    name="description"
                    id="description"
                    onChange={handleChange}
                    placeholder="Enter description..."
                    cols="30"
                    rows="15"
                    value={bugToEdit.description}
                ></textarea>
            </label>
            <label>CreatedAt:
                <input type="datetime-local"
                    name="createdAt"
                    id="createdAt"
                    onChange={handleChange}
                    placeholder="Enter createdAt..."
                />
            </label>
            <select name="label" id="label" onChange={handleChange}>
                <option value="critical">critical</option>
                <option value="need-CR">need-CR</option>
                <option value="dev-branch">dev-branch</option>
            </select>
            <button>save</button>
        </form>
    </section>

}