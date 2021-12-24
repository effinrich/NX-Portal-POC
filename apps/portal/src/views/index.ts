import loadable from '@loadable/component'

const Dashboard = loadable(() => import('./Dashboard'))
const Home = loadable(() => import('./Home'))
const Login = loadable(() => import('./Login'))
const Profile = loadable(() => import('./Profile'))
const Users = loadable(() => import('./Users'))
const Location = loadable(() => import('./Location'))

const Routes = [Home, Dashboard, Login, Users, Profile, Location]

export default Routes
