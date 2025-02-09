import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLocation } from "wouter"
import { useState } from "react"
import { JumpingPigGame } from "@/components/jumping-pig-game"
import { Sparkles } from "lucide-react"

export default function OffersPage() {
  const [, navigate] = useLocation()
  const { user } = useStore()
  const [showGame, setShowGame] = useState(false)

  if (!user) {
    navigate("/")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">No offers available yet.</p>
          </CardContent>
        </Card>

        {/* Surprise Game Section */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowGame(true)}
            className="group"
          >
            <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:scale-125" />
            Surprise!
          </Button>
        </div>

        {showGame && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Jumping Pig Game
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowGame(false)}
                >
                  Close
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <JumpingPigGame />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}