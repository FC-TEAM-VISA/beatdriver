import React, { useEffect, useState } from "react";
import { app, database } from "../../../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

function User() {
  const [users, setUsers] = useState([]);
  const dbInstance = collection(database, "users");
  const [docs, loading, error] = useCollectionData(dbInstance);

  console.log("docs", docs);

  return (
    <div className="bg-blue-500">
      {docs?.map((user, index) => {
        return (
          <div key={index + 1} className="text-lg">
            <p>{user.email}</p>
          </div>
        );
      })}
    </div>
  );
}

export default User;
