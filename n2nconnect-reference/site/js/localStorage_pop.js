// function checkModalDisplay() {
//     var lastShown = localStorage.getItem('modalLastShown');
//     if (!lastShown) {
//         // Show the modal if it has never been shown before
//         $('#myModal').modal('show');
//         localStorage.setItem('modalLastShown', new Date().getTime());
//     } else {
//         var currentTime = new Date().getTime();
//         var timeDiff = currentTime - lastShown;
//         var hoursPassed = Math.floor(timeDiff / (1000 * 60 * 60));
        
//         if (hoursPassed >= 24) {
//             // Show the modal again after 24 hours
//             $('#myModal').modal('show');
//             localStorage.setItem('modalLastShown', currentTime);
//         }
//     }
// }

// $(document).ready(function() {
//     checkModalDisplay();
// });


// Check if the alert should be displayed
function shouldDisplayAlert() {
  const lastClosedTimestamp = localStorage.getItem('lastClosedTimestamp');
  if (!lastClosedTimestamp) {
    return true; // Show the alert if it has never been closed
  }
  
  const currentTime = new Date().getTime();
  const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  return currentTime - parseInt(lastClosedTimestamp, 10) >= twentyFourHours;
}

// Display the alert if needed
function displayAlertIfNeeded() {
  if (shouldDisplayAlert()) {
    $('#alert-container').show();
  }
}

// Close the alert and store the timestamp when closed
$('#alert-container .close').on('click', function () {
  $('#alert-container').hide();
  localStorage.setItem('lastClosedTimestamp', new Date().getTime().toString());
});

// Initialize the alert display
displayAlertIfNeeded();



