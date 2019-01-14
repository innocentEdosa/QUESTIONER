const createPostLink1 = document.getElementById('createlink1');
const createPostLink2 = document.getElementById('createlink2');
const popup = document.getElementById('popup');

/** modal to create meetup */
createPostLink1.addEventListener('click', () => {
  popup.style.display = 'block';
  popup.style.opacity = '1';
});

createPostLink2.addEventListener('click', () => {
  popup.style.display = 'block';
  popup.style.opacity = '1';
});

const closebtn = document.getElementById('close');
closebtn.addEventListener('click', () => {
  popup.style.display = 'none';
});
