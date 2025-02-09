export const mockScoreData = {
  initial: {
    overall: 3.20,
    income: 3.1,
    credit: 2.8,
    history: 3.5,
    employment: 3.2,
    applicationComplete: false,
    profile: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+49 123 456789',
      occupation: 'Software Developer',
      lastUpdated: '2024-02-09',
      canUpdate: true
    },
    finances: {
      monthlyIncome: 1200,
      monthlyExpenses: 333,
      currentBalance: 2304,
      maxRent: 480, // 40% of income
      bankStatements: {
        uploaded: false,
        lastUpdated: null,
        months: 0
      },
      lastUpdated: '2024-02-09',
      canUpdate: true
    },
    verification: {
      kycComplete: false,
      employerDataComplete: false,
      previousRentals: 0,
      guarantor: {
        name: null,
        status: 'Not Added'
      },
      coTenant: {
        name: null,
        status: 'Not Added'
      },
      lastUpdated: '2024-02-09',
      canUpdate: true
    }
  },
  improved: {
    overall: 4.50,
    income: 4.2,
    credit: 4.1,
    history: 4.5,
    employment: 4.3,
    applicationComplete: true,
    profile: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+49 123 456789',
      occupation: 'Software Developer',
      lastUpdated: '2024-02-09',
      canUpdate: true
    },
    finances: {
      monthlyIncome: 2000,
      monthlyExpenses: 500,
      currentBalance: 5000,
      maxRent: 800, // 40% of income
      bankStatements: {
        uploaded: true,
        lastUpdated: '2024-02-09',
        months: 3
      },
      lastUpdated: '2024-02-09',
      canUpdate: true
    },
    verification: {
      kycComplete: true,
      employerDataComplete: true,
      previousRentals: 2,
      guarantor: {
        name: 'Jane Smith',
        status: 'Verified'
      },
      coTenant: {
        name: 'Alex Johnson',
        status: 'Verified'
      },
      lastUpdated: '2024-02-09',
      canUpdate: true
    }
  },
}

export const mockUser = {
  id: '123',
  email: 'john.doe@example.com',
  name: 'John Doe',
}