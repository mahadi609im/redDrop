import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';
import {
  FaArrowLeft,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendar,
  FaUser,
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
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/dashboard/users"
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium mb-8"
          >
            <FaArrowLeft /> Back to Users
          </Link>
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              User Not Found
            </h2>
            <p className="text-gray-600">
              No user found with this email address.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/donors"
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold mb-12 transition-colors"
        >
          <FaArrowLeft className="w-5 h-5" /> Back to Users
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-white">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-red-400/20 rounded-full flex items-center justify-center relative">
                <img
                  src={searchedUserData?.photoURL}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-md"
                />
                <div className="absolute -bottom-2 -right-2 px-3 py-1.5 bg-linear-to-r from-red-300 to-rose-300 text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-1">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/15">
                    🩸
                  </span>
                  <span className="font-bold text-red-800">
                    {searchedUserData?.bloodGroup}
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  {searchedUserData.displayName || 'User'}
                </h1>
                <div className="flex gap-3 items-center">
                  <p className="text-red-100">
                    {searchedUserData.role || 'donor'}
                  </p>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl">
                <FaEnvelope className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {searchedUserData.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <FaMapMarkerAlt className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {searchedUserData.district},{searchedUserData.upazila}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {searchedUserData.createdAt && (
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                  <FaCalendar className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Joined</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(
                        searchedUserData.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}

              {searchedUserData.lastLogin && (
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                  <FaCalendar className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Last Login
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(
                        searchedUserData.lastLogin
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-8 pb-8 pt-4 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <a
                href={`mailto:${searchedUserData.email}`}
                target="_blank"
                rel="noopener noreferrer" // নিরাপত্তা নিশ্চিত করার জন্য এটি যুক্ত করা হলো
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl inline-block"
              >
                Send message
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchedUserDetails;
