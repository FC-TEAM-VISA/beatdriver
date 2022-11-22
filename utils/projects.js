import { database } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const dbInstance = collection(database, "projects");

export const getProjects = async () => {
  getDocs(dbInstance).then((data) => {
    data.docs.map((item) => {
      return { ...item.data(), id: item.id };
    });
  });
};
