import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../../context/AuthContext';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FiEdit3, FiSave, FiXCircle } from 'react-icons/fi';
import useUserRole from '../../../../hooks/useUserRole';
import Loading from '../../../../Components/Loading/Loading';

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

  const {
    data: userInfo = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['currentUser', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data[0];
    },
    enabled: !!user?.email,
  });

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

  useEffect(() => {
    if (editMode && watchedDistrict && districts.length > 0) {
      const districtObj = districts.find(d => d.name === watchedDistrict);
      if (districtObj) {
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
    try {
      let photoURL = userInfo.photoURL;
      if (profilePhoto) {
        const formData = new FormData();
        formData.append('image', profilePhoto);
        const imgbbResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGE_HOST
          }`,
          { method: 'POST', body: formData }
        );
        const imgbbData = await imgbbResponse.json();
        if (imgbbData.success) {
          photoURL = imgbbData.data.url;
        }
      }

      const updateData = {
        displayName: data.name,
        district: data.district,
        upazila: data.upazila,
        bloodGroup: data.bloodGroup,
        photoURL: photoURL,
      };

      const response = await axiosSecure.patch('/users/profile', updateData);
      if (response.data) {
        await updateUserProfile({ displayName: data.name, photoURL: photoURL });
        await refetch();
        setEditMode(false);
        setProfilePhoto(null);
        setPhotoPreview(null);
        window.location.reload();
      }
    } catch (error) {
      console.error('Profile update error:', error);
      alert('❌ Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center md:px-4 py-10">
      <div className="relative w-full max-w-3xl">
        {/* Glow effect matching theme primary */}
        <div className="absolute -inset-1 bg-primary/20 blur-3xl -z-10 opacity-70" />

        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-xl overflow-hidden text-base-content">
          {/* Header with Theme colors */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-6 py-5 border-b border-base-300 bg-primary text-primary-content">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] opacity-80">
                Account
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold">My Profile</h2>
              <p className="text-xs md:text-sm mt-1 opacity-90">
                {statusData === 'active'
                  ? 'Update your personal and donation information'
                  : 'Your profile is blocked. You cannot update it.'}
              </p>
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
                        reset();
                      }}
                      className="btn btn-sm btn-ghost border border-white/40 text-white hover:bg-white/20"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                  )}
                  {!editMode ? (
                    <button
                      type="button"
                      onClick={() => setEditMode(true)}
                      className="btn btn-sm bg-base-100 text-primary hover:bg-base-200 border-none font-bold shadow-md"
                    >
                      <FiEdit3 className="w-4 h-4" /> Edit Profile
                    </button>
                  ) : (
                    <button
                      type="submit"
                      form="profileForm"
                      disabled={isSubmitting}
                      className="btn btn-sm btn-success text-white shadow-md"
                    >
                      {isSubmitting ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <>
                          <FiSave className="w-4 h-4" /> Save Changes
                        </>
                      )}
                    </button>
                  )}
                </>
              ) : (
                <div className="text-error-content bg-error p-2 rounded-full shadow-lg">
                  <FiXCircle className="w-8 h-8" />
                </div>
              )}
            </div>
          </div>

          {/* User Info Content */}
          <div className="px-6 pt-6 pb-2">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              <div className="relative">
                <div className="w-28 h-28 rounded-2xl bg-base-200 border border-base-300 shadow-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={photoPreview || userInfo?.photoURL}
                    alt="avatar"
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 rounded-xl object-cover border-4 border-base-100 shadow-md"
                  />
                </div>
                {editMode && (
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
                      className="btn btn-xs btn-primary rounded-full shadow-lg"
                    >
                      📷 Change
                    </label>
                  </div>
                )}
                {!editMode && userInfo.bloodGroup && (
                  <div className="absolute -bottom-2 -right-2 badge badge-primary badge-lg py-3 shadow-lg font-bold">
                    🩸 {userInfo?.bloodGroup}
                  </div>
                )}
              </div>

              <div className="flex-1 w-full">
                <h3 className="text-xl font-bold">
                  {userInfo?.displayName || 'Donor Name'}
                </h3>
                <p className="text-sm opacity-60 mb-3">{userInfo?.email}</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="px-3 py-2 rounded-xl bg-base-200 border border-base-300">
                    <p className="font-semibold text-primary">District</p>
                    <p className="mt-0.5">{userInfo?.district || 'Not set'}</p>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-base-200 border border-base-300">
                    <p className="font-semibold text-primary">Upazila</p>
                    <p className="mt-0.5">{userInfo?.upazila || 'Not set'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6">
            <div className="divider opacity-50 my-4" />
          </div>

          <form
            id="profileForm"
            onSubmit={handleSubmit(handleUpdateProfile)}
            className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Input fields use daisyUI classes for theme support */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold opacity-60 uppercase text-[10px]">
                  Full Name
                </span>
              </label>
              <input
                {...register('name', {
                  required: editMode ? 'Name is required' : false,
                })}
                disabled={!editMode}
                className={`input input-bordered w-full rounded-xl ${
                  !editMode && 'bg-base-200 border-none'
                }`}
              />
              {errors.name && (
                <p className="text-error text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold opacity-60 uppercase text-[10px]">
                  Email
                </span>
              </label>
              <input
                type="email"
                {...register('email')}
                disabled
                className="input input-bordered w-full rounded-xl bg-base-200 border-none"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold opacity-60 uppercase text-[10px]">
                  District
                </span>
              </label>
              <select
                {...register('district', {
                  required: editMode ? 'District is required' : false,
                })}
                disabled={!editMode}
                className={`select select-bordered w-full rounded-xl ${
                  !editMode && 'bg-base-200 border-none'
                }`}
              >
                {!editMode ? (
                  <option value={userInfo.district}>{userInfo.district}</option>
                ) : (
                  <>
                    <option value={userInfo.district} disabled>
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
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold opacity-60 uppercase text-[10px]">
                  Upazila
                </span>
              </label>
              <select
                {...register('upazila', {
                  required: editMode ? 'Upazila is required' : false,
                })}
                disabled={!editMode || !watch('district')}
                className={`select select-bordered w-full rounded-xl ${
                  (!editMode || !watch('district')) && 'bg-base-200 border-none'
                }`}
              >
                {!editMode ? (
                  <option value={userInfo.upazila}>{userInfo.upazila}</option>
                ) : (
                  <>
                    <option value={userInfo.upazila} disabled>
                      {userInfo.upazila}
                    </option>
                    {watch('district') &&
                      districts.length > 0 &&
                      upazilas.length > 0 &&
                      (() => {
                        const dObj = districts.find(
                          d => d.name === watch('district')
                        );
                        return dObj
                          ? upazilas
                              .filter(u => u.district_id === dObj.id)
                              .map(u => (
                                <option key={u.id} value={u.name}>
                                  {u.name}
                                </option>
                              ))
                          : null;
                      })()}
                  </>
                )}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold opacity-60 uppercase text-[10px]">
                  Blood Group
                </span>
              </label>
              <select
                {...register('bloodGroup', {
                  required: editMode ? 'Blood group is required' : false,
                })}
                disabled={!editMode}
                className={`select select-bordered w-full rounded-xl ${
                  !editMode && 'bg-base-200 border-none'
                }`}
              >
                <option value="">Select blood group</option>
                {bloodGroups.map(g => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </form>

          {/* Footer Info */}
          <div className="px-6 pb-4 pt-3 bg-base-200 border-t border-base-300 flex flex-wrap gap-3 justify-between">
            <div
              className={`badge badge-ghost gap-2 font-bold p-3 ${
                statusData === 'active' ? 'text-success' : 'text-error'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  statusData === 'active'
                    ? 'bg-success animate-pulse'
                    : 'bg-error'
                }`}
              ></div>
              {statusData === 'active' ? 'Active user' : 'Blocked user'}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold opacity-50 uppercase tracking-widest">
              🩺 Information updated profile status
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
