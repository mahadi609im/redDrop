import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log('Login Data:', data);
    // এখানে API call করতে পারো user authentication এর জন্য
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-red-50 to-white dark:from-[#150c0c] dark:to-[#0d0b0b] py-20">
      <div className="container mx-auto px-[3%] flex justify-center">
        <div className="max-w-lg bg-white/60 dark:bg-[#1a1a1a]/70 backdrop-blur-2xl p-6 md:p-10 rounded-3xl shadow-2xl border border-red-400/30">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-red-600 via-red-500 to-pink-500 drop-shadow-lg text-center animate-linear-x">
              Login to Your Account
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg text-center mt-4 max-w-xl mx-auto">
              Enter your email and password to access your account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-6"
          >
            {/* Email */}
            <div>
              <label className="block mb-2 text-gray-600 dark:text-gray-400 font-medium">
                Email
              </label>
              <input
                type="email"
                {...register('email', { required: true })}
                placeholder="Your Email"
                className="
                  w-full
                  px-4 py-3
                  rounded-xl
                  bg-red-50 dark:bg-red-900/10
                  border border-gray-300 dark:border-red-800/50
                  text-gray-900 dark:text-gray-200
                  focus:outline-none focus:border-red-500 
                  shadow-sm hover:shadow-md
                  transition-all duration-300
                "
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-gray-600 dark:text-gray-400 font-medium">
                Password
              </label>
              <input
                type="password"
                {...register('password', { required: true })}
                placeholder="Your Password"
                className="
                  w-full
                  px-4 py-3
                  rounded-xl
                  bg-red-50
                  border border-gray-300 dark:border-red-800/50 focus:border-red-500 dark:bg-red-900/10
                  text-gray-900 dark:text-gray-200
                  focus:outline-none  
                  shadow-sm hover:shadow-md
                  transition-all duration-300
                "
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="mt-4">
              <button className="w-full bg-red-600 text-white py-3 rounded-3xl font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl">
                Login
              </button>
              <p className="text-sm text-gray-500 text-center mt-3">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-red-600 dark:text-red-400 hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
