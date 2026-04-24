import Link from 'next/link';
import { Leaf, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6">
            <div className="max-w-md w-full text-center">
                <div className="inline-flex items-center gap-2 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4a7c59] to-[#c9a227] flex items-center justify-center">
                        <Leaf className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-2xl font-bold">
                        <span className="text-[#4a7c59]">Ayur</span>
                        <span className="text-[#c9a227]">Diet</span>
                    </span>
                </div>

                <h1 className="text-7xl font-bold bg-gradient-to-br from-[#c9a227] to-[#4a7c59] bg-clip-text text-transparent mb-4">
                    404
                </h1>
                <h2 className="text-2xl font-semibold text-white mb-3">
                    Page not found
                </h2>
                <p className="text-white/50 mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Let&apos;s get you back on track.
                </p>

                <div className="flex gap-3 justify-center flex-wrap">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-[#4a7c59] to-[#c9a227] text-white font-medium hover:shadow-lg hover:scale-[1.02] transition-all"
                    >
                        <Home className="h-4 w-4" />
                        Home
                    </Link>
                    <Link
                        href="/patient/dashboard"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 font-medium hover:bg-white/10 transition-all"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
