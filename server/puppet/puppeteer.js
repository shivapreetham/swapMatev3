// jobs/attendanceCron.js
const cron = require('node-cron');
const { scrapeAttendanceData } = require('../controllers/puppetController');

cron.schedule('0 18 * * *', async () => {
  console.log('Running scheduled attendance scraping task...');
  try {
    await scrapeAttendanceData();
    console.log('Attendance scraping completed.');
  } catch (error) {
    console.error('Error during attendance scraping task:', error);
  }
});

console.log('Cron job for attendance scraping initialized.');
