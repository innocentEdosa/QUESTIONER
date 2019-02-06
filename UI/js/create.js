class Validate {
  static topic(value, field) {
    const error = [];
    value = value.trim();
    if (value === undefined || value === '') {
      error.push('Topic is required');
    } else if (value.length < 2) {
      error.push('Topic should be more than 2 characters');
    }
    const check = Validate.check(error, field);
    return check;
  }

  static description(value, field) {
    const error = [];
    value = value.trim();
    if (value === undefined || value === '') {
      error.push('Description is required');
    } else if (value.length < 30) {
      error.push('Description should be more than 30 characters');
    }
    const check = Validate.check(error, field);
    return check;
  }

  static location (value, field) {
    const error = [];
    value = value.trim();
    if (value === undefined || value === '') {
      error.push('location is required');
    } else if (value.length < 15) {
      error.push('location should be more than 15 characters');
    }
    const check = Validate.check(error, field);
    return check;
  }

  static check(error, field) {
    if (error.length > 0) {
      field.innerHTML = `${Validate.display(error)}`;
      field.style.opacity = 1;
      field.style.display = 'block';
      return false;
    }
    return true;
  }

  static clear(field) {
    field.style.opacity = 0;
  }

  static display(arr) {
    return arr.join('<br\>');
  }
}


class Display {
  static open(elem) {
    const value = elem;
    value.style.opacity = '1';
    value.style.display = 'block';
  }

  static close(elem) {
    const value = elem;
    value.style.opacity = 'none';
    value.style.display = 'none';
  }
}

const createMeetup = async (formData) => {
  const submitBtn = document.getElementById('submit');
  const responseDiv = document.getElementById('Error');
  Display.close(responseDiv);
  submitBtn.innerHTML = `${loading(2)}`;
  let user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  console.log(token);
  const url = `https://innocentsquestioner.herokuapp.com/api/v1/meetups`;
  const fetchData = {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: token
    }
  }
  const response = await fetch(url, fetchData);
  console.log(response)
  if (response) {
    const json = await response.json();
    if (json.error) {
      responseDiv.innerHTML = `${json.error}`;
      Display.open(responseDiv);
      submitBtn.innerHTML = `Create Meetup`;
    } else if (json.data) {
      submitBtn.innerHTML = `Meetup created `;
      localStorage.setItem('created', 2);
      submitBtn.innerHTML = `Create Meetup`;
      window.location.href  = 'admin.html';
    }
  } else {
    window.location.href = 'admin.html';
  }

}

const createForm = document.forms['createForm'];
createForm.addEventListener('submit', (e) => { e.preventDefault() });
createForm.addEventListener('click', (e) => {
  if (e.target.classList.contains('submit')) {
    const topicField = createForm.querySelector('#meetup-title');
    const happeningOnField = createForm.querySelector('#meetup-date');
    const imagesField = createForm.querySelector('#meetup-img');
    const locationField = createForm.querySelector('#meetup-location');
    const descriptionField = createForm.querySelector('#meetup-description');
    const topicErrror = document.getElementById('topicError');
    const descriptionError = document.getElementById('descriptionError');
    const locationError = document.getElementById('locationError');

    topicField.onkeyup = function () {
      Validate.clear(topicError);
    }
    locationField.onkeyup = function () {
      Validate.clear(locationError)
    }
    descriptionField.onkeyup = function () {
      Validate.clear(descriptionError)
    }

    const topic = topicField.value;
    const happeningOn = happeningOnField.value;
    const location = locationField.value;
    const description = descriptionField.value;
    const images = imagesField.files[0];


    const topicCheck = Validate.topic(topic, topicErrror);
    const descriptionCheck = Validate.description(description, descriptionError);
    const locationCheck = Validate.location(location, locationError);

    if (topicCheck && descriptionCheck && locationCheck) {
      const formData = new FormData();
      formData.append('topic', topic);
      formData.append('happeningOn', happeningOn);
      formData.append('images', images);
      formData.append('location', location);
      formData.append('description', description);
      createMeetup(formData);
    }
  }
})