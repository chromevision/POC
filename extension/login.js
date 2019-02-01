const authForm = document.getElementsByTagName('form')[0];

authForm.onsubmit = evt => {
  evt.preventDefault();
  const userObj = {};
  userObj.email = evt.target[0].value;
  userObj.password = evt.target[1].value;
  console.log(userObj);
};
