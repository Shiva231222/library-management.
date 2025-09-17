// ✅ Function to check upcoming return dates (4 days before)
function checkUpcomingReturns() {
  const today = new Date();

  records.forEach(record => {
    if (record.returnDate) {
      const returnDate = new Date(record.returnDate);

      // Calculate difference in days
      const diffTime = returnDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Show alert if return date is within 4 days
      if (diffDays === 4 && record.status === "Issued") {
        alert(
          `Reminder 📢\n${record.student} has to return "${record.book}" (Serial: ${record.serial}) in 4 days (${record.returnDate}).`
        );
      }
    }
  });
}

// ✅ Run check once on page load
document.addEventListener('DOMContentLoaded', function() {
  checkUpcomingReturns();
});

// ✅ Optional: Run automatically every hour (uncomment below if you want)
/// setInterval(checkUpcomingReturns, 60 * 60 * 1000);
