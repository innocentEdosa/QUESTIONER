
const popup = document.getElementById('createPopup');
const updatePopup = document.getElementById('update-popup');
const editbtn = document.getElementsByClassName('edit');
const deletebtn = document.getElementsByClassName('delete');
const deletepopup = document.getElementById('delete-popup');
const canceldelete = document.getElementsByClassName('delete-cancel');

class Display {

  static open(elem) {
    const value = elem;
    value.style.display = 'block';
    value.style.opacity = '1';
  }

  static close(elem) {
    const value = elem;
    value.style.display = 'none';
    value.style.opacity = 'none';
  }
}

const createForm = document.forms['createForm'];
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const topic = createForm.querySelector('#meetup-title').value;
  const happeingOn = createForm.querySelector('#meetup-date').value;
  const images = createForm.querySelector('#meetup-img');
  const location = createForm.querySelector('#meetup-location').value;
  const description = createForm.querySelector('#meetup-description').value;

 
  const formData = new FormData();
  formData.append('topic', topic);
  formData.append('happeningOn', happeingOn);
  formData.append('images', images.files[0]);
  formData.append('location', location);
  formData.append('description', description);
  console.log(formData);
})

const mainBody = document.querySelector('#mainBody');
mainBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('create')) {
    Display.open(popup);
  }
  if (e.target.classList.contains('close-btn')) {
    Display.close(popup);
    Display.close(updatePopup);
  }
});


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
