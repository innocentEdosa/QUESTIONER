const postbody = document.getElementById('postbody');
class questionValidator {
  static check(value, field) {
    const errorResponse = document.getElementById('errorResponse');
    const error = [];
    if (value === undefined || value === '') {
      error.push(`${field} cannot be empty`);
    }
    if (error.length > 0) {
      errorResponse.innerHTML = `${questionValidator.display(error)}`;
      errorResponse.style.display = 'block';
      return false;
    }
    return true;
  }

  static comment(value) {
    const errorResponse = document.getElementById('errorResponse');
    const error = [];
    if (value === undefined || value === '') {
      error.push(`comment cannot be empty`);
    }
    if (error.length > 0) {
      return false;
    }
    return true;
  }

  static display(arr) {
    return arr.join('<br\>');
  }

  static clearError() {
    const errorResponse = document.getElementById('errorResponse');
    errorResponse.innerHTML = '';
  }
}

const upvote = async (questionid, question) => {
  const questionParent = question.parentElement;
  const questionDownvoteParent = question.parentElement.parentElement.parentElement.firstElementChild;
  const questionDownvote = questionDownvoteParent.querySelector('.downvotediv');
  const questionUpvote = questionParent.querySelector('.upvotediv');
  let user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const url = `https://innocentsquestioner.herokuapp.com/api/v1/questions/${questionid}/upvote`;
  const fetchData = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token
    }
  }

  const response = await fetch(url, fetchData);
  const json = await response.json();
  if (json.error) {
  } else {
    questionUpvote.innerHTML = `${json.data[0].upvotes}`;
    questionDownvote.innerHTML = `${json.data[0].downvotes}`;
  }
}

const downvote = async (question, questionid) => {
  const questionParent = question.parentElement;
  const questionDownvote = questionParent.querySelector('.downvotediv');
  const questionUpvoteParent = questionParent.parentElement.nextElementSibling;
  const questionUpvote = questionUpvoteParent.querySelector('.upvotediv');
  let user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const url = `https://innocentsquestioner.herokuapp.com/api/v1/questions/${questionid}/downvote`;
  const fetchData = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token
    }
  }

  const response = await fetch(url, fetchData);
  const json = await response.json();
  if (json.error) {
  } else {
    questionUpvote.innerHTML = `${json.data[0].upvotes}`;
    questionDownvote.innerHTML = `${json.data[0].downvotes}`;
  }
}


function initQuestionBtn() {
  const questionDiv = document.getElementById('questionss');
  questionDiv.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('chatbtn') || e.target.classList.contains('question-btnlist')) {
      if (e.target.classList.contains('chatbtn')) {
        const commentform = e.target.parentElement
          .parentElement.parentElement
          .parentElement.nextElementSibling;
        const comment = commentform.nextElementSibling;
        if (commentform.classList.contains('form-comment')) {
          if (commentform.style.display === 'none') {
            commentform.style.display = 'block';
            return comment.style.display = 'block';
          }
          commentform.style.display = 'none';
          comment.style.display = 'none';
        }
      }
    }
    if (e.target.classList.contains('upvote')) {
      const question = e.target.nextElementSibling;
      const questionid = question.value;
      upvote(questionid, question);
    }
    if (e.target.classList.contains('downvote')) {
      const question = e.target.nextElementSibling;
      const questionid = question.value;
      downvote(question, questionid);
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
  } else {
    questionDiv.innerHTML = `${json.data.map(questionTemplate).join('')}`;
  }
  setquestionForm();
  initQuestionBtn();
}

const getComment = async (questionid, commentdiv) => {
  const response = await fetch('https://innocentsquestioner.herokuapp.com/api/v1/comments/questions/' + questionid, {
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
  });
  const json = await response.json();
  if (json.error) {
    commentdiv.innerHTML = `No comments presently`;
  } else {
    commentdiv.innerHTML = `${json.data.map(commentTemplate).join('')}`;
  }
}

