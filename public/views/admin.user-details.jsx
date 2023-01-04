import { userService } from "../services/user.service.js"

const { useState, useEffect } = React
const { Link, useParams, useNavigate } = ReactRouterDOM

export function AdminUserDetails() {
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        userService.get(userId)
            .then(user => {
                setUser(user)
            })
            .catch((err) => {
                showErrorMsg('laaa')
            })
    }, [])

    function onGoBack() {
        navigate('/admin/page')
    }

    if (!user) return <h2>loading</h2>

    return <section>
        <h2>{user.fullname}</h2>
        <p>user name: {user.username}</p>
        <p>user password: {user.password}</p>
        <p>Have bugs: {user.havebug}</p>
        <button onClick={onGoBack}>Go back</button>
    </section>
}