import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="space-y-6 text-center text-gray-700">
                <p>
                    Thanks for signing up! Before getting started, please verify your email 
                    address by clicking on the link we just sent. If you didn’t receive the email, 
                    we can send you another.
                </p>

                {status === 'verification-link-sent' && (
                    <p className="text-sm font-medium text-green-600">
                        A new verification link has been sent to your email.
                    </p>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Resend Verification Email
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="block w-full text-sm text-gray-600 underline hover:text-gray-900"
                    >
                        Log Out
                    </Link>
                </form>
            </div>
        </GuestLayout>
    );
}
