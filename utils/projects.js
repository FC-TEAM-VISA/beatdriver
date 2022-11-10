import { app, database } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const dbInstance = collection(database, "projects");

const getProjects = async () => {
  getDocs(dbInstance).then((data) => {
    console.log(
      data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      })
    );
  });
};

export { getProjects };
