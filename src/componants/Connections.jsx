import axios from "axios";
import { Base_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useEffect } from "react";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(Base_URL + "/user/connections", { withCredentials: true });
      dispatch(addConnections(res.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <h1 className="bg-gradient-to-r from-rose-400 to-blue-400 min-h-screen text-white text-3xl flex items-center justify-center">
        No connections Found! Go to feed and start exploring
      </h1>
    );

  return (
    <div className="bg-gradient-to-r from-rose-400 to-blue-400 min-h-screen text-white pt-20">
      <div className="flex flex-col w-[700px] mx-auto">
        <h1 className="font-bold text-2xl text-center mb-3 text-gray-700">Connections</h1>

        <div className="flex flex-col gap-4 w-full">
          {connections.map((connection) => (
            <div key={connection._id}>
              <div className="card card-side bg-base-100 shadow-sm w-full h-32">
                <figure className="w-32 h-32 flex-shrink-0 overflow-hidden bg-amber-100 rounded-md">
                  <img
                    className="w-full h-full object-cover"
                    src={connection.photoURL}
                    alt="User"
                  />
                </figure>
                <div className="card-body pt-2">
                  <div className="flex justify-between">
                    <h2 className="card-title text-black">
                      {connection.firstName + " " + connection.lastName}
                    </h2>
                    <h4 className="font-bold my-3 mx-4 text-black">
                      {connection.age + "/" + connection.gender}
                    </h4>
                  </div>
                  <p className="max-w-3/5  text-black">{connection.about}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-20"></div>
      </div>
    </div>
  );
};

export default Connections;
