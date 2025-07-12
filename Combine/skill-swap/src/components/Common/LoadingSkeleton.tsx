import React from 'react';

const UserCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 animate-pulse">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          <div className="space-y-2 mt-4">
            <div className="h-3 bg-gray-700 rounded w-1/4"></div>
            <div className="flex space-x-2">
              <div className="h-6 bg-gray-700 rounded-full w-16"></div>
              <div className="h-6 bg-gray-700 rounded-full w-20"></div>
              <div className="h-6 bg-gray-700 rounded-full w-14"></div>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="h-3 bg-gray-700 rounded w-1/4"></div>
            <div className="flex space-x-2">
              <div className="h-6 bg-gray-700 rounded-full w-18"></div>
              <div className="h-6 bg-gray-700 rounded-full w-16"></div>
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <div className="h-8 bg-gray-700 rounded flex-1"></div>
            <div className="h-8 bg-gray-700 rounded flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCardSkeleton;