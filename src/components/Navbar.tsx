'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Leaf, Menu, X, Store, ShoppingBag, LogIn, LogOut, UserCircle, ScanBarcode } from 'lucide-react';

export default function Navbar() {
    const { user, profile, loading, signOut } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    async function handleSignOut() {
        await signOut();
        setMobileMenuOpen(false);
    }

    return (
        <nav className="sticky top-0 z-50 border-b border-green-100 bg-white/80 backdrop-blur-xl dark:border-green-900/30 dark:bg-[#0a0f0a]/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-md shadow-green-500/20 transition-transform group-hover:scale-105">
                        <Image src="/icon.png" alt="PlateRescue Logo" width={24} height={24} className="h-5 w-5 object-contain" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Plate<span className="text-primary">Rescue</span>
                    </span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden items-center gap-1 md:flex">
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-green-50 hover:text-primary dark:text-gray-300 dark:hover:bg-green-900/20"
                    >
                        <ShoppingBag className="h-4 w-4" />
                        Marketplace
                    </Link>

                    {/* Consumer Links */}
                    {profile?.role === 'consumer' && (
                        <Link
                            href="/history"
                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-green-50 hover:text-primary dark:text-gray-300 dark:hover:bg-green-900/20"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            Riwayat
                        </Link>
                    )}

                    {/* Partner Links */}
                    {profile?.role === 'partner' && (
                        <>
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-green-50 hover:text-primary dark:text-gray-300 dark:hover:bg-green-900/20"
                            >
                                <Store className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link
                                href="/partner/redeem"
                                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-green-50 hover:text-primary dark:text-gray-300 dark:hover:bg-green-900/20"
                            >
                                <ScanBarcode className="h-4 w-4" />
                                Redeem
                            </Link>
                        </>
                    )}

                    <div className="ml-2 h-6 w-px bg-gray-200 dark:bg-gray-700" />

                    {loading ? (
                        <div className="ml-2 h-8 w-20 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
                    ) : user ? (
                        <div className="ml-2 flex items-center gap-3">
                            <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5 dark:bg-green-900/20">
                                <UserCircle className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {profile?.full_name || user?.email || 'User'}
                                </span>
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold capitalize text-primary">
                                    {profile?.role || '...'}
                                </span>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="ml-2 flex items-center gap-2">
                            <Link
                                href="/login"
                                className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-green-50 hover:text-primary dark:text-gray-300 dark:hover:bg-green-900/20"
                            >
                                <LogIn className="h-4 w-4" />
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 py-2 text-sm font-semibold text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:brightness-110"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-green-50 md:hidden dark:text-gray-300 dark:hover:bg-green-900/20"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="animate-fade-in border-t border-green-100 bg-white px-4 pb-4 pt-2 md:hidden dark:border-green-900/30 dark:bg-[#0a0f0a]">
                    <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-primary dark:text-gray-300 dark:hover:bg-green-900/20"
                    >
                        <ShoppingBag className="h-4 w-4" />
                        Marketplace
                    </Link>

                    {/* Consumer Links */}
                    {profile?.role === 'consumer' && (
                        <Link
                            href="/history"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-primary dark:text-gray-300 dark:hover:bg-green-900/20"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            Riwayat
                        </Link>
                    )}

                    {/* Partner Links */}
                    {profile?.role === 'partner' && (
                        <>
                            <Link
                                href="/dashboard"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-primary dark:text-gray-300 dark:hover:bg-green-900/20"
                            >
                                <Store className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link
                                href="/partner/redeem"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-primary dark:text-gray-300 dark:hover:bg-green-900/20"
                            >
                                <ScanBarcode className="h-4 w-4" />
                                Redeem
                            </Link>
                        </>
                    )}

                    <div className="my-2 h-px bg-gray-100 dark:bg-gray-800" />

                    {loading ? (
                        <div className="mx-3 h-10 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
                    ) : user ? (
                        <>
                            <div className="flex items-center gap-2 px-3 py-2">
                                <UserCircle className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {profile?.full_name || user?.email || 'User'}
                                </span>
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold capitalize text-primary">
                                    {profile?.role}
                                </span>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-primary dark:text-gray-300 dark:hover:bg-green-900/20"
                            >
                                <LogIn className="h-4 w-4" />
                                Login
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setMobileMenuOpen(false)}
                                className="mx-3 mt-1 flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 py-3 text-sm font-semibold text-white shadow-md shadow-green-500/20"
                            >
                                Create Account
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
