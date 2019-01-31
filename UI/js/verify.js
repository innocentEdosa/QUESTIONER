const auth = async () => {
  let user = JSON.parse(localStorage.getItem('user'));
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
    user.status = json.data[0].status;
    user.id = json.data[0].userid;
    localStorage.setItem('user', JSON.stringify(user));
  }
}

const navigation = document.getElementById('navigation');
navigation.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(e.target);
  if (e.target.classList.contains('logout')) {
    localStorage.removeItem('user');
    window.location.replace('index.html');
  } else if (e.target.classList.contains('navigation-logo')) {
    window.location.href = 'index.html';
  }
})
window.onload = auth();