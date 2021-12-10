// Files
import TravelList from "./components/Travel/TravelList";
import SignIn from "./components/auth/SignIn";

// Firebase Configuration
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { ToastContainer } from "react-toastify";

import { useAuthState } from "react-firebase-hooks/auth";

firebase.initializeApp({
  apiKey: "AIzaSyC5bUbJDcs3VEXIclHwI1NkfFbdUF0Z-LQ",
  authDomain: "travelme-475c1.firebaseapp.com",
  projectId: "travelme-475c1",
  storageBucket: "travelme-475c1.appspot.com",
  messagingSenderId: "1010559314011",
  appId: "1:1010559314011:web:cd1abdfb362ff71032b77e",
  measurementId: "G-5N4DRMY953",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
function App() {
  const [user] = useAuthState(auth);
  const styleName = "text-green-800 font-medium";

  return (
    <div className="flex min-h-screen bg-yellow-100 text-center ">
      <ToastContainer />

      <div className="mr-auto ml-auto mt-10 ">
        <span className="text-4xl text-green-800 font-bold ">Travel Me</span>
        <img
          className="mr-auto ml-auto mt-2"
          src="travel.png"
          alt="logo"
          width="100"
          height="100"
        />

        <h1 className=" text-xl m-2">
          <span className={styleName}>Rachael </span>💖
          <span className={styleName}>Jia Rong</span>
        </h1>
        <section className="mb-12">
          {user ? (
            <TravelList auth={auth} firestore={firestore} />
          ) : (
            <SignIn auth={auth} />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
