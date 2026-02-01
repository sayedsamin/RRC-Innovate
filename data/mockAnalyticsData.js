
export const mockAnalyticsData = {
  // Basic Stats Cards
  basicStats: [
    { label: "Articles Read", value: "142", change: "+12%", trend: "up" },
    { label: "Learning Hours", value: "86h", change: "+5.4%", trend: "up" },
    { label: "Productivity Score", value: "94/100", change: "+2.1%", trend: "up" },
    { label: "Day Streak", value: "18 Days", change: "Best", trend: "neutral" }
  ],

  // Hourly Activity (User Request: "breakdown over when in the daytime")
  hourlyActivity: [
    { time: '6am', value: 2 },
    { time: '7am', value: 5 },
    { time: '8am', value: 15 }, // Morning catch-up
    { time: '9am', value: 3 },  // Quick lookup
    { time: '10am', value: 5 },
    { time: '11am', value: 2 },
    { time: '12pm', value: 10 }, // Lunch reading
    { time: '1pm', value: 4 },
    { time: '2pm', value: 6 },
    { time: '3pm', value: 2 },
    { time: '4pm', value: 3 },
    { time: '5pm', value: 5 },
    { time: '6pm', value: 12 }, // Evening wrap-up
    { time: '7pm', value: 8 },
    { time: '8pm', value: 0 },
  ],

  // Skill Radar Chart
  skills: [
    { subject: 'Strategy', A: 120, B: 110, fullMark: 150 },
    { subject: 'Technical', A: 98, B: 130, fullMark: 150 },
    { subject: 'Agile', A: 86, B: 130, fullMark: 150 },
    { subject: 'Data', A: 99, B: 100, fullMark: 150 },
    { subject: 'Cloud', A: 85, B: 90, fullMark: 150 },
    { subject: 'AI Tools', A: 125, B: 85, fullMark: 150 }, // High growth in AI
  ],

  // Task Velocity Impact (User Request: "reduce time spent per task... based on Jira record")
  taskImpact: [
    { name: 'Research', baseline: 12, current: 4, improvement: '3x' },    // AI Summarization
    { name: 'Financial', baseline: 16, current: 6, improvement: '2.5x' }, // Excel Copilot
    { name: 'Reporting', baseline: 8, current: 2, improvement: '4x' },    // Auto-gen reports
    { name: 'Coding', baseline: 25, current: 15, improvement: '1.6x' },   // Code Assistants
    { name: 'Comms', baseline: 10, current: 5, improvement: '2x' },       // Email/Slack drafting
  ],

  // Time Breakdown Donut Chart
  timeAllocation: [
    { name: 'Deep Work', value: 65 },  // Increased from 45%
    { name: 'Learning', value: 10 },   // Reduced from 25% (Efficient!)
    { name: 'Meetings', value: 15 },
    { name: 'Admin', value: 10 },
  ]
};
