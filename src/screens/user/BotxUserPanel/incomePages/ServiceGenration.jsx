import React, { useState } from "react";
import { Calendar } from "lucide-react";
import ReusableForm from "../../../../components/ui/ReusableForm";
import ReusableDataTable from "../../../../components/ui/ReusableTable";
import { Button5 } from "../../../../components/ui/Buttons";

const ServiceGenration = () => {
  const [data, setData] = useState([]);

  const columns = [
    { label: "#", key: "index", render: (val, row, index) => index + 1 },
    { label: "User ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Income", key: "income" },
    { label: "Level", key: "level" },
    { label: "Date", key: "createdAt" },
  ];

  return (
    <div className="mt-5 rounded-2xl shadow-md">
      {/* Filter Section */}
      <div className=" p-5 rounded-xl mb-6 border !border-gray-500">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
          <ReusableForm
            label="Start Date"
            name="startDate"
            type="date"
            className="text-white"
            icon={Calendar}
          />
          <ReusableForm
            label="End Date"
            name="endDate"
            type="date"
            className="text-white"
            icon={Calendar}
          />
          <div className="flex items-end justify-start sm:justify-center md:justify-start">
            <Button5
              name="Filter"
              type="submit"
              onClick={() => { }}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div>
        <ReusableDataTable
          columns={columns}
          data={data}
          title="Direct Team List"
        />
      </div>
    </div>
  );
};

export default ServiceGenration;
