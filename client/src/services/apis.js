
const OrderApi = {
    GET_ORDER: `${import.meta.env.VITE_SERVER_END}/api/order`,//get
    POST_ORDER: `${import.meta.env.VITE_SERVER_END}/api/order`,//post
    DELETE_ORDER: `${import.meta.env.VITE_SERVER_END}/api/order`,//del
    UPDATE_ORDER: `${import.meta.env.VITE_SERVER_END}/api/order` //patch
};

const ProductApi = {
    CREATE_PRODUCT: `${import.meta.env.VITE_SERVER_END}/api/product/create`,//post,
    GET_PRODUCTS: `${import.meta.env.VITE_SERVER_END}/api/product`
}
const UserApi = {
    CREATE_USER: `${import.meta.env.VITE_SERVER_END}/api/user/create`,//post
    LOGIN_USER: `${import.meta.env.VITE_SERVER_END}/api/user/login`//post
}
export { OrderApi, ProductApi, UserApi };