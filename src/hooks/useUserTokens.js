function getOrCreateUserToken() {
    let token = localStorage.getItem("userToken");
    if (!token) {
        token = crypto.randomUUID();
        localStorage.setItem("userToken", token);
    }
    return token;
  }

export default getOrCreateUserToken