const getpost = async (postid) => {
  const showcard = document.getElementById('showcard');
  showcard.innerHTML = `${loading(2)}`;
  postbody.innerHTML = `${loading()}`;
  let user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const response = await fetch('https://innocentsquestioner.herokuapp.com/api/v1/meetups/' + postid, {
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
    showcard.innerHTML = `${json.data.map(showcardTemplate).join('')}`;
    postbody.innerHTML = `${json.data.map(postbodyTemplate).join('')}`;
  }
}

const postbodyObserver = new MutationObserver(function (mutations) {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 1) {
      const postid = localStorage.getItem('meetupid');
      getQuestions(postid);
      startRsvp();
    }
  });
})

postbodyObserver.observe(postbody, {
  childList: true,
})

const createQuestion = async (meetupid, questionTitle, questionBody) => {
  let user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const url = `https://innocentsquestioner.herokuapp.com/api/v1/questions`;
  const data = {
    title: questionTitle,
    body: questionBody,
    meetup: meetupid
  }
  const fetchData = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token
    }
  }

  const response = await fetch(url, fetchData);
  const json = await response.json();
  if (json.error) {
    console.log(json.error);
  } else {
    questionbtn = document.getElementById('qbtn');
    questionbtn.innerHTML = `Post question`;
    getQuestions(meetupid);
    initQuestionBtn();
  }
}

const createComment = async (commentInput, questionid, commentdiv) => {
  let user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const commentCheck = questionValidator.comment(commentInput);
  if (commentCheck) {
    const url = `https://innocentsquestioner.herokuapp.com/api/v1/comments`;
    const data = {
      question: questionid,
      comment: commentInput
    }
    const fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        Authorization: token
      }
    }

    const response = await fetch(url, fetchData);
    const json = await response.json();
    if (json.error) {
      console.log(json.error);
    } else {
      getComment(questionid, commentdiv);
    }
  }
}

let questionForm;
function setquestionForm() {
  const questionF = document.forms['questionForm'];
  questionForm = questionF;
  startQuestionForm();
  setCommentForm();
}

function startQuestionForm() {
  if (questionForm) {
    questionForm.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('questionbtn')) {
        const questionbtn = e.target;
        const questionTitle = document.getElementById('questionTitle').value;
        const questionBody = document.getElementById('questionBody').value;
        const titlecheck = questionValidator.check(questionTitle, 'Title');
        const bodycheck = questionValidator.check(questionBody, 'Body');
        if (titlecheck && bodycheck) {
          questionbtn.innerHTML = `<img src="img/6.gif" alt="Loading" title="Loading" />`;
          const meetupid = localStorage.getItem('meetupid');
          createQuestion(meetupid, questionTitle, questionBody);
        }

      }
    })
  }
}

let commentForm;
function setCommentForm() {
  const commentF = document.forms['commentForm'];
  commentForm = commentF;
  startCommentForm(commentForm);
}

function startCommentForm(commentform) {
  if (commentForm) {
    commentForm.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('commentBtn')) {
        const commentInputDiv = e.target.previousElementSibling;
        const commentInput = commentInputDiv.value;
        const questionid = commentInputDiv.previousElementSibling.value;
        const commentdiv = commentForm.nextElementSibling;
        createComment(commentInput, questionid, commentdiv);
      }
    })
  }
}

const createRsvp = async (meetupid, rsvpResponse) => {
  let user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  user = user.id;
  const rsvpCard = document.getElementById('rsvpCardFront');
  const restext = document.getElementById('rsvptext');
  if (meetupid && rsvpResponse && user) {
    const url = 'https://innocentsquestioner.herokuapp.com/api/v1/meetups/' +meetupid+ '/rsvp';
    const data = {
      meetup: Number(meetupid),
      user: user,
      response: String(rsvpResponse),
    }
    const fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        Authorization: token,
      }
    }
    const response = await fetch(url, fetchData);
    if (response) {
      const json = await response.json();
      if (json.error) {
        console.log(json.error);
      } else {
        if(json.msg) {
          restext.textContent = `${json.msg}:`;
        }
        rsvpCard.textContent = json.data[0].response;
      }
    }
  }
}

function startRsvp() {
  const rsvpCard = document.getElementById('rsvpCard');
  rsvpCard.addEventListener('click', (e) => {
    e.preventDefault();
  if (e.target.classList.contains('schedule-btn')){
    const rsvpResponse = e.target.textContent;
    const meetupid = e.target.nextElementSibling.value;
    createRsvp(meetupid, rsvpResponse);
  }
  })
}

window.onload = function load() {
  getPostId();
}
