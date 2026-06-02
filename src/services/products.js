import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "./firebase.js";

const normalizeProductImage = (image) => {
  return image?.replace(
    "https://fakestoreapi.com/img/",
    "https://raw.githubusercontent.com/keikaavousi/fake-store-api/master/public/img/"
  );
};

const normalizeProduct = (product) => ({
  ...product,
  image: normalizeProductImage(product.image)
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

  return normalizeProduct({ ...itemDoc.data(), id: id });
};
