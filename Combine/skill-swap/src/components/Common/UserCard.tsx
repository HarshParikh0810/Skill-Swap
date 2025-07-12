import React from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, StarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { User } from '../../types';

interface UserCardProps {
  user: User;
  onViewProfile: (user: User) => void;
  onRequest?: (user: User) => void;
  showRequestButton?: boolean;
  isRequestDisabled?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onViewProfile,
  onRequest,
  showRequestButton = true,
  isRequestDisabled = false,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="card p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {user.profilePhoto ? (
            <img
              src={user.profilePhoto}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-600 hover:border-sky-500/50 transition-colors"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
              <UserCircleIcon className="w-10 h-10 text-gray-400" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white truncate">
              {user.name}
            </h3>
            <div className="flex items-center space-x-1 bg-yellow-400/20 px-2 py-1 rounded-full">
              <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-yellow-400 font-medium">{user.rating}</span>
            </div>
          </div>
          
          {user.location && (
            <div className="flex items-center mb-3">
              <MapPinIcon className="w-4 h-4 text-gray-400 mr-1" />
              <span className="text-sm text-gray-400">{user.location}</span>
            </div>
          )}
          
          <div className="space-y-3">
            <div>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-2">
                Skills Offered
              </span>
              <div className="flex flex-wrap gap-1">
                {user.skillsOffered.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="skill-tag-offered text-xs"
                  >
                    {skill}
                  </span>
                ))}
                {user.skillsOffered.length > 3 && (
                  <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
                    +{user.skillsOffered.length - 3}
                  </span>
                )}
              </div>
            </div>
            
            <div>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-2">
                Skills Wanted
              </span>
              <div className="flex flex-wrap gap-1">
                {user.skillsWanted.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="skill-tag-wanted text-xs"
                  >
                    {skill}
                  </span>
                ))}
                {user.skillsWanted.length > 3 && (
                  <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
                    +{user.skillsWanted.length - 3}
                  </span>
                )}
              </div>
            </div>
            
            <div>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-2">
                Available
              </span>
              <div className="flex flex-wrap gap-1">
                {user.availability.map((time, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300 border border-gray-600"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-6">
            <button
              onClick={() => onViewProfile(user)}
              className="flex-1 btn-secondary text-sm py-2"
            >
              View Profile
            </button>
            {showRequestButton && (
              <button
                onClick={() => onRequest?.(user)}
                disabled={isRequestDisabled}
                className={`flex-1 text-sm py-2 px-4 rounded-xl font-medium transition-all duration-200 ${
                  isRequestDisabled
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                Request
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;