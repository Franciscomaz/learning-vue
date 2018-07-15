import Login from '../components/login/Login'
import Registration from '../components/login/Registration'
import Dashboard from '../components/dashboard/Dashboard'

export const routes = [
    {name: 'login', path: '/', component: Login},
    {path: '/register', component: Registration},
    {name: 'home', path: '/dashboard', component: Dashboard}
];
