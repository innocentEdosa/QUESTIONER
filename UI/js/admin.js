const createPostLink1 = document.getElementById('createlink1');
const createPostLink2 = document.getElementById('createlink2');
const popup = document.getElementById('popup');
const updatePopup = document.getElementById('update-popup');
const editbtn = document.getElementsByClassName('edit');
const deletebtn = document.getElementsByClassName('delete');
const deletepopup = document.getElementById('delete-popup');
const canceldelete = document.getElementsByClassName('delete-cancel');
const closebtn = document.getElementsByClassName('close-btn');

/** modal to create meetup */
createPostLink1.addEventListener('click', () => {
  popup.style.display = 'block';
  popup.style.opacity = '1';
});

createPostLink2.addEventListener('click', () => {
  popup.style.display = 'block';
  popup.style.opacity = '1';
});


for (let x = 0; x < closebtn.length; x += 1) {
  closebtn[x].addEventListener('click', () => {
    popup.style.display = 'none';
    updatePopup.style.display = 'none';
  });
}

for (let x = 0; x < editbtn.length; x += 1) {
  editbtn[x].addEventListener('click', () => {
    updatePopup.style.display = 'block';
    updatePopup.style.opacity = '1';
  });
}

for (let x = 0; x < deletebtn.length; x += 1) {
  deletebtn[x].addEventListener('click', () => {
    deletepopup.style.display = 'block';
    deletepopup.style.opacity = '1';
  });
}

for (let x = 0; x < canceldelete.length; x += 1) {
  canceldelete[x].addEventListener('click', () => {
    deletepopup.style.display = 'none';
    deletepopup.style.opacity = '0';
  });
}
