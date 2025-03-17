const cron = require('node-cron');
const borrowRecordRepo = require('../repositories/borrowrecordRepository');
const notificationService = require('../services/notificationService');

cron.schedule('0 9 * * *', async () => {
  console.log('Run cron job to send reminder notification...');
  const borrowRecords = await borrowRecordRepo.findAllApprovedBorrows();

  for (const record of borrowRecords) {
    await notificationService.sendReminder(record.userId, record._id);
  }
});
