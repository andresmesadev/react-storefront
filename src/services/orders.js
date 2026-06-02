import { collection } from "firebase/firestore";
import db from "./firebase.js";

const ordersRef = collection(db, 'ordenes');

export const createOrder = async (buyer) => {
  const newOrder = await addDoc(ordersRef, buyer);
  const orderRef = doc(db, 'ordenes', newOrder.id);
  const orderDoc = await getDoc(orderRef);
  const order = { ...orderDoc.data(), id: newOrder.id };
  setOrder(order);
};
