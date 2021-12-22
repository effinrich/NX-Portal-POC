import loadable from '@loadable/component'

const Dashboard = loadable(() => import('./Dashboard'))
const Home = loadable(() => import('./Home'))
const Login = loadable(() => import('./Login'))
const Profile = loadable(() => import('./Profile'))
const Users = loadable(() => import('./Users'))
// import Dashboard from './Dashboard'
// import Home from './Home'
// import Login from './Login'
// import Profile from './Profile'
// import Users from './Users'

const Routes = [Home, Dashboard, Login, Users, Profile]

export default Routes
