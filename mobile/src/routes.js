import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login'
import Main from './pages/Main'
import Preload from './pages/Preload'

export default createAppContainer(
    createSwitchNavigator({
        Preload,
        Login,
        Main,
    })
); 