const { NavLink } = ReactRouterDOM

import { UserMsg } from './user-msg.jsx'

export function AppHeader() {

    return (
        <header>
            <UserMsg />
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/bug">Bugs</NavLink> |
                <NavLink to="/about">About</NavLink> |
                <NavLink to="/profile">Profile</NavLink> 
            </nav>
            <h1>Bugs are Forever</h1>
        </header>
    )
}
