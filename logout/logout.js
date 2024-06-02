import { app, db } from "/firebase.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const auth = getAuth();
signOut(auth)
  .then(() => {
    alert("Đăng xuất thành công");
    window.location.href = "/login";
  })
  .catch((error) => {});
