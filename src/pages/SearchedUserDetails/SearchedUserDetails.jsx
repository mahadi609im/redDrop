import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';
import {
  FaArrowLeft,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendar,
} from 'react-icons/fa';
import { Link } from 'react-router';

const SearchedUserDetails = () => {
  const { searchedEmail } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: searchedUserData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['singleUser', searchedEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${searchedEmail}`);
      return res.data[0];
    },
    enabled: !!searchedEmail,
  });

  if (isLoading) return <Loading />;

  if (error || !searchedUserData) {
    return (
      <div className="min-h-screen bg-base-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/donors"
            className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8"
          >
            <FaArrowLeft /> Back to Donors
          </Link>
          <div className="bg-base-200 rounded-xl shadow-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-base-content mb-4">
              User Not Found
            </h2>
            <p className="text-base-content/70">
              No user found with this email address.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/donors"
          className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold mb-12 transition-all"
        >
          <FaArrowLeft className="w-5 h-5" /> Back to Donors
        </Link>

        <div className="bg-base-200 rounded-2xl shadow-xl overflow-hidden border border-base-300">
          {/* Header Section */}
          <div className="bg-primary p-8 text-primary-content">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                <img
                  src={searchedUserData?.photoURL}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-primary-content/30 shadow-2xl transition-transform group-hover:scale-105 duration-300"
                />
                <div className="absolute -bottom-3 -right-3 px-4 py-2 bg-base-100 text-base-content text-sm font-black rounded-xl shadow-xl border border-primary/20 flex items-center gap-1">
                  <span className="text-error">🩸</span>
                  {searchedUserData?.bloodGroup}
                </div>
              </div>

              <div className="text-center sm:text-left space-y-1">
                <h1 className="text-4xl font-black tracking-tight">
                  {searchedUserData.displayName || 'Anonymous User'}
                </h1>
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <span className="badge badge-secondary badge-outline font-bold uppercase text-xs tracking-widest px-4">
                    {searchedUserData.role || 'donor'}
                  </span>
                  <div className="flex items-center gap-2 text-primary-content/80 text-sm">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                    </span>
                    Verified Profile
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Content */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Card */}
            <div className="flex items-center gap-5 p-5 bg-base-100 rounded-2xl border border-base-300 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <FaEnvelope className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs font-black text-base-content/40 uppercase tracking-widest">
                  Email Address
                </p>
                <p className="text-base font-bold text-base-content break-all">
                  {searchedUserData.email}
                </p>
              </div>
            </div>

            {/* Address Card */}
            <div className="flex items-center gap-5 p-5 bg-base-100 rounded-2xl border border-base-300 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <FaMapMarkerAlt className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-xs font-black text-base-content/40 uppercase tracking-widest">
                  Location
                </p>
                <p className="text-base font-bold text-base-content">
                  {searchedUserData.district}, {searchedUserData.upazila}
                </p>
              </div>
            </div>

            {/* Joined Date */}
            {searchedUserData.createdAt && (
              <div className="flex items-center gap-5 p-5 bg-base-100 rounded-2xl border border-base-300 shadow-sm">
                <div className="w-12 h-12 bg-info/10 rounded-xl flex items-center justify-center">
                  <FaCalendar className="w-6 h-6 text-info" />
                </div>
                <div>
                  <p className="text-xs font-black text-base-content/40 uppercase tracking-widest">
                    Member Since
                  </p>
                  <p className="text-base font-bold text-base-content">
                    {new Date(searchedUserData.createdAt).toLocaleDateString(
                      'en-GB',
                      {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Last Login */}
            {searchedUserData.lastLogin && (
              <div className="flex items-center gap-5 p-5 bg-base-100 rounded-2xl border border-base-300 shadow-sm">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                  <FaCalendar className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-xs font-black text-base-content/40 uppercase tracking-widest">
                    Activity
                  </p>
                  <p className="text-base font-bold text-base-content">
                    Last active:{' '}
                    {new Date(searchedUserData.lastLogin).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="px-8 py-6 bg-base-300/30 border-t border-base-300">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <p className="text-sm text-base-content/60 font-medium">
                Information provided by {searchedUserData.displayName}
              </p>
              <a
                href={`mailto:${searchedUserData.email}`}
                className="btn btn-primary px-8 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105"
              >
                <FaEnvelope /> Send Message
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchedUserDetails;
