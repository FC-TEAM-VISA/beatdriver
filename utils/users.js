import { app, database } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const dbInstance = collection(database, "users");

const getUsers = async () => {
  getDocs(dbInstance).then((data) => {
    data.docs.map((item) => {
      return { ...item.data(), id: item.id };
    });
  });
};

export { getUsers };

// const getUsers = async () => {
//   getDocs(dbInstance).then((data) => {
//     setUsers(
//       data.docs.map((item) => {
//         return { ...item.data(), id: item.id };
//       })
//     );
//   });
// };

// useEffect(() => {
//   getUsers();
// }, []);

// console.log(users);
