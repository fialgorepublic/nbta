const {successResponse} = require('../../../../utils/response')
const User = require('../../../../models/user')
const Investment = require('../../../../models/investment')
const moment = require('moment');
const investorRecord = async (req, res, next) => {
    try {
        // Get the date 30 days ago
        const thirtyDaysAgo = moment().subtract(30, 'days').startOf('day').toDate();
        const today = moment().endOf('day').toDate();
    
        // Step 1: Fetch the number of users (investors) grouped by day for the last 30 days
        const usersByDay = await User.aggregate([
          {
            $match: { createdAt: { $gte: thirtyDaysAgo, $lte: today } } // Filter users in the last 30 days
          },
          {
            $group: {
              _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, // Group by day
              count: { $sum: 1 } // Count the number of users
            }
          },
          {
            $sort: { _id: 1 } // Sort by date ascending
          }
        ]);
    
        // Step 2: Fetch the total investment amount grouped by day for the last 30 days
        const investmentsByDay = await Investment.aggregate([
          {
            $match: { createdAt: { $gte: thirtyDaysAgo, $lte: today } } // Filter investments in the last 30 days
          },
          {
            $group: {
              _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, // Group by day
              totalAmount: { $sum: '$amount' } // Sum the amount for each day
            }
          },
          {
            $sort: { _id: 1 } // Sort by date ascending
          }
        ]);
    
        // Helper function to fill missing dates with 0 values (for both users and investments)
        const fillMissingDates = (dataArray, field, days = 30) => {
          const filledData = [];
          let currentDate = moment().subtract(days - 1, 'days').startOf('day');
    
          for (let i = 0; i < days; i++) {
            const dateStr = currentDate.format('YYYY-MM-DD');
            const dataForDate = dataArray.find(item => item._id === dateStr);
            filledData.push(dataForDate ? dataForDate[field] : 0);
            currentDate = currentDate.add(1, 'day');
          }
    
          return filledData;
        };
    
        // Fill missing dates for users and investments
        const usersData = fillMissingDates(usersByDay, 'count');
        const investmentsData = fillMissingDates(investmentsByDay, 'totalAmount');
    
        // Step 3: Prepare the response data
        const data = [
          {
            title: 'Investors',
            value: usersByDay.reduce((acc, day) => acc + day.count, 0).toString(), // Total investors in 30 days
            interval: 'Last 30 days',
            trend: 'up', // Set this dynamically based on logic
            data: usersData, // Number of users per day for the last 30 days
          },
          {
            title: 'Investment',
            value: investmentsByDay.reduce((acc, day) => acc + day.totalAmount, 0).toString(), // Total investment in 30 days
            interval: 'Last 30 days',
            trend: 'down', // Set this dynamically as well
            data: investmentsData, // Total investment amount per day for the last 30 days
          },
        ];
    
        // Step 4: Send the response
        res.json({ success: true, data });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred', error });
      }
}

module.exports = investorRecord