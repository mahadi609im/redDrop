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
import AdminPrivateRoute from '../Components/PrivateRoute/AdminPrivateRoute';
import VAPrivate from '../Components/PrivateRoute/VAPrivate';
import SearchedUserDetails from '../pages/SearchedUserDetails/SearchedUserDetails';
import DAPrivate from '../Components/PrivateRoute/DAPrivate';
import GiveFund from '../pages/Fund/GiveFund/GiveFund';
import FundingPage from '../pages/Fund/Funding/Funding';
import FundSuccess from '../pages/Fund/FundSuccess/FundSuccess';
import FundCancel from '../pages/Fund/FundCancel/FundCancel';
import ActiveUserPrivate from '../Components/PrivateRoute/ActiveUserPrivate';

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
        path: '/searchedUser-details/:searchedEmail',
        element: (
          <PrivateRoute>
            <SearchedUserDetails></SearchedUserDetails>
          </PrivateRoute>
        ),
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
      },
      {
        path: '/funds',
        element: (
          <ActiveUserPrivate>
            <PrivateRoute>
              <FundingPage></FundingPage>
            </PrivateRoute>
          </ActiveUserPrivate>
        ),
      },
      {
        path: '/give-fund',
        element: (
          <PrivateRoute>
            <GiveFund></GiveFund>
          </PrivateRoute>
        ),
      },
      {
        path: '/fund-success',
        element: (
          <ActiveUserPrivate>
            <PrivateRoute>
              <FundSuccess></FundSuccess>
            </PrivateRoute>
          </ActiveUserPrivate>
        ),
      },
      {
        path: '/fund-cancelled',
        element: (
          <PrivateRoute>
            <FundCancel></FundCancel>
          </PrivateRoute>
        ),
      },
    ],
  },

  // Dashboard Routes (Private)
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
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
        element: (
          <ActiveUserPrivate>
            <PrivateRoute>
              <MyDonationRequests />
            </PrivateRoute>
          </ActiveUserPrivate>
        ),
      },
      {
        path: 'donation-details/:id',
        element: (
          <ActiveUserPrivate>
            <PrivateRoute>
              <MyDonationDetails></MyDonationDetails>
            </PrivateRoute>
          </ActiveUserPrivate>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/donationRequests/${params.id}`),
      },
      {
        path: 'edit-donation/:id',
        element: (
          <ActiveUserPrivate>
            <PrivateRoute>
              <MyDonationEdit></MyDonationEdit>
            </PrivateRoute>
          </ActiveUserPrivate>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/donationRequests/${params.id}`),
      },
      {
        path: 'create-donation-request',
        element: (
          <ActiveUserPrivate>
            <PrivateRoute>
              <CreateDonationRequest />
            </PrivateRoute>
          </ActiveUserPrivate>
        ),
      },

      // Admin only pages
      {
        path: 'all-users',
        element: (
          <AdminPrivateRoute>
            <AllUsers />
          </AdminPrivateRoute>
        ), // AdminRoute wrapper
      },

      // Admin + Volunteer
      {
        path: 'all-blood-requests',
        element: (
          <VAPrivate>
            <AllBloodRequests />
          </VAPrivate>
        ),
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
