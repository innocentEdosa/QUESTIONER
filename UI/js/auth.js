class validate {
  static email(email) {
    const emailResponse = document.getElementById('emailResponse');
    const error = [];
    const reg = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if (email === undefined || email === '') {
      error.push('Email is required');
    } else if (!reg.test(email)) {
      error.push('Please enter a valid email');
    }
    if (error.length > 0) {
      emailResponse.innerHTML = `${validate.display(error)}`;
      emailResponse.style.display = 'block';
      return false;
    }
    return true;
  }

  static password(password) {
    const passwordResponse = document.getElementById('passwordResponse');
    const error = [];
    if (password === undefined || password === '') {
      error.push('Password is required');
    } else if (password.length < 5) {
      error.push('Password should be more than five characters');
    }
    if (error.length > 0) {
      passwordResponse.innerHTML = `${validate.display(error)}`;
      passwordResponse.style.display = 'block';
      return false;
    }
    return true;
  }

  static username(username) {
    const usernameResponse = document.getElementById('usernameResponse');
    const error = [];
    let regexp = /^\S+$/;
    if (username === undefined || username === "") {
      error.push('username is required');
    } else if (!regexp.test(username)) {
      error.push('Username cannot contain spaces');
    }
    if (error.length > 0) {
      usernameResponse.innerHTML = `${validate.display(error)}`;
      usernameResponse.style.display = 'block';
      return false;
    }
    return true;
  }

  static display(arr) {
    return arr.join('<br\>');
  }
}

const errorTemplate = (error) => {
  return `${error.email || ''} <br\> ${error.username || ''}`;
}

const showerror = (error) => {
  const loginerror = document.getElementById('loginerror');
  const loginbtn = document.getElementById('loginbtn');
  const signupbtn = document.getElementById('signupbtn');
  const signuperror = document.getElementById('signuperror');
  if (loginbtn && loginerror) {
    loginbtn.innerHTML = 'Log in';
    loginerror.innerHTML = `${error}`;
    loginerror.style.display = 'block';
  }
  if (signupbtn && signuperror) {
    signupbtn.innerHTML = 'Sign up for questioner';
    signuperror.innerHTML = `${error.map(errorTemplate).join('')}`;
    signuperror.style.display = 'block';
  }

}

const handlesuccess = (success) => {
  const loginbtn = document.getElementById('loginbtn');
  const signupbtn = document.getElementById('signupbtn');
  const user = {
    token: success[0].token,
    username: success[0].user.username,
  }
  localStorage.removeItem('user');
  localStorage.setItem('user', JSON.stringify(user));
  console.log(user);
  if (loginbtn) {
    loginbtn.innerHTML = 'Login Successful';
    window.location.replace('meetup.html');
  }
  if (signupbtn) {
    signupbtn.innerHTML = 'Signup Successful';
    window.location.replace('meetup.html');
  }
}

const clearError = () => {
  const emailResponse = document.getElementById('emailResponse');
  const passwordResponse = document.getElementById('passwordResponse');
  const usernameResponse = document.getElementById('usernameResponse');
  emailResponse.innerHTML = '';
  passwordResponse.innerHTML = '';
  if (usernameResponse) { usernameResponse.innerHTML = ''; }
}

const login = async (email, password) => {
  const checkemail = await validate.email(email);
  const checkpassword = await validate.password(password);
  if (checkemail && checkpassword) {
    clearError();
    const loginbtn = document.getElementById('loginbtn');
    loginbtn.innerHTML = `<img src="img/8.gif" alt="Loading" title="Loading" />`;
    const url = `https://innocentsquestioner.herokuapp.com/api/v1/auth/login`;
    const data = {
      email: email,
      password: password
    }

    const fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      }
    }

    const response = await fetch(url, fetchData);
    const json = await response.json();
    if (json.error) {

      return showerror(json.error);
    } else {
      return handlesuccess(json.data);
    }
  }
};


const signup = async (email, password, username) => {
  const checkemail = await validate.email(email);
  const checkpassword = await validate.password(password);
  const checkusername = await validate.username(username);
  if (checkemail && checkpassword && checkusername) {
    clearError();
    const signupbtn = document.getElementById('signupbtn');
    signupbtn.innerHTML = `<img src="img/8.gif" alt="Loading" title="Loading" />`;
    const url = `https://innocentsquestioner.herokuapp.com/api/v1/auth/signup`;

    const data = {
      email: email,
      password: password,
      username: username,
      firstname: 'yourfirstname',
      lastname: 'yourlastname',
      othername: 'johndoe',
      phoneNumber: 0700000000
    }

    const fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      }
    }

    const response = await fetch(url, fetchData);
    const json = await response.json();
    if (json.error) {
      return showerror(json.error);
    } else {
      return handlesuccess(json.data);
    }
  }
};


function initialise() {
  const loginForm = document.forms.login;
  const signupForm = document.forms.signup;
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');
  const usernameField = document.getElementById('username');

  if (loginForm) {
    loginForm.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('login')) {
        const email = emailField.value;
        const password = passwordField.value;
        login(email, password);
      }
    });
  }
  if (signupForm) {
    signupForm.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('signup1')) {
        const email = emailField.value;
        const password = passwordField.value;
        const username = usernameField.value;
        signup(email, password, username);
      }
    });
  }
}

window.onload = initialise();
