'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AuroraBackground } from '@/components/ui/aurora-background';
import {
  Brain,
  UtensilsCrossed,
  Shield,
  Sparkles,
  ArrowRight,
  Leaf,
  Activity,
  BookOpen,
} from 'lucide-react';

export default function Home() {
  return (
    <AuroraBackground>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Minimal Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-20"
        >
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#4a7c59] to-[#c9a227] flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-[#4a7c59]">Ayur</span>
              <span className="text-[#c9a227]">Diet</span>
              <span className="text-white/50 font-normal ml-1">OS</span>
            </span>
          </div>
          <Link
            href="/login"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Sign In
          </Link>
        </motion.nav>

        {/* Hero */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-8">
              <Sparkles className="h-3.5 w-3.5 text-[#c9a227]" />
              AI-Powered Ayurvedic Diet Planning
            </div>

            <h1 className="text-responsive-3xl font-bold mb-6 leading-tight">
              Ancient Wisdom Meets
              <br />
              <span className="bg-gradient-to-r from-[#4a7c59] via-[#c9a227] to-[#d35400] bg-clip-text text-transparent">
                Modern Nutrition
              </span>
            </h1>

            <p className="text-responsive-base text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Personalized diet recommendations that combine your Ayurvedic constitution (Prakriti)
              with evidence-based nutritional science. Powered by the Ayur-Nutri Hybrid Score algorithm.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/onboarding"
                className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-br from-[#4a7c59] to-[#c9a227] text-white font-semibold shadow-lg shadow-[#c9a227]/20 hover:shadow-xl hover:shadow-[#c9a227]/30 hover:scale-105 transition-all duration-300"
              >
                Get Started
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/foods"
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-white/15 text-white/80 font-medium hover:bg-white/5 hover:border-white/25 transition-all duration-300"
              >
                Browse Foods
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid md:grid-cols-3 gap-5 mb-20"
        >
          <FeatureCard
            icon={<Brain className="h-5 w-5" />}
            title="ANH-Score Algorithm"
            description="Hybrid scoring fuses dosha compatibility, virya matching, and rasa diversity with caloric and protein adequacy"
            gradient="from-[#4a7c59] to-[#7ab08a]"
          />
          <FeatureCard
            icon={<UtensilsCrossed className="h-5 w-5" />}
            title="Smart Meal Composer"
            description="Constraint satisfaction engine generates balanced meals optimizing for taste diversity and dosha harmony"
            gradient="from-[#c9a227] to-[#e8d18c]"
          />
          <FeatureCard
            icon={<Shield className="h-5 w-5" />}
            title="Viruddha Aahara Guard"
            description="Knowledge graph detects incompatible food combinations from classical Ayurvedic texts in real-time"
            gradient="from-[#d35400] to-[#e67e22]"
          />
        </motion.div>

        {/* Stats / Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          <StatCard icon={<Leaf className="h-4 w-4" />} value="430+" label="Global Foods" />
          <StatCard icon={<BookOpen className="h-4 w-4" />} value="100+" label="Ayurveda Tips" />
          <StatCard icon={<Activity className="h-4 w-4" />} value="26" label="Cuisines" />
          <StatCard icon={<Sparkles className="h-4 w-4" />} value="AI" label="Gemini Powered" />
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center text-white/30 text-sm pb-8"
        >
          AyurDiet OS — Integrating Traditional Wisdom with Evidence-Based Nutrition
        </motion.footer>
      </div>
    </AuroraBackground>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="group p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 hover:bg-white/[0.05]">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/50 leading-relaxed">{description}</p>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
      <div className="text-[#c9a227] mb-2">{icon}</div>
      <span className="text-xl font-bold text-white">{value}</span>
      <span className="text-xs text-white/40">{label}</span>
    </div>
  );
}
