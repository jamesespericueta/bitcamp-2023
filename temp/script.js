const registrationForm = document.getElementById('registration-form');
const message = document.getElementById('message');

registrationForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(registrationForm);

  fetch('/auth/register', {
    method: 'POST',
    body: formData
  })
    .then((response) => {
      if (response.ok) {
        message.textContent = 'User registered successfully.';
        registrationForm.reset();
      } else {
        response.json().then((data) => {
          message.textContent = data.message;
        });
      }
    })
    .catch((error) => {
      console.error(error);
      message.textContent = 'An error occurred. Please try again later.';
    });
});
