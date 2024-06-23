import { app, db } from "/firebase.js";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const tbody = document.getElementById("tbody");
const auth = getAuth();
let userId;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    userId = user.uid;
    fetchProducts();
  } else {
    // User is signed out
    return;
  }
});

async function fetchProducts() {
  if (!userId) return;
  tbody.innerHTML = "";

  const q = query(collection(db, "cart"), where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (cartDoc) => {
    let data = { ...cartDoc.data() };
    data.id = cartDoc.id;

    const docRef = doc(db, "products", data.productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      data.product = { ...docSnap.data() };
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    renderProduct(data);

    // console.log(doc.id, " => ", doc.data());
  });

  //   const querySnapshot = await getDocs(collection(db, "products"));
  //   let i = 1;
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     //   console.log(doc.id, " => ", doc.data());
  //     const product = { ...doc.data(), id: doc.id, order: i };
  //     renderProduct(product);
  //     i++;
  //   });
}
fetchProducts();

function renderProduct(item) {
  const tr = document.createElement("tr");
  tbody.appendChild(tr);
  tr.innerHTML = `
  <td class="cart_product_img">
  <a href="#"
    ><img src="${item.product.image}" alt="Product"
  /></a>
</td>
<td class="cart_product_desc">
  <h5>${item.product.name}</h5>
</td>
<td class="price">
  <span>${item.product.price}</span>
</td>
<td class="qty">
  <div class="qty-btn d-flex">
    <p>Qty</p>
    <div class="quantity">
      <span
        class="qty-minus"
        onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty ) &amp;&amp; qty &gt; 1 ) effect.value--;return false;"
        ><i class="fa fa-minus" aria-hidden="true"></i
      ></span>
      <input
        type="number"
        class="qty-text"
        id="qty"
        step="1"
        min="1"
        max="300"
        name="quantity"
        value="${item.quantity}"
      />
      <span
        class="qty-plus"
        onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;"
        ><i class="fa fa-plus" aria-hidden="true"></i
      ></span>
    </div>
  </div>
</td>`;
  //   const deleteBtn =
  //     document.getElementsByClassName("delete-btn")[product.order - 1];
  //   deleteBtn.onclick = function () {
  //     deleteProduct(product);
  //   };
}
async function deleteProduct(product) {
  const isConfirm = confirm("Are you sure you want to delete" + product.name);
  if (!isConfirm) {
    return;
  }
  // delete product
  await deleteDoc(doc(db, "products", product.id));
  fetchProducts();
}
