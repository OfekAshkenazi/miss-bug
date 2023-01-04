const { Link, useNavigate } = ReactRouterDOM
const { useState } = React

import { LoginSignup } from "./Login-signup.jsx"
import { userService } from "../services/user.service.js"

export function UserSign() {
    const [user, setUser] = useState(userService.getLoggedinUser())
    const navigate = useNavigate()
    function onChangeLoginStatus(user) {
        setUser(user)
    }
    function onLogout() {
        userService.logout()
            .then(() => {
                setUser(null)
            })
    }

    function onGoToAdminPage() {
        navigate('/admin/page')
    }

    return <section className="user-sign-area">
        {user ? (
            < section className="user-header flex">
                <h2>Hello {user.fullname}</h2>
                <button onClick={onLogout}>Logout</button>
                {user.isAdmin && <section>
                    <button onClick={onGoToAdminPage}>To Work</button>
                </section>}
            </ section >



        ) : (
            <section className="login-form">
                <LoginSignup onChangeLoginStatus={onChangeLoginStatus} />
            </section>
        )}
    </section>
}