import Destination from "./Destination";

const Group = (props) => {
  const { date, destination } = props;
  const { handleRemove, handleTraveled, handleEdit } = props;

  return (
    <div>
      <p className=" mb-2 bg-green-500   border-red-300 shadow-md rounded py-2 px-2">
        📅 <span className="font-bold">{date}</span>
      </p>
      {destination &&
        destination.map((des) => {
          if (des.date === date) {
            return (
              <Destination
                key={des.id}
                handleRemove={handleRemove}
                handleTraveled={handleTraveled}
                handleEdit={handleEdit}
                destination={des}
              />
            );
          }
          return null;
        })}
    </div>
  );
};

export default Group;
