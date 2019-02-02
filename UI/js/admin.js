
const popup = document.getElementById('createPopup');
const updatePopup = document.getElementById('update-popup');
const deletePopup = document.getElementById('deletePopup')
class Display {
  static open(elem) {
    const value = elem;
    value.style.display = 'block';
    value.style.opacity = '1';
  }

  static close(elem) {
    const value = elem;
    value.style.display = 'none';
    value.style.opacity = 'none';
  }
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
  } else if(json.data) {
    adminMeetups.innerHTML = `${json.data.map(adminMeetupTemplate).join('')}`;
  }
}

const deleteMeetup = async (meetupid) => {
  let user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const url = `https://innocentsquestioner.herokuapp.com/api/v1/meetups/${meetupid}`;
  const fetchData = {
    method: 'DELETE',
    headers: {
      Authorization: token
    }
  }

  const response = await fetch(url, fetchData);
  const json = await response.json();
  if (json.error) {
    console.log(json.error);
    getMeetups();
  } else if (json.data) {
    console.log(json.data);
    getMeetups();
  }
}

const createMeetup = async (formData) => {
  let user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
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
  } else if (json.data) {
    const adminMeetups = document.getElementById('adminMeetups');
    adminMeetups.innerHTML = `${loading()}`;
    Display.close(popup);
    getMeetups();
  }
}

const createForm = document.forms['createForm'];
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const topic = createForm.querySelector('#meetup-title').value;
  const happeningOn = createForm.querySelector('#meetup-date').value;
  const images = createForm.querySelector('#meetup-img').files[0];
  const location = createForm.querySelector('#meetup-location').value;
  const description = createForm.querySelector('#meetup-description').value;

 
  const formData = new FormData();
  formData.append('topic', topic);
  formData.append('happeningOn', happeningOn);
  formData.append('images', images);
  formData.append('location', location);
  formData.append('description', description);
  createMeetup(formData);
})

const mainBody = document.querySelector('#mainBody');
mainBody.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('create')) {
    Display.open(popup);
  }
  if (e.target.classList.contains('close-btn')) {
    Display.close(popup);
    Display.close(updatePopup);
  }
  if(e.target.classList.contains('delete')) {
    const meetupid = e.target.nextElementSibling.value;
    Display.open(deletePopup);
    deletePopup.addEventListener('click', (e) => {
      if(e.target.classList.contains('ok')){
        const adminMeetups = document.getElementById('adminMeetups');
        adminMeetups.innerHTML = `${loading()}`;
        Display.close(deletePopup);
        deleteMeetup(meetupid);
      }
      if(e.target.classList.contains('cancel')) {
        Display.close(deletePopup);
      }
    })
  }
});

window.onload = function init() {
  getMeetups();
}