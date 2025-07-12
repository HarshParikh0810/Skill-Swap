import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, XMarkIcon, TrashIcon, ClockIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { mockSwapRequests } from '../data/mockData';
import { SwapRequest } from '../types';
import toast from 'react-hot-toast';

const RequestsPage: React.FC = () => {
  const [requests, setRequests] = useState(mockSwapRequests);
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');

  const handleAccept = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'accepted' as const } : req
      )
    );
    toast.success('Request accepted!');
  };

  const handleReject = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'rejected' as const } : req
      )
    );
    toast.success('Request rejected');
  };

  const handleDelete = (requestId: string) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
    toast.success('Request deleted');
  };

  const receivedRequests = requests.filter(req => req.toUserId === 'current');
  const sentRequests = requests.filter(req => req.fromUserId === 'current');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'text-green-400 bg-green-400/20';
      case 'rejected': return 'text-red-400 bg-red-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const RequestCard: React.FC<{ request: SwapRequest; isReceived: boolean }> = ({ request, isReceived }) => {
    const otherUser = isReceived ? request.fromUser : request.toUser;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {otherUser.profilePhoto ? (
              <img
                src={otherUser.profilePhoto}
                alt={otherUser.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <UserCircleIcon className="w-12 h-12 text-gray-400" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{otherUser.name}</h3>
                <p className="text-sm text-gray-400 flex items-center mt-1">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {formatDate(request.createdAt)}
                </p>
              </div>
              
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(request.status)}`}>
                {request.status}
              </span>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-400">{isReceived ? 'They offer:' : 'You offered:'}</span>
                <span className="px-2 py-1 bg-sky-500/20 text-sky-300 rounded-full">
                  {request.skillOffered}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-400">{isReceived ? 'They want:' : 'You wanted:'}</span>
                <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full">
                  {request.skillWanted}
                </span>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-gray-300 text-sm bg-gray-700 rounded-lg p-3">
                {request.message}
              </p>
            </div>
            
            {request.status === 'pending' && (
              <div className="flex space-x-2 mt-4">
                {isReceived ? (
                  <>
                    <button
                      onClick={() => handleAccept(request.id)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <CheckIcon className="w-4 h-4" />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <XMarkIcon className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleDelete(request.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Swap Requests
          </h1>
          <p className="text-gray-400">
            Manage your skill exchange requests
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl border border-gray-700 mb-8"
        >
          <div className="flex">
            <button
              onClick={() => setActiveTab('received')}
              className={`flex-1 py-4 px-6 text-center font-medium rounded-l-xl transition-colors ${
                activeTab === 'received'
                  ? 'bg-sky-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Received ({receivedRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`flex-1 py-4 px-6 text-center font-medium rounded-r-xl transition-colors ${
                activeTab === 'sent'
                  ? 'bg-sky-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Sent ({sentRequests.length})
            </button>
          </div>
        </motion.div>

        {/* Requests List */}
        <div className="space-y-6">
          {activeTab === 'received' ? (
            receivedRequests.length > 0 ? (
              receivedRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  isReceived={true}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No received requests</p>
                <p className="text-gray-500 mt-2">
                  When others send you skill swap requests, they'll appear here
                </p>
              </div>
            )
          ) : (
            sentRequests.length > 0 ? (
              sentRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  isReceived={false}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No sent requests</p>
                <p className="text-gray-500 mt-2">
                  Start browsing skills and send your first swap request!
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;