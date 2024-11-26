const fs = require('fs');

const firstNames = ['Mohammed', 'Ahmed', 'Fatima', 'Amina', 'Youssef', 'Aisha', 'Omar', 'Leila', 'Karim', 'Nour'];
const lastNames = ['Benali', 'Boumediene', 'Zerhouni', 'Benmansour', 'Benahmed', 'Belhadj', 'Boudjelal', 'Bouazza', 'Benabdallah', 'Belhocine'];
const roles = ['student', 'teacher', 'admin', 'company'];
const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
const specialties = ['GL', 'IA', 'RSD', 'SIC'];

function generateEmail(firstName, lastName) {
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
}

function generateUsers(count) {
  let users = [['First Name', 'Last Name', 'Email', 'Role', 'Specialty']];
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = generateEmail(firstName, lastName);
    const role = roles[Math.floor(Math.random() * roles.length)];
    const specialty = role === 'student' ? specialties[Math.floor(Math.random() * specialties.length)] : '';
    
    users.push([firstName, lastName, email, role, specialty]);
  }
  
  return users;
}

const usersData = generateUsers(50);
const csvContent = usersData.map(row => row.join(',')).join('\n');

fs.writeFileSync('tlemcen_users.csv', csvContent);
console.log('CSV file has been generated successfully.');