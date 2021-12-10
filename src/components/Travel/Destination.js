import { MdFlightLand } from "react-icons/md";
import { EditText } from "react-edit-text";

const Destination = (props) => {
  const { location, photoURL, id, traveled } = props.destination;
  const { handleRemove, handleTraveled, handleEdit } = props;

  const classTravel = traveled ? "bg-red-300" : "bg-red-400";
  return (
    <div
      className={`mb-2 border-yellow-300 shadow-md rounded py-3 px-4 leading-tight focus:outline-none focus:shadow-outline ${classTravel}`}
    >
      <div className="float-right pt-2">
        <button
          onClick={() => {
            handleTraveled(id, traveled);
          }}
          className="text-xl mr-2"
        >
          {traveled ? <p>🥂</p> : <p>☕</p>}
        </button>
        <button
          onClick={() => {
            handleRemove(id);
          }}
          className="text-xl mr-2"
        >
          🗑️
        </button>
      </div>

      <div className="flex">
        <MdFlightLand className="text-4xl	" />
        <EditText
          className="text-red-700 font-bold m-2 text-left"
          onSave={(e) => {
            handleEdit(id, e.value);
          }}
          defaultValue={location}
        />
      </div>
      <div className="flex mt-2">
        <span className="text-sm mr-2">Created by </span>
        <img
          className="rounded-full mb-2 h-5 w-5"
          src={photoURL}
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default Destination;
