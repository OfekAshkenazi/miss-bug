import { HomePage } from './views/home-page.jsx'
import { AboutUs } from './views/about-us.jsx'
import { BugIndex } from './views/bug-index.jsx'
import { BugDetails } from './views/bug-details.jsx'
import { BugEdit } from './views/bug-edit.jsx'
import { UserDetails } from './views/user-details.jsx'
import { AdminPage } from './views/admin-page.jsx'
import { AdminUserDetails } from './views/admin.user-details.jsx'

export default [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/bug',
        component: BugIndex,
    },
    {
        path: '/bug/:bugId',
        component: BugDetails,
    },
    {
        path: '/about',
        component: AboutUs,
    },
    {
        path: '/bug/edit',
        component: BugEdit,
    },
    {
        path: '/bug/edit/:bugId',
        component: BugEdit,
    },
    {
        path: '/profile',
        component: UserDetails,
    },
    {
        path: '/admin/page',
        component: AdminPage,
    },
    {
        path: '/user/:userId',
        component: AdminUserDetails,
    },
]