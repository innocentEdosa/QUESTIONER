const userGreeting = document.getElementById('welcomeUser');
const usernameField = document.getElementById('username');
const emailField = document.getElementById('email');
const phoneNumberField = document.getElementById('phonenumber');
const questionField = document.getElementById('questions');
const schedule = document.getElementById('schedule');


const setUserDetails = async (userid) => {
  const url = `https://innocentsquestioner.herokuapp.com/api/v1/questions/${userid}`;
    const response = await fetch(url);
    const json = await response.json();
    if (json.error) {
      console.log(json.error);
    } else {
      console.log(json.number);
      userGreeting.innerHTML = `Welcome ${json.data[0].username}`;
      usernameField.innerHTML = `${json.data[0].username}`;
     emailField.innerHTML = `${json.data[0].email}`;
     questionField.innerHTML = `${json.number} questions posted`;
    }
  }

const getTrending = async () => {
  const trendingSection = document.getElementById('trendingMeetup');
  trendingSection.innerHTML = `${loading()}`
    ;
  const response = await fetch(`https://innocentsquestioner.herokuapp.com/api/v1/meetups/random/${3}`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'omit'
  });
  const json = await response.json();
  if (json.error) {
    console.log(json.error);
  } else {
    trendingSection.innerHTML = `
 				${json.data.map(trendingTemplate).join('')}`;
  }
}

  const setRsvps = async (userid) => {
    schedule.innerHTML = `${loading()}`;
    const url = `https://innocentsquestioner.herokuapp.com/api/v1/rsvp/${userid}`;
    const response = await fetch(url);
    const json = await response.json();
    if (json.error) {
      console.log(json.error);
    } else {
      console.log(json.data);
      schedule.innerHTML = `
 				${json.data.map(scheduledTemplate).join('')}`;
    }
  } 

const setTrending = () => {
  const trending = document.getElementById('trendingMeetup');
  trending.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('postbtn')) {
      const meetup = e.target.nextElementSibling.value;
      localStorage.setItem('meetupid', meetup);
      window.location.href = 'post.html';
    }
  })
}




window.onload = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userid = user.id;
  setUserDetails(userid);
  setRsvps(userid);
  getTrending();
  setTrending();
}