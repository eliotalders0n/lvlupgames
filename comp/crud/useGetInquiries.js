import React from "react";
import firebase from "../..//firebase";

const useGetInquiries = (id) => {
  const [docs, setDocs] = React.useState([]);
  // console.log(user);

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("inquiries").where("userId", "==", firebase.auth().currentUser.uid).orderBy("status")
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

export default useGetInquiries;
