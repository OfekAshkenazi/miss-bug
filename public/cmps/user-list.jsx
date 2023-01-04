const { Link, useNavigate } = ReactRouterDOM

export function UserList({ users, onRemoveUser }) {

    return <ul className="users-list">
        {users.map(user =>
            <li className="user-preview flex align-itmes" key={user._id}>
                <h4>{user.fullname}</h4>
                <button onClick={() => { onRemoveUser(user._id) }}>x</button>
                <button><Link to={`/user/${user._id}`}>Details</Link></button>
            </li>)}
    </ul>
}
