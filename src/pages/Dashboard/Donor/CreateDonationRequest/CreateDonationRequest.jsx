import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router';
import {
  FaUser,
  FaHospital,
  FaMapMarkerAlt,
  FaTint,
  FaCalendarAlt,
  FaClock,
  FaCommentDots,
} from 'react-icons/fa';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const CreateDonationRequest = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/district.json')
      .then(res => res.json())
      .then(data => setDistricts(data));
    fetch('/upazilas.json')
      .then(res => res.json())
      .then(data => setUpazilas(data));
  }, []);

  const filteredUpazilas = upazilas.filter(u => {
    const districtObj = districts.find(d => d.name === selectedDistrict);
    return districtObj ? u.district_id === districtObj.id : false;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateRequest = async data => {
    const res = await axiosSecure.post('/donationRequests', {
      ...data,
      status: 'pending',
    });
    if (res.data.insertedId) {
      Swal.fire({
        icon: 'success',
        title: 'Request Created',
        timer: 2000,
        showConfirmButton: false,
      });
      navigate('/dashboard/my-donation-requests');
    }
  };

  return (
    <div className="min-h-screen bg-base-200/50 py-12 px-4 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-base-100 rounded-[2rem] shadow-xl border border-base-300 overflow-hidden">
        {/* Simple Header */}
        {/* Header Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 p-10 text-white flex justify-between items-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tight uppercase">
              New Blood Request
            </h2>
            <p className="text-red-100 text-sm font-medium mt-1 opacity-90">
              Every drop counts. Save a life today.
            </p>
          </div>
          <FaTint className="text-white/20 text-8xl absolute -right-4 -bottom-4 rotate-12" />
          <FaTint className="text-white text-4xl animate-pulse relative z-10" />
        </div>

        <form
          onSubmit={handleSubmit(handleCreateRequest)}
          className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Read Only Fields - Red Tinted */}
          <InputWrapper label="Requester Name" icon={<FaUser />}>
            <input
              value={user?.displayName}
              readOnly
              {...register('requesterName')}
              className="input-field bg-red-500/5 border-red-200/50 cursor-not-allowed opacity-70"
            />
          </InputWrapper>

          <InputWrapper label="Requester Email" icon={<FaUser />}>
            <input
              value={user?.email}
              readOnly
              {...register('requesterEmail')}
              className="input-field bg-red-500/5 border-red-200/50 cursor-not-allowed opacity-70"
            />
          </InputWrapper>

          {/* User Inputs */}
          <InputWrapper
            label="Recipient Name"
            icon={<FaUser />}
            error={errors.recipientName}
          >
            <input
              {...register('recipientName', { required: true })}
              placeholder="Patient Full Name"
              className="input-field"
            />
          </InputWrapper>

          <InputWrapper
            label="Blood Group"
            icon={<FaTint />}
            error={errors.bloodGroup}
          >
            <select
              {...register('bloodGroup', { required: true })}
              className="input-field appearance-none"
            >
              <option value="">Select Group</option>
              {bloodGroups.map(bg => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </InputWrapper>

          <InputWrapper
            label="District"
            icon={<FaMapMarkerAlt />}
            error={errors.district}
          >
            <select
              {...register('district', { required: true })}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="input-field appearance-none"
            >
              <option value="">Select District</option>
              {districts.map(d => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </InputWrapper>

          <InputWrapper
            label="Upazila"
            icon={<FaMapMarkerAlt />}
            error={errors.upazila}
          >
            <select
              {...register('upazila', { required: true })}
              className="input-field appearance-none"
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map(u => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </InputWrapper>

          <InputWrapper
            label="Hospital"
            icon={<FaHospital />}
            error={errors.hospitalName}
          >
            <input
              {...register('hospitalName', { required: true })}
              placeholder="Hospital Name"
              className="input-field"
            />
          </InputWrapper>

          <InputWrapper
            label="Donation Date"
            icon={<FaCalendarAlt />}
            error={errors.donationDate}
          >
            <input
              type="date"
              {...register('donationDate', { required: true })}
              className="input-field"
            />
          </InputWrapper>

          <InputWrapper
            label="Arrival Time"
            icon={<FaClock />}
            error={errors.donationTime}
          >
            <input
              type="time"
              {...register('donationTime', { required: true })}
              className="input-field"
            />
          </InputWrapper>

          <InputWrapper
            label="Address"
            icon={<FaMapMarkerAlt />}
            error={errors.fullAddress}
          >
            <input
              {...register('fullAddress', { required: true })}
              placeholder="Full Address"
              className="input-field"
            />
          </InputWrapper>

          <div className="md:col-span-2">
            <InputWrapper
              label="Message"
              icon={<FaCommentDots />}
              error={errors.requestMessage}
            >
              <textarea
                {...register('requestMessage', { required: true })}
                rows={3}
                placeholder="Why is this blood needed?"
                className="input-field resize-none py-4"
              />
            </InputWrapper>
          </div>

          <div className="md:col-span-2 pt-6">
            <button
              type="submit"
              className="w-full bg-primary hover:bg-red-600 text-white font-black uppercase text-xs tracking-[0.3em] py-5 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 0.8rem 1.2rem;
          border-radius: 1rem;
          border: 1px solid var(--color-base-300);
          background: var(--color-base-100);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-base-content);
          transition: all 0.2s ease;
        }
        .input-field:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
        }
      `}</style>
    </div>
  );
};

// Internal Helper
const InputWrapper = ({ label, icon, children, error }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 px-1 opacity-50">
      <div className="relative w-9 h-9 rounded-xl bg-linear-to-br from-white to-red-100 border border-red-100 shadow-sm flex items-center justify-center text-red-600 transition-transform duration-300 group-hover:rotate-12">
        <span className="text-sm drop-shadow-[0_2px_2px_rgba(239,68,68,0.3)]">
          {icon}
        </span>
      </div>
      <label className="text-[10px] font-black uppercase tracking-widest">
        {label}
      </label>
    </div>
    {children}
    {error && (
      <p className="text-[10px] text-primary font-bold italic pl-1 uppercase tracking-tighter">
        Required Field
      </p>
    )}
  </div>
);

export default CreateDonationRequest;
