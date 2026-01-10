import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../Components/Loading/Loading';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpin from '../../Components/Loading/LoadingSpin';

const Donors = () => {
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [blood, setBlood] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');

  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const axiosSecure = useAxiosSecure();
  const [loadingResults, setLoadingResults] = useState(false);

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // প্রতি পেজে কয়টি রো দেখাবে

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const districtRes = await fetch('/district.json').then(res =>
          res.json()
        );
        const upazilaRes = await fetch('/upazilas.json').then(res =>
          res.json()
        );
        setDistricts(districtRes);
        setUpazilas(upazilaRes);

        const donorRes = await axiosSecure.get('/donors');
        setResults(donorRes.data);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoadingResults(false);
      }
    };
    fetchInitialData();
  }, [axiosSecure]);

  const handleSearch = async () => {
    setLoadingResults(true);
    setCurrentPage(1); // সার্চ করলে আবার প্রথম পেজ থেকে শুরু হবে
    try {
      const res = await axiosSecure.get('/donors', {
        params: {
          bloodGroup: blood,
          district: districts.find(d => String(d.id) === district)?.name,
          upazila: upazila,
        },
      });
      setResults(res.data);
      setSearched(true);
    } catch (err) {
      alert(err);
      setResults([]);
    } finally {
      setLoadingResults(false);
      setSearched(true);
    }
  };

  const { loading } = useContext(AuthContext);
  if (loading || loadingResults) {
    return <Loading />;
  }

  const filteredUpazilas = upazilas.filter(u => u.district_id == district);

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <section className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 md:px-20 relative overflow-hidden bg-linear-to-b from-red-50 to-white dark:from-[#1a0c0c] dark:to-[#120909]">
      {/* Enhanced Glow Effects */}
      <div className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-red-500/20 rounded-full blur-[80px] sm:blur-[100px] animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-56 h-56 sm:w-80 sm:h-80 bg-red-700/10 rounded-full blur-[100px] sm:blur-[120px] animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-red-600/5 rounded-full blur-[120px]"></div>

      {/* Beautiful Header */}
      <div className="relative z-10 text-center mb-10 sm:mb-14 animate-fadeIn">
        {/* Badge */}
        <div className="inline-block mb-4 sm:mb-5 px-4 sm:px-5 py-1.5 bg-red-100 dark:bg-red-900/30 rounded-full border border-red-200 dark:border-red-800/50">
          <p className="text-xs font-semibold text-red-600 dark:text-red-400 tracking-wide">
            💉 LIFE SAVING NETWORK
          </p>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-5 px-4 bg-linear-to-r from-red-700 via-red-600 to-red-500 bg-clip-text text-transparent drop-shadow-sm leading-tight">
          Search Blood Donors
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4 mb-6 sm:mb-8">
          Choose a blood group, district and upazila to find verified donors
          quickly. Every drop counts - connect with lifesavers in your area
          instantly.
        </p>

        {/* Enhanced Stats Row */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 mb-6 sm:mb-8 flex-wrap px-4">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400">
              {districts.length}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Districts Covered
            </p>
          </div>
          <div className="w-px h-10 bg-red-200 dark:bg-red-800/30"></div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400">
              {upazilas.length}+
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Upazilas Reached
            </p>
          </div>
          <div className="w-px h-10 bg-red-200 dark:bg-red-800/30"></div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400">
              Instant
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Connections
            </p>
          </div>
        </div>

        {/* Become Donor Button */}
        <button
          onClick={() => navigate('/blood-requests')}
          className="group px-8 sm:px-10 py-3 sm:py-3.5 bg-linear-to-r from-red-700 via-red-600 to-red-500 text-white text-base sm:text-lg font-bold rounded-xl shadow-[0_8px_24px_rgba(220,38,38,0.4)] hover:shadow-[0_12px_32px_rgba(220,38,38,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 ease-out inline-flex items-center gap-2.5"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
          <span>Become a Donor</span>
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>

      {/* Search Form */}
      <div className="relative z-20 max-w-4xl mx-auto bg-white/95 dark:bg-[#1a1a1a]/85 backdrop-blur-2xl border border-red-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(220,38,38,0.15)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Blood Group */}
          <div className="group">
            <label className="block mb-2 font-bold text-sm sm:text-base text-gray-800 dark:text-gray-200">
              <span className="text-red-500">🩸</span> Blood Group
            </label>
            <select
              value={blood}
              onChange={e => setBlood(e.target.value)}
              className="select select-bordered w-full h-12 bg-linear-to-r from-red-50/80 to-pink-50/80 dark:from-red-500/10 dark:to-pink-500/10 border-red-200/50 dark:border-red-600/30 text-sm sm:text-base font-semibold transition-all duration-300 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
            >
              <option value="">Select Blood</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          {/* District */}
          <div className="group">
            <label className="block mb-2 font-bold text-sm sm:text-base text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
              <span className="text-red-500">🏛️</span> District
            </label>
            <select
              value={district}
              onChange={e => setDistrict(e.target.value)}
              className="select select-bordered w-full h-12 bg-linear-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-500/10 dark:to-indigo-500/10 border-blue-200/50 dark:border-blue-600/30 text-sm sm:text-base font-semibold transition-all duration-300 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
            >
              <option value="">Select District</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div className="group">
            <label className="block mb-2 font-bold text-sm sm:text-base text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
              <span className="text-red-500">🏘️</span> Upazila
            </label>
            <select
              value={upazila}
              onChange={e => setUpazila(e.target.value)}
              className="select select-bordered w-full h-12 bg-linear-to-r from-green-50/80 to-emerald-50/80 dark:from-green-500/10 dark:to-emerald-500/10 border-green-200/50 dark:border-green-600/30 text-sm sm:text-base font-semibold transition-all duration-300 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map(u => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-8 sm:mt-10 pt-2">
          <button
            onClick={handleSearch}
            className="group relative px-10 py-3 bg-linear-to-r from-red-600 via-red-500 to-red-400 text-white text-lg font-bold rounded-xl shadow-[0_8px_25px_rgba(220,38,38,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 ease-out inline-flex items-center gap-2.5 overflow-hidden w-full sm:w-auto justify-center"
          >
            <span className="relative z-10 flex items-center gap-2">
              {' '}
              Find Donors{' '}
            </span>
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="relative z-10 mx-auto mt-16">
        {searched && results.length === 0 && (
          <p className="text-center text-red-500 font-semibold text-lg">
            No donors found.
          </p>
        )}

        {loading || loadingResults ? (
          <LoadingSpin></LoadingSpin>
        ) : (
          <>
            {results.length > 0 && (
              <>
                <div className="bg-white/80 dark:bg-[#1a1a1a]/70 backdrop-blur-xl border border-red-500/10 rounded-3xl shadow-[0_0_25px_rgba(255,0,0,0.08)] overflow-x-auto">
                  <table className="min-w-full table-auto text-sm md:text-base">
                    <thead>
                      <tr className="bg-red-600 text-white text-left">
                        <th className="px-4 md:px-6 py-3 font-semibold">
                          Recipient
                        </th>
                        <th className="px-4 md:px-6 py-3 font-semibold">
                          Email
                        </th>
                        <th className="px-4 md:px-6 py-3 font-semibold">
                          Location
                        </th>
                        <th className="px-4 md:px-6 py-3 font-semibold">
                          Blood
                        </th>
                        <th className="px-4 md:px-6 py-3 font-semibold">
                          Status
                        </th>
                        <th className="px-4 md:px-6 py-3 font-semibold text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map(req => (
                        <tr
                          key={req._id}
                          className="border-b border-red-500/10 hover:bg-red-50/60 dark:hover:bg-red-900/20 transition-all"
                        >
                          <td className="px-4 md:px-6 py-3 font-semibold text-red-700 dark:text-red-300">
                            {req.displayName}
                          </td>
                          <td className="px-4 md:px-6 py-3 text-gray-700 dark:text-gray-300">
                            {req.email}
                          </td>
                          <td className="px-4 md:px-6 py-3 text-gray-700 dark:text-gray-300">
                            {req.district}, {req.upazila}
                          </td>
                          <td className="px-4 md:px-6 py-3">
                            <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-semibold">
                              {req.bloodGroup}
                            </span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                                req.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : req.status === 'inprogress'
                                  ? 'bg-blue-100 text-blue-800'
                                  : req.status === 'done'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-300 text-red-900'
                              }`}
                            >
                              {req.status}
                            </span>
                          </td>
                          <td className="px-4 md:px-6 py-3 text-center">
                            <button
                              onClick={() =>
                                navigate(`/searchedUser-details/${req.email}`)
                              }
                              className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* --- Pagination Buttons --- */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-10 gap-2 pb-10">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => paginate(currentPage - 1)}
                      className="px-4 py-2 bg-white dark:bg-gray-800 border border-red-500/30 rounded-lg text-red-600 disabled:opacity-50 hover:bg-red-50 transition-all font-bold"
                    >
                      Prev
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`w-10 h-10 rounded-lg font-bold transition-all ${
                          currentPage === index + 1
                            ? 'bg-red-600 text-white shadow-lg'
                            : 'bg-white dark:bg-gray-800 border border-red-500/30 text-red-600 hover:bg-red-50'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => paginate(currentPage + 1)}
                      className="px-4 py-2 bg-white dark:bg-gray-800 border border-red-500/30 rounded-lg text-red-600 disabled:opacity-50 hover:bg-red-50 transition-all font-bold"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Donors;
