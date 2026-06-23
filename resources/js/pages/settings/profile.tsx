import { Head, usePage, useForm } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import ChangePasswordModal from '@/components/change-password-modal';
import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import ProfileAvatarUpload from '@/components/profile-avatar-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/profile';
import type { Auth } from '@/types';

type PageProps = {
    auth: Auth;
};

export default function Profile() {
    const { auth } = usePage<PageProps>().props;
    const { data, setData, patch, processing, errors, isDirty, reset } =
        useForm({
            name: auth.user.name,
            email: auth.user.email,
            phone_number: auth.user.phone_number || '',
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(ProfileController.update.url(), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Profile settings" />

            <h1 className="sr-only">Profile settings</h1>

            <div className="space-y-6">
                {/* Avatar Upload Section */}
                <ProfileAvatarUpload />

                {/* Profile Information Section */}
                <Heading
                    variant="small"
                    title="Personal Information"
                    description="Update your name, email, and phone number"
                />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>

                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            name="name"
                            required
                            autoComplete="name"
                            placeholder="Maulana Syawal Wiguna"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            name="email"
                            required
                            autoComplete="username"
                            placeholder="maulana.syawal@widyatama.ac.id"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone_number">No Telpon</Label>

                        <Input
                            id="phone_number"
                            type="tel"
                            className="mt-1 block w-full"
                            value={data.phone_number}
                            onChange={(e) =>
                                setData('phone_number', e.target.value)
                            }
                            name="phone_number"
                            autoComplete="tel"
                            placeholder="085158001961"
                        />

                        <InputError
                            className="mt-2"
                            message={errors.phone_number}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <Button
                            disabled={processing || !isDirty}
                            data-test="update-profile-button"
                        >
                            Save
                        </Button>

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => reset()}
                            disabled={processing || !isDirty}
                        >
                            Discard
                        </Button>

                        <ChangePasswordModal />
                    </div>
                </form>

                {/* Delete Account Section */}
                <DeleteUser />
            </div>
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Profile settings',
            href: edit(),
        },
    ],
};
