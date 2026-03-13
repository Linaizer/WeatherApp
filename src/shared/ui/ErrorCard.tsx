import SadCloud from '../assets/SadCloud.gif'

export const ErrorCard = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-900 to-violet-950 flex flex-col items-center justify-center text-white gap-6">
            <img src={SadCloud} alt='error' className="w-64 h-64" />
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">Something went wrong...</h1>
                <p className="text-white/60">tell about problem to <a href="mailto:ponomar.kolya10@gmail.com" className="text-blue-400">ponomar.kolya10@gmail.com</a></p>
            </div>
        </div>
    )
}
