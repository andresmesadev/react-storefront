import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "./firebase.js";

const normalizeProductImage = (image) => {
  return image?.replace(
    "https://fakestoreapi.com/img/",
    "https://raw.githubusercontent.com/keikaavousi/fake-store-api/master/public/img/"
  );
};

const normalizeQuantity = (value) => {
  const quantity = Number(value);
  return Number.isFinite(quantity) && quantity >= 1 ? Math.floor(quantity) : 1;
};

const normalizeProduct = (product) => ({
  ...product,
  image: normalizeProductImage(product.image),
  price: Number(product.price) || 0,
  quanty: normalizeQuantity(product.quanty),
});

export const getProducts = async (categoryName) => {
  const itemsRef = collection(db, "items");
  const itemsCollection = await getDocs(itemsRef);
  const items = itemsCollection.docs.map(doc => normalizeProduct({ ...doc.data(), id: doc.id }));

  return categoryName ? items.filter(item => item.category === categoryName) : items;
};

export const getProductById = async (id) => {
  const itemRef = doc(db, "items", id);
  const itemDoc = await getDoc(itemRef);

  if (!itemDoc.exists()) {
    return { id };
  }

  return normalizeProduct({ ...itemDoc.data(), id: id });
};
