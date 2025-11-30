"use client";

import { Button, MainContainer, Spinner } from '@/components/ui';
import { UPDATE_USERNAME_MUTATION } from '@/config/graphql/global.mutations';
import { useCurrentUser } from '@/hooks';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { capitalizeUsername } from '@/utils/utils';
import { Edit2, Mail, User, X, Check } from 'lucide-react';
import ProfilePhotoUpload from './ProfilePhotoUpload';

export default function ProfileContent() {
  const { user, isLoading, refetch } = useCurrentUser();
  const router = useRouter();
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [updateUsernameMutation, { loading: updatingUsername }] = useMutation(UPDATE_USERNAME_MUTATION);

  if (isLoading) {
    return (
      <MainContainer className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </MainContainer>
    );
  }

  const handleEditUsername = () => {
    setNewUsername(user?.username || '');
    setIsEditingUsername(true);
    setUsernameError('');
  };

  const handleCancelEdit = () => {
    setIsEditingUsername(false);
    setNewUsername('');
    setUsernameError('');
  };

  const handleSaveUsername = async () => {
    setUsernameError('');

    if (!newUsername.trim()) {
      setUsernameError('Username is required');
      return;
    }

    if (newUsername.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      return;
    }

    if (newUsername.length > 50) {
      setUsernameError('Username must be less than 50 characters');
      return;
    }

    if (newUsername === user?.username) {
      setUsernameError('New username must be different from current username');
      return;
    }

    try {
      await updateUsernameMutation({
        variables: {
          updateUsernameDto: {
            username: newUsername.trim(),
          },
        },
      });
      
      // Refresh user data
      await refetch();
      setIsEditingUsername(false);
      setNewUsername('');
      
      // Trigger auth token change event to update header
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth-token-changed'));
      }
    } catch (error: any) {
      const errorMessage = error?.graphQLErrors?.[0]?.message || error?.message || 'Failed to update username';
      setUsernameError(errorMessage);
    }
  };

  if (!user) {
    return (
      <MainContainer className='pt-8'>
        <h1 className="text-3xl font-bold text-primary mb-4">Profile</h1>
        <div className="bg-surface rounded-lg border border-border p-8 text-center flex-col justify-center">
          <p className="text-secondary text-lg">Please log in to view your profile</p>
          <div className='flex justify-center pt-2'>
            <Button
              type="button"
              onClick={() => router.push('/login')}
              className="py-2 px-4"
            >
              Log In
            </Button>
          </div>
        </div>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <div className="max-w-4xl mx-auto pt-8 pb-12">
        <h1 className="text-3xl font-bold text-primary mb-8">Profile</h1>
        
        <div className="bg-surface rounded-lg border border-border p-6 md:p-8">
          <div className="flex items-center gap-6 mb-8 pb-6 border-b border-border">
            <ProfilePhotoUpload />
            <div>
              <h2 className="text-2xl font-bold text-primary mb-1">
                {capitalizeUsername(user.username)}
              </h2>
              <p className="text-secondary">Member since {new Date().getFullYear()}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/5">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-secondary mb-1 block">
                  Username
                </label>
                {isEditingUsername ? (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => {
                          setNewUsername(e.target.value);
                          setUsernameError('');
                        }}
                        className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-primary focus:ring focus:outline-none focus:ring-info-light"
                        placeholder="Enter new username"
                        disabled={updatingUsername}
                      />
                      <button
                        type="button"
                        onClick={handleSaveUsername}
                        disabled={updatingUsername}
                        className="p-2 rounded-lg bg-success text-white hover:bg-success-dark disabled:opacity-50 disabled:cursor-not-allowed transition"
                        aria-label="Save username"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={updatingUsername}
                        className="p-2 rounded-lg bg-error text-white hover:bg-error-dark disabled:opacity-50 disabled:cursor-not-allowed transition"
                        aria-label="Cancel"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    {usernameError && (
                      <p className="text-sm text-error">{usernameError}</p>
                    )}
                    {updatingUsername && (
                      <p className="text-sm text-secondary">Updating username...</p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="text-lg text-primary">{user.username}</p>
                    <button
                      type="button"
                      onClick={handleEditUsername}
                      className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition"
                      aria-label="Edit username"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/5">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-secondary mb-1 block">
                  Email
                </label>
                <p className="text-lg text-primary">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

