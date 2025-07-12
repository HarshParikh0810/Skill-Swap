import { User, SwapRequest } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    location: 'San Francisco, CA',
    profilePhoto: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    skillsOffered: ['React', 'TypeScript', 'UI/UX Design'],
    skillsWanted: ['Photography', 'Spanish', 'Guitar'],
    availability: ['Evenings', 'Weekends'],
    isPublic: true,
    rating: 4.8,
    joinDate: '2023-01-15',
    bio: 'Full-stack developer passionate about clean code and great design.'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus@example.com',
    location: 'New York, NY',
    profilePhoto: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    skillsOffered: ['Photography', 'Photoshop', 'Video Editing'],
    skillsWanted: ['React', 'Python', 'Digital Marketing'],
    availability: ['Weekends'],
    isPublic: true,
    rating: 4.6,
    joinDate: '2023-02-20',
    bio: 'Professional photographer and content creator.'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    email: 'elena@example.com',
    location: 'Austin, TX',
    profilePhoto: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    skillsOffered: ['Spanish', 'French', 'Writing'],
    skillsWanted: ['Web Development', 'Excel', 'Public Speaking'],
    availability: ['Evenings'],
    isPublic: true,
    rating: 4.9,
    joinDate: '2023-03-10',
    bio: 'Language teacher and freelance writer.'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david@example.com',
    location: 'Seattle, WA',
    profilePhoto: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400',
    skillsOffered: ['Python', 'Data Analysis', 'Excel'],
    skillsWanted: ['Guitar', 'Cooking', 'Japanese'],
    availability: ['Weekends', 'Evenings'],
    isPublic: true,
    rating: 4.7,
    joinDate: '2023-04-05',
    bio: 'Data scientist who loves learning new skills.'
  },
  {
    id: '5',
    name: 'Amy Thompson',
    email: 'amy@example.com',
    location: 'Denver, CO',
    profilePhoto: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
    skillsOffered: ['Cooking', 'Yoga', 'Public Speaking'],
    skillsWanted: ['UI/UX Design', 'Photography', 'French'],
    availability: ['Weekends'],
    isPublic: true,
    rating: 4.5,
    joinDate: '2023-05-12',
    bio: 'Chef and wellness coach passionate about healthy living.'
  }
];

export const currentUser: User = {
  id: 'current',
  name: 'John Doe',
  email: 'john@example.com',
  location: 'Los Angeles, CA',
  profilePhoto: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400',
  skillsOffered: ['JavaScript', 'Guitar', 'Digital Marketing'],
  skillsWanted: ['Photography', 'Spanish', 'Cooking'],
  availability: ['Evenings', 'Weekends'],
  isPublic: true,
  rating: 4.3,
  joinDate: '2023-06-01',
  bio: 'Software developer and music enthusiast.'
};

export const mockSwapRequests: SwapRequest[] = [
  {
    id: 'req1',
    fromUserId: 'current',
    toUserId: '1',
    fromUser: currentUser,
    toUser: mockUsers[0],
    skillOffered: 'Guitar',
    skillWanted: 'React',
    message: 'Hi Sarah! I\'d love to teach you guitar in exchange for React lessons.',
    status: 'pending',
    createdAt: '2023-11-15T10:30:00Z'
  },
  {
    id: 'req2',
    fromUserId: '2',
    toUserId: 'current',
    fromUser: mockUsers[1],
    toUser: currentUser,
    skillOffered: 'Photography',
    skillWanted: 'Digital Marketing',
    message: 'Hey John! I can teach you photography if you help me with digital marketing.',
    status: 'accepted',
    createdAt: '2023-11-10T14:20:00Z'
  },
  {
    id: 'req3',
    fromUserId: 'current',
    toUserId: '3',
    fromUser: currentUser,
    toUser: mockUsers[2],
    skillOffered: 'JavaScript',
    skillWanted: 'Spanish',
    message: 'Hola Elena! Would you like to trade Spanish lessons for JavaScript tutorials?',
    status: 'rejected',
    createdAt: '2023-11-05T09:15:00Z'
  }
];