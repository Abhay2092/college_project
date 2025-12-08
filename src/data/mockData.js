export const users = [
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@cms.com',
    role: 'Admin',
    password: 'password123'
  },
  {
    id: 'judge1',
    name: 'Honorable Judge Smith',
    email: 'judge@cms.com',
    role: 'Judge',
    password: 'password123'
  },
  {
    id: 'lawyer1',
    name: 'Atticus Finch',
    email: 'lawyer@cms.com',
    role: 'Lawyer',
    password: 'password123'
  },
  {
    id: 'person1',
    name: 'John Doe',
    email: 'client@cms.com',
    role: 'Person',
    password: 'password123'
  }
];

export const cases = [
  {
    id: 'case1',
    title: 'State vs. Doe',
    description: 'Alleged theft of a bicycle.',
    status: 'Active',
    assignedJudgeId: 'judge1',
    assignedLawyerId: 'lawyer1',
    clientId: 'person1',
    documents: [
      { id: 'doc1', name: 'Police Report.pdf', date: '2023-10-01' },
      { id: 'doc2', name: 'Witness Statement.pdf', date: '2023-10-02' }
    ],
    nextHearing: '2023-11-15'
  },
  {
    id: 'case2',
    title: 'Smith vs. Jones',
    description: 'Property dispute regarding fence line.',
    status: 'Pending',
    assignedJudgeId: 'judge1',
    assignedLawyerId: 'lawyer1',
    clientId: 'person2', // Non-existent user for now, or add another
    documents: [],
    nextHearing: '2023-12-01'
  },
  {
    id: 'case3',
    title: 'Traffic Violation #12345',
    description: 'Speeding in a school zone.',
    status: 'Closed',
    assignedJudgeId: 'judge1',
    assignedLawyerId: 'lawyer1',
    clientId: 'person1',
    documents: [
      { id: 'doc3', name: 'Ticket.pdf', date: '2023-09-10' },
      { id: 'doc4', name: 'Payment Receipt.pdf', date: '2023-09-15' }
    ],
    nextHearing: null
  }
];
