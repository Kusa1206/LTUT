import { app, db } from "/firebase.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const registerform = document.getElementById("register-form");
const userList = JSON.parse(localStorage.getItem("userList")) || [];
console.log(userList);

registerform.onsubmit = function (event) {
  event.preventDefault();

  // ngăn chặn hành động gửi đi và load lại
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");

  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const confirmPasswordError = document.getElementById(
    "confirm-password-error"
  );

  // Kiểm tra ô đăng nhập
  if (email.value === "") {
    emailError.innerHTML = "Nhập tên đăng ký !!!";
  } else {
    emailError.innerHTML = "";
  }

  if (password.value === "") {
    passwordError.innerHTML = "Nhập mật khẩu !!!";
  } else {
    passwordError.innerHTML = "";
  }

  if (confirmPassword.value === "") {
    confirmPasswordError.innerHTML = "Nhập lại mật khẩu !!!";
  } else if (confirmPassword.value !== password.value) {
    confirmPasswordError.innerHTML = "Mật khẩu không khớp !!!";
  } else {
    confirmPasswordError.innerHTML = "";
  }

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      alert("thành công");
      window.location.href = "/index.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("lỗi");
      // ..
    });
};
