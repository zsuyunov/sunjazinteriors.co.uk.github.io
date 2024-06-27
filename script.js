/* Created by Tivotal */

$(document).ready(function () {
    $(".fa-bars").click(function () {
      $(this).toggleClass("fa-times");
      $("nav").toggleClass("nav-toggle");
    });
  
    $(window).on("scroll load", function () {
      $(".fa-bars").removeClass("fa-times");
      $("nav").removeClass("nav-toggle");
    });
  
    $(".count").each(function () {
      var $this = $(this),
        countTo = $this.attr("data-count");
      $({ countNum: $this.text() }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 6000,
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum + "+");
          },
        }
      );
    });
  });
  




  document.addEventListener('DOMContentLoaded', () => {
    updateFeedbackCount();
});

document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const message = document.getElementById('message').value;
    const date = new Date();

    // Create a new feedback object
    const feedback = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        message: message,
        date: date.toISOString()
    };

    // Get existing feedbacks from localStorage
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

    // Add the new feedback to the top of the list
    feedbacks.unshift(feedback);

    // Save the updated feedbacks list to localStorage
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    // Clear the form
    document.getElementById('feedbackForm').reset();

    // Update the feedback count
    updateFeedbackCount();
});

document.getElementById('showFeedbacks').addEventListener('click', function() {
    const feedbackList = document.getElementById('feedbackList');

    // Get feedbacks from localStorage
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

    // Clear existing feedbacks in the display area
    feedbackList.innerHTML = '';

    // Display each feedback
    feedbacks.forEach(feedback => {
        const feedbackItem = document.createElement('div');
        feedbackItem.classList.add('feedback-item');
        feedbackItem.innerHTML = `
            <table class="feedback-table">
                <tr>
                    <th>Name</th>
                    <td>${feedback.name}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>${feedback.email}</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>${feedback.phone}</td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td>${feedback.address}</td>
                </tr>
                <tr>
                    <th>Message</th>
                    <td>${feedback.message}</td>
                </tr>
                <tr>
                    <th>Date</th>
                    <td>${new Date(feedback.date).toLocaleString()}</td>
                </tr>
            </table>
        `;
        feedbackList.appendChild(feedbackItem);
    });

    // Show the feedback list
    feedbackList.style.display = 'block';
});

function updateFeedbackCount() {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    document.getElementById('feedbackCount').textContent = feedbacks.length;
}
    