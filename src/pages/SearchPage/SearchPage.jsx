import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../Components/Loading/Loading';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SearchPage = () => {
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

  // handleSearch function
  const handleSearch = async () => {
    setLoadingResults(true);
    try {
      const res = await axiosSecure.get('/donors', {
        params: {
          bloodGroup: blood,
          district: districts.find(d => String(d.id) === district)?.name,
          upazila: upazila,
        },
      });
      setResults(res.data);
      console.log(res.data);
      setSearched(true);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoadingResults(false);
      setSearched(true);
    }
  };

  useEffect(() => {
    fetch('/district.json')
      .then(res => res.json())
      .then(data => setDistricts(data));

    fetch('/upazilas.json')
      .then(res => res.json())
      .then(data => setUpazilas(data));
  }, []);

  const { loading } = useContext(AuthContext);
  if (loading || loadingResults) {
    return <Loading></Loading>;
  }

  const filteredUpazilas = upazilas.filter(u => u.district_id == district);

  return (
    <section className="min-h-screen py-20 px-6 md:px-20 relative bg-linear-to-b from-red-50 to-white dark:from-[#150c0c] dark:to-[#0d0b0b]">
      {/* Glow Effects */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-red-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-red-700/10 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="relative z-10 text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-primary drop-shadow-sm">
          Search Blood Donors
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mt-3">
          Choose a blood group, district and upazila to find donors quickly.
        </p>
      </div>

      {/* Search Box */}
      <div className="relative z-10 max-w-5xl mx-auto bg-white/80 dark:bg-[#1a1a1a]/70 backdrop-blur-xl border border-red-500/10 rounded-3xl p-6 md:p-10 shadow-[0_0_25px_rgba(255,0,0,0.1)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blood */}
          <div className="group">
            <label className="block mb-2 font-semibold text-primary-content">
              Blood Group
            </label>
            <select
              value={blood}
              onChange={e => setBlood(e.target.value)}
              className="select select-bordered w-full bg-base-100 transition-all duration-300 focus:outline-none focus:border-red-500 group-hover:border-red-400 shadow-[0_0_10px_rgba(255,0,0,0.1)]"
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
            <label className="block mb-2 font-semibold text-primary-content">
              District
            </label>
            <select
              value={district}
              onChange={e => setDistrict(e.target.value)}
              className="select select-bordered w-full bg-base-100 transition-all duration-300 focus:outline-none focus:border-red-500 group-hover:border-red-400 shadow-[0_0_10px_rgba(255,0,0,0.1)]"
            >
              <option value="">Select district</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div className="group">
            <label className="block mb-2 font-semibold text-primary-content">
              Upazila
            </label>
            <select
              value={upazila}
              onChange={e => setUpazila(e.target.value)}
              className="select select-bordered w-full bg-base-100 transition-all duration-300 focus:outline-none focus:border-red-500 group-hover:border-red-400 shadow-[0_0_10px_rgba(255,0,0,0.1)]"
            >
              <option value="">Select upazila</option>
              {filteredUpazilas.map(u => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleSearch}
            className="px-8 py-3 bg-primary text-primary-content text-lg font-semibold rounded-xl
            hover:bg-red-600 shadow-[0_4px_16px_rgba(255,0,0,0.25)]
            hover:shadow-[0_6px_22px_rgba(255,0,0,0.35)]
            active:scale-95 transition-all duration-300 ease-out"
          >
            Search Donors
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="relative z-10 max-w-6xl mx-auto mt-16">
        {!searched && (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
            Fill the form and press search to view donors.
          </p>
        )}

        {searched && results.length === 0 && (
          <p className="text-center text-red-500 font-semibold text-lg">
            No donors found.
          </p>
        )}

        {results.length > 0 && (
          <div className="relative z-10 max-w-6xl mx-auto mt-10 bg-white/80 dark:bg-[#1a1a1a]/70 backdrop-blur-xl border border-red-500/10 rounded-3xl shadow-[0_0_25px_rgba(255,0,0,0.08)] overflow-x-auto scrollbar-thin scrollbar-thumb-red-600/60 hover:scrollbar-thumb-red-600 scrollbar-track-transparent">
            <table className="min-w-full table-auto text-sm md:text-base">
              {/* Table Head */}
              <thead>
                <tr className="bg-red-600 text-white text-left">
                  <th className="px-4 md:px-6 py-3 font-semibold whitespace-nowrap">
                    Recipient
                  </th>
                  <th className="px-4 md:px-6 py-3 font-semibold whitespace-nowrap">
                    Email
                  </th>
                  <th className="px-4 md:px-6 py-3 font-semibold whitespace-nowrap">
                    Location
                  </th>
                  <th className="px-4 md:px-6 py-3 font-semibold whitespace-nowrap">
                    Blood
                  </th>
                  <th className="px-4 md:px-6 py-3 font-semibold whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 md:px-6 py-3 font-semibold text-center whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {results.map(req => (
                  <tr
                    key={req._id}
                    className="border-b border-red-500/10 hover:bg-red-50/60 dark:hover:bg-red-900/20 transition-all"
                  >
                    <td className="px-4 md:px-6 py-3 font-semibold text-red-700 dark:text-red-300 whitespace-nowrap">
                      {req.displayName}
                    </td>

                    <td className="px-4 md:px-6 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {req.email}
                    </td>

                    <td className="px-4 md:px-6 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {req.district}, {req.upazila}
                    </td>

                    <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                      <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-semibold shadow">
                        {req.bloodGroup}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                          req.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : req.status === 'inprogress'
                            ? 'bg-blue-100 text-blue-800'
                            : req.status === 'done'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-300 text-red-900 dark:bg-red-500 dark:text-red-100'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>

                    <td className="px-4 md:px-6 py-3 text-center whitespace-nowrap">
                      <button
                        onClick={() =>
                          navigate(`/searchedUser-details/${req.email}`)
                        }
                        className="
                px-4 md:px-5 py-2 bg-red-600 text-white rounded-lg font-semibold
                shadow-[0_4px_16px_rgba(255,0,0,0.25)]
                hover:bg-red-700 hover:shadow-[0_6px_20px_rgba(255,0,0,0.35)]
                active:scale-95 transition-all
              "
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
