import React, { use, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../Components/Loading/Loading';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, UserCheck } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, setLoading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setValue, // ইনপুট ফিল্ড অটো-ফিল করার জন্য
    formState: { errors },
  } = useForm();

  // Demo Login Handler
  const handleDemoLogin = () => {
    setValue('email', 'maha609im@gmail.com');
    setValue('password', 'gotosleep');
    toast.info('Demo credentials applied!', { autoClose: 2000 });
  };

  const onSubmit = data => {
    setLoading(true);
    loginUser(data.email, data.password)
      .then(() => {
        toast.success('Welcome back to RedDrop!');
        navigate(location?.state || '/');
      })
      .catch(err => {
        toast.error(err.message || 'Invalid credentials');
        setLoading(false);
      });
  };

  const { loading } = use(AuthContext);
  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] relative overflow-hidden py-20 px-6">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-50 rounded-full blur-[100px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-12 relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <LogIn size={32} />
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">
              Welcome <span className="text-red-600">Back.</span>
            </h1>
            <p className="text-gray-400 font-medium text-sm mt-2">
              Access your RedDrop dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/5 transition-all font-medium"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Secure Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors"
                  size={18}
                />
                <input
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/5 transition-all font-medium"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button className="w-full bg-red-600 hover:bg-gray-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-red-100 transition-all active:scale-95 flex items-center justify-center gap-2">
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8 text-center">
            <span className="absolute inset-x-0 top-1/2 h-px bg-gray-100 -translate-y-1/2"></span>
            <span className="relative bg-white px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Or Use Demo
            </span>
          </div>

          {/* Demo Login Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full bg-gray-50 hover:bg-red-50 border border-gray-100 text-gray-600 hover:text-red-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 group"
          >
            <UserCheck size={16} className="group-hover:animate-bounce" />
            Auto-Fill Credentials
          </button>

          <p className="text-center mt-8 text-sm font-medium text-gray-400">
            New here?{' '}
            <Link
              to="/register"
              className="text-red-600 font-black hover:underline underline-offset-4"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Branding Footer */}
        <p className="text-center mt-10 text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">
          RedDrop &copy; 2026 Professional
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
