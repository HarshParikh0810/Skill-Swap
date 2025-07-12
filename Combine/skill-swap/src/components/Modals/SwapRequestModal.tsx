import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { User } from '../../types';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

interface SwapRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser: User;
}

const SwapRequestModal: React.FC<SwapRequestModalProps> = ({
  isOpen,
  onClose,
  targetUser,
}) => {
  const { user } = useAuth();
  const [selectedOfferSkill, setSelectedOfferSkill] = useState('');
  const [selectedWantSkill, setSelectedWantSkill] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOfferSkill || !selectedWantSkill || !message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Swap request sent successfully!');
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setSelectedOfferSkill('');
    setSelectedWantSkill('');
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Request Skill Swap
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={targetUser.profilePhoto}
              alt={targetUser.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-white">{targetUser.name}</h3>
              <p className="text-sm text-gray-400">{targetUser.location}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your skill to offer
            </label>
            <select
              value={selectedOfferSkill}
              onChange={(e) => setSelectedOfferSkill(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              required
            >
              <option value="">Select a skill you offer</option>
              {user?.skillsOffered.map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Skill you want from {targetUser.name}
            </label>
            <select
              value={selectedWantSkill}
              onChange={(e) => setSelectedWantSkill(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              required
            >
              <option value="">Select a skill they offer</option>
              {targetUser.skillsOffered.map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              placeholder="Tell them why you'd like to swap skills..."
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-600 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {isSubmitting ? 'Sending...' : 'Send Request'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SwapRequestModal;