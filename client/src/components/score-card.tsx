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
    verification: {
      kycComplete: boolean
      employerDataComplete: boolean
      previousRentals: number
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
        stars.push(<FaStar key={i} className="text-black w-8 h-8" />)
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalf key={i} className="text-black w-8 h-8" />)
      } else {
        stars.push(<FaRegStar key={i} className="text-black w-8 h-8" />)
      }
    }
    return stars
  }

  if (compact) {
    return (
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-black">
            Tenant Score
          </CardTitle>
          <div className="flex">
            {renderStars(score.overall)}
          </div>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full mt-4 bg-black text-white hover:bg-gray-900">
            <Link href="/score">View Details <ChevronRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-black">
          Your Tenant Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex justify-center space-x-1">
          {renderStars(score.overall)}
        </div>

        {/* Financial Details Section */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-xl text-black">Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 rounded-lg border border-gray-100">
                <p className="text-sm font-medium text-gray-600">Monthly Income</p>
                <p className="text-2xl font-semibold text-black">{formatCurrency(score.finances.monthlyIncome)}</p>
              </div>
              <div className="p-4 rounded-lg border border-gray-100">
                <p className="text-sm font-medium text-gray-600">Monthly Expenses</p>
                <p className="text-2xl font-semibold text-black">{formatCurrency(score.finances.monthlyExpenses)}</p>
              </div>
              <div className="p-4 rounded-lg border border-gray-100">
                <p className="text-sm font-medium text-gray-600">Current Balance</p>
                <p className="text-2xl font-semibold text-black">{formatCurrency(score.finances.currentBalance)}</p>
              </div>
              <div className="p-4 rounded-lg border border-gray-100">
                <p className="text-sm font-medium text-gray-600">Maximum Rent (40%)</p>
                <p className="text-2xl font-semibold text-black">{formatCurrency(score.finances.maxRent)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Status Section */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-xl text-black">Verification Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">KYC Check</span>
                <span className="text-sm font-semibold text-black">
                  {score.verification.kycComplete ? "Done" : "Not Done"}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Employer Data</span>
                <span className="text-sm font-semibold text-black">
                  {score.verification.employerDataComplete ? "Done" : "Not Done"}
                </span>
              </div>
              <div className="flex justify-between items-center p-4">
                <span className="text-sm font-medium text-gray-600">Previous CasaPay Rentals</span>
                <span className="text-sm font-semibold text-black">
                  {score.verification.previousRentals}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Details Section */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-xl text-black">Other Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">KYC Check</span>
                <span className="text-sm font-semibold text-black">
                  {score.verification.kycComplete ? "Done" : "Not Done"}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Employer Data</span>
                <span className="text-sm font-semibold text-black">
                  {score.verification.employerDataComplete ? "Done" : "Not Done"}
                </span>
              </div>
              <div className="flex justify-between items-center p-4">
                <span className="text-sm font-medium text-gray-600">Previous CasaPay Rentals</span>
                <span className="text-sm font-semibold text-black">
                  {score.verification.previousRentals}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {!score.applicationComplete && (
          <Button 
            asChild 
            className="w-full bg-black text-white hover:bg-gray-900"
          >
            <Link href="/apply">Complete Application</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}