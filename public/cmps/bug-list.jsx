const { Link, useNavigate } = ReactRouterDOM

import { BugPreview } from "./bug-preview.jsx"

export function BugList({ bugs, onRemoveBug }) {
    const navigate = useNavigate()
    
    function onGoToAdd(id) {
        navigate(`/bug/edit/${id}`)
    }

    return <ul className="bug-list">
        {bugs.map(bug =>
            <li className="bug-preview" key={bug._id}>
                <BugPreview bug={bug} />
                <div className="btn-box-preview">
                    <button onClick={() => { onRemoveBug(bug._id) }}>x</button>
                    <button onClick={() => { onGoToAdd(bug._id) }}>Edit</button>
                    <button><Link to={`/bug/${bug._id}`}>Details</Link></button>
                </div>
            </li>)}
    </ul>
}