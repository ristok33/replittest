import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Upload } from "lucide-react"
import { Link } from "wouter"
import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa"
import { format } from "date-fns"

interface ScoreCardProps {
  score: {
    overall: number
    income: number
    credit: number
    history: number
    employment: number
    applicationComplete: boolean
    profile: {
      name: string
      email: string
      phone: string
      occupation: string
      lastUpdated: string
      canUpdate: boolean
    }
    finances: {
      monthlyIncome: number
      monthlyExpenses: number
      currentBalance: number
      maxRent: number
      bankStatements: {
        uploaded: boolean
        lastUpdated: string | null
        months: number
      }
      lastUpdated: string
      canUpdate: boolean
    }
    verification: {
      kycComplete: boolean
      employerDataComplete: boolean
      previousRentals: number
      lastUpdated: string
      canUpdate: boolean
      guarantor: {
        name: string | null;
        status: string;
      };
      coTenant: {
        name: string | null;
        status: string;
      };
    }
  }
  compact?: boolean
}

const formatScore = (score: number) => {
  return score.toFixed(2)
}

export function ScoreCard({ score, compact = false }: ScoreCardProps) {
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('de-DE')}€`
  }

  const formatDate = (date: string) => {
    return format(new Date(date), 'MMM d, yyyy')
  }

  const renderStars = (score: number) => {
    const stars = []
    const fullStars = Math.floor(score)
    const hasHalfStar = score % 1 >= 0.5

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-black md:w-8 md:h-8 w-6 h-6" />)
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalf key={i} className="text-black md:w-8 md:h-8 w-6 h-6" />)
      } else {
        stars.push(<FaRegStar key={i} className="text-black md:w-8 md:h-8 w-6 h-6" />)
      }
    }
    return stars
  }

  const handleBankStatementUpload = () => {
    // TODO: Implement bank statement upload logic
    console.log('Uploading bank statements')
  }

  if (compact) {
    return (
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-black">
            Tenant Score
          </CardTitle>
          <div className="flex flex-col items-end">
            <div className="flex">
              {renderStars(score.overall)}
            </div>
            <span className="text-sm text-gray-600 mt-1">
              {formatScore(score.overall)} / 5.00
            </span>
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
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl md:text-3xl font-bold text-center text-black">
          Your Tenant Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-2">
          <div className="flex space-x-1">
            {renderStars(score.overall)}
          </div>
          <span className="text-lg text-gray-600">
            {formatScore(score.overall)} / 5.00
          </span>
        </div>

        {/* Profile Section */}
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-2 p-3 border-b border-gray-100">
            <span className="font-medium text-gray-600">Name</span>
            <span className="font-semibold text-black text-right">{score.profile.name}</span>
          </div>
          <div className="grid grid-cols-2 p-3 border-b border-gray-100">
            <span className="font-medium text-gray-600">Email</span>
            <span className="font-semibold text-black text-right">{score.profile.email}</span>
          </div>
          <div className="grid grid-cols-2 p-3 border-b border-gray-100">
            <span className="font-medium text-gray-600">Phone</span>
            <span className="font-semibold text-black text-right">{score.profile.phone}</span>
          </div>
          <div className="grid grid-cols-2 p-3">
            <span className="font-medium text-gray-600">Occupation</span>
            <span className="font-semibold text-black text-right">{score.profile.occupation}</span>
          </div>
        </div>

        {/* Financial Details Section */}
        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-3">Financial Overview</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-medium text-gray-600">Monthly Income</p>
              <p className="text-lg font-semibold text-black">{formatCurrency(score.finances.monthlyIncome)}</p>
            </div>
            <div className="p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-medium text-gray-600">Monthly Expenses</p>
              <p className="text-lg font-semibold text-black">{formatCurrency(score.finances.monthlyExpenses)}</p>
            </div>
            <div className="p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-medium text-gray-600">Current Balance</p>
              <p className="text-lg font-semibold text-black">{formatCurrency(score.finances.currentBalance)}</p>
            </div>
            <div className="p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-medium text-gray-600">Maximum Rent</p>
              <p className="text-lg font-semibold text-black">{formatCurrency(score.finances.maxRent)}</p>
            </div>
          </div>

          {/* Bank Statements Section */}
          <div className="mt-4 p-3 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm font-medium text-black">Bank Statements</h4>
                <p className="text-xs text-gray-600">
                  {score.finances.bankStatements.uploaded
                    ? `Last updated: ${formatDate(score.finances.bankStatements.lastUpdated!)} (${score.finances.bankStatements.months} months)`
                    : 'No bank statements uploaded yet'}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleBankStatementUpload}
                size="sm"
                className="text-xs"
              >
                <Upload className="h-3 w-3 mr-1" />
                {score.finances.bankStatements.uploaded ? 'Update' : 'Upload'}
              </Button>
            </div>
          </div>
        </div>

        {/* Other Details Section */}
        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-3">Other Details</h3>
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 p-3 border-b border-gray-100">
              <span className="font-medium text-gray-600">KYC Check</span>
              <div className="flex items-center justify-end gap-2">
                <span className="font-semibold text-black">
                  {score.verification.kycComplete ? "Done" : "Not Done"}
                </span>
                {!score.verification.kycComplete && (
                  <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                    Add
                  </Button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 p-3 border-b border-gray-100">
              <span className="font-medium text-gray-600">Employer Data</span>
              <div className="flex items-center justify-end gap-2">
                <span className="font-semibold text-black">
                  {score.verification.employerDataComplete ? "Done" : "Not Done"}
                </span>
                {!score.verification.employerDataComplete && (
                  <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                    Add
                  </Button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 p-3 border-b border-gray-100">
              <span className="font-medium text-gray-600">Guarantor</span>
              <div className="flex items-center justify-end gap-2">
                <span className="font-semibold text-black">
                  {score.verification.guarantor.name || 'Not Added'}
                  {score.verification.guarantor.name && ` (${score.verification.guarantor.status})`}
                </span>
                {!score.verification.guarantor.name && (
                  <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                    Add
                  </Button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 p-3 border-b border-gray-100">
              <span className="font-medium text-gray-600">Co-tenant</span>
              <div className="flex items-center justify-end gap-2">
                <span className="font-semibold text-black">
                  {score.verification.coTenant.name || 'Not Added'}
                  {score.verification.coTenant.name && ` (${score.verification.coTenant.status})`}
                </span>
                {!score.verification.coTenant.name && (
                  <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                    Add
                  </Button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 p-3">
              <span className="font-medium text-gray-600">Previous Rentals</span>
              <span className="font-semibold text-black text-right">
                {score.verification.previousRentals}
              </span>
            </div>
          </div>
        </div>

        {!score.applicationComplete && (
          <Button
            asChild
            className="w-full bg-black text-white hover:bg-gray-900 mt-4"
          >
            <Link href="/apply">Complete Application</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}