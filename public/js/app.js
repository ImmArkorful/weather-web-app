const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const $location = document.querySelector('#location');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.forecast;
        messageTwo.textContent = data.location;
      }
    });
  });
});

$location.addEventListener('click', (e) => {
  e.preventDefault();
  $location.setAttribute('disabled', 'disabled');
  if (!navigator.geolocation) {
    return alert('Your browser does not support the geolocation');
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      messageOne.textContent = 'Loading...';
      messageTwo.textContent = '';

      fetch('/weather?address=' + longitude + ',' + latitude).then(
        (response) => {
          console.log(response);

          response.json().then((data) => {
            console.log(data);

            if (data.error) {
              messageOne.textContent = data.error;
            } else {
              messageOne.textContent = data.forecast;
              messageTwo.textContent = data.location;
            }
          });
        }
      );
      $location.removeAttribute('disabled');
    },
    (error) => {
      console.log(error);
    },
    { enableHighAccuracy: true }
  );
});
