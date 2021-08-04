import React from 'react'
import firebase from "../../firebase";
function useGetnews() {
    const [docs, setDocs] = React.useState([]);
   
  React.useEffect(() => {
    firebase
      .firestore()
      .collection("news")
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


export default useGetnews
