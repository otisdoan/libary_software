const cron = require('node-cron');
const borrowRecordRepo = require('../repositories/borrowrecordRepository');
const notificationService = require('../services/notificationService');

cron.schedule('0 0 * * *', async () => {
    console.log('⏳Run cron job to send reminder notification...');

    try {
        // Send reminder notifications to users with borrow records due in 2 days
        const borrowRecords = await borrowRecordRepo.findBorrowsDueInTwoDays();

        for (const record of borrowRecords) {
            await notificationService.sendReminder(record.userId, record._id);
        }
        console.log('✅ Finished sending reminder notifications.');
    } catch (error) {
        console.error('⚠️ Error in reminder notification cron job:', error);
    }

    console.log('⏳ Running cron job to update expired borrow requests...');

    try {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);


        const expiredRecords = await borrowRecordRepo.findExpiredBorrowRequests(today);

        if (expiredRecords.length === 0) {
            console.log('✅ No expired borrow requests found.');
            return;
        }

        console.log(`🔍 Found ${expiredRecords.length} expired borrow requests.`);

        // Update status of expired borrow requests
        for (const record of expiredRecords) {
            try {
                await borrowRecordRepo.updateBorrowRequestStatus(record._id, 'expired');
                console.log(`✔️ Updated borrow request ${record._id} to expired.`);
            } catch (error) {
                console.error(`❌ Error updating request ${record._id}:`, error);
            }
        }

        console.log('✅ Finished updating expired borrow requests.');
    } catch (error) {
        console.error('⚠️ Error in expired borrow requests cron job:', error);
    }
});
