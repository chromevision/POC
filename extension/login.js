const authForm = document.getElementsByTagName('form')[0];

authForm.onsubmit = async evt => {
  evt.preventDefault();

  console.log(
    await chrome.storage.sync.get('userToken', () => {
      console.log('do things with that ^');
    })
  );
  // const userObj = {};
  // userObj.email = evt.target[0].value;
  // userObj.password = evt.target[1].value;

  // const updateURI = '';

  // await fetch(updateURI, {
  //   method: 'PUT',
  //   body: userObj,
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  // }).then(res => console.log(res));
};
