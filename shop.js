import { app, db } from "/firebase.js";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
const productList = document.getElementById("product-list");
async function fetchProducts() {
  productList.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "products"));
  let i = 1;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    const product = { ...doc.data(), id: doc.id, order: i };
    renderProduct(product);
    i++;
  });
}
fetchProducts();

function renderProduct(product) {
  console.log(product);

  const productCard = document.createElement("div");
  productList.appendChild(productCard);
  productCard.classList.add("col-12", "col-sm-6", "col-md-12", "col-xl-6");

  productCard.innerHTML = `
  <div class="single-product-wrapper">
  <!-- Product Image -->
  <a href="">
  <div class="product-img" style="object-fit: cover;">
    <img src="${product.image}" alt="" /></a>
    <!-- Hover Thumb -->
    <img
      class="hover-img"
      src="img/product-img/product2.jpg"
      alt=""
    />
  </div>

  <!-- Product Description -->
  <div
    class="product-description d-flex align-items-center justify-content-between"
  >
    <!-- Product Meta Data -->
    <div class="product-meta-data">
      <div class="line"></div>
      <p class="product-price">${product.price}</p>
      <a href="./product-details.html?id=${product.id}">
        <h6>${product.name}</h6>
      </a>
    </div>
    <!-- Ratings & Cart -->
    <div class="ratings-cart text-right">
      <div class="ratings">
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
      </div>
      <div class="cart">
        <a
          href="cart.html"
          data-toggle="tooltip"
          data-placement="left"
          title="Add to Cart"
          ><img src="img/core-img/cart.png" alt=""
        /></a>
      </div>
    </div>
  </div>
  `;
}
