import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Register = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch('/district.json')
      .then(res => res.json())
      .then(data => setDistricts(data));

    fetch('/upazilas.json')
      .then(res => res.json())
      .then(data => setUpazilas(data));
  }, []);

  const filteredUpazilas = upazilas.filter(u => {
    // Name থেকে district object খুঁজে বের করা
    const districtObj = districts.find(d => d.name === selectedDistrict);
    if (!districtObj) return false; // যদি district name না মিলে
    return u.district_id === districtObj.id; // id match হলে true
  });

  const handleRegister = data => {
    if (data.password !== data.confirm_password) {
      alert('Passwords do not match!');
      return;
    }
    const profilePhoto = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append('image', profilePhoto);
        const image_api_key = `https://api.imgbb.com/1/upload?&key=${
          import.meta.env.VITE_IMAGE_HOST
        }`;

        axios.post(image_api_key, formData).then(res => {
          console.log('after data', res.data.data.url);
          // update user profile  here

          const updateProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          updateUserProfile(updateProfile)
            .then(result => console.log(result))
            .catch(error => console.log(error));
        });
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-red-50 to-white dark:from-[#150c0c] dark:to-[#0d0b0b] py-20">
      <div className="container mx-auto px-[3%] flex justify-center">
        <div className="max-w-3xl bg-white/60 dark:bg-[#1a1a1a]/70 backdrop-blur-2xl p-6 md:p-10 rounded-3xl shadow-2xl border border-red-400/30">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-red-600 via-red-500 to-pink-500 drop-shadow-lg animate-linear-x">
              Register as Donor
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg mt-4 max-w-xl mx-auto">
              Create your account and help save lives by becoming a blood donor.
              Every registration counts!
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleRegister)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Avatar */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                Avatar
              </label>
              <input
                type="file"
                {...register('avatar', { required: true })}
                className="block w-full cursor-pointer text-sm file:px-4 file:py-2 file:border file:rounded-xl file:border-red-400 file:bg-red-50 dark:file:bg-red-900/10 file:text-red-700 dark:file:text-red-400 text-white file:shadow-md hover:file:bg-red-100 transition-all"
              />
              {errors.avatar && (
                <p className="text-red-500 text-sm mt-1">Avatar is required</p>
              )}
            </div>

            {/* Blood Group */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                Blood Group
              </label>
              <select
                {...register('bloodGroup', { required: true })}
                className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-900/10 border border-gray-300 dark:border-red-800/50 text-gray-900 dark:text-gray-500 focus:outline-none focus:border-red-500 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <option value="">Select Blood Group</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
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

            {/* Name */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                {...register('name', { required: true })}
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/10 border border-gray-300 dark:border-red-800/50 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-red-500 shadow-sm hover:shadow-md transition-all duration-300"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                {...register('email', { required: true })}
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/10 border border-gray-300 dark:border-red-800/50 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-red-500 shadow-sm hover:shadow-md transition-all duration-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* District */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                District
              </label>
              <select
                {...register('district', { required: true })}
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-900/10 border border-gray-300 dark:border-red-800/50 text-gray-900 dark:text-gray-500 focus:outline-none focus:border-red-500 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <option value="">Select District</option>
                {districts.map(d => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="text-red-500 text-sm mt-1">
                  District is required
                </p>
              )}
            </div>

            {/* Upazila */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                Upazila
              </label>
              <select
                {...register('upazila', { required: true })}
                className="w-full px-4 py-3 rounded-xl bg-red-300 dark:bg-red-900/10 border border-gray-300 dark:border-red-800/50 text-gray-900 dark:text-gray-500 focus:outline-none focus:border-red-500 shadow-sm hover:shadow-md transition-all duration-300"
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

            {/* Password */}
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: true, minLength: 6 })}
                placeholder="Password"
                className="w-full px-4 py-3 pr-10 rounded-xl bg-red-50 dark:bg-red-900/10 border border-gray-300 dark:border-red-800/50 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-red-500 shadow-sm hover:shadow-md transition-all duration-300"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-11 cursor-pointer text-gray-500 dark:text-red-200"
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.type === 'minLength'
                    ? 'Password must be at least 6 characters'
                    : 'Password is required'}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block mb-2 text-gray-600 dark:text-gray-400 font-medium">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirm_password', { required: true })}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 pr-10 rounded-xl bg-red-50 dark:bg-red-900/10 border border-gray-300 dark:border-red-800/50 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-red-500 shadow-sm hover:shadow-md transition-all duration-300"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-11 cursor-pointer text-gray-500 dark:text-red-200"
              >
                {showConfirmPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </span>
              {errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">
                  Confirm password is required
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="md:col-span-2 mt-4">
              <button className="w-full bg-red-600 text-white py-3 rounded-3xl font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl">
                Register
              </button>
              <p className="text-sm text-gray-500 text-center mt-3">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-red-600 dark:text-red-400 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
