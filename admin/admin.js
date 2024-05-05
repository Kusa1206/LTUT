import { app, db } from "/firebase.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
// kiểm tra xem  ng dùng đã đnagư nhập hay chưa
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
    window.location.href = "/admin/products";
  } else {
    // User is signed out
    // ...
    window.location.href = "/login";
  }
});
