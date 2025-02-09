import { ApplicationForm } from "@/components/application-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import { Link, useLocation } from "wouter"
import { useStore } from "@/lib/store"

export default function ApplyPage() {
  const [, navigate] = useLocation()
  const { user } = useStore()

  if (!user) {
    navigate("/")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/score">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Score
          </Link>
        </Button>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Complete Your Application</CardTitle>
          </CardHeader>
          <CardContent>
            <ApplicationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
