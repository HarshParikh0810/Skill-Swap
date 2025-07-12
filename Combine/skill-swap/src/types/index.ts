export interface User {
  id: string;
  name: string;
  email: string;
  
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string[];
  
}
  
  export interface SwapRequest {
    id: string;
    fromUserId: string;
    toUserId: string;
    fromUser: User;
    toUser: User;
    skillOffered: string;
    skillWanted: string;
    message: string;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: string;
  }
  
  export interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
    isAdmin: boolean;
  }