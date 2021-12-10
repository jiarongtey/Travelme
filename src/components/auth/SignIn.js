import firebase from "firebase/compat/app";
import { FcGoogle } from "react-icons/fc";

const SignIn = ({ auth }) => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className="">
      <button
        className="bg-transparent inline-flex hover:bg-yellow-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded "
        onClick={signInWithGoogle}
      >
        <FcGoogle className="m-1" />
        <span>Sign In With Google</span>
      </button>
    </div>
  );
};

export default SignIn;
