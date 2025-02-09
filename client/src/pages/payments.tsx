import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocation } from "wouter"

export default function PaymentsPage() {
  const [, navigate] = useLocation()
  const { user } = useStore()

  if (!user) {
    navigate("/")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">No payments available yet.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
