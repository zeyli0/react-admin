
import { useRoutes } from 'react-router-dom';

import menus from './menus';

const RouterIndex = () => {
    return useRoutes(menus);
};

export default RouterIndex;