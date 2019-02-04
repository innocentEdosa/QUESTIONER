const popup = document.getElementById('createPopup');
const updatePopup = document.getElementById('update-popup');
const deletePopup = document.getElementById('deletePopup')

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

  static location(value, field) {
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

function close(value) {
  value.style.opacity = 0;
}
function  open(value) {
  value.style.opacity = 1;
  value.style.display = 'block';
  setTimeout(close, 5000, value);
}
function fade(value) {
  setTimeout(open, 3000, value)
}

const getMeetups = async () => {
  const adminMeetups = document.getElementById('adminMeetups');
  adminMeetups.innerHTML = `${loading()}`;
  let user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const url = `https://innocentsquestioner.herokuapp.com/api/v1/meetups/${user.id}/meetups`;
  const fetchData = {
    method: 'GET',
    headers: {
      Authorization: token
    }
  }

  const response = await fetch(url, fetchData);
  const json = await response.json();
  if (json.error) {
    console.log(json.error);
  } else if (json.data) {
    adminMeetups.innerHTML = `${json.data.map(adminMeetupTemplate).join('')}`;
  }
}

const deleteMeetup = async (meetupid) => {
  let value = meetupid;
  let user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const responseDiv = document.getElementById('responseDiv');
  console.log(value);
  if (value) {
    const url = 'https://innocentsquestioner.herokuapp.com/api/v1/meetups/' + value;
    const fetchData = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        Authorization: token
      }
    }

    const response = await fetch(url, fetchData);
    if (!response) {alert('no response')}
    const json = await response.json();
    if (json.error) {
      console.log(json.error);
      getMeetups();
    } else if (json.data) {
      responseDiv.innerHTML = json.data[0];
      responseDiv.classList.add('success');
      fade(responseDiv);
      getMeetups();
    }
  }
  meetupid = undefined;
  value = undefined;
}

const createMeetup = async (formData) => {
  submitBtn = document.getElementById('submit');
  submitBtn.innerHTML = `${loading(2)}`;
  let user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const responseDiv = document.getElementById('responseDiv');
  const url = `https://innocentsquestioner.herokuapp.com/api/v1/meetups`;
  const fetchData = {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: token
    }
  }
  const response = await fetch(url, fetchData);
  const json = await response.json();
  if (json.error) {
    console.log(json.error);
    responseDiv.innerHTML = `${json.error}`;
    responseDiv.classList.add('failed');
    fade(responseDiv);
    Display.close(popup);
    submitBtn.innerHTML = `Create Meetup`;
  } else if (json.data) {
    console.log(json.data);
    const adminMeetups = document.getElementById('adminMeetups');
    adminMeetups.innerHTML = `${loading()}`;
    responseDiv.innerHTML = `Meetup created `;
    responseDiv.classList.add('success');
    fade(responseDiv);
    Display.close(popup);
    submitBtn.innerHTML = `Create Meetup`;
    getMeetups();
  }
}

const createForm = document.forms['createForm'];
createForm.addEventListener('submit', (e) => {e.preventDefault()});
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
    locationField.onkeyup = function() {
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

const mainBody = document.querySelector('#mainBody');
mainBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('create')) {
    Display.open(popup);
  }
  if (e.target.classList.contains('close-btn')) {
    Display.close(popup);
    Display.close(updatePopup);
  }
  if (e.target.classList.contains('delete')) {
    e.preventDefault();
    let meetupid = e.target.nextElementSibling.value;
    Display.open(deletePopup);
    deletePopup.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('ok')) {
        const adminMeetups = document.getElementById('adminMeetups');
        adminMeetups.innerHTML = `${loading()}`;
        deleteMeetup(meetupid);
        Display.close(deletePopup);
        meetupid = undefined;
      }
      if (e.target.classList.contains('cancel')) {
        Display.close(deletePopup);
      }
    })
  }
});

window.onload = function init() {
  getMeetups();
}
