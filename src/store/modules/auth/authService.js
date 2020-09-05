// /* Encryption User based on base64 */
// import store from "@/store";
// export const encryptUser = user => {
//   const objStr = JSON.stringify(user);
//   const encryptedValue = new Buffer(objStr).toString("base64");
//   return encryptedValue;
// };

// /* Decrypting User based on base64 */
// export const decryptUser = () => {
//   const data = localStorage.getItem("user");
//   if (!data) {
//     return null;
//   }
//   try {
//     const strObj = new Buffer(data || "", "base64").toString("utf8");
//     const value = JSON.parse(strObj);
//     return value;
//   } catch (ex) {
//     return null;
//   }
// };

// export const isLoggedIn = () => {
//   if (store.state.auth.authenticated == null) return false;
//   return store.state.auth.authenticated;
// };

// export const getLoggedInUser = () => {
//   const data = decryptUser();
//   return data;
// };