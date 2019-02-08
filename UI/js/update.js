const topicField = document.getElementById('meetup-title');
const happeningOnField = document.getElementById('meetup-date');
const locationField = document.getElementById('meetup-location');
const descriptionField = document.getElementById('meetup-description');
const descriptionError = document.getElementById('descriptionError');
const locationError = document.getElementById('locationError');
const topicError = document.getElementById('topicError');
const submitBtn = document.getElementById('submit');
const responseDiv = document.getElementById('Error');
const imagesField = document.getElementById('meetup-img');
const imagesUrl = document.getElementById('img-url');
const happeningError = document.getElementById('happeningError');
let meetupid;



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

const updateMeetup = async (formData) => {
  Display.close(responseDiv);
  submitBtn.innerHTML = `${loading(2)}`;
  let user = JSON.parse(localStorage.getItem('user'));
  let meetupid = localStorage.getItem('updateMeetupId')
  const token = user.token;
  const url = `https://innocentsquestioner.herokuapp.com/api/v1/meetups/${meetupid}`;
  const fetchData = {
    method: 'PUT',
    body: formData,
    headers: {
      Authorization: token
    }
  }
  const response = await fetch(url, fetchData);
  if (response) {
    const json = await response.json();
    if (json.error) {
      console.log(json.error);
      happeningError.innerHTML = `${json.error.happeningOn}`;
      Display.open(happeningError);
      submitBtn.innerHTML = `Update Meetup`;
    } else if (json.data) {
      submitBtn.innerHTML = `Meetup Updated `;
      localStorage.setItem('updated', 2);
      submitBtn.innerHTML = `Update Meetup`;
      window.location.href = 'admin.html';
    }
  } else {
    window.location.href = 'admin.html';
  }
}


const getMeetupid = () => {
  const meetupid = localStorage.getItem('updateMeetupId');
  getMeetup(meetupid);
};


const getMeetup = async (meetupid) => {
  submitBtn.innerHTML = `${loading(2)}`;
  let user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const response = await fetch('https://innocentsquestioner.herokuapp.com/api/v1/meetups/' + meetupid, {
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
    headers: {
      Authorization: token
    },
  });
  const json = await response.json();
  if (json.error) {
    console.log(json.error);
  } else {
    topicField.value = `${json.data[0].topic}`;
    descriptionField.value = `${json.data[0].description}`;
    locationField.value = `${json.data[0].location}`;
    happeningOnField.value = `${json.data[0].happeningOn}`;
    imagesUrl.value = `${json.data[0].images}`;
    submitBtn.innerHTML = `Update meetup`;
  }
}

const createForm = document.forms['createForm'];
createForm.addEventListener('submit', (e) => { e.preventDefault() });
createForm.addEventListener('click', (e) => {
  if (e.target.classList.contains('submit')) {

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
    const images = imagesField.files[0] || imagesUrl.value;


    const topicCheck = Validate.topic(topic, topicError);
    const descriptionCheck = Validate.description(description, descriptionError);
    const locationCheck = Validate.location(location, locationError);

    if (topicCheck && descriptionCheck && locationCheck) {
      const formData = new FormData();
      formData.append('topic', topic);
      formData.append('happeningOn', happeningOn);
      formData.append('images', images);
      formData.append('location', location);
      formData.append('description', description);
      updateMeetup(formData);
    }
  }
 
})

window.onload = () => {
  getMeetupid();
}
