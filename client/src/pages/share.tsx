import { useStore } from "@/lib/store"
import { ScoreCard } from "@/components/score-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronLeft, Mail } from "lucide-react"
import { Link, useLocation } from "wouter"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function SharePage() {
  const [, navigate] = useLocation()
  const { toast } = useToast()
  const { user, score } = useStore()
  const [email, setEmail] = useState("")

  if (!user || !score) {
    navigate("/")
    return null
  }

  const handleShare = () => {
    toast({
      title: "Score shared successfully",
      description: `Your score has been shared with ${email}`,
    })
    setEmail("")
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
        
        <div className="max-w-2xl mx-auto space-y-6">
          <ScoreCard score={score} />
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={handleShare} disabled={!email}>
                  <Mail className="mr-2 h-4 w-4" />
                  Share Score
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
