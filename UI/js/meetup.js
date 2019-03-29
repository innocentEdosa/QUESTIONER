const getQuestionNo = (meetupid) => {
  return `${meetupid}`
} 

const fillMeetupSection1 = async () => {
  const meetupSection = document.getElementById('meetup1');
  meetupSection.innerHTML = `${loading()}`
    ;
  let user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const response = await fetch('https://innocentsquestioner.herokuapp.com/api/v1/meetups', {
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
    headers: {
      Authorization: token,
    }
  });
  const json = await response.json();
  if (json.error) {
    console.log(json.error);
  } else {
    meetupSection.innerHTML = `
 				${json.data.map(meetupTemplate).join('')}`;
  }
}

const meetupSection = document.querySelector('#meetup1');
meetupSection.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('postbtn')) {
    const meetup = e.target.nextElementSibling.value;
    localStorage.setItem('meetupid', meetup);
    window.location.href = 'post.html';
  }
});

window.onload = function laod() {
  fillMeetupSection1();
};
