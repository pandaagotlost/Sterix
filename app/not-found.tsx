"use client"

import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function NotFoundPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 800
    canvas.height = 400

    // Game variables
    let animationFrameId: number
    let lastTime = 0
    const playerSize = 30
    let playerY = canvas.height / 2 - playerSize / 2
    const playerX = 50
    const gravity = 0.5
    let playerVelocity = 0
    const jumpStrength = -12 // Increased jump strength
    const obstacles: { x: number; y: number; width: number; height: number }[] = []
    const obstacleSpeed = 5
    const obstacleWidth = 50
    const minObstacleHeight = 50
    const maxObstacleHeight = 100 // Reduced maximum obstacle height
    const obstacleGap = 200
    let lastObstacleTime = 0
    let gameScore = 0

    // Game controls
    const keys: { [key: string]: boolean } = {}
    window.addEventListener("keydown", (e) => {
      keys[e.code] = true
    })
    window.addEventListener("keyup", (e) => {
      keys[e.code] = false
    })

    // Jump function
    const jump = () => {
      // Allow jumping if player is close to the ground (more forgiving)
      if (playerY >= canvas.height - playerSize - 5) {
        playerVelocity = jumpStrength
      }
    }

    // Create obstacle
    const createObstacle = () => {
      const height = Math.random() * (maxObstacleHeight - minObstacleHeight) + minObstacleHeight
      const y = canvas.height - height
      obstacles.push({
        x: canvas.width,
        y,
        width: obstacleWidth,
        height,
      })
    }

    // Game loop
    const gameLoop = (timestamp: number) => {
      const deltaTime = timestamp - lastTime
      lastTime = timestamp

      // Clear canvas
      ctx.fillStyle = "#1a1b26"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw ground
      ctx.fillStyle = "#252632"
      ctx.fillRect(0, canvas.height - 1, canvas.width, 1)

      // Update player
      playerVelocity += gravity
      playerY += playerVelocity

      // Ground collision
      if (playerY > canvas.height - playerSize) {
        playerY = canvas.height - playerSize
        playerVelocity = 0
      }

      // Handle jump
      if (keys["Space"] || keys["ArrowUp"]) {
        jump()
      }

      // Draw player
      ctx.fillStyle = "#9d7cff"
      ctx.fillRect(playerX, playerY, playerSize, playerSize)

      // Create obstacles
      if (timestamp - lastObstacleTime > obstacleGap * 5) {
        createObstacle()
        lastObstacleTime = timestamp
      }

      // Update and draw obstacles
      for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i]
        obstacle.x -= obstacleSpeed

        // Check collision
        if (
          playerX < obstacle.x + obstacle.width &&
          playerX + playerSize > obstacle.x &&
          playerY < obstacle.y + obstacle.height &&
          playerY + playerSize > obstacle.y
        ) {
          // Game over
          setGameStarted(false)
          return
        }

        // Remove off-screen obstacles and increase score
        if (obstacle.x + obstacle.width < 0) {
          obstacles.splice(i, 1)
          i--
          gameScore++
          setScore(gameScore)
        }

        // Draw obstacle
        ctx.fillStyle = "#7c4dff"
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
      }

      // Draw score
      ctx.fillStyle = "white"
      ctx.font = "20px Arial"
      ctx.fillText(`Score: ${gameScore}`, 20, 30)

      // Continue game loop
      animationFrameId = requestAnimationFrame(gameLoop)
    }

    // Start game loop
    animationFrameId = requestAnimationFrame(gameLoop)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("keydown", (e) => {
        keys[e.code] = true
      })
      window.removeEventListener("keyup", (e) => {
        keys[e.code] = false
      })
    }
  }, [gameStarted])

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#1a1b26] pt-16 flex flex-col items-center justify-center p-4 pb-24">
        <div className="max-w-4xl w-full text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <p className="text-2xl text-gray-300 mb-6">Oops! Page not found</p>
          <p className="text-lg text-gray-400 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          {!gameStarted ? (
            <div className="space-y-6">
              <div className="bg-[#252632]/80 border border-gray-700 rounded-lg p-6 max-w-md mx-auto">
                <h2 className="text-xl font-bold text-white mb-3">While you're here...</h2>
                <p className="text-gray-300 mb-4">
                  Play a quick game! Use the space bar or up arrow to jump and avoid obstacles.
                </p>
                <Button
                  onClick={() => setGameStarted(true)}
                  className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff]"
                >
                  Start Game
                </Button>
              </div>
              {score > 0 && <p className="text-white text-lg">Your last score: {score}</p>}
            </div>
          ) : (
            <div className="space-y-4">
              <canvas
                ref={canvasRef}
                className="bg-[#1a1b26] border border-gray-700 rounded-lg mx-auto max-w-full"
                style={{ maxWidth: "800px" }}
              />
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => setGameStarted(false)}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Stop Game
                </Button>
              </div>
              <p className="text-gray-400 text-sm">Use space bar or up arrow to jump</p>
            </div>
          )}

          <div className="mt-8 flex justify-center gap-4">
            <Button
              asChild
              className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff]"
            >
              <Link href="/">Go Home</Link>
            </Button>
            <Button asChild variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <Link href="/docs">Documentation</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
