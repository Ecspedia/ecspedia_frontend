"use client";

import { UPDATE_PROFILE_PHOTO_MUTATION } from '@/config/graphql/global.mutations';
import { useCurrentUser } from '@/hooks';
import { useMutation } from '@apollo/client/react';
import { Camera, Loader2, User } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function ProfilePhotoUpload() {
  const { user, refetch } = useCurrentUser();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateProfilePhotoMutation] = useMutation(UPDATE_PROFILE_PHOTO_MUTATION);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setError('');
    setUploading(true);

    // Create preview immediately
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      setPreview(base64String);

      // Auto-upload after preview is set
      try {
        const result = await updateProfilePhotoMutation({
          variables: {
            updateProfilePhotoDto: {
              imageBase64: base64String
            }
          }
        });

        // Store uploaded URL to display immediately
        const uploadedPhotoUrl = (result.data as { updateProfilePhoto?: { profilePhotoUrl?: string } })?.updateProfilePhoto?.profilePhotoUrl;
        if (uploadedPhotoUrl) {
          setUploadedUrl(uploadedPhotoUrl);
        }

        // Refresh user data
        await refetch();

        // Clear preview and file input
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // Trigger auth token change event to update header
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('auth-token-changed'));
        }
      } catch (err: unknown) {
        const graphQLError = (err as { graphQLErrors?: Array<{ message?: string }> })?.graphQLErrors?.[0]?.message;
        const errorMessage = graphQLError || (err as Error)?.message || 'Failed to upload photo';
        setError(errorMessage);
        // Keep preview so user can try again
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setPreview(null);
    setUploadedUrl(null);
    setError('');
    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Get user photo URL (TypeScript workaround until types are regenerated)
  const userPhotoUrl = (user as { profilePhotoUrl?: string })?.profilePhotoUrl;

  // Clear uploadedUrl when user.profilePhotoUrl matches it (confirms the upload was saved)
  useEffect(() => {
    if (uploadedUrl && userPhotoUrl === uploadedUrl) {
      setUploadedUrl(null);
    }
  }, [userPhotoUrl, uploadedUrl]);

  // Priority: preview > uploadedUrl (just uploaded) > user's profile photo URL
  const displayUrl = preview || uploadedUrl || userPhotoUrl || null;

  return (
    <div className="space-y-4">
      <div className="relative inline-block">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="profile-photo-input"
          disabled={uploading}
        />

        {displayUrl ? (
          <button
            type="button"
            onClick={() => !uploading && fileInputRef.current?.click()}
            className="relative group cursor-pointer"
            disabled={uploading}
            aria-label="Change photo"
          >
            <Image
              src={displayUrl}
              alt="Profile photo"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover border-2 border-border group-hover:opacity-80 transition-opacity"
              unoptimized
            />
            {!uploading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 group-hover:bg-black/50 transition-colors">
                <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => !uploading && fileInputRef.current?.click()}
            className="relative group cursor-pointer"
            disabled={uploading}
            aria-label="Upload photo"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <User className="w-10 h-10 text-primary" />
            </div>
            {!uploading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 group-hover:bg-black/50 transition-colors">
                <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </button>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-white" />
              <button
                type="button"
                onClick={handleCancel}
                className="text-xs text-white hover:text-secondary underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
}

