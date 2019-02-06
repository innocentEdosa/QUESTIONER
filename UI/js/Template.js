const createdWhen = (date) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const dateCreated = new Date(date).getTime();
  const presentDate = new Date(Date.now()).getTime();
  let createdSince = presentDate - dateCreated;
  createdSince = Math.round(createdSince / oneDay);
  if (createdSince < 1) {
    return 'Today';
  } if (createdSince === 1) {
    return `${createdSince} day ago`;
  }
  return `${createdSince} days ago`;
};

const dateFormater = (date) => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  let formattedDate = new Date(date);
  const day = formattedDate.getDay();
  const month = monthNames[formattedDate.getMonth()];
  const year = formattedDate.getFullYear();
  formattedDate = `${day} / ${month} / ${year}`;
  return `${formattedDate}`;
};

const truncate = (text, max) => text.substr(0, max - 1) + (text.length > max ? '&hellip;' : '');

const loading = (loadingType) => {
  if (loadingType === 2) {
    return '<div class="loading"><img src="img/6.gif" alt="Loading" title="Loading" /></div>';
  }
  return '<div class="loading"><img src="img/5.gif" alt="Loading" title="Loading" /></div>';
};


const adminMeetupTemplate = meetup => `
  <div class="card moveInBottom">
  <div class="col-1-of-5">
    <div class="card-figure">
      <img src="${meetup.images}" alt="" class ="card-img postbtn">
        <input type='hidden' value=${meetup.id}>
    </div>
  </div>
  <div class="col-3-of-5">
    <div class="card-description">
      <div class="card-text">
        <h2 class="card-title heading-primary">
          <a href="post.html" class="postbtn">${truncate(meetup.topic, 41)}</a>
          <input type='hidden' value=${meetup.id}>
        </h2>
        <p>
          ${truncate(meetup.description, 80)}
        </p>
      </div>
      <div class="card-description-btn">
        <a href="#" class="card-btn edit">Edit</a>
        <input type="hidden" value="${meetup.id}">
        <a href="#" class="card-btn delete">Delete</a>
          <input type="hidden" value="${meetup.id}">
          <input type="hidden" value="${meetup.topic}">
      </div>
    </div>
  </div>
  <div class="col-1-of-5">
    <div class="card-description2">
      <a href="post.html" class="card-question-link postbtn">
        <span class="card-question-number postbtn">
          25
        </span> questions already
      </a>
      <input type='hidden' value=${meetup.id}>
      <div class="card-created">
        <span class="created-when">${createdWhen(meetup.createdOn)}</span>
      </div>
    </div>
    </div>
  </div>
  `;

  const scheduledTemplate = schedule => `
    <a href="#">
      <div class="card-sub paddingSide-sm u-marginBottom-sm">
        <div class="card-date u-marginTop-sm">
         created ${createdWhen(schedule.createdOn)}
        </div>
        <div class="card-text">
          <h2 class="card-title heading-primary">
            ${schedule.topic}
          </h2>
          <div class="card-created u-marginBottom-sm">
          Happening Date: ${dateFormater(schedule.happeningOn)}
          </div>
          <div class="heading-primary reply">
            Rsvp: ${schedule.response}
          </div>
        </div>
      </div>
    </a>
  `

const questionTemplate = question => `
<div class="questions">
    <div class="question-text">
      ${question.body}
    </div>
    <ul class="question-btnlist">
      <li class="question-btnlistitem">
        <a href="#" class="question-btn">
          <span class="question-text downvote downvotediv">${question.downvotes}</span>
          <input type="hidden" value=${question.id}>
          <ion-icon class="downvote" name="thumbs-down"></ion-icon>
          <input type="hidden" value=${question.id}>
        </a>
      </li>
      <li class="question-btnlistitem">		
        <a href="#" class="question-btn">
          <span class="question-text upvotediv upvote">${question.upvotes}</span>
          <input type="hidden" value=${question.id}>
          <ion-icon class="upvote" name="thumbs-up"></ion-icon>
          <input type="hidden" value=${question.id}>
        </a>
      </li>
      <li class="question-btnlistitem">
        <a href="" class="question-btn" id="chatbox">
          <span class="question-text"></span>
          <ion-icon class="chatbtn" name="chatboxes"></ion-icon>
        </a>
      </li>
    </ul>
  </div>
    <form action="#" class="form-comment" id="commentForm" >
    <input type="hidden" value=${question.id}>
      <input type="text" class="form-comment-input" placeholder="write a comment..." id="commentInput" name="reply">
      <input type="button" value="comment" class="form-comment-btn commentBtn">
    </form>

    <div class="commentContainer">
      ${loading(2)}
    </div>
	`;

const showcardTemplate = meetup => `
<div class="row">
  <div class="card-date u-marginTop-sm2">
  </div>
  <div class="card-text">
    <h2 class="card-title heading-primary">
      ${meetup.topic}
    </h2>
    <div class="card-created u-marginBottom-sm">
      created on ${dateFormater(meetup.createdOn)}
    </div>
  </div>
  <div class="card-schedule">
    <div class="card-schedule-side card-schedule-front" >
    <span id="rsvptext" class="emp"></span>
      <a href="#" class="" id="rsvpCardFront">Add to your Schedule &rarr;</a>
    </div>
    <div class="card-schedule-side card-schedule-back" id= 'rsvpCard'>
      <a href="#" class="schedule-btn">Yes</a>
      <input type="hidden" value='${meetup.id}'>
      <a href="#" class="schedule-btn">Maybe</a>
      <input type="hidden" value='${meetup.id}'>
      <a href="#" class="schedule-btn">No</a>
      <input type="hidden" value='${meetup.id}'>
    </div>
  </div>
</div>
`;

