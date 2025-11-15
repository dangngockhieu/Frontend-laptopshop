import type { OrderItem, Product, ProductDTO, ProductFilters} from '../interfaces';
import axios from '../utils/axiosCustomize';
// ========== User API ==========
/////////////////////////////////////////////////////////////////////////////////
export const getUserWithPaginate = (page: number, limit: number, search = "") => {
  const URL_BACKEND = `/api/users?current=${page}&pageSize=${limit}&keyword=${encodeURIComponent(search)}`;
  return axios.get(URL_BACKEND);
};
 ////////////////////////////////////////////////////////////////////////
export const createUserForAdmin = (email: string, name: string, password: string, role: string) => {
  const URL_BACKEND = '/api/users';
  const data = { name, email, password, role };
  return axios.post(URL_BACKEND, data);
};

//////////////////////////////////////////////////////////////////
export const changeRoleUserForAdmin = (id: number, role: string) => {
  const URL_BACKEND = `/api/users/role/${id}`;
  return axios.patch(URL_BACKEND, { role });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////
export const changePassword = (oldPassword: string, newPassword: string, confirmPassword: string) => {
  const URL_BACKEND = '/api/users/change-password';
  const data = { oldPassword, newPassword, confirmPassword };
  return axios.patch(URL_BACKEND, data);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////
export const countUsersForAdmin = () => {
  const URL_BACKEND = '/api/users/count';
  return axios.get(URL_BACKEND);
};


// ========== Auth API ==========

//////////////////////////////////////////////////////////////////////////////////////
export const register = (email: string, name: string, password: string) => {
  const URL_BACKEND = '/api/auth/register';
  const data = { name, email, password };
  return axios.post(URL_BACKEND, data);
};
/////////////////////////////////////////////////////////////////////////////////////
export const login = (email: string, password: string) => {
  const URL_BACKEND = '/api/auth/login';
  const data = { email, password };
  return axios.post(URL_BACKEND, data, { withCredentials: true });
};
///////////////////////////////////////////////////////////////////////////////////
export const logout = () => {
  const URL_BACKEND = '/api/auth/logout';
  return axios.post(URL_BACKEND, {}, { withCredentials: true });
};
///////////////////////////////////////////////////////////////////////////////////
export const sendResetPassword = (email: string) => {
  const URL_BACKEND = '/api/auth/send-reset-password';
  const data = { email };
  return axios.post(URL_BACKEND, data);
};
////////////////////////////////////////////////////////////////////////////////////
export const resetPassword = (email: string, code: string, newPassword: string, confirmPassword: string) => {
  const URL_BACKEND = '/api/auth/reset-password';
  const data = { email, code, newPassword, confirmPassword };
  return axios.patch(URL_BACKEND, data);
};

// ==================== PRODUCT API ====================

////////////////////////////////////////////////////////////////////////////////////
export const createReview = (productId: number, rating: number, comment: string, orderItemId: number) => {
  const URL_BACKEND = `/api/products/reviews`;
  return axios.post(URL_BACKEND, { productId: productId, orderItemId:orderItemId, rating, comment });
};

///////////////////////////////////////////////////////////
// Get products with pagination, search, filter
export const getProductsWithPaginate = (page: number, limit: number, keyword = "", category: string, factory: string) => {
  const URL_BACKEND = `/api/products/products-paginate?current=${page}&pageSize=${limit}&keyword=${encodeURIComponent(keyword)}&category=${encodeURIComponent(category)}&factory=${encodeURIComponent(factory)}`;
  return axios.get(URL_BACKEND);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////
// Get product details by Id
export const getProductById = (id: string) => {
  const URL_BACKEND = `/api/products/${id}`;
  return axios.get(URL_BACKEND);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getTopSellingProductCategory = (category: string) => {
  const URL_BACKEND = `/api/products/top-products-category?category=${encodeURIComponent(category)}`;
  return axios.get(URL_BACKEND);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getTopSellingProduct = () => {
  const URL_BACKEND = `/api/products/top-products`;
  return axios.get(URL_BACKEND);
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Filter products by category and filters
export const getFilteredProducts = async (filters: ProductFilters) => {
  const URL_BACKEND = `/api/products/filter`;
  return await axios.post(URL_BACKEND, filters );
};

////////////////////////////////////////////////////////////////////
// Add features to product
export const addProductFeatures = (productId: number, featureIds: number[]) => {
  const URL_BACKEND = `/api/products/${productId}/features`;
  const body = featureIds.map(id => ({ featureId: id }));
  return axios.post(URL_BACKEND, body);
};

//////////////////////////////////////////////////////////////////
// Delete feature from product
export const deleteProductFeature = (productId: number, featureId: number) => {
  const URL_BACKEND = `/api/products/${productId}/features/${featureId}`;
  return axios.delete(URL_BACKEND);
};
///////////////////////////////////////////////////////////////////
// Create new product
export const createProduct = (dto: object, images?: File[]) => {
  const URL_BACKEND = `/api/products`;
  const formData = new FormData();

  // Gửi data dưới dạng JSON blob
  formData.append("data", new Blob([JSON.stringify(dto)], { 
    type: "application/json" 
  }));

  // Thêm ảnh nếu có
  if (images && images.length > 0) {
    images.forEach(image => formData.append("images", image));
  }

  return axios.post(URL_BACKEND, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

////////////////////////////////////////////////////////
// Upload Excel file to import multiple products
export const uploadExcel = (file: File) => {
  const formData = new FormData();
  formData.append("excel", file);

  return axios.post("/api/products/upload-excel", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update product information (excluding images)
/////////////////////////////////////////////////////////////
export const updateProduct = (id: number, products: Product) => {
  const URL_BACKEND = `/api/products/${id}`;
  return axios.patch(URL_BACKEND, products);
};

////////////////////////////////////////////////////////////////////
// Add multiple images to product
export const addProductImages = (id: number, formData: FormData) => {
  const URL_BACKEND = `/api/products/product-images/${id}`;
  return axios.post(URL_BACKEND, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
////////////////////////////////////////////////////////////////////////
// Delete one image
export const deleteProductImage = (imageId: number) => {
  const URL_BACKEND = `/api/products/product-image/${imageId}`;
  return axios.delete(URL_BACKEND);
};

////////////////////////////////////////////////////////////////////
// Delete product by Id
export const deleteProduct = (id: number) => {
  const URL_BACKEND = `/api/products/${id}`;
  return axios.delete(URL_BACKEND);
};

////////////////////////////////////////////////////////////
export const countProductsForAdmin = () => {
  const URL_BACKEND = '/api/products/count';
  return axios.get(URL_BACKEND);
};

// ==================== CART API ====================
////////////////////////////////////////////////////////////
export const getNumberCart = () => {
  const URL_BACKEND = `/api/carts/number-cart`;
  return axios.get(URL_BACKEND);
}

/////////////////////////////////////////////////////////////
export const addProductToCart = (productId: number) => {
  const URL_BACKEND = `/api/carts`;
  return axios.post(URL_BACKEND, { productId: productId });
};

//////////////////////////////////////////////////////////////
export const getCart = () => {
  const URL_BACKEND = `/api/carts`;
  return axios.get(URL_BACKEND);
};

////////////////////////////////////////////////////////////////
export const updateCartQuantity = (productId: number, newNumber: number) => {
  const URL_BACKEND = `/api/carts/update-quantity`;
  return axios.patch(URL_BACKEND, { productId: productId, quantity:newNumber });
};

///////////////////////////////////////////////////////////////
export const deleteCartItem = (productId: number) => {
  const URL_BACKEND = `/api/carts`;
  return axios.delete(URL_BACKEND, { data: { productId: productId } });
};

///////////////////////////////////////////////////////////////////
export const buyNow = (productId: number) => {
  const URL_BACKEND = `/api/carts/buy-now`;
  return axios.post(URL_BACKEND, { productId: productId });
};

////////////////////////////////////////////////////////////////////
export const checkoutCart = () => {
  return axios.patch(`/api/carts/checkout`);
};

// ==================== ORDER API ====================

////////////////////////////////////////////////////////////////////////////////
export const createOrder = (name: string, address: string, phone: string, items: OrderItem[], totalPrice: number, paymentMethod: string) => {
  const URL_BACKEND = '/api/orders';
  const data = { recipientName: name, address: address, phone: phone, items: items, totalPrice: totalPrice, paymentMethod: paymentMethod };
  return axios.post(URL_BACKEND, data);
}

//////////////////////////////////////////////////////////////////////////////////////
export const getMyOrders = (status: string) => {
  const URL_BACKEND = `/api/orders/user-orders?status=${status}`;
  return axios.get(URL_BACKEND);
};

/////////////////////////////////////////////////////////////////////////
export const updateOrderForUser = (orderId: number, status: string) => {
  const URL_BACKEND = `api/orders/updateToStatus/${orderId}`;
  const data = { status };
  return axios.patch(URL_BACKEND, data);
}

/////////////////////////////////////////////////////////////////////////////////////
export const buyAgain = (products: ProductDTO[]) => {
  const URL_BACKEND = `api/orders/buy-again`;
  return axios.post(URL_BACKEND, products );
}

////////////////////////////////////////////////////////////////////////////////
export const getOrderPendingForAdmin = (page: number, limit: number) => {
  const URL_BACKEND = `api/orders/pending?current=${page}&pageSize=${limit}`;
  return axios.get(URL_BACKEND);
};

//////////////////////////////////////////////////////////////////////////////////
export const getOrderForAdmin = (page: number, limit: number, status: string) => {
  const URL_BACKEND = `api/orders/status?current=${page}&pageSize=${limit}&status=${status}`;
  return axios.get(URL_BACKEND);
}

////////////////////////////////////////////////////////////////////////////////////
export const getOrderItem = (orderId: number) => {
  const URL_BACKEND = `api/orders/order-item?orderId=${orderId}`;
  return axios.get(URL_BACKEND);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
export const updatePendingtoShipping = (orderId: number, trackingCode: string, expectedDate: string) => {
  const URL_BACKEND = `api/orders/updateToShipping/${orderId}`;
  return axios.patch(URL_BACKEND, { trackingCode, expectedDate });
}

//////////////////////////////////////////////////////////////////////////////////
export const deleteOrder = (orderId: number) => {
  const URL_BACKEND = `api/orders/${orderId}`;
  return axios.delete(URL_BACKEND);
}

// ==================== COUNT ORDERS API (Admin) ====================
/////////////////////////////////////////////////////////////////////
export const countOrdersThisMonth = () => {
  const URL_BACKEND = 'api/orders/count';
  return axios.get(URL_BACKEND);
};

// ==================== REVENUE THIS MONTH API (Admin) ====================
//////////////////////////////////////////////////////////////////////////
export const getRevenueThisMonthForAdmin = () => {
  const URL_BACKEND = 'api/orders/revenue';
  return axios.get(URL_BACKEND);
};

// ==================== REVENUE BY MONTH API (Admin) ====================
/////////////////////////////////////////////////////////////////////////
export const getRevenueByMonthForAdmin = () => {
  const URL_BACKEND = 'api/orders/revenue-by-month';
  return axios.get(URL_BACKEND);
};

// ==================== VNPay API ====================
export const createURLPayment = async (orderId: number) => {
  const URL_BACKEND = `api/payments/reate`;
  return axios.post(URL_BACKEND, { orderId });
};

// ==================== AI CHAT API ====================

export const askAiChat = async (question: string) => {
  const URL_BACKEND = `api/chat/ask`;
  return axios.post(URL_BACKEND, { question: question });
};

export const getAiChatHistory = async () => {
  const URL_BACKEND = `api/chat/history`;
  return axios.get(URL_BACKEND);
};