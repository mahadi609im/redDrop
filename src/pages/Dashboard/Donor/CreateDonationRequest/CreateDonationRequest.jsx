import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../context/AuthContext';

// Example logged-in user
const loggedInUser = {
  name: 'Maha',
  email: 'maha@example.com',
  role: 'donor',
  status: 'active', // blocked users will have 'blocked'
};

// Blood groups
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const CreateDonationRequest = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  // Load JSON data
  useEffect(() => {
    fetch('/district.json')
      .then(res => res.json())
      .then(data => setDistricts(data))
      .catch(err => console.error(err));

    fetch('/upazilas.json')
      .then(res => res.json())
      .then(data => setUpazilas(data))
      .catch(err => console.error(err));
  }, []);

  // Filter Upazilas based on selected district
  const filteredUpazilas = upazilas.filter(u => {
    const districtObj = districts.find(d => d.name === selectedDistrict);
    if (!districtObj) return false;
    return u.district_id === districtObj.id;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loggedInUser.status === 'blocked') {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold text-lg">
        You are blocked and cannot create donation requests.
      </div>
    );
  }

  const handleCreateRequest = data => {
    const requestData = { ...data, status: 'pending' };

    axiosSecure.post('/donationRequests', requestData).then(res => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Request Created!',
          text: 'Your blood donation request has been submitted successfully.',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 md:px-20">
      <div className="max-w-3xl bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-red-400/30 w-full">
        <h1 className="text-3xl md:text-4xl font-extrabold text-red-700 mb-6 text-center">
          Create Donation Request
        </h1>

        <form
          onSubmit={handleSubmit(handleCreateRequest)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Requester Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Requester Name
            </label>
            <input
              type="text"
              value={user?.displayName}
              {...register('requesterName', { required: true })}
              readOnly
              className="cursor-not-allowed w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10
                border border-gray-300 dark:border-red-800/50
                text-gray-900 dark:text-gray-500
                focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Requester Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Requester Email
            </label>
            <input
              type="email"
              defaultValue={user?.email}
              readOnly
              {...register('requesterEmail', { required: true })}
              className="cursor-not-allowed w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10
                border border-gray-300 dark:border-red-800/50
                text-gray-900 dark:text-gray-500
                focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Recipient Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Recipient Name
            </label>
            <input
              type="text"
              {...register('recipientName', { required: true })}
              placeholder="Recipient Name"
              className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10
                border border-gray-300 dark:border-red-800/50
                text-gray-900 dark:text-gray-500
                focus:outline-none focus:border-red-500"
            />
            {errors.recipientName && (
              <p className="text-red-500 text-sm mt-1">
                Recipient name is required
              </p>
            )}
          </div>

          {/* Hospital Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Hospital Name
            </label>
            <input
              type="text"
              {...register('hospitalName', { required: true })}
              placeholder="Hospital Name"
              className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10
                border border-gray-300 dark:border-red-800/50
                text-gray-900 dark:text-gray-500
                focus:outline-none focus:border-red-500"
            />
            {errors.hospitalName && (
              <p className="text-red-500 text-sm mt-1">
                Hospital name is required
              </p>
            )}
          </div>

          {/* District */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              District
            </label>
            <select
              {...register('district', { required: true })}
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10
                border border-gray-300 dark:border-red-800/50
                text-gray-900 dark:text-gray-500
                focus:outline-none focus:border-red-500"
            >
              <option value="">Select District</option>
              {districts.map(d => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">District is required</p>
            )}
          </div>

          {/* Upazila */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Upazila
            </label>
            <select
              {...register('upazila', { required: true })}
              className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10
                border border-gray-300 dark:border-red-800/50
                text-gray-900 dark:text-gray-500
                focus:outline-none focus:border-red-500"
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map(u => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
            {errors.upazila && (
              <p className="text-red-500 text-sm mt-1">Upazila is required</p>
            )}
          </div>

          {/* Full Address */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Full Address
            </label>
            <input
              type="text"
              {...register('fullAddress', { required: true })}
              placeholder="Full Address"
              className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10
                border border-gray-300 dark:border-red-800/50
                text-gray-900 dark:text-gray-500
                focus:outline-none focus:border-red-500"
            />
            {errors.fullAddress && (
              <p className="text-red-500 text-sm mt-1">
                Full address is required
              </p>
            )}
          </div>

          {/* Blood Group */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Blood Group
            </label>
            <select
              {...register('bloodGroup', { required: true })}
              className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10
                border border-gray-300 dark:border-red-800/50
                text-gray-900 dark:text-gray-500
                focus:outline-none focus:border-red-500"
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map(bg => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
            {errors.bloodGroup && (
              <p className="text-red-500 text-sm mt-1">
                Blood group is required
              </p>
            )}
          </div>

          {/* Donation Date */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Donation Date
            </label>
            <input
              type="date"
              {...register('donationDate', { required: true })}
              className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10
                border border-gray-300 dark:border-red-800/50
                text-gray-900 dark:text-gray-500
                focus:outline-none focus:border-red-500"
            />
            {errors.donationDate && (
              <p className="text-red-500 text-sm mt-1">
                Donation date is required
              </p>
            )}
          </div>

          {/* Donation Time */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Donation Time
            </label>
            <input
              type="time"
              {...register('donationTime', { required: true })}
              className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10
                border border-gray-300 dark:border-red-800/50
                text-gray-900 dark:text-gray-500
                focus:outline-none focus:border-red-500"
            />
            {errors.donationTime && (
              <p className="text-red-500 text-sm mt-1">
                Donation time is required
              </p>
            )}
          </div>

          {/* Request Message */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">
              Request Message
            </label>
            <textarea
              {...register('requestMessage', { required: true })}
              rows={4}
              placeholder="Explain why you need blood"
              className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10
                border border-gray-300 dark:border-red-800/50
                text-gray-900 dark:text-gray-500
                focus:outline-none focus:border-red-500"
            />
            {errors.requestMessage && (
              <p className="text-red-500 text-sm mt-1">
                Request message is required
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
            >
              Request Blood
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
