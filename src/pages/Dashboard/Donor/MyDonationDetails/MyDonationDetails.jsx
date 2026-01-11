import { useNavigate, useParams } from 'react-router';
import {
  FaArrowLeft,
  FaTint,
  FaHospital,
  FaMapMarkerAlt,
  FaUser,
  FaQuoteLeft,
} from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
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

  if (error)
    return (
      <div className="h-screen flex items-center justify-center text-primary font-medium">
        Error loading details...
      </div>
    );

  return (
    <section className="min-h-screen py-12 px-6 bg-base-200/50 transition-all">
      <div className="max-w-3xl mx-auto">
        {/* Simple Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-base-content/50 hover:text-primary transition-all mb-8 font-bold text-xs tracking-widest"
        >
          <FaArrowLeft /> BACK
        </button>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingSpin />
          </div>
        ) : (
          <div className="relative">
            {/* Subtle Red Drop Shade (Minimal) */}
            <div className="absolute inset-0 bg-primary/5 blur-[80px] rounded-full"></div>

            {/* Main Glass Card */}
            <div className="relative backdrop-blur-md bg-base-100/60 border border-base-300 rounded-[2rem] shadow-xl overflow-hidden">
              {/* Minimal Header */}
              <div className="p-8 md:p-10 border-b border-base-300/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                    <FaTint size={24} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-base-content tracking-tight">
                      {requestData.bloodGroup}{' '}
                      <span className="font-light opacity-50 text-xl">
                        Required
                      </span>
                    </h1>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">
                      ID: {id.slice(-6)} • {requestData.status}
                    </span>
                  </div>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest">
                    Appointment
                  </p>
                  <p className="text-base-content font-black">
                    {requestData.donationDate}
                  </p>
                  <p className="text-xs font-medium text-primary/80">
                    {requestData.donationTime}
                  </p>
                </div>
              </div>

              {/* Minimal Grid */}
              <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {/* Information Column */}
                <div className="space-y-8">
                  <InfoRow
                    icon={<FaUser />}
                    label="Recipient"
                    value={requestData.recipientName}
                  />
                  <InfoRow
                    icon={<FaHospital />}
                    label="Hospital"
                    value={requestData.hospitalName}
                  />
                  <InfoRow
                    icon={<FaMapMarkerAlt />}
                    label="Location"
                    value={`${requestData.upazila}, ${requestData.district}`}
                  />
                </div>

                {/* Logistics Column */}
                <div className="space-y-8">
                  <InfoRow
                    icon={<FaUser />}
                    label="Requested By"
                    value={requestData.requesterName}
                    sub={requestData.requesterEmail}
                  />

                  {/* Glassy Message Box */}
                  <div className="p-5 rounded-2xl bg-base-300/30 border border-base-300/50 relative">
                    <FaQuoteLeft className="text-primary/10 absolute top-4 right-4 text-3xl" />
                    <p className="text-[10px] font-black text-base-content/30 uppercase tracking-widest mb-2">
                      Message
                    </p>
                    <p className="text-sm text-base-content/70 italic leading-relaxed">
                      {requestData.requestMessage || 'No message provided.'}
                    </p>
                  </div>

                  {/* Donor Status (If any) */}
                  {requestData.status === 'inprogress' && (
                    <div className="pt-4 border-t border-base-300/50">
                      <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                        Assigned Donor
                      </p>
                      <p className="font-bold text-base-content">
                        {requestData.donor?.name || 'Pending...'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Minimal Footer */}
              <div className="bg-base-300/20 px-8 py-4 flex justify-between items-center text-[10px] font-bold text-base-content/20 uppercase tracking-[0.3em]">
                <span>Blood Request Detail View</span>
                <span>2026</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Extremely Minimal Info Row
const InfoRow = ({ icon, label, value, sub }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 text-primary/40 text-sm italic">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-base-content/30 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-sm font-bold text-base-content tracking-tight">
        {value}
      </p>
      {sub && (
        <p className="text-[11px] font-medium text-base-content/40 mt-0.5">
          {sub}
        </p>
      )}
    </div>
  </div>
);

export default MyDonationDetails;
