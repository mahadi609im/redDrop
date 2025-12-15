# redDrop

## Purpose

redDrop is a user-friendly Blood Donation Application designed to connect blood
donors with recipients efficiently. It allows donors to register, manage their
donation requests, and search for recipients based on blood group and location.
Admins and volunteers can manage requests and users, ensuring a smooth and
secure donation process.

## Live URL

[Live link(client-firebase)](https://reddrop-685b1.web.app/)
[Live link(client-netlify)](https://red-drop-blood-donation-maha690im.netlify.app/)

## Key Features

- **User Roles & Permissions**: Donor, Volunteer, Admin with role-based access
  control.
- **User Authentication**: Registration and login using email & password.
- **Profile Management**: Users can view and update their profile information.
- **Donation Requests**: Create, view, edit, delete, and manage blood donation
  requests.
- **Search Donors**: Find donors by blood group, district, and upazila.
- **Dashboard**:
  - Donor Dashboard: View recent requests, manage personal donation requests.
  - Volunteer Dashboard: Update donation status and view all requests.
  - Admin Dashboard: Manage all users and donation requests, view statistics.
- **Funding Integration**: Users can donate funds using Stripe payment method.
- **Pagination & Filtering**: Efficient navigation of donation requests and user
  data.
- **Responsive Design**: Optimized for mobile, tablet, and desktop views.
- **Secure Configuration**: Firebase and MongoDB credentials stored using
  environment variables.

## NPM Packages Used

### Frontend

- `react`
- `react-dom`
- `react-router-dom`
- `axios`
- `react-hook-form`
- `firebase`
- `framer-motion` (optional for animations)
- `sweetalert2` (for modals/alerts)

### Backend

- `express`
- `mongoose`
- `cors`
- `jsonwebtoken`
- `dotenv`
- `bcryptjs`
- `stripe` (for funding/payment integration)

## Deployment

- **Frontend**: Deployed on Netlify
- **Backend**: Deployed on Vercel
