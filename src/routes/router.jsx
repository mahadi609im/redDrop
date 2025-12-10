import { createBrowserRouter } from 'react-router';

// Home Layout & public routes
import HomeLayout from '../Layouts/HomeLayout/HomeLayout';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import SearchPage from '../pages/SearchPage/SearchPage';
import BloodRequests from '../pages/BloodRequests/BloodRequests';

// Dashboard layouts
import DashBoardLayout from '../Layouts/DashboardLayout/DashboardLayout';
import Profile from '../pages/Dashboard/Common/Profile/Profile';
import RoleBasedDashboard from '../pages/Dashboard/RoleBasedDashboard/RoleBasedDashboard';
import MyDonationRequests from '../pages/Dashboard/Donor/MyDonationRequests/MyDonationRequests';
import CreateDonationRequest from '../pages/Dashboard/Donor/CreateDonationRequest/CreateDonationRequest';
import AllUsers from '../pages/Dashboard/Admin/AllUsers/AllUsers';
import AllBloodRequests from '../pages/Dashboard/Shared/AllBloodRequests/AllBloodRequests';

// Private route HOC // 404
import NotFound from '../pages/NotFound/NotFound';
import DonationRequestDetails from '../pages/DonationRequestDetails/DonationRequestDetails';
import MyDonationRequestDetails from '../pages/DonationRequestDetails/DonationRequestDetails';
import MyDonationDetails from '../pages/Dashboard/Donor/MyDonationDetails/MyDonationDetails';
import MyDonationEdit from '../pages/Dashboard/Donor/MyDonationEdit/MyDonationEdit';
import PrivateRoute from '../Components/PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
        loader: () => fetch('/district.json').then(res => res.json()),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/blood-requests',
        element: <BloodRequests />,
      },
      {
        path: '/blood-details/:id',
        element: (
          <PrivateRoute>
            <DonationRequestDetails></DonationRequestDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/donationRequests/${params.id}`),
      },
    ],
  },

  // Dashboard Routes (Private)
  {
    path: '/dashboard',
    element: <DashBoardLayout />,
    children: [
      // Dashboard home - role-based
      {
        index: true,
        element: <RoleBasedDashboard></RoleBasedDashboard>,
      },
      // Profile page - everyone can access
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      // Donor specific pages
      {
        path: 'my-donation-requests',
        element: <MyDonationRequests />,
      },
      {
        path: 'donation-details/:id',
        element: (
          <PrivateRoute>
            <MyDonationDetails></MyDonationDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/donationRequests/${params.id}`),
      },
      {
        path: 'edit-donation/:id',
        element: <MyDonationEdit></MyDonationEdit>,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/donationRequests/${params.id}`),
      },
      {
        path: 'create-donation-request',
        element: <CreateDonationRequest />,
      },

      // Admin only pages
      {
        path: 'all-users',
        element: <AllUsers />, // AdminRoute wrapper
      },

      // Admin + Volunteer
      {
        path: 'all-blood-requests',
        element: <AllBloodRequests />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/donationRequests/${params.id}`),
      },
    ],
  },

  // Fallback 404
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
