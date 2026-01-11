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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
    setCurrentPage(1);
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
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / itemsPerPage);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <section className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 md:px-20 relative overflow-hidden bg-base-100 dark:bg-base-100 transition-colors duration-300">
      {/* Enhanced Glow Effects */}
      <div className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-primary/20 rounded-full blur-[80px] sm:blur-[100px] animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-56 h-56 sm:w-80 sm:h-80 bg-primary/10 rounded-full blur-[100px] sm:blur-[120px] animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>

      <div className="relative z-10 text-center mb-10 sm:mb-14">
        <div className="inline-block mb-4 sm:mb-5 px-4 sm:px-5 py-1.5 bg-primary/10 rounded-full border border-primary/20">
          <p className="text-xs font-semibold text-primary tracking-wide">
            💉 LIFE SAVING NETWORK
          </p>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-5 px-4 bg-gradient-to-r from-primary via-red-500 to-orange-500 bg-clip-text text-transparent leading-tight">
          Search Blood Donors
        </h1>

        <p className="text-base-content/70 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4 mb-6 sm:mb-8">
          Choose a blood group, district and upazila to find verified donors
          quickly.
        </p>

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 mb-6 sm:mb-8 flex-wrap px-4">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-primary">
              {districts.length}
            </p>
            <p className="text-xs sm:text-sm text-base-content/60">
              Districts Covered
            </p>
          </div>
          <div className="w-px h-10 bg-base-300"></div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-primary">
              {upazilas.length}+
            </p>
            <p className="text-xs sm:text-sm text-base-content/60">
              Upazilas Reached
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/blood-requests')}
          className="btn btn-primary btn-lg shadow-lg hover:scale-105 transition-transform"
        >
          Become a Donor
        </button>
      </div>

      {/* Search Form */}
      <div className="relative z-20 max-w-4xl mx-auto bg-base-200/80 backdrop-blur-2xl border border-primary/20 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <div className="form-control">
            <label className="label font-bold text-base-content">
              🩸 Blood Group
            </label>
            <select
              value={blood}
              onChange={e => setBlood(e.target.value)}
              className="select select-bordered bg-base-100 border-base-300 focus:border-primary"
            >
              <option value="">Select Blood</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                <option key={group}>{group}</option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label font-bold text-base-content">
              🏛️ District
            </label>
            <select
              value={district}
              onChange={e => setDistrict(e.target.value)}
              className="select select-bordered bg-base-100 border-base-300 focus:border-primary"
            >
              <option value="">Select District</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label font-bold text-base-content">
              🏘️ Upazila
            </label>
            <select
              value={upazila}
              onChange={e => setUpazila(e.target.value)}
              className="select select-bordered bg-base-100 border-base-300 focus:border-primary"
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
        <div className="flex justify-center mt-8">
          <button onClick={handleSearch} className="btn btn-primary px-12">
            Find Donors
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="relative z-10 mx-auto mt-16 max-w-6xl">
        {searched && results.length === 0 && (
          <p className="text-center text-primary font-semibold text-lg">
            No donors found.
          </p>
        )}
        {results.length > 0 && (
          <div className="overflow-x-auto bg-base-200 rounded-3xl border border-base-300 shadow-xl">
            <table className="table w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Recipient</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Blood</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-base-content">
                {currentItems.map(req => (
                  <tr
                    key={req._id}
                    className="hover:bg-base-300/50 border-b border-base-300"
                  >
                    <td className="font-bold text-primary">
                      {req.displayName}
                    </td>
                    <td>{req.email}</td>
                    <td>
                      {req.district}, {req.upazila}
                    </td>
                    <td>
                      <span className="badge badge-primary font-bold">
                        {req.bloodGroup}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-ghost capitalize">
                        {req.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() =>
                          navigate(`/searchedUser-details/${req.email}`)
                        }
                        className="btn btn-sm btn-primary"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 gap-2 pb-10">
            <button
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
              className="btn btn-outline btn-primary btn-sm"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`btn btn-sm ${
                  currentPage === index + 1 ? 'btn-primary' : 'btn-ghost'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
              className="btn btn-outline btn-primary btn-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Donors;
