const authForm = document.getElementsByTagName('form')[0];

authForm.onsubmit = evt => {
  evt.preventDefault();

  const userObj = {};

  async function getUserIdFromStorage(callback) {
    await chrome.storage.sync.get('userid', async items => {
      let userid = items.userid;
      if (userid) {
        callback(userid);
      } else {
        let randomPool = new Uint8Array(32);
        crypto.getRandomValues(randomPool);
        let hex = '';
        for (let i = 0; i < randomPool.length; i++) {
          hex += randomPool[i].toString(16);
        }
        console.log(hex, 'else');
        await chrome.storage.sync.set({ userid: hex }, () => {
          callback(hex);
        });
      }
    });
  }

  getUserIdFromStorage(useToken);

  function useToken(userid) {
    let token = userid;
    console.log(token);
    defineObjectAndMakeRequest(token);
  }

  async function defineObjectAndMakeRequest(token) {
    userObj.email = evt.target[0].value;
    userObj.password = evt.target[1].value;
    userObj.tokenId = token;

    const updateURI = 'http://localhost:8080/api/auth/login';

    console.log(userObj);

    await fetch(updateURI, {
      method: 'PUT',
      body: userObj,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
};
