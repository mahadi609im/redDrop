import React, { use, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../Components/Loading/Loading';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  MapPin,
  Droplet,
  Camera,
  Eye,
  EyeOff,
  Globe,
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const {
    registerUser,
    updateUserProfile,
    setLoading,
    signInWithGoogle,
    loading,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  // Load Location Data
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

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      const user = result.user;

      const userInfo = {
        email: user?.email,
        displayName: user?.displayName,
        photoURL: user?.photoURL,
        bloodGroup: 'Not set',
        district: 'Not set',
        upazila: 'Not set',
        role: 'donor',
        status: 'active',
      };

      await axiosSecure.post('/users', userInfo);
      toast.success(`Welcome back, ${user.displayName}! 👋`);
      navigate('/');
    } catch (err) {
      setLoading(false);
      toast.error(err.message || 'Google Login Failed');
    }
  };

  const handleRegister = async data => {
    if (data.password !== data.confirm_password) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      setLoading(true);
      const profilePhoto = data.profilePhoto[0];
      const formData = new FormData();
      formData.append('image', profilePhoto);

      const image_api_key = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOST
      }`;
      const imgRes = await axios.post(image_api_key, formData);
      const photoURL = imgRes.data.data.url;

      await registerUser(data.email, data.password);

      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        role: 'donor',
        status: 'active',
      };

      await axiosSecure.post('/users', userInfo);
      await updateUserProfile({ displayName: data.name, photoURL });

      toast.success('Registration successful! Welcome to the team. ❤️');
      reset();
      navigate('/');
    } catch (err) {
      setLoading(false);
      toast.error(err.message || 'Registration failed');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen py-20 px-6 bg-base-100 text-base-content relative overflow-hidden flex items-center justify-center transition-colors duration-300">
      {/* Background Decor - Uses primary color with low opacity for glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full bg-base-100 dark:bg-base-200 rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] border border-base-300 p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            Join the <span className="text-primary">Lifesavers.</span>
          </h1>
          <p className="opacity-60 font-medium">
            Create your donor account today
          </p>
        </div>

        {/* Google Register */}
        <div className="mb-10">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-3 py-4 border-2 border-base-300 rounded-2xl font-bold hover:bg-base-300 transition-all active:scale-[0.98] group"
          >
            <FcGoogle
              size={24}
              className="group-hover:scale-110 transition-transform"
            />
            Continue with Google
          </button>

          <div className="relative my-10 text-center">
            <span className="absolute inset-x-0 top-1/2 h-px bg-base-300 -translate-y-1/2"></span>
            <span className="relative bg-base-100 dark:bg-base-200 px-4 text-[10px] font-black opacity-40 uppercase tracking-[0.3em]">
              Or register with email
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
        >
          {/* Input Fields Helper Function Style */}
          {[
            {
              label: 'Full Name',
              name: 'name',
              icon: <User size={18} />,
              type: 'text',
              placeholder: 'John Doe',
            },
            {
              label: 'Email Address',
              name: 'email',
              icon: <Mail size={18} />,
              type: 'email',
              placeholder: 'email@example.com',
            },
          ].map(field => (
            <div key={field.name} className="space-y-2">
              <label className="text-[10px] font-black opacity-50 uppercase tracking-widest ml-1">
                {field.label}
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:text-primary group-focus-within:opacity-100 transition-all">
                  {field.icon}
                </span>
                <input
                  {...register(field.name, { required: true })}
                  type={field.type}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-base-200 border border-transparent focus:bg-base-100 focus:border-primary focus:outline-none transition-all font-medium text-base-content"
                  placeholder={field.placeholder}
                />
              </div>
            </div>
          ))}

          {/* Blood Group */}
          <div className="space-y-2">
            <label className="text-[10px] font-black opacity-50 uppercase tracking-widest ml-1">
              Blood Group
            </label>
            <div className="relative group">
              <Droplet
                className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-60 group-focus-within:opacity-100"
                size={18}
              />
              <select
                {...register('bloodGroup', { required: true })}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-base-200 border border-transparent focus:bg-base-100 focus:border-primary focus:outline-none transition-all font-bold appearance-none cursor-pointer"
              >
                <option value="">Select Group</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Profile Image */}
          <div className="space-y-2">
            <label className="text-[10px] font-black opacity-50 uppercase tracking-widest ml-1">
              Profile Image
            </label>
            <div className="relative group">
              <Camera
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:text-primary group-focus-within:opacity-100"
                size={18}
              />
              <input
                type="file"
                {...register('profilePhoto', { required: true })}
                className="w-full pl-12 pr-4 py-[11px] rounded-2xl bg-base-200 border border-transparent text-sm file:hidden cursor-pointer"
              />
            </div>
          </div>

          {/* District */}
          <div className="space-y-2">
            <label className="text-[10px] font-black opacity-50 uppercase tracking-widest ml-1">
              District
            </label>
            <div className="relative group">
              <MapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:text-primary group-focus-within:opacity-100"
                size={18}
              />
              <select
                {...register('district', { required: true })}
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-base-200 border border-transparent focus:bg-base-100 focus:border-primary focus:outline-none transition-all font-medium appearance-none cursor-pointer"
              >
                <option value="">Select District</option>
                {districts.map(d => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Upazila */}
          <div className="space-y-2">
            <label className="text-[10px] font-black opacity-50 uppercase tracking-widest ml-1">
              Upazila
            </label>
            <div className="relative group">
              <Globe
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:text-primary group-focus-within:opacity-100"
                size={18}
              />
              <select
                {...register('upazila', { required: true })}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-base-200 border border-transparent focus:bg-base-100 focus:border-primary focus:outline-none transition-all font-medium appearance-none cursor-pointer disabled:opacity-30"
                disabled={!selectedDistrict}
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

          {/* Password Fields */}
          {[
            {
              label: 'Password',
              name: 'password',
              show: showPassword,
              setShow: setShowPassword,
            },
            {
              label: 'Confirm Password',
              name: 'confirm_password',
              show: showConfirmPassword,
              setShow: setShowConfirmPassword,
            },
          ].map(field => (
            <div key={field.name} className="space-y-2">
              <label className="text-[10px] font-black opacity-50 uppercase tracking-widest ml-1">
                {field.label}
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:text-primary group-focus-within:opacity-100"
                  size={18}
                />
                <input
                  type={field.show ? 'text' : 'password'}
                  {...register(field.name, { required: true, minLength: 6 })}
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-base-200 border border-transparent focus:bg-base-100 focus:border-primary focus:outline-none transition-all font-medium text-base-content"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => field.setShow(!field.show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:text-primary hover:opacity-100 transition-all"
                >
                  {field.show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="md:col-span-2 mt-8">
            <button className="w-full bg-primary hover:opacity-90 text-primary-content py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all active:scale-95">
              Create Account
            </button>
            <p className="text-center mt-8 text-sm font-medium opacity-60">
              Already a member?{' '}
              <Link
                to="/login"
                className="text-primary font-black hover:underline underline-offset-4 transition-all"
              >
                Login Here
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
