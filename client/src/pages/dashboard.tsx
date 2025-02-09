import { useStore } from "@/lib/store"
import { ScoreCard } from "@/components/score-card"
import { Button } from "@/components/ui/button"
import { LogOut, ChevronRight } from "lucide-react"
import { useLocation, Link } from "wouter"
import { Card, CardContent } from "@/components/ui/card"

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 bg-white rounded-lg p-6 shadow-sm">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Welcome back!
            </h1>
            <p className="text-gray-600 mt-1">{user.name}</p>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-gray-600">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Score Overview */}
        <div className="mb-8">
          <ScoreCard score={score} compact />
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Complete Profile</h3>
              <p className="text-gray-600 mb-4">Update your information to improve your tenant score.</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/profile">
                  Go to Profile
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Share Score</h3>
              <p className="text-gray-600 mb-4">Share your tenant score with potential landlords.</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/share">
                  Share Score
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}