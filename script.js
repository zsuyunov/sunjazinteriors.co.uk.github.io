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
  



//   document.getElementById('feedbackForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent the form from submitting the traditional way
    
//     // Capture the form data
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const phone = document.getElementById('phone').value;
//     const address = document.getElementById('address').value;
//     const message = document.getElementById('message').value;
    
//     // Create new <p> elements for each piece of feedback
//     const nameElement = document.createElement('p');
//     nameElement.innerHTML = `<strong>Name:</strong> ${name}`;

//     const emailElement = document.createElement('p');
//     emailElement.innerHTML = `<strong>Email:</strong> ${email}`;

//     const phoneElement = document.createElement('p');
//     phoneElement.innerHTML = `<strong>Phone:</strong> ${phone}`;

//     const addressElement = document.createElement('p');
//     addressElement.innerHTML = `<strong>Address:</strong> ${address}`;

//     const messageElement = document.createElement('p');
//     messageElement.innerHTML = `<strong>Message:</strong> ${message}`;
    
//     // Get the feedbackOutput div and append the new <p> elements
//     const feedbackOutput = document.getElementById('feedbackOutput');
//     feedbackOutput.appendChild(nameElement);
//     feedbackOutput.appendChild(emailElement);
//     feedbackOutput.appendChild(phoneElement);
//     feedbackOutput.appendChild(addressElement);
//     feedbackOutput.appendChild(messageElement);
    
//     // Optionally, you can clear the form fields after submission
//     document.getElementById('feedbackForm').reset();
// });
