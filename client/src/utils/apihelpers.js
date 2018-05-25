import axios from "axios";

export default {
  // Gets all orders
  getOrders: function() {
    return axios.get("/api/orders");
  },

  getOrdersPending : function() {
      return axios.get("/api/orders/pending");
  },

  AcceptOrder: function(id) {
    return axios.put("/api/order/" + id);
  },

  signup: function () {
    return axios.post("api/signup");
},

// login: function () {
//     return axios.get("/signin");
// },

// signout: function () {
//     return axios.get("/signout");
  // getDirections : function() {
  //   return 
  // }
 
}
