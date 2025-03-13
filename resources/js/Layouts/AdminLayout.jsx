import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
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
                        {/* Logo and Profile Link */}
                        <div className="flex items-center space-x-4">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>
                            <Link 
                                href="/profile" 
                                className="bg-gray-600 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-gray-500 transition"
                            >
                                Go to Profile
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden sm:flex space-x-4">
                            <NavLink href={route('admin.dashboard')} active={route().current('admin.dashboard')}>
                                List Products
                            </NavLink>
                            <NavLink href={route('admin.products')} active={route().current('admin.products')}>
                                Add/Remove Product
                            </NavLink>
                            <NavLink href={route('admin.orders')} active={route().current('admin.orders')}>
                                Manage Orders
                            </NavLink>
                        </div>

                        {/* Profile Dropdown for Desktop */}
                        <div className="hidden sm:flex sm:items-center">
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

                        {/* Mobile Menu Button */}
                        <div className="sm:hidden flex items-center">
                            <button 
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="p-2 text-gray-500 hover:bg-gray-100 rounded-md"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path 
                                        className={!showingNavigationDropdown ? 'block' : 'hidden'}
                                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path 
                                        className={showingNavigationDropdown ? 'block' : 'hidden'}
                                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                <div className={`sm:hidden ${showingNavigationDropdown ? 'block' : 'hidden'} border-t border-gray-200`}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('admin.dashboard')} active={route().current('admin.dashboard')}>
                            List Products
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.products')} active={route().current('admin.products')}>
                            Add/Remove Product
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.orders')} active={route().current('admin.orders')}>
                            Manage Orders
                        </ResponsiveNavLink>
                    </div>

                    {/* Mobile Profile Dropdown */}
                    <div className="border-t border-gray-200 pb-3 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">{auth.user.name}</div>
                            <div className="text-sm font-medium text-gray-500">{auth.user.email}</div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('logout')} method="post" as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header Section */}
            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className="p-6">{children}</main>
        </div>
    );
}
