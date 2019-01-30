const  getQuestionNo = (meetupid) => {
	// const response = await fetch('https://innocentsquestioner.herokuapp.com/api/v1/questions/meetups/' + meetupid, {
	// 	method: 'GET',
	// 	mode: 'cors',
	// 	credentials: 'omit',
	// });
	// const json = await response.json();
	// if (json.error) {
	// 	console.log(json.error);
	// } 
	// 	console.log(json.number);
	// 	return Promise.resolve(json.number)
	return `${meetupid}`
} 


const fillMeetupSection1 = async () => {
	const meetupSection = document.getElementById('meetup1');
	meetupSection.innerHTML = `${loading()}`
;
	const response = await fetch('https://innocentsquestioner.herokuapp.com/api/v1/meetups', {
		method: 'GET',
		mode: 'cors',
		credentials: 'omit',
		headers: {
			Authorization: token,
		},
	});
	const json = await response.json();
	if (json.error) {
		console.log(json.error);
	} else {
		meetupSection.innerHTML = `
 				${json.data.map(meetupTemplate).join('')}`;
	}
}

	const fillMeetupSection2 = async () => {
	const meetupSection2 = document.getElementById('meetup2');
	meetupSection2.innerHTML = `${loading()}`;
	const response = await fetch('https://innocentsquestioner.herokuapp.com/api/v1/meetups', {
		method: 'GET',
		mode: 'cors',
		credentials: 'omit',
		headers: {
			Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU0ODgzMzI1NSwiZXhwIjoxNTQ4ODY5MjU1fQ.suj3SzePisprQBgdvnKj4cAAabfcoXwo_Mw9pwgCRns',
		},
	});
	const json = await response.json();
	if (json.error) {
		console.log(json.error);
	} else {
		meetupSection2.innerHTML = `
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
	fillMeetupSection2();
};
