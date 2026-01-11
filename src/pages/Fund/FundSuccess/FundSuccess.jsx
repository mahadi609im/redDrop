import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../Components/Loading/Loading';
import { jsPDF } from 'jspdf';

const FundSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [fund, setFund] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    axiosSecure
      .post('/funds', { sessionId })
      .then(res => {
        if (res.data.success) {
          setFund(res.data.fundInfo || res.data);
        }
      })
      .catch(err => console.error(err.message))
      .finally(() => setLoading(false));
  }, [sessionId, axiosSecure]);

  const handleDownloadReceipt = () => {
    if (!fund) return;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(34, 197, 94); // Success Green
    doc.text('RedDrop Donation Receipt', 20, 25);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Contributor: ${fund.name}`, 20, 45);
    doc.text(`Email: ${fund.email}`, 20, 55);
    doc.text(`Amount Paid: $${fund.amount} USD`, 20, 65);
    doc.text(`Transaction ID: ${fund.transactionId}`, 20, 75);
    doc.text(`Date: ${new Date(fund.fundAt).toLocaleString()}`, 20, 85);

    doc.save(`RedDrop_Receipt_${fund.transactionId}.pdf`);
  };

  if (loading) return <Loading />;

  return (
    <section className="min-h-screen flex items-center justify-center bg-base-100 px-4 sm:px-6 relative overflow-hidden py-20 transition-colors duration-300">
      {/* Background Glow matching the Success Theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-success/10 rounded-full blur-[120px]"></div>

      <div className="relative z-10 max-w-xl w-full animate-fadeIn">
        <div className="bg-base-200/80 backdrop-blur-2xl border border-base-300 rounded-[3rem] p-8 sm:p-12 text-center shadow-2xl overflow-hidden">
          {/* Success Indicator */}
          <div className="relative inline-flex mb-10">
            <div className="absolute inset-0 rounded-full bg-success/20 animate-ping"></div>
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-success flex items-center justify-center shadow-xl shadow-success/30">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 text-success-content"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={4}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black mb-4 text-base-content tracking-tighter">
            Donation <span className="text-success">Successful!</span>
          </h1>

          <p className="text-base-content opacity-70 text-base sm:text-lg mb-8 px-4">
            Thank you,{' '}
            <span className="font-bold text-base-content">{fund?.name}</span>,
            for your contribution of{' '}
            <span className="font-black text-success">${fund?.amount}</span>.
            Your support saves lives.
          </p>

          {/* Detailed Receipt Information */}
          <div className="bg-base-100 border border-base-300 rounded-3xl p-6 mb-10 space-y-4 text-left">
            <DetailRow
              label="Transaction ID"
              value={fund?.transactionId}
              isMono
            />
            <DetailRow label="Payment Method" value="Stripe Secure" icon="💳" />
            <DetailRow
              label="Timestamp"
              value={
                fund?.fundAt
                  ? new Date(fund.fundAt).toLocaleString('en-GB', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })
                  : '-'
              }
            />
          </div>

          {/* Action Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Link
              to="/"
              className="px-8 py-4 bg-success text-success-content font-black rounded-2xl shadow-lg shadow-success/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M3 12l9-9 9 9M5 10v10a2 2 0 002 2h10a2 2 0 002-2V10"
                />
              </svg>
              Go Home
            </Link>

            <Link
              to="/funds"
              className="px-8 py-4 bg-base-300 text-base-content font-black rounded-2xl hover:bg-base-content/10 active:scale-95 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
            >
              View All Funds
            </Link>
          </div>

          {/* Download Receipt Section */}
          <button
            onClick={handleDownloadReceipt}
            className="group inline-flex items-center gap-2 text-success font-black text-sm uppercase tracking-wider hover:opacity-80 transition-opacity"
          >
            <svg
              className="w-5 h-5 group-hover:translate-y-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="border-b-2 border-success/30 group-hover:border-success transition-all">
              Download PDF Receipt
            </span>
          </button>

          {/* Footer Logo/Brand */}
          <div className="mt-12 pt-8 border-t border-base-300 flex items-center justify-center gap-3 opacity-30 grayscale">
            <span className="font-black tracking-tighter text-xl text-base-content">
              RedDrop
            </span>
            <div className="w-1.5 h-1.5 bg-base-content rounded-full"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-base-content">
              Official Receipt
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Sub-component for clean detail rows
const DetailRow = ({ label, value, isMono, icon }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
      {label}
    </span>
    <span
      className={`text-sm font-bold text-base-content ${
        isMono ? 'font-mono' : ''
      }`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {value}
    </span>
  </div>
);

export default FundSuccess;
