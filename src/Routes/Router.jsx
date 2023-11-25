import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../pages/Home/Home';
import SignupForEmployee from '../pages/Signup/SignupForEmployee';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [{ path: '/', element: <Home /> }],
  },
  {
    path: 'signupAsEmployee',
    element: <SignupForEmployee />,
  },
]);

export default router;
