const postbody = document.getElementById('postbody');
function dropComment() {
  const questionDiv = document.getElementById('questionss');
  questionDiv.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('chatbtn') || e.target.classList.contains('question-btnlist')) {
      if (e.target.classList.contains('chatbtn')) {
        const commentform = e.target.parentElement
        .parentElement.parentElement
        .parentElement.nextElementSibling;
        const comment = commentform.nextElementSibling;
        if(commentform.classList.contains('form-comment')){
          if (commentform.style.display === 'none') {
            commentform.style.display = 'block';
            return comment.style.display = 'block';
          }
          commentform.style.display = 'none';
          comment.style.display = 'none';  
        }
      }
    }
  })
}


function getPostId() {
  const postid = localStorage.getItem('meetupid');
  getpost(postid);
}

const getQuestions = async (postid) => {
  const questionDiv = document.getElementById('questionss');
  	const response = await fetch('https://innocentsquestioner.herokuapp.com/api/v1/questions/meetups/' + postid, {
		method: 'GET',
		mode: 'cors',
		credentials: 'omit',
	});
	const json = await response.json();
	if (json.error) {
    console.log(json.error);
    questionDiv.innerHTML = `No questions presently`;
  }
  questionDiv.innerHTML = `${json.data.map(questionTemplate).join('')}`;
  dropComment();
}

const getpost = async (postid) => {
  const showcard = document.getElementById('showcard');
  showcard.innerHTML = `${loading(2)}`;
  postbody.innerHTML = `${loading()}`;
  const response = await fetch('https://innocentsquestioner.herokuapp.com/api/v1/meetups/'+ postid, {
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
    showcard.innerHTML = `${json.data.map(showcardTemplate).join('')}`;
    postbody.innerHTML = `${json.data.map(postbodyTemplate).join('')}`;
  }
}

const postbodyObserver = new MutationObserver(function(mutations) {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 1) {getQuestions();}
  });
})

postbodyObserver.observe(postbody, {
  childList: true,
})


window.onload = function load() {
  getPostId();
}
