import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  ExclamationTriangleIcon, 
  ChatBubbleLeftRightIcon,
  EyeIcon,
  NoSymbolIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { mockUsers } from '../data/mockData';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bannedUsers, setBannedUsers] = useState<string[]>([]);

  const handleBanUser = (userId: string) => {
    setBannedUsers(prev => [...prev, userId]);
  };

  const handleUnbanUser = (userId: string) => {
    setBannedUsers(prev => prev.filter(id => id !== userId));
  };

  const stats = {
    totalUsers: mockUsers.length,
    activeSwaps: 12,
    pendingReports: 3,
    totalFeedback: 45
  };

  const TabButton: React.FC<{ id: string; icon: React.ReactNode; label: string }> = ({ id, icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
        activeTab === id
          ? 'bg-sky-500 text-white'
          : 'text-gray-400 hover:text-white hover:bg-gray-700'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">
            Manage the Skill Swap Platform
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-4 border border-gray-700 mb-8"
        >
          <div className="flex flex-wrap gap-2">
            <TabButton
              id="dashboard"
              icon={<ChartBarIcon className="w-5 h-5" />}
              label="Dashboard"
            />
            <TabButton
              id="users"
              icon={<UserGroupIcon className="w-5 h-5" />}
              label="Users"
            />
            <TabButton
              id="reports"
              icon={<ExclamationTriangleIcon className="w-5 h-5" />}
              label="Reports"
            />
            <TabButton
              id="feedback"
              icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />}
              label="Feedback"
            />
          </div>
        </motion.div>

        {/* Content */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <UserGroupIcon className="w-8 h-8 text-sky-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                    <p className="text-gray-400 text-sm">Total Users</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <ChartBarIcon className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.activeSwaps}</p>
                    <p className="text-gray-400 text-sm">Active Swaps</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <ExclamationTriangleIcon className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.pendingReports}</p>
                    <p className="text-gray-400 text-sm">Pending Reports</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-pink-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.totalFeedback}</p>
                    <p className="text-gray-400 text-sm">Total Feedback</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <span className="text-gray-300">New user registration: Sarah Chen</span>
                  <span className="text-gray-400 text-sm">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <span className="text-gray-300">Swap completed: Marcus ↔️ Elena</span>
                  <span className="text-gray-400 text-sm">5 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <span className="text-gray-300">Report filed for inappropriate content</span>
                  <span className="text-gray-400 text-sm">1 day ago</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-xl border border-gray-700"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">User Management</h3>
              <div className="space-y-4">
                {mockUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={user.profilePhoto}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.isPublic ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {user.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      {bannedUsers.includes(user.id) ? (
                        <button
                          onClick={() => handleUnbanUser(user.id)}
                          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                        >
                          <CheckCircleIcon className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBanUser(user.id)}
                          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                        >
                          <NoSymbolIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'reports' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">User Reports</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-white">Inappropriate Profile Content</p>
                    <p className="text-sm text-gray-400 mt-1">Reported user: John Smith</p>
                    <p className="text-xs text-gray-500 mt-2">Reported 2 hours ago by Sarah Chen</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors">
                      Resolve
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-white">Spam Messages</p>
                    <p className="text-sm text-gray-400 mt-1">Reported user: Fake Account</p>
                    <p className="text-xs text-gray-500 mt-2">Reported 1 day ago by Marcus Johnson</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors">
                      Resolve
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'feedback' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Platform Feedback</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <p className="font-medium text-white">Elena Rodriguez</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      "Great platform! Found amazing language exchange partners. The interface is intuitive and easy to use."
                    </p>
                    <p className="text-xs text-gray-500 mt-2">2 days ago</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <p className="font-medium text-white">David Kim</p>
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                        <span className="text-gray-400">★</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      "Love the concept! Would like to see more filtering options for skills and better notification system."
                    </p>
                    <p className="text-xs text-gray-500 mt-2">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;