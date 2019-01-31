function createdWhen(date) {
	const when = new Date(Date.now()).getDay() - new Date(date).getDay();
	if (when <= 10) {
		return 'Today';
	}
	return `${when} days ago`;
}

function happening(date) {
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December',
	];
	const d = new Date(date);
	const day = d.getDay();
	const month = monthNames[d.getMonth()];
	const year = d.getFullYear();
	const happens = `${day} / ${month} / ${year}`;
	return `${happens}`;
}


function loading(type) {
	if (type === 2) {
		return '<div class="loading"><img src="img/6.gif" alt="Loading" title="Loading" /></div>';
	}
	return '<div class="loading"><img src="img/5.gif" alt="Loading" title="Loading" /></div>';
}

function questionTemplate(question) {
	return `
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

							</div>
						</div>	`;
}

function showcardTemplate(meetup) {
	return `
					<div class="row">
						<div class="card-date u-marginTop-sm">
							${happening(meetup.happeningOn)}
						</div>
						<div class="card-text">
							<h2 class="card-title heading-primary">
								${meetup.topic}
							</h2>
							<div class="card-created u-marginBottom-sm">
								created by osaro ${createdWhen(meetup.createdOn)}
							</div>
						</div>
						<div class="card-schedule">
							<div class="card-schedule-side card-schedule-front">
								<a href="#" class="">Add to your Schedule &rarr;</a>
							</div>
							<div class="card-schedule-side card-schedule-back">
								<a href="#" class="schedule-btn">Yes</a>
								<a href="#" class="schedule-btn">Maybe</a>
								<a href="#" class="schedule-btn">No</a>
							</div>
						</div>
					</div>
`;
}
function commentTemplate(comment) {
	return `				<div class="post-comment" id="post-comment">
										<div class="comment">
										<div class="comment-text">
											${comment.comment}
										</div>
								</div>

	`
}
function postbodyTemplate(meetup) {
	return `
  					<div class="u-marginTop-lg">
						<div class="col-3-of-5">
							<figure class="post-figure">
								<img src="/${meetup.images}" alt="" class="post-img">
								<figcaption class="story-caption">Jack Wilson</figcaption>
							</figure>
							<div class="post-description">
								<h2 class="heading-primary post-heading">
									details
								</h2>
								<p class="post-text">
                    ${meetup.description}
                    <br\><h1 class="emp">Location</h1> ${meetup.location}
								</p>
							</div>
							<div class="post-input u-marginTop-sm">
								<form action="#" id="questionForm">
									<div class="form-group">
										<input type="text" name="post-title" id="questionTitle" class="form-input form-input-2" placeholder="title your question">
									</div>
									<div class="form-group">
										<textarea class="form-input form-input-2 post-textarea" name="post-input" row="20" col="20"
										 placeholder="Ask your question" maxlength="400" id='questionBody'></textarea>
									</div>

									<div class="form-group">
									 <div class=" err error u-marginTop-neg u-marginBottom-neg" id='errorResponse'>htis is the </div>
										<a href="#" class="form-btn form-btn-sm questionbtn" id='qbtn'> post question</a>
									</div>
								</form>
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
								</div>
							</div>
						</div>

						<div class="col-2-of-5">
							<div class="more-meetup">
								<h2 class="heading-primary post-heading u-marginBottom-sm">
									scheduled meetup
								</h2>
								<a href="#" class="scheduledMeetup">
									<div class="card-sub paddingSide-sm u-marginBottom-sm">
										<div class="card-date u-marginTop-sm">
											present date
										</div>
										<div class="card-text">
											<h2 class="card-title heading-primary">
												the golf club benin
											</h2>
											<div class="card-created u-marginBottom-sm">
												created by osaro two days ago
											</div>
										</div>
									</div>
								</a>
								<a href="#" class="scheduledMeetup">
									<div class="card-sub paddingSide-sm u-marginBottom-sm">
										<div class="card-date u-marginTop-sm">
											present date
										</div>
										<div class="card-text">
											<h2 class="card-title heading-primary">
												meeting in outer space
											</h2>
											<div class="card-created u-marginBottom-sm">
												created by osaro two days ago
											</div>
										</div>
									</div>
								</a>
								<a href="#" class="scheduledMeetup">
									<div class="card-sub paddingSide-sm u-marginBottom-sm">
										<div class="card-date u-marginTop-sm">
											present date
										</div>
										<div class="card-text">
											<h2 class="card-title heading-primary">
												the coven
											</h2>
											<div class="card-created u-marginBottom-sm">
												created by osaro two days ago
											</div>
										</div>
									</div>
								</a>
							</div>
							<div class="row u-text-center">
								<a href="meetup.html" class="more emp u-marginTop-md ">show more meetup &rarr;</a>
							</div>
						</div>
					</div>
  `;
}
function meetupTemplate(meetup) {
	return `	<a href="post.html" class="posbtn">
		<input type='hidden' value=${meetup.id}>
					<div class="card moveInBottom">
						<div class="col-1-of-5">
							<div class="card-figure">
								<img src="/${meetup.images}" alt="" class="card-img postbtn">
								<input type='hidden' value=${meetup.id}>
							</div>
						</div>
						<div class="col-3-of-5">
							<div class="card-description">
								<div class="card-text">
									<h2 class="card-title heading-primary">	
										<a href="post.html" class="postbtn">${meetup.topic}</a>
										<input type='hidden' value=${meetup.id}>
									</h2>
									<p>
										${meetup.description}
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
									created by osaro <span class="created-when">${createdWhen(meetup.createdOn)}</span>
								</div>
							</div>
						</div>
					</div>
        </a>
        
  `;
}
