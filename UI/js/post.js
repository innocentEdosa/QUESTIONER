const commentBtn = document.getElementById('chatbox');
const commentForm = document.getElementById('form-comment');
const comment = document.getElementById('post-comment');

/** modal for creating and showing question comment */
commentBtn.addEventListener('click', (event) => {
  comment.style.display = 'block';
  commentForm.style.display = 'block';
  event.preventDefault();
  return false;
});
