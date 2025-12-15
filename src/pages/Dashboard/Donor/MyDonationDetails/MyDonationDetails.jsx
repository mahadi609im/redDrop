import { useNavigate, useParams } from 'react-router';
import { FaEdit, FaTrash, FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loading from '../../../../Components/Loading/Loading';
import LoadingSpin from '../../../../Components/Loading/LoadingSpin';

const MyDonationDetails = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { id } = useParams();

  const {
    data: requestData = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['singleRequest', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
  if (error) return <p>Something went wrong</p>;

  const statusColor = {
    pending:
      'inline-block px-3 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 shadow-sm ring-1 ring-yellow-200',
    inprogress:
      'inline-block px-3 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 shadow-sm ring-1 ring-blue-200',
    done: 'inline-block px-3 rounded-full text-sm font-semibold bg-green-100 text-green-800 shadow-sm ring-1 ring-green-200',
    canceled:
      'inline-block px-3 rounded-full text-sm font-semibold bg-red-100 text-red-800 shadow-sm ring-1 ring-red-200',
  };

  return (
    <section className="min-h-screen py-16 px-6 md:px-20 bg-red-50 dark:bg-[#120909] relative rounded-2xl">
      {isLoading ? (
        <LoadingSpin></LoadingSpin>
      ) : (
        <>
          <div className="max-w-5xl mx-auto bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-red-500/20">
            <button
              onClick={() => navigate(-1)}
              className=" text-red-200/50 shadow hover:text-red-200 cursor-pointer hover:scale-125 transition"
            >
              <FaArrowLeft size={20} />
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-red-700 dark:text-red-400">
              Donation Request Details
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
              {/* Left Column */}
              <div className="space-y-4 text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-[#1a1a1a]/70 p-6 rounded-2xl shadow-sm">
                {status === 'inprogress' && requestData.donor && (
                  <>
                    <p>
                      <span className="font-semibold text-red-600">
                        Donor Name:
                      </span>{' '}
                      {requestData.donor.name}
                    </p>
                    <p>
                      <span className="font-semibold text-red-600">
                        Donor Email:
                      </span>{' '}
                      {requestData.donor.email}
                    </p>
                  </>
                )}
                <p>
                  <span className="font-semibold text-red-600">Recipient:</span>{' '}
                  {requestData.recipientName}
                </p>
                <p>
                  <span className="font-semibold text-red-600">
                    Requester Name:
                  </span>{' '}
                  {requestData.requesterName}
                </p>
                <p>
                  <span className="font-semibold text-red-600">
                    Requester Email:
                  </span>{' '}
                  {requestData.requesterEmail}
                </p>
                <p>
                  <span className="font-semibold text-red-600">District:</span>{' '}
                  {requestData.district}
                </p>
                <p>
                  <span className="font-semibold text-red-600">Upazila:</span>{' '}
                  {requestData.upazila}
                </p>
                <p>
                  <span className="font-semibold text-red-600">Hospital:</span>{' '}
                  {requestData.hospitalName}
                </p>
              </div>

              {/* Vertical Line */}
              <div className="hidden md:flex justify-center">
                <div className="w-px bg-red-500/40 mx-4 h-full"></div>
              </div>

              {/* Right Column */}
              <div className="space-y-4 text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-[#1a1a1a]/70 p-6 rounded-2xl shadow-sm">
                <p>
                  <span className="font-semibold text-red-600">
                    Blood Group:
                  </span>{' '}
                  <span className="inline-block px-4 py-1 rounded-full font-bold bg-red-600 text-white shadow">
                    {requestData.bloodGroup}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-red-600">
                    Donation Date:
                  </span>{' '}
                  {requestData.donationDate}
                </p>
                <p>
                  <span className="font-semibold text-red-600">
                    Donation Time:
                  </span>{' '}
                  {requestData.donationTime}
                </p>
                <p>
                  <span className="font-semibold text-red-600">Message:</span>{' '}
                  {requestData.requestMessage}
                </p>
                <p>
                  <span className="font-semibold text-red-600">Address:</span>{' '}
                  {requestData.fullAddress}
                </p>
                <p className="space-x-2">
                  <span className="font-semibold text-red-600">Status:</span>{' '}
                  <span className={`${statusColor[status]}`}>
                    {status.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default MyDonationDetails;
