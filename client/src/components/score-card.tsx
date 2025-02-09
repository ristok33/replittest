import { Progress } from "@/components/ui/progress"
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
  }
  compact?: boolean
}

export function ScoreCard({ score, compact = false }: ScoreCardProps) {
  const getScoreColor = (value: number) => {
    if (value >= 4.0) return "bg-green-500"
    if (value >= 3.0) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Convert 1-5 scale to percentage for progress bar
  const toPercentage = (value: number) => ((value - 1) / 4) * 100

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

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Income Stability</span>
              <span>{score.income.toFixed(2)}</span>
            </div>
            <Progress value={toPercentage(score.income)} className={getScoreColor(score.income)} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Credit Score</span>
              <span>{score.credit.toFixed(2)}</span>
            </div>
            <Progress value={toPercentage(score.credit)} className={getScoreColor(score.credit)} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Rental History</span>
              <span>{score.history.toFixed(2)}</span>
            </div>
            <Progress value={toPercentage(score.history)} className={getScoreColor(score.history)} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Employment</span>
              <span>{score.employment.toFixed(2)}</span>
            </div>
            <Progress value={toPercentage(score.employment)} className={getScoreColor(score.employment)} />
          </div>
        </div>

        {!score.applicationComplete && (
          <Button asChild className="w-full">
            <Link href="/apply">Complete Application</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}