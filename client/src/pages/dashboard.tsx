import { useStore } from "@/lib/store"
import { ScoreCard } from "@/components/score-card"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useLocation } from "wouter"

export default function DashboardPage() {
  const [, navigate] = useLocation()
  const { user, score, logout } = useStore()

  if (!user || !score) {
    navigate("/")
    return null
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        
        <div className="grid gap-6">
          <ScoreCard score={score} compact />
        </div>
      </div>
    </div>
  )
}
