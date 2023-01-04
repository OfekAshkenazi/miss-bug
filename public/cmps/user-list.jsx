const { Link, useNavigate } = ReactRouterDOM

export function UserList({ users, onRemoveUser }) {

    return <ul className="users-list">
        {users.map(user =>
            <li className="user-preview flex align-itmes" key={user._id}>
                {/* <BugPreview bug={bug} /> */}
                <h4>{user.fullname}</h4>
                <button onClick={() => { onRemoveUser(user._id) }}>x</button>
                <button><Link to={`/user/${user._id}`}>Details</Link></button>
                {/* <button onClick={() => { onGoToAdd(bug._id) }}>Edit</button> */}
            </li>)}
    </ul>
}
