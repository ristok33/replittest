import { useStore } from "@/lib/store"
import { ScoreCard } from "@/components/score-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { Link, useLocation } from "wouter"

export default function ScorePage() {
  const [, navigate] = useLocation()
  const { user, score } = useStore()

  if (!user || !score) {
    navigate("/")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/dashboard">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        
        <div className="max-w-2xl mx-auto">
          <ScoreCard score={score} />
        </div>
      </div>
    </div>
  )
}
