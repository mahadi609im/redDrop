import React, { useEffect, useState } from 'react';
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const MyDonationEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const requestData = useLoaderData();
  const axiosSecure = useAxiosSecure();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      recipientName: requestData.recipientName || '',
      hospitalName: requestData.hospitalName || '',
      district: requestData.district || '',
      upazila: requestData.upazila || '',
      fullAddress: requestData.fullAddress || '',
      bloodGroup: requestData.bloodGroup || '',
      donationDate: requestData.donationDate || '',
      donationTime: requestData.donationTime || '',
      requestMessage: requestData.requestMessage || '',
    },
  });

  const location = useLocation();

  const watchedDistrict = watch('district');

  // Load district & upazila JSON data
  useEffect(() => {
    const loadData = async () => {
      try {
        const districtRes = await fetch('/district.json');
        const districtData = await districtRes.json();
        setDistricts(districtData);

        const upazilaRes = await fetch('/upazilas.json');
        const upazilaData = await upazilaRes.json();
        setUpazilas(upazilaData);
      } catch (error) {
        console.error('Error loading JSON files:', error);
      }
    };
    loadData();
  }, []);

  // Filter upazilas based on selected district
  const filteredUpazilas = () => {
    if (!watchedDistrict) return [];
    const districtObj = districts.find(d => d.name === watchedDistrict);
    if (!districtObj) return [];
    return upazilas
      .filter(u => u.district_id === districtObj.id)
      .map(u => u.name);
  };

  // Auto-fill upazila when page loads
  useEffect(() => {
    if (requestData.upazila) {
      setValue('upazila', requestData.upazila);
    }
  }, [requestData.upazila, setValue]);

  // Reset upazila if district changes
  useEffect(() => {
    if (watchedDistrict && watchedDistrict !== requestData.district) {
      setValue('upazila', '');
    }
  }, [watchedDistrict, requestData.district, setValue]);

  // Form submit handler
  const handleEditDonationRequests = async data => {
    try {
      const allowedFields = [
        'recipientName',
        'hospitalName',
        'district',
        'upazila',
        'fullAddress',
        'bloodGroup',
        'donationDate',
        'donationTime',
        'requestMessage',
      ];
      const filteredData = {};
      allowedFields.forEach(f => {
        if (data[f] !== undefined) filteredData[f] = data[f];
      });

      const res = await axiosSecure.patch(
        `/donationRequests/${id}`,
        filteredData
      );

      if (res.data.modifiedCount > 0) {
        await Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Donation request updated successfully.',
          confirmButtonColor: '#dc2626', // red theme
          timer: 1800,
          showConfirmButton: false,
        });

        reset(res.data);
        navigate(location?.state || '/dashboard/my-donation-requests');
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'No Changes',
          text: 'No changes detected or you are not allowed to update this request.',
          confirmButtonColor: '#dc2626',
        });
      }
    } catch (err) {
      console.error(err);
      alert('❌ Something went wrong while updating.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 md:px-20 bg-linear-to-b from-red-50 to-white dark:from-[#150c0c] dark:to-[#0d0b0b]">
      <div className="max-w-3xl bg-white/60 dark:bg-[#1a1a1a]/70 backdrop-blur-2xl  py-8 px-4 md:p-8 rounded-3xl shadow-2xl border border-red-400/30 w-full">
        <h1 className="text-2xl md:text-4xl font-extrabold text-red-700 mb-6 text-center">
          Edit Donation Request
        </h1>

        <form
          onSubmit={handleSubmit(handleEditDonationRequests)}
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
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-red-800/50 text-slate-400 focus:outline-none focus:border-red-500"
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
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-red-800/50 text-slate-400 focus:outline-none focus:border-red-500"
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
              value={watch('district')}
              onChange={e => setValue('district', e.target.value)}
              className="w-full px-4 py-3 rounded-xl  border border-gray-300 dark:border-red-800/50 text-gray-900 dark:text-slate-400 focus:outline-none focus:border-red-500"
            >
              <option disabled value="">
                Pick a district
              </option>
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
              value={watch('upazila')}
              onChange={e => setValue('upazila', e.target.value)}
              className="w-full px-4 py-3 rounded-xl  border border-gray-300 dark:border-red-800/50 text-gray-900 dark:text-slate-400 focus:outline-none focus:border-red-500"
            >
              <option disabled value="">
                Pick an upazila
              </option>
              {filteredUpazilas().map(u => (
                <option key={u} value={u}>
                  {u}
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
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-red-800/50 text-slate-400 focus:outline-none focus:border-red-500"
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
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-red-800/50 text-slate-400 focus:outline-none focus:border-red-500"
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
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-red-800/50 text-slate-400 focus:outline-none focus:border-red-500"
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
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-red-800/50 text-slate-400 focus:outline-none focus:border-red-500"
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
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-red-800/50 text-slate-400 focus:outline-none focus:border-red-500"
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
              className="px-6 py-3 text-sm md:text-base bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
            >
              Update Request
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 text-sm md:text-base bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-400 dark:hover:bg-gray-600 transition"
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
