const puppeteer = require('puppeteer');

const scrapeAttendance = async (username, password) => {
  const browser = await puppeteer.launch({ headless: true }); // Run in headful mode for debugging
  const page = await browser.newPage();

  try {
    await page.goto('https://online.nitjsr.ac.in/endsem/Login.aspx', { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    await page.waitForSelector('#txtuser_id');
    await page.type('#txtuser_id', username);
    await page.type('#txtpassword', password);

    await page.waitForSelector('#btnsubmit', { visible: true });
    
    console.log('Navigating to submit...');
    await Promise.all([
      page.click('#btnsubmit'),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 })
    ]);
    
    console.log('Login successful.');

    console.log('Navigating to attendance page...');
    await page.goto('https://online.nitjsr.ac.in/endsem/StudentAttendance/ClassAttendance.aspx', { waitUntil: 'networkidle2', timeout: 30000 });

    console.log('Waiting for attendance table to load...');
    await page.waitForSelector('table');

    console.log('Scraping attendance data...');
    const attendanceData = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('tbody tr'));
      return rows.map(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length < 6) return {};

        return {
          slNo: cells[0]?.innerText.trim(),
          subjectCode: cells[1]?.innerText.trim(),
          subjectName: cells[2]?.innerText.trim(),
          facultyName: cells[3]?.innerText.trim(),
          presentTotal: cells[4]?.innerText.trim(),
          attendancePercentage: cells[5]?.innerText.trim()
        };
      }).filter(row => row.slNo && row.subjectCode);
    });

    await browser.close();
    return attendanceData;
  } catch (error) {
    console.error('Error scraping attendance:', error);
    await browser.close();
    throw error;
  }
};

module.exports = { scrapeAttendance };
