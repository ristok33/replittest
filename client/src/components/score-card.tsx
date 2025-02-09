import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Link } from "wouter"

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

  if (compact) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Tenant Score</CardTitle>
          <div className={`text-2xl font-bold ${score.overall >= 4.0 ? 'text-green-500' : 'text-yellow-500'}`}>
            {score.overall.toFixed(2)}
          </div>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full mt-4">
            <Link href="/score">View Details <ChevronRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Your Tenant Score</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <span className={`text-6xl font-bold ${score.overall >= 4.0 ? 'text-green-500' : 'text-yellow-500'}`}>
            {score.overall.toFixed(2)}
          </span>
        </div>

        {/* Financial Details Section */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-xl">Financial Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Income</p>
                <p className="text-lg font-semibold">{formatCurrency(score.finances.monthlyIncome)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Expenses</p>
                <p className="text-lg font-semibold">{formatCurrency(score.finances.monthlyExpenses)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-lg font-semibold">{formatCurrency(score.finances.currentBalance)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Maximum Rent (40%)</p>
                <p className="text-lg font-semibold">{formatCurrency(score.finances.maxRent)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {!score.applicationComplete && (
          <Button asChild className="w-full">
            <Link href="/apply">Complete Application</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}