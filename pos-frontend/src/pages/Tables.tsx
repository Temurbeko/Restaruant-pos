import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import BackButton from "../components/shared/BackButton";
import BottomNav from "../components/shared/BottomNav";
import TableCard from "../components/tables/TableCard";
import { getTables } from "../https";

const Tables = () => {
  const [status, setStatus] = useState("all");

  useEffect(() => {
    document.title = "POS | Tables";
  }, []);

  const { data: resData, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => await getTables(),
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <BackButton />
          <h1 className="text-white text-xl font-bold">Tables</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setStatus("all")}
            className={`text-gray-400 text-sm font-semibold px-3 py-1 rounded transition-colors duration-150 ${
              status === "all" ? "bg-[#383838] text-white" : "hover:bg-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("booked")}
            className={`text-gray-400 text-sm font-semibold px-3 py-1 rounded transition-colors duration-150 ${
              status === "booked" ? "bg-[#383838] text-white" : "hover:bg-gray-700"
            }`}
          >
            Booked
          </button>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="flex-1 px-4 py-2 overflow-y-auto">
        <div className="flex flex-wrap gap-4">
          {resData?.data.data.map((table) => (
            <TableCard
              key={table._id}
              id={table._id}
              name={table.tableNo}
              status={table.status}
              initials={table?.currentOrder?.customerDetails.name}
              seats={table.seats}
            />
          ))}
        </div>
      </div>

      <BottomNav />
    </section>
  );
};

export default Tables;
