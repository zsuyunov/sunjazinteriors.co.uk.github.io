document.addEventListener('DOMContentLoaded', () => {
  updateFeedbackList();
});

document.getElementById('feedbackForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const message = document.getElementById('message').value;
  const date = new Date();

  const feedback = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      message: message,
      date: date.toISOString()
  };

  fetch('/saveFeedback', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedback)
  }).then(response => {
      if (response.status === 200) {
          document.getElementById('feedbackForm').reset();
          updateFeedbackList();
      } else {
          alert('Error saving feedback. Please try again.');
      }
  }).catch(error => {
      console.error('Error:', error);
  });
});

document.getElementById('showFeedbacks').addEventListener('click', function() {
  updateFeedbackList();
});

function updateFeedbackList() {
  fetch('/feedbacks')
      .then(response => response.json())
      .then(feedbacks => {
          const feedbackList = document.getElementById('feedbackList');
          feedbackList.innerHTML = '';

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

          document.getElementById('feedbackCount').textContent = feedbacks.length;
      }).catch(error => {
          console.error('Error fetching feedbacks:', error);
      });
}
