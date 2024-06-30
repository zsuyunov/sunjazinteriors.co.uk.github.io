document.addEventListener('DOMContentLoaded', () => {
    updateFeedbackCount();
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
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
    })
    .then(() => {
        document.getElementById('feedbackForm').reset();
        updateFeedbackCount();
    })
    .catch(error => console.error('Error saving feedback:', error));
});

document.getElementById('showFeedbacks').addEventListener('click', function() {
    const feedbackList = document.getElementById('feedbackList');

    fetch('/feedbacks')
    .then(response => response.json())
    .then(feedbacks => {
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

        feedbackList.style.display = 'block';
    })
    .catch(error => console.error('Error fetching feedbacks:', error));
});

function updateFeedbackCount() {
    fetch('/feedbacks')
    .then(response => response.json())
    .then(feedbacks => {
        document.getElementById('feedbackCount').textContent = feedbacks.length;
    })
    .catch(error => console.error('Error fetching feedbacks count:', error));
}
