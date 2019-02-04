let adminStatus;
const pathname =  window.location.pathname
const adminNav = document.getElementById('adminNav');
const signupNav = document.getElementById('signupNav');
const signinNav = document.getElementById('signinNav');
const logoutNav = document.getElementById('logoutNav');

function setadminNav(status) {
  if (adminStatus === 'TRUE' && adminNav) {
    adminNav.style.display = 'block';
  }
}

function removeNav(nav){
  if(nav) {
    nav.style.display = 'none';
  }
}
const auth = async () => {
  let user = JSON.parse(localStorage.getItem('user'));
  if (pathname === '/UI/index.html') {
    if (user) {
      removeNav(signupNav);
      removeNav(signinNav);
    } else (removeNav(logoutNav))
    console.log(pathname);
    return false;
  }
  if (!user) {
    window.location.href = 'signup.html';
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
    window.location.href = 'signup.html';
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
  }
})
window.onload = auth();