import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

// Example prefilled donation request data
const exampleRequest = {
  id: 'req001',
  recipientName: 'Rahim Uddin',
  district: 'Dhaka',
  upazila: 'Uttara',
  hospital: 'Dhaka Medical College Hospital',
  address: 'Zahir Raihan Rd, Dhaka',
  date: '2025-12-10',
  time: '10:00',
  bloodGroup: 'A+',
  message: 'Urgent need of blood for surgery',
};

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const MyDonationEdit = () => {
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(
    exampleRequest.district
  );
  console.log(selectedDistrict);

  // Load districts & upazilas (you can replace with actual JSON)
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

  // Filter upazilas based on selected district
  const filteredUpazilas = upazilas.filter(
    u => u.district_id.toString() === selectedDistrict
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      recipientName: exampleRequest.recipientName,
      hospital: exampleRequest.hospital,
      district: exampleRequest.district,
      upazila: exampleRequest.upazila,
      fullAddress: exampleRequest.address,
      bloodGroup: exampleRequest.bloodGroup,
      donationDate: exampleRequest.date,
      donationTime: exampleRequest.time,
      requestMessage: exampleRequest.message,
    },
  });

  const onSubmit = data => {
    console.log('Updated Donation Request:', data);
    alert('Donation request updated successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-6 md:px-20 bg-linear-to-b from-red-50 to-white dark:from-[#150c0c] dark:to-[#0d0b0b]">
      <div className="max-w-3xl bg-white/60 dark:bg-[#1a1a1a]/70 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-red-400/30 w-full">
        <h1 className="text-3xl md:text-4xl font-extrabold text-red-700 mb-6 text-center">
          Edit Donation Request
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Recipient Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Recipient Name
            </label>
            <input
              type="text"
              {...register('recipientName', { required: true })}
              className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10 border border-gray-300 dark:border-red-800/50 text-gray-900 dark:text-gray-500 focus:outline-none focus:border-red-500"
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
              {...register('hospital', { required: true })}
              className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10 border border-gray-300 dark:border-red-800/50 text-gray-900 dark:text-gray-500 focus:outline-none focus:border-red-500"
            />
            {errors.hospital && (
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
              className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10 border border-gray-300 dark:border-red-800/50 text-gray-900 dark:text-gray-500 focus:outline-none focus:border-red-500"
            >
              <option value="">Select District</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>
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
              className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10 border border-gray-300 dark:border-red-800/50 text-gray-900 dark:text-gray-500 focus:outline-none focus:border-red-500"
            >
              <option selected value="">
                Select Upazila
              </option>
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
              className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10 border border-gray-300 dark:border-red-800/50 text-gray-900 dark:text-gray-500 focus:outline-none focus:border-red-500"
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
              className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10 border border-gray-300 dark:border-red-800/50 text-gray-900 dark:text-gray-500 focus:outline-none focus:border-red-500"
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
              className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10 border border-gray-300 dark:border-red-800/50 text-gray-900 dark:text-gray-500 focus:outline-none focus:border-red-500"
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
              className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10 border border-gray-300 dark:border-red-800/50 text-gray-900 dark:text-gray-500 focus:outline-none focus:border-red-500"
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
              className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-500/10 border border-gray-300 dark:border-red-800/50 text-gray-900 dark:text-gray-500 focus:outline-none focus:border-red-500"
            />
            {errors.requestMessage && (
              <p className="text-red-500 text-sm mt-1">
                Request message is required
              </p>
            )}
          </div>

          {/* Submit & Cancel */}
          <div className="md:col-span-2 text-center mt-4 flex gap-4 justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
            >
              Update Request
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyDonationEdit;
