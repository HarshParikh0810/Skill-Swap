import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PencilIcon, MapPinIcon, CalendarIcon, StarIcon, UserCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  if (!user) return null;

  const handleSave = () => {
    if (editedUser) {
      updateUser(editedUser);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const addSkill = (type: 'offered' | 'wanted') => {
    const skill = prompt(`Add a new ${type} skill:`);
    if (skill && editedUser) {
      if (type === 'offered') {
        setEditedUser({
          ...editedUser,
          skillsOffered: [...editedUser.skillsOffered, skill]
        });
      } else {
        setEditedUser({
          ...editedUser,
          skillsWanted: [...editedUser.skillsWanted, skill]
        });
      }
    }
  };

  const removeSkill = (type: 'offered' | 'wanted', index: number) => {
    if (editedUser) {
      if (type === 'offered') {
        setEditedUser({
          ...editedUser,
          skillsOffered: editedUser.skillsOffered.filter((_, i) => i !== index)
        });
      } else {
        setEditedUser({
          ...editedUser,
          skillsWanted: editedUser.skillsWanted.filter((_, i) => i !== index)
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex-shrink-0">
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="w-24 h-24 text-gray-400" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                  {user.location && (
                    <div className="flex items-center mt-1">
                      <MapPinIcon className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-gray-300">{user.location}</span>
                    </div>
                  )}
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center">
                      <StarIcon className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                      <span className="text-gray-300">{user.rating} rating</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 text-gray-400 mr-1" />
                      <span className="text-gray-300">
                        Joined {new Date(user.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <PencilIcon className="w-4 h-4" />
                  <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                </button>
              </div>
              
              {user.bio && (
                <p className="text-gray-300 mt-4">{user.bio}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Profile Settings</h2>
          
          <div className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editedUser?.name || ''}
                    onChange={(e) => setEditedUser(prev => prev ? {...prev, name: e.target.value} : null)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editedUser?.location || ''}
                    onChange={(e) => setEditedUser(prev => prev ? {...prev, location: e.target.value} : null)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={editedUser?.bio || ''}
                    onChange={(e) => setEditedUser(prev => prev ? {...prev, bio: e.target.value} : null)}
                    rows={3}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {user.isPublic ? (
                    <EyeIcon className="w-5 h-5 text-green-400" />
                  ) : (
                    <EyeSlashIcon className="w-5 h-5 text-red-400" />
                  )}
                  <span className="text-gray-300">
                    Profile is {user.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
                
                <button
                  onClick={() => updateUser({...user, isPublic: !user.isPublic})}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    user.isPublic
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  Make {user.isPublic ? 'Private' : 'Public'}
                </button>
              </div>
            )}
          </div>
          
          {isEditing && (
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSave}
                className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </motion.div>

        {/* Skills Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills Offered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Skills I Offer</h3>
              {isEditing && (
                <button
                  onClick={() => addSkill('offered')}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Add Skill
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {(isEditing ? editedUser?.skillsOffered : user.skillsOffered)?.map((skill, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sky-500/20 text-sky-300"
                >
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => removeSkill('offered', index)}
                      className="ml-2 text-sky-300 hover:text-white"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills Wanted */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Skills I Want</h3>
              {isEditing && (
                <button
                  onClick={() => addSkill('wanted')}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Add Skill
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {(isEditing ? editedUser?.skillsWanted : user.skillsWanted)?.map((skill, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-500/20 text-pink-300"
                >
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => removeSkill('wanted', index)}
                      className="ml-2 text-pink-300 hover:text-white"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700 mt-8"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Availability</h3>
          <div className="flex flex-wrap gap-2">
            {user.availability.map((time, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-300"
              >
                {time}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;