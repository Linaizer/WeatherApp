interface WeatherBackground {
    description: string
    hour:number
}

export const WeatherBackground = ({ description,hour }: WeatherBackground) => {
    const raindrops = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: Math.random() * 1 + 0.5,
        delay: Math.random() * 2,
    }))

    const stars = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        twinkle: Math.random() > 0.8

    }))

    const bolts = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 50,
        delay: Math.random() * 4,
    }))

    const isRaining = description.includes('rain') || description.includes('thunder')
    const isSnow = description.includes('snow')
    const isThunder = description.includes('thunder')
    const isNight = hour < 6 || hour >= 20 

    return (
        <>
            {isRaining && raindrops.map(drop => (
                <div
                    key={drop.id}
                    className="raindrop"
                    style={{
                        left: `${drop.left}%`,
                        animationDuration: `${drop.duration}s`,
                        animationDelay: `${drop.delay}s`
                    }}
                >
                </div>
            ))}
            {isSnow && <div className="snowblock"></div>}
            { isNight &&  stars.map(star => (
                <div
                    key={star.id}
                    style={{
                        left: `${star.left}%`,
                        top: `${star.top}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: `${star.opacity}`,
                        animation: star.twinkle ? 'twinkle 4s infinite' : undefined
                    }}
                    className="absolute rounded-full bg-white"
                >
                </div>
            ))
            }
            {isThunder && bolts.map(bolt => (
                <div
                    key={bolt.id}
                    style={{
                        position: 'absolute',
                        left: `${bolt.left}%`,
                        top: `${bolt.top}%`,
                        animation: 'lightning 3s infinite',
                        animationDelay: `${bolt.delay}s`
                    }}

                >
                    <svg width="60" height="200">
                        <polyline
                            points="40,0 20,80 35,80 10,160"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                        />
                    </svg>
                </div>
            ))}
        </>
    )
}