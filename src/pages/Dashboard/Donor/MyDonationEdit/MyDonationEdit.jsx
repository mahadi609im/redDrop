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
import {
  FaUser,
  FaHospital,
  FaMapMarkerAlt,
  FaTint,
  FaCalendarAlt,
  FaClock,
  FaCommentDots,
  FaArrowLeft,
} from 'react-icons/fa';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const MyDonationEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const requestData = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

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

  const watchedDistrict = watch('district');

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

  const filteredUpazilas = () => {
    if (!watchedDistrict) return [];
    const districtObj = districts.find(d => d.name === watchedDistrict);
    if (!districtObj) return [];
    return upazilas
      .filter(u => u.district_id === districtObj.id)
      .map(u => u.name);
  };

  useEffect(() => {
    if (requestData.upazila) setValue('upazila', requestData.upazila);
  }, [requestData.upazila, setValue]);

  useEffect(() => {
    if (watchedDistrict && watchedDistrict !== requestData.district) {
      setValue('upazila', '');
    }
  }, [watchedDistrict, requestData.district, setValue]);

  const handleEditDonationRequests = async data => {
    try {
      const res = await axiosSecure.patch(`/donationRequests/${id}`, data);
      if (res.data.modifiedCount > 0) {
        await Swal.fire({
          icon: 'success',
          title: 'Request Updated',
          text: 'The donation details have been successfully modified.',
          confirmButtonColor: '#ef4444',
          timer: 2000,
          showConfirmButton: false,
        });
        navigate(location?.state || '/dashboard/my-donation-requests');
      } else {
        Swal.fire({
          icon: 'info',
          title: 'No Changes',
          text: 'You haven’t modified any fields.',
          confirmButtonColor: '#ef4444',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Something went wrong on our end.',
        confirmButtonColor: '#ef4444',
      });
    }
  };

  return (
    <section className="min-h-screen py-10 px-4 bg-base-200/50 flex items-center justify-center">
      <div className="max-w-4xl w-full relative">
        {/* Decorative Background Glow */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 blur-[80px] rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-500/10 blur-[80px] rounded-full"></div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-base-content/40 hover:text-primary mb-6 transition-all font-black text-[10px] tracking-[0.2em]"
        >
          <FaArrowLeft /> DISCARD CHANGES
        </button>

        <div className="backdrop-blur-md bg-base-100/70 border border-base-300 rounded-[2.5rem] shadow-2xl overflow-hidden">
          {/* Form Header */}
          <div className="p-8 md:p-10 border-b border-base-300/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-black text-base-content tracking-tight">
                Edit <span className="text-primary">Request</span>
              </h1>
              <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest mt-1">
                Refining Donation Details
              </p>
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <FaTint size={30} className="animate-pulse" />
            </div>
          </div>

          {/* Form Body */}
          <form
            onSubmit={handleSubmit(handleEditDonationRequests)}
            className="p-8 md:p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Recipient Name */}
              <InputGroup
                icon={<FaUser />}
                label="Recipient Name"
                error={errors.recipientName}
              >
                <input
                  type="text"
                  {...register('recipientName', { required: true })}
                  placeholder="Full Name"
                  className="input-custom shadow-sm"
                />
              </InputGroup>

              {/* Blood Group */}
              <InputGroup
                icon={<FaTint />}
                label="Blood Group"
                error={errors.bloodGroup}
              >
                <div className="relative">
                  <select
                    {...register('bloodGroup', { required: true })}
                    className="input-custom appearance-none cursor-pointer w-full"
                  >
                    {/* Default placeholder option */}
                    <option
                      value=""
                      className="bg-white dark:bg-[#1a1a1a] text-gray-500"
                    >
                      Select Blood Group
                    </option>

                    {/* Mapping blood groups with dark mode support */}
                    {bloodGroups.map(bg => (
                      <option
                        key={bg}
                        value={bg}
                        className="bg-white dark:bg-[#1a1a1a] text-base-content dark:text-gray-200"
                      >
                        {bg}
                      </option>
                    ))}
                  </select>

                  {/* Custom Dropdown Arrow (Optional: appearance-none use korle eta lagbe) */}
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none opacity-40">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </InputGroup>

              {/* Hospital */}
              <InputGroup
                icon={<FaHospital />}
                label="Hospital Name"
                error={errors.hospitalName}
              >
                <input
                  type="text"
                  {...register('hospitalName', { required: true })}
                  placeholder="Medical Center Name"
                  className="input-custom"
                />
              </InputGroup>

              {/* Donation Date */}
              <InputGroup
                icon={<FaCalendarAlt />}
                label="Donation Date"
                error={errors.donationDate}
              >
                <input
                  type="date"
                  {...register('donationDate', { required: true })}
                  className="input-custom"
                />
              </InputGroup>

              {/* District */}
              <InputGroup
                icon={<FaMapMarkerAlt />}
                label="District"
                error={errors.district}
              >
                <div className="relative group">
                  <select
                    {...register('district', { required: true })}
                    onChange={e => setValue('district', e.target.value)}
                    className="input-custom appearance-none cursor-pointer w-full pr-10"
                  >
                    <option
                      value=""
                      className="bg-white dark:bg-[#1a1a1a] text-gray-500"
                    >
                      Pick District
                    </option>
                    {districts.map(d => (
                      <option
                        key={d.id}
                        value={d.name}
                        className="bg-white dark:bg-[#1a1a1a] text-base-content dark:text-gray-200"
                      >
                        {d.name}
                      </option>
                    ))}
                  </select>

                  {/* Custom Arrow Icon */}
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-base-content/30 group-focus-within:text-primary transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </InputGroup>

              {/* Donation Time */}
              <InputGroup
                icon={<FaClock />}
                label="Donation Time"
                error={errors.donationTime}
              >
                <input
                  type="time"
                  {...register('donationTime', { required: true })}
                  className="input-custom"
                />
              </InputGroup>

              {/* Upazila */}
              <InputGroup
                icon={<FaMapMarkerAlt />}
                label="Upazila"
                error={errors.upazila}
              >
                <div className="relative group">
                  <select
                    {...register('upazila', { required: true })}
                    className="input-custom appearance-none cursor-pointer w-full pr-10"
                  >
                    <option
                      value=""
                      className="bg-white dark:bg-[#1a1a1a] text-gray-500"
                    >
                      Pick Upazila
                    </option>
                    {filteredUpazilas().map(u => (
                      <option
                        key={u}
                        value={u}
                        className="bg-white dark:bg-[#1a1a1a] text-base-content dark:text-gray-200"
                      >
                        {u}
                      </option>
                    ))}
                  </select>

                  {/* Custom Arrow Icon */}
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-base-content/30 group-focus-within:text-primary transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </InputGroup>

              {/* Full Address */}
              <InputGroup
                icon={<FaMapMarkerAlt />}
                label="Detailed Address"
                error={errors.fullAddress}
              >
                <input
                  type="text"
                  {...register('fullAddress', { required: true })}
                  placeholder="Street, Area, Landmark"
                  className="input-custom"
                />
              </InputGroup>

              {/* Request Message */}
              <div className="md:col-span-2">
                <InputGroup
                  icon={<FaCommentDots />}
                  label="Request Message"
                  error={errors.requestMessage}
                >
                  <textarea
                    {...register('requestMessage', { required: true })}
                    rows={3}
                    placeholder="Briefly describe the situation..."
                    className="input-custom py-4 resize-none"
                  />
                </InputGroup>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-primary to-red-700 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto px-10 py-4 bg-base-300/50 text-base-content font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-base-300 transition-all border border-base-300"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Minimal Footer Decor */}
          <div className="h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        </div>
      </div>

      <style jsx>{`
        .input-custom {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(150, 150, 150, 0.2);
          padding: 0.75rem 1rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: currentColor;
          transition: all 0.3s ease;
        }
        .input-custom:focus {
          outline: none;
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.05);
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
        }
        .dark .input-custom {
          background: rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  );
};

// Helper Sub-component
const InputGroup = ({ icon, label, children, error }) => (
  <div className="space-y-1.5">
    <div className="flex items-center gap-2 px-1">
      <span className="text-primary text-xs opacity-60">{icon}</span>
      <label className="text-[10px] font-black text-base-content/40 uppercase tracking-widest">
        {label}
      </label>
    </div>
    {children}
    {error && (
      <p className="text-[10px] font-bold text-red-500 mt-1 pl-1 uppercase tracking-tighter italic text-right">
        Field is Required
      </p>
    )}
  </div>
);

export default MyDonationEdit;
