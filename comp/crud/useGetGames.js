import React from "react";
import firebase from "../../firebase";

const useGetGames = (id) => {
  const [docs, setDocs] = React.useState([]);

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("games").where("status","==",id)
      .onSnapshot((snap) => {
        let data = [];
        snap.docs.forEach((e) => {
          let asd = {
            id: e.id,
            ...e.data(),
          };
          data.push(asd);
        });
        setDocs(data);
      });
  }, []);
  return { docs };
};

export default useGetGames;
