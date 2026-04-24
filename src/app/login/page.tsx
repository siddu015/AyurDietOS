'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { Leaf, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ action: 'login', email: email.trim(), password }),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('ayurdiet_user_id', data.user.id);
                router.push('/patient/dashboard');
            } else {
                const data = await res.json().catch(() => ({}));
                setError(data.error || 'Invalid email or password');
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuroraBackground>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md mx-auto px-4"
            >
                <div className="rounded-2xl bg-white/[0.02] backdrop-blur-sm p-8 sm:p-10 shadow-xl border border-white/[0.04]">
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4a7c59] to-[#c9a227] flex items-center justify-center">
                            <Leaf className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold">
                            <span className="text-[#4a7c59]">Ayur</span>
                            <span className="text-[#c9a227]">Diet</span>
                        </span>
                    </div>

                    <h2 className="text-xl font-semibold text-white text-center mb-2">Welcome Back</h2>
                    <p className="text-sm text-white/50 text-center mb-8">Sign in to continue your wellness journey</p>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="input-dark"
                                required
                                autoComplete="email"
                                autoFocus
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="input-dark pr-11"
                                    required
                                    autoComplete="current-password"
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !email.trim() || !password}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-[#4a7c59] to-[#c9a227] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-white/40">
                            Don&apos;t have an account?{' '}
                            <Link href="/onboarding" className="text-[#c9a227] hover:text-[#e8d18c] transition-colors font-medium">
                                Get Started
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </AuroraBackground>
    );
}
