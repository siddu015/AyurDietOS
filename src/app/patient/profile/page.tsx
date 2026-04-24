'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { User, Mail, Calendar, Activity, Heart, Shield, Target, Edit3, AlertTriangle, RefreshCw } from 'lucide-react';

interface ProfileData {
    user: { id: string; name: string; email: string; age: number; gender: string; created_at: string };
    prakriti: { vata: number; pitta: number; kapha: number; dominant: string; secondary?: string; assessed_at: string } | null;
    health: { conditions: string[]; allergies: string[]; dietary_preferences: string[]; weight_goal: string; calorie_target: number; protein_target: number } | null;
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadProfile = () => {
        const userId = localStorage.getItem('ayurdiet_user_id');
        if (!userId) {
            setError('Not signed in');
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        fetch(`/api/users?id=${userId}`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                if (!data?.user) throw new Error('Profile not found');
                setProfile(data);
                setLoading(false);
            })
            .catch((e) => {
                setError(e?.message || 'Failed to load profile');
                setLoading(false);
            });
    };

    useEffect(() => {
        loadProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 rounded-full border-2 border-[#c9a227] border-t-transparent animate-spin" />
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Profile unavailable</h2>
                <p className="text-sm text-white/50 mb-6 max-w-md">
                    {error || 'We could not load your profile. Try again or re-run onboarding.'}
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={loadProfile}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c9a227] hover:bg-[#d4ae2f] text-white text-sm font-medium transition-colors"
                    >
                        <RefreshCw className="h-4 w-4" /> Retry
                    </button>
                    <Link
                        href="/onboarding"
                        className="px-5 py-2.5 rounded-xl border border-white/15 text-white/70 hover:bg-white/5 text-sm font-medium transition-colors"
                    >
                        Re-run onboarding
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl space-y-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h1 className="text-2xl font-bold text-white mb-1">My Profile</h1>
                <p className="text-sm text-white/40">Your Ayurvedic constitution and health details</p>
            </motion.div>

            {/* User Info Card */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
            >
                <div className="flex items-center gap-5 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c9a227] to-[#d35400] flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-white">{profile.user.name?.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">{profile.user.name}</h2>
                        <p className="text-sm text-white/40">{profile.user.email}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <InfoItem icon={<User className="h-4 w-4" />} label="Gender" value={profile.user.gender} />
                    <InfoItem icon={<Calendar className="h-4 w-4" />} label="Age" value={`${profile.user.age} years`} />
                    <InfoItem icon={<Mail className="h-4 w-4" />} label="Email" value={profile.user.email} />
                    <InfoItem icon={<Edit3 className="h-4 w-4" />} label="Member Since" value={profile.user.created_at ? new Date(profile.user.created_at).toLocaleDateString() : 'N/A'} />
                </div>
            </motion.div>

            {/* Prakriti Card */}
            {profile.prakriti && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
                >
                    <div className="flex items-center gap-2 mb-5">
                        <Activity className="h-5 w-5 text-[#c9a227]" />
                        <h2 className="text-lg font-semibold text-white">Prakriti Constitution</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            {[
                                { name: 'Vata', value: profile.prakriti.vata, color: '#7eb8da', desc: 'Air & Space' },
                                { name: 'Pitta', value: profile.prakriti.pitta, color: '#e74c3c', desc: 'Fire & Water' },
                                { name: 'Kapha', value: profile.prakriti.kapha, color: '#2ecc71', desc: 'Earth & Water' },
                            ].map((d) => (
                                <div key={d.name}>
                                    <div className="flex justify-between items-end text-sm mb-1.5">
                                        <div>
                                            <span className="font-medium text-white">{d.name}</span>
                                            <span className="text-white/30 text-xs ml-1">{d.desc}</span>
                                        </div>
                                        <span className="font-bold text-white text-lg">{d.value}%</span>
                                    </div>
                                    <div className="h-2.5 rounded-full bg-white/10">
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: d.color }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${d.value}%` }}
                                            transition={{ duration: 1, delay: 0.4 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4a7c59] to-[#c9a227] flex items-center justify-center mx-auto mb-3">
                                    <span className="text-3xl font-bold text-white capitalize">{profile.prakriti.dominant.charAt(0).toUpperCase()}</span>
                                </div>
                                <p className="text-lg font-bold text-white capitalize">{profile.prakriti.dominant} Dominant</p>
                                {profile.prakriti.secondary && (
                                    <p className="text-sm text-white/40 capitalize">{profile.prakriti.secondary} secondary</p>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Health Details */}
            {profile.health && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="grid sm:grid-cols-2 gap-6"
                >
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="flex items-center gap-2 mb-4">
                            <Heart className="h-5 w-5 text-[#e74c3c]" />
                            <h2 className="text-lg font-semibold text-white">Health</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-white/40 mb-2">Conditions</p>
                                <div className="flex flex-wrap gap-2">
                                    {profile.health.conditions.length > 0 ? profile.health.conditions.map((c: string) => (
                                        <span key={c} className="tag tag-active capitalize">{c.replace('_', ' ')}</span>
                                    )) : <span className="text-sm text-white/25">None</span>}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-white/40 mb-2">Allergies</p>
                                <div className="flex flex-wrap gap-2">
                                    {profile.health.allergies.length > 0 ? profile.health.allergies.map((a: string) => (
                                        <span key={a} className="px-3 py-1 rounded-full text-xs bg-red-500/10 text-red-400 border border-red-500/20 capitalize">{a}</span>
                                    )) : <span className="text-sm text-white/25">None</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="flex items-center gap-2 mb-4">
                            <Target className="h-5 w-5 text-[#4a7c59]" />
                            <h2 className="text-lg font-semibold text-white">Goals</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03]">
                                <span className="text-sm text-white/50">Weight Goal</span>
                                <span className="text-sm font-medium text-white capitalize">{profile.health.weight_goal}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03]">
                                <span className="text-sm text-white/50">Daily Calories</span>
                                <span className="text-sm font-medium text-[#c9a227]">{profile.health.calorie_target} kcal</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03]">
                                <span className="text-sm text-white/50">Daily Protein</span>
                                <span className="text-sm font-medium text-[#4a7c59]">{profile.health.protein_target}g</span>
                            </div>
                            <div>
                                <p className="text-xs text-white/40 mb-2">Diet Preferences</p>
                                <div className="flex flex-wrap gap-2">
                                    {profile.health.dietary_preferences.length > 0 ? profile.health.dietary_preferences.map((p: string) => (
                                        <span key={p} className="tag capitalize">{p}</span>
                                    )) : <span className="text-sm text-white/25">None</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Danger Zone */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="p-4 rounded-xl border border-white/[0.04]"
            >
                <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-white/30" />
                    <span className="text-sm text-white/30">Account Info</span>
                </div>
                <p className="text-xs text-white/20">User ID: {profile.user.id}</p>
            </motion.div>
        </div>
    );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="p-3 rounded-xl bg-white/[0.02]">
            <div className="flex items-center gap-1.5 mb-1 text-white/40">
                {icon}
                <span className="text-xs">{label}</span>
            </div>
            <p className="text-sm font-medium text-white capitalize truncate">{value}</p>
        </div>
    );
}
