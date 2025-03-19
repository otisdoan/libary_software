const cron = require('node-cron');
const borrowRecordRepo = require('../repositories/borrowrecordRepository');
const notificationService = require('../services/notificationService');

cron.schedule('*/3 * * * *', async () => {
    console.log('Run cron job to send reminder notification...');
    const borrowRecords = await borrowRecordRepo.findBorrowsDueInTwoDays();

    for (const record of borrowRecords) {
        await notificationService.sendReminder(record.userId, record._id);
    }
});