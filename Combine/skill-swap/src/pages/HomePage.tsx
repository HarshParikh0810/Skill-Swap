import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import UserCard from '../components/Common/UserCard';
import UserCardSkeleton from '../components/Common/LoadingSkeleton';
import SwapRequestModal from '../components/Modals/SwapRequestModal';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { User } from '../types';

const HomePage: React.FC = () => {
  const { isLoggedIn } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/match/', {
        interested_skills: ['js'],
      });

      console.log('[Fetched users]:', response.data);

      const transformedUsers: User[] = response.data.map((user: any) => ({
        ...user,
        skillsOffered: user.skills_offered ?? [],
        skillsWanted: user.skills_wanted ?? [],
        profilePhoto: user.profile_photo ?? '',
        availability: user.availability ?? [],
        isPublic: user.isPublic ?? true,
        rating: user.rating ?? 0,
        joinDate: user.joinDate ?? '',
      }));

      setUsers(transformedUsers);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchUsers();
  };

  const handleUserRequest = (user: User) => {
    if (!isLoggedIn) {
      toast.error('Please login to send swap requests');
      return;
    }
    setSelectedUser(user);
    setShowRequestModal(true);
  };

  const handleViewProfile = (user: User) => {
    toast.success(`Viewing ${user.name}'s profile`);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchAvailability =
        !selectedAvailability || user.availability.includes(selectedAvailability);

      const matchSearch =
        !searchTerm ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.skillsOffered.some((s: string) =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        user.skillsWanted.some((s: string) =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return matchAvailability && matchSearch;
    });
  }, [users, searchTerm, selectedAvailability]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            Discover Amazing <span className="text-sky-400">Skills</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Connect with talented individuals and exchange skills that matter to you.
          </p>
        </motion.div>

        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search skills or names..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
              >
                <option value="">All Availability</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
                <option value="Evenings">Evenings</option>
              </select>
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg flex items-center"
              >
                <FunnelIcon className="w-5 h-5 mr-1" />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-300 mb-4">
          <div>
            Showing <span className="text-sky-400">{paginatedUsers.length}</span> of{' '}
            <span className="text-sky-400">{filteredUsers.length}</span> users
          </div>
          <div>
            Page <span className="text-sky-400">{currentPage}</span> of{' '}
            <span className="text-sky-400">{totalPages || 1}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <UserCardSkeleton key={i} />)
            : paginatedUsers.map((user, i) => (
                <motion.div
                  key={user.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <UserCard
                    user={user}
                    onViewProfile={handleViewProfile}
                    onRequest={handleUserRequest}
                    isRequestDisabled={!isLoggedIn}
                  />
                </motion.div>
              ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? 'bg-sky-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {selectedUser && (
          <SwapRequestModal
            isOpen={showRequestModal}
            onClose={() => {
              setSelectedUser(null);
              setShowRequestModal(false);
            }}
            targetUser={selectedUser}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
