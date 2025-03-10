import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;

    if (auth.user.role !== 'admin') {
        return <div className="text-red-500 text-center mt-10">Unauthorized</div>;
    }

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}>
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold">Welcome, Admin!</h1>
                        <p>Manage products, orders, and users from here.</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