const commentTemplate = comment => `
<div class="post-comment" id="post-comment">
  <div class="comment">
  <div class="comment-text">
    ${comment.comment}
  </div>
</div>
`;
const postbodyTemplate = meetup => `
  <div class="u-marginTop-lg">
      <div class="col-3-of-5">
        <div class="post-description">
          <h2 class="heading-primary post-heading">
            details
          </h2>
          <p class="post-text">
            <p class="u-marginBottom-sm">${meetup.description} </p>
          </p>
        </div>
        <figure class="post-figure">
          <img src="${meetup.images}" alt="" class="post-img">
          <figcaption class="story-caption">Jack Wilson</figcaption>
        </figure>
        <p class="post-text">
          <h1 class="heading-primary post-heading">Location</h1>
          ${meetup.location}
        </p>
        <p class="post-text">
          <h1 class="heading-primary post-heading u-marginTop-sm">date</h1>
          ${dateFormater(meetup.happeningOn)}
        </p>
        <div class="  ">
        <div class="card-schedule u-width-100 u-marginTop-sm2 u-marginBottom-sm">
        <div class="card-schedule-side card-schedule-front">
          <span id="rsvptext2" class="emp"></span>
          <a href="#" class="" id="rsvpCardFront2">Add to your Schedule &rarr;</a>
        </div>
        <div class="card-schedule-side card-schedule-back" id='rsvpCard2'>
          <a href="#" class="schedule-btn">Yes</a>
          <input type="hidden" value='${meetup.id}'>
          <a href="#" class="schedule-btn">Maybe</a>
          <input type="hidden" value='${meetup.id}'>
          <a href="#" class="schedule-btn">No</a>
          <input type="hidden" value='${meetup.id}'>
        </div>
      </div>
      </div>
        <div class="post-questions u-marginTop-md" id="questionss">
          <div class="questions">
            ${loading(2)}
          </div>
          <div>
            <div class="form-comment" id="form-comment">
              <input type="text" class="form-comment-input" placeholder="write a comment..." id="commentInput" name="reply">
              <input type="button" value="comment" class="form-comment-btn" id="commentBtn">
            </div>
          </div>
        </div>
        <div class="post-input u-marginTop-sm">
          <form action="#" id="questionForm">
            <div class="form-group">
              <input type="hidden" name="post-title" id="questionTitle" class="form-input form-input-2" placeholder="title your question">
            </div>
            <div class="form-group">
              <textarea class="form-input form-input-2 post-textarea" name="post-input" row="20" col="20" placeholder="Ask your question"
                maxlength="400" id='questionBody'></textarea>
            </div>
            <div class="form-group">
              <div class=" err error u-marginTop-neg u-marginBottom-neg" id='errorResponse'>htis is the </div>
              <a href="#" class="form-btn form-btn-sm questionbtn" id='qbtn'> post question</a>
            </div>
          </form>
        </div>
      </div>
    <div class="col-2-of-5">
      <div class="more-meetup">
        <h2 class="heading-primary post-heading u-marginBottom-sm">
          Trending meetup
        </h2>
        <div id="trendingMeetup">
          ${loading(2)}
        </div>
      </div>
      <div class="row u-text-center">
        <a href="meetup.html" class="more emp u-marginTop-md ">show more meetup &rarr;</a>
      </div>
    </div>
    </div>
  `;

const trendingTemplate = meetup => `
  <a href="#" class="scheduledMeetup">
  <div class="card-sub paddingSide-sm u-marginBottom-sm">
    <div class="card-date u-marginTop-sm">
      ${createdWhen(meetup.happeningOn)}
    </div>
    <div class="card-text">
      <h2 class="card-title heading-primary postbtn">
        ${truncate(meetup.topic, 20)}
      </h2>
      <input type='hidden' value='${meetup.id}'>
    <p class="post-text">
      <p class="u-marginBottom-sm">${truncate(meetup.description, 50)} </p>
    </p>
    </div>
  </div>
</a>

    `;
const meetupTemplate = meetup => `
  <a href="post.html" class="posbtn">
  <input type='hidden' value=${meetup.id}>
  <div class="card moveInBottom">
    <div class="col-1-of-5">
      <div class="card-figure">
        <img src="${meetup.images}" alt="" class="card-img postbtn">
        <input type='hidden' value=${meetup.id}>
      </div>
    </div>
    <div class="col-3-of-5">
      <div class="card-description">
        <div class="card-text">
          <h2 class="card-title heading-primary">	
            <a href="post.html" class="postbtn">${truncate(meetup.topic, 41)}</a>
            <input type='hidden' value=${meetup.id}>
          </h2>
          <p>
          ${truncate(meetup.description, 80)}
          </p>
        </div>
        <div class="card-description-btn">
          <a href="post.html" class="card-btn postbtn">Post question &rarr;</a>
          <input type='hidden' value=${meetup.id}>
        </div>
      </div>
    </div>
    <div class="col-1-of-5">
      <div class="card-description2">
        <a href="post.html" class="card-question-link postbtn">
          <span class="card-question-number" id="question">
            ${getQuestionNo(2)}
          </span> questions already
        </a>
        <input type='hidden' value=${meetup.id}>
        <div class="card-created">
        <span class="created-when"> ${createdWhen(meetup.createdOn)}</span>
        </div>
      </div>
    </div>
    </div>
    </a>  
  `;
