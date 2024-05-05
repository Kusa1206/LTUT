import { app, db } from "/firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const loginForm = document.getElementById("login-form");

const loginGoogleBtn = document.getElementById("login-google-btn");
// xử lý khi ng dùng bấm nút đăng nhập
loginForm.onsubmit = function (event) {
  event.preventDefault();
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  // const emailError = document.getElementById("email-error");
  // const passwordError = document.getElementById("password-error");
  const loginError = document.getElementById("login-error");

  // Kiểm tra ô đăng nhập
  // if (email.value === "") {
  //   emailError.innerHTML = "Nhập tên đăng nhập !!!";
  // } else {
  //   emailError.innerHTML = "";
  // }
  // if (password.value === "") {
  //   passwordError.innerHTML = "Nhập mật khẩu !!!";
  // } else {
  //   passwordError.innerHTML = "";
  // }
  // const userList = JSON.parse(localStorage.getItem("userList")) || [];
  // const existingUser = userList.find(function (user) {
  //   return user.email === email.value;
  // });

  // if (!existingUser) {
  //   loginError.innerHTML = "Sai tên đăng nhập hoặc mật khẩu";
  // } else {
  //   loginError.innerHTML = "";
  //   const newUser = {
  //     email: existingUser.email,
  //     password: existingUser.password,
  //   };
  //   localStorage.setItem("user", JSON.stringify(newUser));
  //   window.location.href = "../index.html";
  // }
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

// xử lý đăng nhập với gg
loginGoogleBtn.onclick = function () {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      alert("thành công");
      window.location.href = "/admin";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      alert("lỗi");
    });
};
