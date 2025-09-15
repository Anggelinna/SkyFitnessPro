import { useContext } from 'react';
import { UserContext } from './UserContext/UserContext';

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within UserProvider');
  }

  return context;
}