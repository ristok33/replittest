import { useEffect, useRef, useState } from 'react'

const PIG_SVG = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="14" fill="#FFB6C1"/>
  <circle cx="12" cy="12" r="2" fill="black"/>
  <circle cx="20" cy="12" r="2" fill="black"/>
  <circle cx="16" cy="16" r="4" fill="#FF69B4"/>
</svg>
`

const RICE_SVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 4L4 20H20L12 4Z" fill="#FFE4B5"/>
</svg>
`

export function JumpingPigGame() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [pigY, setPigY] = useState(150)
  const [isJumping, setIsJumping] = useState(false)
  const gameRef = useRef<HTMLDivElement>(null)
  const ricePositionRef = useRef(400)
  const animationFrameRef = useRef<number>()
  const jumpHeightRef = useRef(0)
  const speedMultiplierRef = useRef(1)

  const startGame = () => {
    setIsPlaying(true)
    setScore(0)
    setIsGameOver(false)
    ricePositionRef.current = 400
    setPigY(150)
    speedMultiplierRef.current = 1
    gameLoop()
  }

  const jump = () => {
    if (!isJumping && !isGameOver) {
      setIsJumping(true)
      jumpHeightRef.current = 100
    }
  }

  const gameLoop = () => {
    if (!gameRef.current) return

    // Calculate speed based on score with a more gradual increase
    const baseSpeed = 2 // Slower initial speed
    speedMultiplierRef.current = 1 + Math.floor(score / 10) * 0.2 // Increase speed every 10 points

    // Update rice position with dynamic speed
    ricePositionRef.current -= baseSpeed * speedMultiplierRef.current
    if (ricePositionRef.current < -50) {
      ricePositionRef.current = 400 // Reset to right side
      setScore(s => s + 1)
    }

    // Update pig position if jumping
    if (isJumping) {
      setPigY(y => {
        const newY = y - jumpHeightRef.current * 0.1
        jumpHeightRef.current -= 5
        if (jumpHeightRef.current <= 0) {
          setIsJumping(false)
          return 150
        }
        return newY
      })
    }

    // Collision detection
    const pigRect = {
      x: 50,
      y: pigY,
      width: 32,
      height: 32
    }

    const riceRect = {
      x: ricePositionRef.current,
      y: 150,
      width: 24,
      height: 24
    }

    if (
      pigRect.x < riceRect.x + riceRect.width &&
      pigRect.x + pigRect.width > riceRect.x &&
      pigRect.y < riceRect.y + riceRect.height &&
      pigRect.y + pigRect.height > riceRect.y
    ) {
      setIsGameOver(true)
      return
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop)
  }

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault() // Prevent double-firing on touch devices
    if (!isPlaying) {
      startGame()
    } else {
      jump()
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div 
        ref={gameRef}
        className="relative h-64 bg-gray-100 border-b-2 border-gray-300 overflow-hidden cursor-pointer select-none"
        onClick={handleInteraction}
        onTouchStart={handleInteraction}
      >
        {/* Pig */}
        <div 
          className="absolute left-12 transition-transform"
          style={{ 
            top: `${pigY}px`,
            transform: `translateY(-${isJumping ? '20' : '0'}px)`,
          }}
          dangerouslySetInnerHTML={{ __html: PIG_SVG }}
        />

        {/* Rice */}
        {isPlaying && (
          <div
            className="absolute transition-transform"
            style={{ 
              left: `${ricePositionRef.current}px`,
              top: '150px'
            }}
            dangerouslySetInnerHTML={{ __html: RICE_SVG }}
          />
        )}

        {/* Score */}
        <div className="absolute top-4 right-4 text-2xl font-bold">
          {score}
        </div>

        {/* Game Over */}
        {isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Game Over!</h3>
              <p className="mb-4">Score: {score}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  startGame()
                }}
                className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100"
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Start Screen */}
        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Jumping Pig Game</h3>
              <p className="mb-4 text-sm text-gray-600">Tap or click to play and jump</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}