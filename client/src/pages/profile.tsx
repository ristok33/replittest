import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LogOut } from "lucide-react"
import { useLocation } from "wouter"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const [, navigate] = useLocation()
  const { toast } = useToast()
  const { user, score, logout } = useStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: score?.profile?.phone || '',
    occupation: score?.profile?.occupation || ''
  })

  if (!user || !score) {
    navigate("/")
    return null
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement profile update logic
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                {isEditing ? (
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                ) : (
                  <p className="text-gray-700">{formData.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                ) : (
                  <p className="text-gray-700">{formData.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                {isEditing ? (
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                ) : (
                  <p className="text-gray-700">{formData.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Occupation</label>
                {isEditing ? (
                  <Input
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  />
                ) : (
                  <p className="text-gray-700">{formData.occupation}</p>
                )}
              </div>

              <div className="pt-4">
                {isEditing ? (
                  <div className="flex space-x-2">
                    <Button type="submit">Save Changes</Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button type="button" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}