
export const SkeletonCard = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-900 to-violet-950 flex items-center justify-center">
            <div className="w-full max-w-4xl p-6 md:grid md:grid-cols-2 md:gap-6">
                <div className="animate-pulse bg-white/10 rounded-2xl p-6 h-64">
                </div>
                <div className="animate-pulse bg-white/10 rounded-2xl p-6 h-64">
                </div>
            </div>
        </div>
    )
}