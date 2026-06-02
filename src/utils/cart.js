export const CART_STORAGE_KEY = "react-storefront-cart";

export const normalizeQuantity = (value) => {
  const quantity = Number(value);
  return Number.isFinite(quantity) && quantity >= 1 ? Math.floor(quantity) : 1;
};

export const normalizeCartItem = (item) => {
  if (!item?.id) return null;

  return {
    ...item,
    price: Number(item.price) || 0,
    quanty: normalizeQuantity(item.quanty),
  };
};

export const sanitizeCart = (items) => {
  if (!Array.isArray(items)) return [];

  return items.map(normalizeCartItem).filter(Boolean);
};

export const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];

    return sanitizeCart(JSON.parse(stored));
  } catch {
    return [];
  }
};

export const saveCartToStorage = (cart) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(sanitizeCart(cart)));
};

export const getItemLineTotal = (item) => {
  const price = Number(item?.price) || 0;
  const quanty = normalizeQuantity(item?.quanty);
  return price * quanty;
};

export const getCartTotal = (cart) => {
  return sanitizeCart(cart).reduce((acc, item) => acc + getItemLineTotal(item), 0);
};

export const getCartItemCount = (cart) => {
  return sanitizeCart(cart).reduce((acc, item) => acc + normalizeQuantity(item.quanty), 0);
};
