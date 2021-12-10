import { GoSignOut } from "react-icons/go";

const SignOut = (props) => {
  const { auth } = props;

  return (
    auth.currentUser && (
      <button
        className="bg-transparent inline-flex hover:bg-yellow-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded "
        onClick={() => {
          auth.signOut();
        }}
      >
        <GoSignOut className="mt-1.5 mr-1" />
        <p>Sign Out</p>
      </button>
    )
  );
};

export default SignOut;
