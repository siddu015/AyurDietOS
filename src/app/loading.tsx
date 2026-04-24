import { Leaf } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4a7c59] to-[#c9a227] flex items-center justify-center animate-pulse">
                        <Leaf className="h-7 w-7 text-white" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl border-2 border-[#c9a227]/30 animate-ping" />
                </div>
                <p className="text-sm text-white/40">Loading...</p>
            </div>
        </div>
    );
}
