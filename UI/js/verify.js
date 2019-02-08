let adminStatus;
const windowHref = window.location.href;
const pathArray = window.location.href.split('/');
pathArray.pop();
const pathHref = pathArray.join('/');

const adminNav = document.getElementById('adminNav');
const signupNav = document.getElementById('signupNav');
const signinNav = document.getElementById('signinNav');
const logoutNav = document.getElementById('logoutNav');
const showcasebtn1 = document.getElementById('showcasebtn1');
const showcasebtn2 = document.getElementById('showcasebtn2');
const headerSubText = document.getElementById('headerSubText');
const createNav = document.getElementById('createNav');
const profileNav = document.getElementById('profileNav');
 
const setadminNav = () => {
  if (adminStatus === 'TRUE' && adminNav) {
    adminNav.style.display = 'block';
  }
}

const removeElement = (element) => {
  if(element) {
    element.style.display = 'none';
  }
}

const auth = async () => {
  let user = JSON.parse(localStorage.getItem('user'));
  if (windowHref === `${pathHref}/index.html` || windowHref === `${pathHref}/`) {
    if(!user) {
      removeElement(profileNav);
    }
    if (user) {
      if (user.status === 'TRUE') {
        adminNav.style.display = 'block';
        createNav.style.display = 'block';
      }
      removeElement(signupNav);
      removeElement(signinNav);
      removeElement(showcasebtn1);
      removeElement(showcasebtn2);
      headerSubText.innerHTML = `Welcome ${user.username}. Enjoy Questioner`;
    } else (removeElement(logoutNav));
    return false;
  }
  if (!user) {
    localStorage.setItem('signupStatus', 1);
    window.location.href = 'login.html';
    return false;
  }
  const token = user.token;
  const url = `https://innocentsquestioner.herokuapp.com/api/v1/auth/verify`;
  const fetchData = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token,
    }
  }
  const response = await fetch(url, fetchData);
  const json = await response.json();
  if (json.error) {
    window.location.href = 'login.html';
  }
  if (json.status === 200) {
    adminStatus = json.data[0].status;
    user.status = json.data[0].status;
    user.id = json.data[0].userid;
    localStorage.setItem('user', JSON.stringify(user));
  }
setadminNav(adminStatus);
}

const navigation = document.getElementById('navigation');
navigation.addEventListener('click', (e) => {
  if (e.target.classList.contains('logout')) {
    e.preventDefault();
    localStorage.removeItem('user');
    window.location.replace('index.html');
  } else if (e.target.classList.contains('navigation-logo')) {
    e.preventDefault();
    window.location.href = 'index.html';
  } else if (e.target.classList.contains('profile')){
    e.preventDefault();
    window.location.href = 'profile.html';
  } else if (e.target.classList.contains('admin')) {
    e.preventDefault();
    window.location.href = 'admin.html';
  } else if (e.target.classList.contains('create')){
    e.preventDefault()
    window.location.href = 'create.html';
  }
})
window.onload = auth();