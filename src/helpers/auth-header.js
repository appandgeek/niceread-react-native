export function authHeader() {
  // return authorization header with jwt token
  // let user = JSON.parse(localStorage.getItem("user"));
  let user = "user";
  if (user && user.token) {
    return { "x-auth-token": user.token };
  } else {
    return {};
  }
}
