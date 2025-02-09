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
        status: string;  // Remove null type
      };
      coTenant: {
        name: string | null;
        status: string;  // Remove null type
      };
    }
  }
  compact?: boolean
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
        stars.push(<FaStar key={i} className="text-black w-8 h-8" />)
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalf key={i} className="text-black w-8 h-8" />)
      } else {
        stars.push(<FaRegStar key={i} className="text-black w-8 h-8" />)
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

        {/* Profile Section */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-xl text-black">Tenant Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Name</span>
                <span className="text-sm font-semibold text-black">{score.profile.name}</span>
              </div>
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Email</span>
                <span className="text-sm font-semibold text-black">{score.profile.email}</span>
              </div>
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Phone</span>
                <span className="text-sm font-semibold text-black">{score.profile.phone}</span>
              </div>
              <div className="flex justify-between items-center p-4">
                <span className="text-sm font-medium text-gray-600">Occupation</span>
                <span className="text-sm font-semibold text-black">{score.profile.occupation}</span>
              </div>
            </div>
          </CardContent>
        </Card>

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

            {/* Bank Statements Section */}
            <div className="mt-6 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-black">Bank Statements</h4>
                  <p className="text-sm text-gray-600">
                    {score.finances.bankStatements.uploaded
                      ? `Last updated: ${formatDate(score.finances.bankStatements.lastUpdated!)} (${score.finances.bankStatements.months} months of history)`
                      : 'No bank statements uploaded yet'}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleBankStatementUpload}
                  className="flex items-center space-x-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>{score.finances.bankStatements.uploaded ? 'Update' : 'Upload'}</span>
                </Button>
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
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Previous CasaPay Rentals</span>
                <span className="text-sm font-semibold text-black">
                  {score.verification.previousRentals}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Guarantor</span>
                <span className="text-sm font-semibold text-black">
                  {score.verification.guarantor.name || 'Not Added'}
                  {score.verification.guarantor.name && ` (${score.verification.guarantor.status})`}
                </span>
              </div>
              <div className="flex justify-between items-center p-4">
                <span className="text-sm font-medium text-gray-600">Co-tenant</span>
                <span className="text-sm font-semibold text-black">
                  {score.verification.coTenant.name || 'Not Added'}
                  {score.verification.coTenant.name && ` (${score.verification.coTenant.status})`}
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