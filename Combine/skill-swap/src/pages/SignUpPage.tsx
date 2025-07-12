import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    bio: ''
  });
  const [skillsOffered, setSkillsOffered] = useState<string[]>([]);
  const [skillsWanted, setSkillsWanted] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillWanted, setNewSkillWanted] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const availabilityOptions = [
    'Weekdays', 'Weekends', 'Evenings',
    'Mornings', 'Afternoons', 'Flexible'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addSkillOffered = () => {
    if (newSkillOffered.trim() && !skillsOffered.includes(newSkillOffered.trim())) {
      setSkillsOffered(prev => [...prev, newSkillOffered.trim()]);
      setNewSkillOffered('');
    }
  };

  const removeSkillOffered = (skill: string) => {
    setSkillsOffered(prev => prev.filter(s => s !== skill));
  };

  const addSkillWanted = () => {
    if (newSkillWanted.trim() && !skillsWanted.includes(newSkillWanted.trim())) {
      setSkillsWanted(prev => [...prev, newSkillWanted.trim()]);
      setNewSkillWanted('');
    }
  };

  const removeSkillWanted = (skill: string) => {
    setSkillsWanted(prev => prev.filter(s => s !== skill));
  };

  const toggleAvailability = (option: string) => {
    setAvailability(prev =>
      prev.includes(option)
        ? prev.filter(a => a !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) return toast.error('Name is required');
    if (!formData.email.trim()) return toast.error('Email is required');
    if (!formData.password) return toast.error('Password is required');
    if (formData.password !== formData.confirmPassword)
      return toast.error('Passwords do not match');
    if (formData.password.length < 6)
      return toast.error('Password must be at least 6 characters');
    if (skillsOffered.length === 0)
      return toast.error('Please add at least one skill you can offer');
    if (skillsWanted.length === 0)
      return toast.error('Please add at least one skill you want to learn');
    if (availability.length === 0)
      return toast.error('Please select your availability');

    setIsLoading(true);

    try {
      // ✅ POST to backend
      const response = await axios.post('http://127.0.0.1:8000/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        location: formData.location,
        skills_offered: skillsOffered,
        skills_wanted: skillsWanted,
        availability: availability.join(', ')
      });

      console.log('Signup Success:', response.data);

      const success = await login(formData.email, formData.password);
      if (success) {
        toast.success('Account created successfully! Welcome to Skill Swap!');
        navigate('/');
      } else {
        toast.error('Account created but login failed. Please try logging in manually.');
        navigate('/login');
      }
    } catch (error: any) {
      console.error('Signup Error:', error);
      toast.error(error?.response?.data?.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Join Skill Swap
          </h2>
          <p className="text-gray-400">
            Create your account and start exchanging skills
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name *" className="input-field" />
                <input name="location" value={formData.location} onChange={handleInputChange} placeholder="Location" className="input-field" />
              </div>
              <input name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address *" type="email" className="input-field" />
              <textarea name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Tell others about yourself..." rows={3} className="input-field" />
            </div>

            {/* Password */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                Security
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input name="password" value={formData.password} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} placeholder="Password *" className="input-field pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 text-gray-400 hover:text-white">
                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
                <div className="relative">
                  <input name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password *" className="input-field pr-10" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2 text-gray-400 hover:text-white">
                    {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Skills Offered */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Skills You Can Offer *</h3>
              <div className="flex space-x-2">
                <input value={newSkillOffered} onChange={(e) => setNewSkillOffered(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillOffered())} className="flex-1 input-field" placeholder="Add a skill" />
                <button type="button" onClick={addSkillOffered} className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg"><PlusIcon className="w-5 h-5" /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsOffered.map((skill, index) => (
                  <span key={index} className="skill-tag-offered flex items-center space-x-2 bg-sky-700 px-3 py-1 rounded-full text-white">
                    <span>{skill}</span>
                    <XMarkIcon className="w-4 h-4 cursor-pointer" onClick={() => removeSkillOffered(skill)} />
                  </span>
                ))}
              </div>
            </div>

            {/* Skills Wanted */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Skills You Want to Learn *</h3>
              <div className="flex space-x-2">
                <input value={newSkillWanted} onChange={(e) => setNewSkillWanted(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillWanted())} className="flex-1 input-field" placeholder="Add a skill" />
                <button type="button" onClick={addSkillWanted} className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg"><PlusIcon className="w-5 h-5" /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsWanted.map((skill, index) => (
                  <span key={index} className="skill-tag-wanted flex items-center space-x-2 bg-pink-700 px-3 py-1 rounded-full text-white">
                    <span>{skill}</span>
                    <XMarkIcon className="w-4 h-4 cursor-pointer" onClick={() => removeSkillWanted(skill)} />
                  </span>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Availability *</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availabilityOptions.map(option => (
                  <button key={option} type="button" onClick={() => toggleAvailability(option)}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      availability.includes(option)
                        ? 'bg-sky-500 border-sky-500 text-white'
                        : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-sky-500/50'
                    }`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-medium py-4 px-6 rounded-lg text-lg"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center space-y-2">
            <div>
              <span className="text-gray-400">Already have an account? </span>
              <Link to="/login" className="text-sky-400 hover:text-sky-300 font-medium">Sign in</Link>
            </div>
            <div>
              <Link to="/" className="text-sm text-gray-400 hover:text-white">← Back to Home</Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
