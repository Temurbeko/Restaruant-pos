import React from "react";
import { useNavigate } from "react-router-dom";
import { getAvatarName, getBgColor } from "../../utils";
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";
import { FaLongArrowAltRight } from "react-icons/fa";

const TableCard = ({ id, name, status, initials, seats }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (name) => {
    if (status === "Booked") return;
    const table = { tableId: id, tableNo: name };
    dispatch(updateTable({ table }));
    navigate(`/menu`);
  };

  return (
    <div
      onClick={() => handleClick(name)}
      key={id}
      className="w-full sm:w-[300px] bg-[#262626] p-4 rounded-lg cursor-pointer 
                 hover:bg-[#2c2c2c] transition-colors duration-150"
    >
      <div className="flex items-center justify-between px-1">
        <h1 className="text-white text-lg font-semibold">
          Table{" "}
          <FaLongArrowAltRight className="text-gray-400 ml-2 inline" /> {name}
        </h1>
        <p
          className={`px-2 py-1 rounded-lg text-xs font-semibold ${
            status === "Booked"
              ? "text-green-600 bg-[#2e4a40]"
              : "bg-[#664a04] text-white"
          }`}
        >
          {status}
        </p>
      </div>
      <div className="flex items-center justify-center mt-4 mb-6">
        <h1
          className="size-16 flex justify-center items-center text-white rounded-full p-4 text-lg"
          style={{ backgroundColor: initials ? getBgColor() : "#1f1f1f" }}
        >
          {getAvatarName(initials) || "N/A"}
        </h1>
      </div>
      <p className="text-gray-400 text-xs">
        Seats: <span className="text-white">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;
