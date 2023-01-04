const { useState, useEffect } = React
const { Link, useNavigate } = ReactRouterDOM

import { UserList } from "../cmps/user-list.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { userService } from "../services/user.service.js"



export function AdminPage() {
    const [users, setUsers] = useState([])
    const [filterBy, setFilterBy] = useState(null)

    useEffect(() => {
        onLoadUsers()
    }, [filterBy])


    function onLoadUsers() {
        userService.query(filterBy)
            .then(setUsers)
            .catch(err => {
                console.log(err)
                showErrorMsg('not found users')
            })
    }

    function onRemoveUser(userId) {
        userService.remove(userId)
            .then(() => {
               const usersToUpdate = users.filter(user => user._id !== userId)
               setUsers(usersToUpdate)
               showSuccessMsg('user is delete')
            })
    }


    return <section>
        <h2>hello dear admin</h2>
        {/* <userFilter onSetFilterBy={onSetFilterBy}/> */}

        <section>
            <UserList users={users} onRemoveUser={onRemoveUser} />
        </section>

    </section>
}