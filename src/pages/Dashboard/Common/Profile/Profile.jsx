import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);

  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 border border-red-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-red-600">My Profile</h2>

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={() => setEditMode(false)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
          >
            Save
          </button>
        )}
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <img
          src={user.photoURL}
          alt="avatar"
          referrerPolicy="no-referrer"
          className="w-28 h-28 rounded-full border-4 border-red-200 shadow"
        />
      </div>

      {/* Form */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            defaultValue={user.displayName}
            disabled={!editMode}
            className="w-full mt-1 px-3 py-2 border rounded-lg dark:border-red-800/50 focus:border-red-500 dark:bg-red-900/10 disabled:cursor-not-allowed focus:outline-none"
          />
        </div>

        {/* Email (Always disabled) */}
        <div>
          <label className="font-medium text-gray-600">Email</label>
          <input
            type="email"
            defaultValue={user.email}
            disabled
            className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
          />
        </div>

        {/* District */}
        <div>
          <label className="font-medium text-gray-600">District</label>
          <input
            type="text"
            defaultValue={user.district}
            disabled={!editMode}
            className="w-full mt-1 px-3 py-2 border rounded-lg dark:border-red-800/50 focus:border-red-500 dark:bg-red-900/10 disabled:cursor-not-allowed focus:outline-none"
          />
        </div>

        {/* Upazila */}
        <div>
          <label className="font-medium text-gray-600">Upazila</label>
          <input
            type="text"
            defaultValue={user.upazila}
            disabled={!editMode}
            className="w-full mt-1 px-3 py-2 border rounded-lg dark:border-red-800/50 focus:border-red-500 dark:bg-red-900/10 disabled:cursor-not-allowed focus:outline-none"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="font-medium text-gray-600">Blood Group</label>
          <select
            defaultValue={user.bloodGroup}
            disabled={!editMode}
            className="w-full mt-1 px-3 py-2 border rounded-lg dark:border-red-800/50 focus:border-red-500 dark:bg-red-900/10 disabled:cursor-not-allowed focus:outline-none"
          >
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Profile;
