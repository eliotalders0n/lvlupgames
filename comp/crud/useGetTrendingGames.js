import React from "react";
import firebase from "../../firebase";
function useGetTrendingGames() {
    const [docs, setDocs] = React.useState([]);

    React.useEffect(() => {
      firebase
        .firestore()
        .collection("games").where("status","==",1).orderBy("views","desc").limit(5)
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
}

export default useGetTrendingGames
