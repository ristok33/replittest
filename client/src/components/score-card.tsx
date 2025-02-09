import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Link } from "wouter"
import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa"

interface ScoreCardProps {
  score: {
    overall: number
    income: number
    credit: number
    history: number
    employment: number
    applicationComplete: boolean
    finances: {
      monthlyIncome: number
      monthlyExpenses: number
      currentBalance: number
      maxRent: number
    }
  }
  compact?: boolean
}

export function ScoreCard({ score, compact = false }: ScoreCardProps) {
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('de-DE')}€`
  }

  const renderStars = (score: number) => {
    const stars = []
    const fullStars = Math.floor(score)
    const hasHalfStar = score % 1 >= 0.5

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 w-8 h-8" />)
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalf key={i} className="text-yellow-400 w-8 h-8" />)
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400 w-8 h-8" />)
      }
    }
    return stars
  }

  if (compact) {
    return (
      <Card className="bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Tenant Score
          </CardTitle>
          <div className="flex">
            {renderStars(score.overall)}
          </div>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full mt-4 bg-gradient-to-r from-gray-900 to-gray-600 hover:from-gray-800 hover:to-gray-500">
            <Link href="/score">View Details <ChevronRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full bg-gradient-to-br from-white to-gray-50">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Your Tenant Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex justify-center space-x-1">
          {renderStars(score.overall)}
        </div>

        {/* Financial Details Section */}
        <Card className="border shadow-sm bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-white/80 backdrop-blur-sm">
                <p className="text-sm font-medium text-gray-500">Monthly Income</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(score.finances.monthlyIncome)}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/80 backdrop-blur-sm">
                <p className="text-sm font-medium text-gray-500">Monthly Expenses</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(score.finances.monthlyExpenses)}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/80 backdrop-blur-sm">
                <p className="text-sm font-medium text-gray-500">Current Balance</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(score.finances.currentBalance)}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/80 backdrop-blur-sm">
                <p className="text-sm font-medium text-gray-500">Maximum Rent (40%)</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(score.finances.maxRent)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {!score.applicationComplete && (
          <Button 
            asChild 
            className="w-full bg-gradient-to-r from-gray-900 to-gray-600 hover:from-gray-800 hover:to-gray-500"
          >
            <Link href="/apply">Complete Application</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}