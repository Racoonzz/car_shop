import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                    Forgot your password? No problem. Enter your email, and we’ll send you a password reset link.
                </p>

                {status && (
                    <p className="text-sm font-medium text-green-600">
                        {status}
                    </p>
                )}
            </div>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full"
                        placeholder="Enter your email"
                        isFocused
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div className="flex justify-center">
                    <PrimaryButton disabled={processing}>
                        Send Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
