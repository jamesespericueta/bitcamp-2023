const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);

  fetch('/login', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // redirect to the user's dashboard or home page
        window.location.href = '/dashboard';
      } else {
        // display an error message
        const errorElement = document.getElementById('error-message');
        errorElement.textContent = data.message;
      }
    })
    .catch((error) => {
      console.error(error);
      const errorElement = document.getElementById('error-message');
      errorElement.textContent = 'An error occurred. Please try again later.';
    });
});