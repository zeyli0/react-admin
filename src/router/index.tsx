
import { useRoutes } from 'react-router-dom';

import menus from './menus';

const Routes = () => {
    return useRoutes(menus);
};

export default Routes;