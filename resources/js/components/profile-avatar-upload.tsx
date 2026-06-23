import { useRef, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { HelpCircle } from 'lucide-react';
import type { Auth } from '@/types';

export default function ProfileAvatarUpload() {
    const page = usePage<{ auth: Auth }>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

    const user = page.props.auth.user;
    const avatarUrl = user.avatar ? `/storage/${user.avatar}` : null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);

        // Validate file type
        if (
            !['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
                file.type,
            )
        ) {
            setError(
                'Please select a valid image format (JPEG, PNG, GIF, or WebP)',
            );
            return;
        }

        // Validate file size (2MB)
        if (file.size > 2 * 1024 * 1024) {
            setError('File size must not exceed 2MB');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleUpload = () => {
        const file = fileInputRef.current?.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('avatar', file);

        router.post('/settings/profile/avatar', formData, {
            preserveScroll: true,
            onSuccess: () => {
                setIsUploading(false);
                setPreview(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                setError(null);
            },
            onError: (errors: any) => {
                setError(errors.avatar || 'An error occurred while uploading');
                setIsUploading(false);
            },
        });
    };

    const handleRemove = () => {
        setIsUploading(true);
        router.delete('/settings/profile/avatar', {
            preserveScroll: true,
            onSuccess: () => {
                setIsUploading(false);
                setIsRemoveDialogOpen(false);
            },
            onError: () => {
                setError('An error occurred while removing avatar');
                setIsUploading(false);
            },
        });
    };

    const handleChangeClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-6">
            <Heading
                variant="small"
                title="Profile Picture"
                description="Upload or update your profile picture"
            />

            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                <div className="space-y-6">
                    {/* Avatar Display */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt={user.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center text-gray-400">
                                    <svg
                                        className="h-16 w-16"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Hidden File Input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleChangeClick}
                                disabled={isUploading}
                            >
                                {preview ? 'Choose Different' : 'Change Image'}
                            </Button>

                            {(avatarUrl || preview) && (
                                <Dialog
                                    open={isRemoveDialogOpen}
                                    onOpenChange={setIsRemoveDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={isUploading}
                                        >
                                            Remove
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>
                                            Remove profile picture?
                                        </DialogTitle>
                                        <DialogDescription>
                                            Are you sure you want to remove your
                                            profile picture? This action cannot
                                            be undone.
                                        </DialogDescription>

                                        <DialogFooter className="gap-2">
                                            <DialogClose asChild>
                                                <Button variant="secondary">
                                                    Cancel
                                                </Button>
                                            </DialogClose>

                                            <Button
                                                variant="destructive"
                                                onClick={handleRemove}
                                                disabled={isUploading}
                                            >
                                                Remove
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-start gap-2 rounded-md bg-red-50 p-3 dark:bg-red-900/10">
                            <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
                            <p className="text-sm text-red-600 dark:text-red-400">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Preview Actions */}
                    {preview && (
                        <div className="flex gap-3">
                            <Button
                                type="button"
                                onClick={handleUpload}
                                disabled={isUploading}
                            >
                                {isUploading ? 'Uploading...' : 'Upload'}
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    setPreview(null);
                                    if (fileInputRef.current) {
                                        fileInputRef.current.value = '';
                                    }
                                    setError(null);
                                }}
                                disabled={isUploading}
                            >
                                Cancel
                            </Button>
                        </div>
                    )}

                    {/* Info Text */}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Allowed formats: JPG, PNG, GIF, WebP. Max file size: 2MB
                    </p>
                </div>
            </div>
        </div>
    );
}
