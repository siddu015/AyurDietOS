'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Leaf, Home, RefreshCw, AlertTriangle } from 'lucide-react';

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Route error boundary:', error);
    }, [error]);

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

                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>

                <h2 className="text-2xl font-semibold text-white mb-3">
                    Something went wrong
                </h2>
                <p className="text-white/50 mb-2">
                    We hit an unexpected error. Try again, or head back to a safe page.
                </p>
                {error.digest && (
                    <p className="text-xs text-white/30 mb-8 font-mono">
                        Reference: {error.digest}
                    </p>
                )}

                <div className="flex gap-3 justify-center flex-wrap">
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-[#4a7c59] to-[#c9a227] text-white font-medium hover:shadow-lg hover:scale-[1.02] transition-all"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 font-medium hover:bg-white/10 transition-all"
                    >
                        <Home className="h-4 w-4" />
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
