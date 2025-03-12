import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ header, children }) {
    const { auth } = usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        {/* Logo and Go to Profile Button */}
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="flex items-center">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>

                            {/* Go to Profile Button with a subtle background and smaller size */}
                            <Link
                                href="/profile"
                                className="bg-gray-600 text-white px-3 py-1.5 rounded-md text-md font-semibold hover:bg-gray-500 transition duration-200"
                            >
                                Go to Profile
                            </Link>
                        </div>

                        {/* Admin Navigation */}
                        <div className="flex space-x-4">
                            <NavLink
                                href={route('admin.dashboard')}
                                active={route().current('admin.dashboard')}
                                className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                List Products
                            </NavLink>
                            <NavLink
                                href={route('admin.products')}
                                active={route().current('admin.products')}
                                className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Add/Remove Product
                            </NavLink>
                            <NavLink
                                href={route('admin.orders')}
                                active={route().current('admin.orders')}
                                className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Manage Orders
                            </NavLink>
                        </div>

                        {/* Profile Dropdown */}
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="inline-flex items-center px-3 py-2 text-gray-500 hover:text-gray-700">
                                        {auth.user.name}
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="p-6">{children}</main>
        </div>
    );
}
