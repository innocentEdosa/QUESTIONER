const deletePopup = document.getElementById('deletePopup');
const adminMeetups = document.getElementById('adminMeetups');
const deleteTitle = document.getElementById('deleteTitle');
let deletemeetupid;
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

const fadeout = (value) => {
  value.style.opacity = 0;
  value.style.opacity = 0;
}
const fadein = (value) => {
  value.style.opacity = 1;
  value.style.display = 'block';
  setTimeout(fadeout, 5000, value);
}
const fade = (value) => {
  setTimeout(fadein, 2000, value)
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
  if (response) {
    const json = await response.json();
    if (json.error) {
      console.log(json.error);
    } else if (json.data) {
      adminMeetups.innerHTML = `${json.data.map(adminMeetupTemplate).join('')}`;
    }
  } else {
    window.location.href = 'index.html';
  }
}

const checkCreatedStatus = () => {
  let createdStatus = localStorage.getItem('created');
  if (createdStatus == 2) {
    responseDiv.innerHTML = `Your meetup was created`;
    responseDiv.classList.add('success');
    fade(responseDiv);
    localStorage.removeItem('created');
  }
}

const checkUpdatedStatus = () => {
  let updatedStatus = localStorage.getItem('updated');
  if (updatedStatus == 2) {
    responseDiv.innerHTML = `Your meetup has been Updated`;
    responseDiv.classList.add('success');
    fade(responseDiv);
    localStorage.removeItem('updated');
  }
}

const deleteMeetup = async (meetupid) => {
  let value = meetupid;
  let user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const responseDiv = document.getElementById('responseDiv');
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


deletePopup.addEventListener('click', (e) => {
  e.preventDefault();
  e.preventDefault();
  if (e.target.classList.contains('ok')) {
    e.preventDefault();
    e.stopPropagation();
    const adminMeetups = document.getElementById('adminMeetups');
    adminMeetups.innerHTML = `${loading()}`;
    deleteMeetup(deletemeetupid);
    Display.close(deletePopup);
    deletemeetupid = undefined;
  }
  if (e.target.classList.contains('cancel')) {
    Display.close(deletePopup);
  }
})

const mainBody = document.querySelector('#mainBody');
mainBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('create')) {
    window.location.href ='create.html'
  }
  if (e.target.classList.contains('edit')) {
    const updateMeetupId = e.target.nextElementSibling.value;
    localStorage.setItem('updateMeetupId', updateMeetupId);
    window.location.href = 'update.html';
  }
  if (e.target.classList.contains('delete')) {
    e.preventDefault();
     deletemeetupid = e.target.nextElementSibling.value;
    let meetuptopic = e.target.nextElementSibling.nextElementSibling.value;
    deleteTitle.innerHTML = meetuptopic;
    Display.open(deletePopup);
  }
});

adminMeetups.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('postbtn')) {
    const meetup = e.target.nextElementSibling.value;
    localStorage.setItem('meetupid', meetup);
    window.location.href = 'post.html';
  }
});


window.onload  = () => {
  getMeetups();
  checkCreatedStatus();
  checkUpdatedStatus();
}
