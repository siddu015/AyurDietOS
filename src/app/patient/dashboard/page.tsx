'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Activity,
  UtensilsCrossed,
  MessageCircle,
  Leaf,
  TrendingUp,
  Sparkles,
  CalendarDays,
  ArrowRight,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { getCurrentSeason, getSeasonInfo } from '@/lib/data';

interface ProfileData {
  user: { id: string; name: string; email: string; age: number; gender: string };
  prakriti: { vata: number; pitta: number; kapha: number; dominant: string; secondary?: string } | null;
  health: { conditions: string[]; allergies: string[]; dietary_preferences: string[]; weight_goal: string; calorie_target: number; protein_target: number } | null;
}

export default function PatientDashboardPage() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <h2 className="text-xl font-bold text-white mb-2">Couldn&apos;t load your dashboard</h2>
        <p className="text-sm text-white/50 mb-6 max-w-md">
          {error || 'Your profile could not be loaded. This usually resolves with a quick retry.'}
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

  const currentSeason = getCurrentSeason();
  const seasonInfo = getSeasonInfo(currentSeason);
  const greeting = getGreeting();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {greeting}, <span className="text-[#c9a227]">{profile.user.name?.split(' ')[0]}</span>
        </h1>
        <p className="text-white/40 text-sm">
          {profile.prakriti ? (
            <>Your <span className="text-white/60 capitalize">{profile.prakriti.dominant}</span> constitution guide for today</>
          ) : (
            'Your personalized Ayurvedic dashboard'
          )}
        </p>
      </motion.div>

      {/* Top Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Dosha Distribution */}
        {profile.prakriti && (
          <div className="col-span-2 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-4 w-4 text-[#c9a227]" />
              <span className="text-sm font-medium text-white/70">Your Prakriti</span>
            </div>
            <div className="space-y-3">
              <DoshaBar label="Vata" value={profile.prakriti.vata} color="#7eb8da" />
              <DoshaBar label="Pitta" value={profile.prakriti.pitta} color="#e74c3c" />
              <DoshaBar label="Kapha" value={profile.prakriti.kapha} color="#2ecc71" />
            </div>
          </div>
        )}

        {/* Daily Target */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-[#4a7c59]" />
            <span className="text-xs font-medium text-white/50">Daily Target</span>
          </div>
          <p className="text-2xl font-bold text-white">{profile.health?.calorie_target || 2000}</p>
          <p className="text-xs text-white/40">kcal / day</p>
          <div className="mt-2 pt-2 border-t border-white/5">
            <p className="text-sm text-[#4a7c59] font-medium">{profile.health?.protein_target || 60}g protein</p>
          </div>
        </div>

        {/* Season */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="h-4 w-4 text-[#d35400]" />
            <span className="text-xs font-medium text-white/50">Current Ritu</span>
          </div>
          <p className="text-xl font-bold text-white capitalize">{currentSeason}</p>
          <p className="text-xs text-white/40 mt-1">
            {seasonInfo ? `${seasonInfo.dietaryGuidelines?.[0] || 'Seasonal balance'}` : 'Seasonal guidance'}
          </p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickActionCard
            href="/patient/chat"
            icon={<MessageCircle className="h-5 w-5" />}
            title="AyurOS Agent"
            description="Ask about foods, meals, or get personalized Ayurvedic recommendations"
            gradient="from-[#4a7c59] to-[#7ab08a]"
            tag="AI Powered"
          />
          <QuickActionCard
            href="/patient/weekly-plan"
            icon={<CalendarDays className="h-5 w-5" />}
            title="Weekly Meal Plan"
            description="Auto-generate your personalized 7-day diet plan"
            gradient="from-[#c9a227] to-[#a38420]"
          />
          <QuickActionCard
            href="/foods"
            icon={<UtensilsCrossed className="h-5 w-5" />}
            title="Browse Foods"
            description="Explore 430+ global foods scored for your constitution"
            gradient="from-[#d35400] to-[#e67e22]"
          />
        </div>
      </motion.div>

      {/* Health Overview */}
      {profile.health && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-white mb-4">Health Profile</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Conditions */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <h3 className="text-sm font-medium text-white/60 mb-3">Conditions</h3>
              <div className="flex flex-wrap gap-2">
                {profile.health.conditions.length > 0 ? (
                  profile.health.conditions.map((c: string) => (
                    <span key={c} className="tag tag-active capitalize">{c.replace('_', ' ')}</span>
                  ))
                ) : (
                  <span className="text-sm text-white/30">None specified</span>
                )}
              </div>
            </div>

            {/* Allergies */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <h3 className="text-sm font-medium text-white/60 mb-3">Allergies</h3>
              <div className="flex flex-wrap gap-2">
                {profile.health.allergies.length > 0 ? (
                  profile.health.allergies.map((a: string) => (
                    <span key={a} className="px-3 py-1 rounded-full text-xs bg-red-500/10 text-red-400 border border-red-500/20 capitalize">{a}</span>
                  ))
                ) : (
                  <span className="text-sm text-white/30">None specified</span>
                )}
              </div>
            </div>

            {/* Diet Preference */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <h3 className="text-sm font-medium text-white/60 mb-3">Diet & Goals</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/40">Goal:</span>
                  <span className="text-sm text-white capitalize font-medium">{profile.health.weight_goal}</span>
                </div>
                {profile.health.dietary_preferences.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {profile.health.dietary_preferences.map((p: string) => (
                      <span key={p} className="tag capitalize">{p}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Seasonal Recommendations */}
      {seasonInfo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-[#4a7c59]/10 to-[#c9a227]/5 border border-[#4a7c59]/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-[#c9a227]" />
            <h3 className="text-sm font-semibold text-white">Seasonal Recommendation — {currentSeason}</h3>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            {seasonInfo.dietaryGuidelines?.[0] ||
              `During ${currentSeason}, focus on foods that balance your ${profile.prakriti?.dominant || 'constitutional'} tendencies. Favor seasonal produce and traditional preparations suited to this Ritu.`}
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ── Sub-components ──

function DoshaBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-white/60">{label}</span>
        <span className="font-medium text-white">{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>
    </div>
  );
}

function QuickActionCard({
  href,
  icon,
  title,
  description,
  gradient,
  tag,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  tag?: string;
}) {
  return (
    <Link href={href} className="group">
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 hover:bg-white/[0.05] h-full">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          {tag && (
            <span className="text-[10px] font-medium text-[#c9a227] bg-[#c9a227]/10 px-2 py-0.5 rounded-full border border-[#c9a227]/20">
              {tag}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-white mb-1 flex items-center gap-1">
          {title}
          <ArrowRight className="h-3.5 w-3.5 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
        </h3>
        <p className="text-xs text-white/40 leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
