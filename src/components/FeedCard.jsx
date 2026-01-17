import axios from "axios";
import { useDispatch } from "react-redux";
import { updateFeed } from "../utils/feedSlice";
import { FaCheckCircle, FaHeart, FaTimes } from "react-icons/fa";
import { BASE_URL } from "../utils/constants";

const FeedCard = ({ info }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(updateFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative w-96 h-[550px] rounded-2xl shadow-xl overflow-hidden flex flex-col">

      {/* Image */}
      <div className="w-full h-3/4">
        <img
          src={info?.photoUrl}
          alt="User"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-bold">
            {info?.firstName} {info?.lastName}
          </h2>
          {info?.age && <span className="text-gray-500">{info.age}</span>}
          <FaCheckCircle className="text-blue-500" />
        </div>
        <p className="text-gray-600 text-sm mt-1">
          {info?.about}
        </p>
      </div>

      {/* Actions */}
      <div className="absolute bottom-4 w-full flex justify-evenly">
        <button
          onClick={() => handleSendRequest("ignored", info?._id)}
          className="w-12 h-12 bg-red-500 text-white rounded-full shadow flex items-center justify-center"
        >
          <FaTimes />
        </button>
        <button
          onClick={() => handleSendRequest("interested", info?._id)}
          className="w-12 h-12 bg-green-500 text-white rounded-full shadow flex items-center justify-center"
        >
          <FaHeart />
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
