import SignOut from "../auth/SignOut";
import { useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import Group from "./Group";
import { toast } from "react-toastify";

const TraveList = (props) => {
  const { auth, firestore } = props;
  const destinationRef = firestore.collection("destination");
  const query = destinationRef.orderBy("createAt").limit(25);

  const [destination] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const [dateValue, setDateValue] = useState("");

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const g = [];
    destination &&
      destination.forEach((des) => {
        if (!g.includes(des.date)) {
          g.push(des.date);
        }
      });
    g.sort();
    setGroups(g);
    if (dateValue === "") {
      const a = firebase.firestore.Timestamp.now()
        .toDate()
        .toISOString()
        .split("T")[0];
      setDateValue(a);
    }

    return g;
  }, [destination, dateValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { photoURL } = auth.currentUser;
    if (formValue !== "" && dateValue !== "") {
      await destinationRef.add({
        location: formValue,
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
        date: dateValue,
        traveled: false,
        photoURL,
      });
      setFormValue("");
      toggleToast("🐶 Woof ! NEW DESTINATION !");
    }
  };

  const onHandleTraveled = (id, b) => {
    destinationRef.doc(id).update({
      traveled: !b,
    });
    toggleToast("🦄 Let's GOOO!");
  };

  const onHandleRemove = (id) => {
    destinationRef.doc(id).delete();
    toggleToast("🦄 C'mon! Why cancel OHH!");
  };

  const onHandleEdit = (id, location) => {
    destinationRef.doc(id).update({
      location,
    });
    toggleToast("🦄 好!");
  };
  const toggleToast = (text) => {
    toast(text, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <SignOut auth={auth} />

      <form
        className="shadow-md rounded px-4 pt-3 pb-1 mb-4 "
        onSubmit={handleSubmit}
      >
        <div className="mb-4 flex ">
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
            type="text"
            placeholder="Destination"
          />

          <input
            type="date"
            value={dateValue}
            placeholder="Date"
            onChange={(e) => setDateValue(e.target.value)}
            className="shadow appearance-none border rounded ml-2 py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
          />
          <button type="submit" className="text-xl ml-4">
            🐶
          </button>
        </div>
      </form>
      <div>
        {groups.length !== 0 &&
          groups.map((g) => (
            <Group
              key={g}
              date={g}
              destination={destination}
              handleRemove={onHandleRemove}
              handleTraveled={onHandleTraveled}
              handleEdit={onHandleEdit}
            />
          ))}
      </div>
    </>
  );
};

export default TraveList;
