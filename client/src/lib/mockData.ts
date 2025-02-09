export const mockScoreData = {
  initial: {
    overall: 3.20,
    income: 3.1,
    credit: 2.8,
    history: 3.5,
    employment: 3.2,
    applicationComplete: false,
    finances: {
      monthlyIncome: 1200,
      monthlyExpenses: 333,
      currentBalance: 2304,
      maxRent: 480, // 40% of income
    },
    verification: {
      kycComplete: false,
      employerDataComplete: false,
      previousRentals: 0,
    }
  },
  improved: {
    overall: 4.50,
    income: 4.2,
    credit: 4.1,
    history: 4.5,
    employment: 4.3,
    applicationComplete: true,
    finances: {
      monthlyIncome: 2000,
      monthlyExpenses: 500,
      currentBalance: 5000,
      maxRent: 800, // 40% of income
    },
    verification: {
      kycComplete: true,
      employerDataComplete: true,
      previousRentals: 2,
    }
  },
}

export const mockUser = {
  id: '123',
  email: 'john.doe@example.com',
  name: 'John Doe',
}