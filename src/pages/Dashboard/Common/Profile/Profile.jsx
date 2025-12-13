import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../../context/AuthContext';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FiEdit3, FiSave, FiXCircle } from 'react-icons/fi';
import useUserRole from '../../../../hooks/useUserRole';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const { user, updateUserProfile } = useContext(AuthContext);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const { statusData } = useUserRole();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  const watchedDistrict = watch('district');
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetch('/district.json')
      .then(res => res.json())
      .then(data => {
        setDistricts(data);
      });

    fetch('/upazilas.json')
      .then(res => res.json())
      .then(data => setUpazilas(data));
  }, []);

  const { data: userInfo = {}, refetch } = useQuery({
    queryKey: ['currentUser', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data[0];
    },
    enabled: !!user?.email,
  });

  // userInfo load হলে form reset করো
  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      reset({
        name: userInfo.displayName,
        email: userInfo.email,
        district: userInfo.district,
        upazila: userInfo.upazila,
        bloodGroup: userInfo.bloodGroup,
      });
    }
  }, [userInfo, reset]);

  // District change হলে upazila reset
  useEffect(() => {
    if (editMode && watchedDistrict && districts.length > 0) {
      const districtObj = districts.find(d => d.name === watchedDistrict);
      if (districtObj) {
        // যদি district change হয়, upazila reset করো
        if (watchedDistrict !== userInfo.district) {
          setValue('upazila', '');
        }
      }
    }
  }, [watchedDistrict, editMode, districts, userInfo.district, setValue]);

  const handlePhotoChange = e => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async data => {
    setIsSubmitting(true);
    console.log('forms DAta', data);

    try {
      let photoURL = userInfo.photoURL; // existing photo

      if (profilePhoto) {
        const formData = new FormData();
        formData.append('image', profilePhoto);

        const imgbbResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGE_HOST
          }`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const imgbbData = await imgbbResponse.json();
        if (imgbbData.success) {
          photoURL = imgbbData.data.url;
        }
      }

      // Backend API তে data পাঠাও
      const updateData = {
        displayName: data.name,
        district: data.district,
        upazila: data.upazila,
        bloodGroup: data.bloodGroup,
        photoURL: photoURL,
      };

      console.log('update Data', updateData);

      const response = await axiosSecure.patch('/users/profile', updateData);

      if (response.data) {
        // Firebase Auth profile update (optional)
        await updateUserProfile({
          displayName: data.name,
          photoURL: photoURL,
        });

        // Refetch updated data
        await refetch();
        // UI state reset
        setEditMode(false);
        setProfilePhoto(null);
        setPhotoPreview(null);

        // Page reload
        window.location.reload();
      }
    } catch (error) {
      console.error('Profile update error:', error);
      alert('❌ Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-red-50 to-rose-100 flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-3xl">
        <div className="absolute -inset-1 bg-linear-to-r from-rose-400/40 via-red-500/40 to-amber-400/40 blur-3xl -z-10 opacity-70" />

        <div className="bg-white/80 backdrop-blur-xl border border-rose-100/80 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-6 py-5 border-b border-rose-100 bg-linear-to-r from-rose-600 to-red-600">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-rose-100/80">
                Account
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                My Profile
              </h2>
              {statusData === 'active' ? (
                <p className="text-xs md:text-sm text-rose-100/90 mt-1">
                  Update your personal and donation information
                </p>
              ) : (
                <p className="text-xs md:text-sm text-rose-100/90 mt-1">
                  Your profile is blocked. You cannot update it.
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              {statusData === 'active' ? (
                <>
                  {editMode && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode(false);
                        setProfilePhoto(null);
                        setPhotoPreview(null);
                        reset({
                          name: userInfo.displayName,
                          email: userInfo.email,
                          district: userInfo.district,
                          upazila: userInfo.upazila,
                          bloodGroup: userInfo.bloodGroup,
                        });
                      }}
                      className="px-4 py-2 rounded-full text-sm font-medium border border-white/40 text-rose-50 bg-white/10 hover:bg-white/20 transition"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                  )}
                  {/* EDIT BUTTON */}
                  {!editMode && (
                    <button
                      type="button"
                      onClick={() => setEditMode(true)}
                      className="px-5 py-2.5 rounded-full text-sm font-semibold shadow-md transition flex items-center gap-2
           bg-white text-rose-700 hover:bg-rose-50"
                    >
                      <FiEdit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}

                  {/* SAVE BUTTON */}
                  {editMode && (
                    <button
                      type="submit"
                      form="profileForm"
                      disabled={isSubmitting}
                      className={`px-5 py-2.5 rounded-full text-sm font-semibold shadow-md transition flex items-center gap-2
           bg-green-500 text-white hover:bg-emerald-400
           ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <FiSave className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium bg-red-600 text-white">
                  <FiXCircle className="w-8 h-8" />
                </div>
              )}
            </div>
          </div>

          {/* Top content */}
          <div className="px-6 pt-6 pb-2">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              <div className="relative">
                <div className="w-28 h-28 rounded-2xl bg-linear-to-br from-rose-100 to-rose-200 border border-rose-100 shadow-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={photoPreview || userInfo?.photoURL}
                    alt="avatar"
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-md"
                  />
                </div>
                {editMode ? (
                  <div className="absolute -bottom-2 -right-2">
                    <input
                      type="file"
                      id="profilePhoto"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="profilePhoto"
                      className="cursor-pointer bg-linear-to-r from-red-600 to-rose-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-1"
                    >
                      📷 Change
                    </label>
                  </div>
                ) : (
                  <>
                    {userInfo.bloodGroup && (
                      <div className="absolute -bottom-2 -right-2 px-3 py-1.5 bg-linear-to-r from-red-600 to-rose-600 text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-1">
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/15">
                          🩸
                        </span>
                        {userInfo?.bloodGroup}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="flex-1 w-full">
                <h3 className="text-xl font-semibold text-gray-900">
                  {userInfo?.displayName || 'Donor Name'}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{userInfo?.email}</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="px-3 py-2 rounded-xl bg-rose-50 border border-rose-100 text-rose-700">
                    <p className="font-semibold">District</p>
                    <p className="mt-0.5 text-[11px] text-rose-500">
                      {userInfo?.district || 'Not set'}
                    </p>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-rose-50 border border-rose-100 text-rose-700">
                    <p className="font-semibold">Upazila</p>
                    <p className="mt-0.5 text-[11px] text-rose-500">
                      {userInfo?.upazila || 'Not set'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6">
            <div className="h-px w-full bg-linear-to-r from-transparent via-rose-100 to-transparent my-4" />
          </div>

          <form
            id="profileForm"
            onSubmit={handleSubmit(handleUpdateProfile)}
            className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold tracking-wide text-gray-500 mb-1.5">
                Full Name
              </label>
              <input
                {...register('name', {
                  required: editMode ? 'Name is required' : false,
                })}
                disabled={!editMode}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition
                  ${
                    editMode
                      ? 'bg-white border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100'
                      : 'bg-gray-50 border-gray-200 cursor-not-allowed text-gray-500'
                  }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold tracking-wide text-gray-500 mb-1.5">
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                disabled
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-gray-50 border border-gray-200 cursor-not-allowed text-gray-500"
              />
            </div>

            {/* District */}
            <div>
              <label className="block text-xs font-semibold tracking-wide text-gray-500 mb-1.5">
                District
              </label>
              <select
                {...register('district', {
                  required: editMode ? 'District is required' : false,
                })}
                disabled={!editMode}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none appearance-none bg-no-repeat bg-right pr-9 transition
                  ${
                    editMode
                      ? 'bg-white border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100'
                      : 'bg-gray-50 border-gray-200 cursor-not-allowed text-gray-500'
                  }`}
              >
                {!editMode ? (
                  <option value={userInfo.district}>{userInfo.district}</option>
                ) : (
                  <>
                    <option value={userInfo.district} disabled={true}>
                      {userInfo.district}
                    </option>
                    {districts.map(d => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
              {errors.district && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.district.message}
                </p>
              )}
            </div>

            {/* Upazila */}
            <div>
              <label className="block text-xs font-semibold tracking-wide text-gray-500 mb-1.5">
                Upazila
              </label>
              <select
                {...register('upazila', {
                  required: editMode ? 'Upazila is required' : false,
                })}
                disabled={!editMode || !watch('district')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none appearance-none bg-no-repeat bg-right pr-9 transition
                  ${
                    editMode
                      ? 'bg-white border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100'
                      : 'bg-gray-50 border-gray-200 cursor-not-allowed text-gray-500'
                  }`}
              >
                {!editMode ? (
                  <option value={userInfo.upazila}>{userInfo.upazila}</option>
                ) : (
                  <>
                    <option value={userInfo.upazila} disabled={true}>
                      {userInfo.upazila}
                    </option>
                    {watch('district') &&
                      districts.length > 0 &&
                      upazilas.length > 0 &&
                      (() => {
                        const districtObj = districts.find(
                          d => d.name === watch('district')
                        );
                        if (districtObj) {
                          const filtered = upazilas.filter(
                            u => u.district_id === districtObj.id
                          );
                          return filtered.map(u => (
                            <option key={u.id} value={u.name}>
                              {u.name}
                            </option>
                          ));
                        }
                        return null;
                      })()}
                  </>
                )}
              </select>
              {errors.upazila && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.upazila.message}
                </p>
              )}
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-xs font-semibold tracking-wide text-gray-500 mb-1.5">
                Blood Group
              </label>
              <select
                {...register('bloodGroup', {
                  required: editMode ? 'Blood group is required' : false,
                })}
                disabled={!editMode}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none appearance-none bg-no-repeat bg-right pr-9 transition
                  ${
                    editMode
                      ? 'bg-white border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100'
                      : 'bg-gray-50 border-gray-200 cursor-not-allowed text-gray-500'
                  }`}
              >
                <option value="">Select blood group</option>
                {bloodGroups.map(g => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {errors.bloodGroup && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.bloodGroup.message}
                </p>
              )}
            </div>
          </form>

          <div className="px-6 pb-4 pt-3 bg-rose-50/60 border-t border-rose-100 flex flex-wrap gap-3 justify-between">
            <div
              className={`flex items-center gap-2 text-xs font-medium ${
                statusData === 'active' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                  statusData === 'active'
                    ? 'bg-green-600 text-white'
                    : 'bg-red-600 text-white'
                }`}
              >
                {statusData === 'active' ? '✓' : '✕'}
              </span>
              {statusData === 'active' ? 'Active user' : 'Blocked user'}
            </div>

            <div className="flex items-center gap-2 text-xs text-rose-600/80">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-rose-500 border border-rose-200 text-[11px]">
                🩺
              </span>
              Keep your information updated to get matched quickly
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
