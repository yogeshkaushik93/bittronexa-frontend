import React, { useState, useMemo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Calendar, SearchCheck } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { GrDownload } from "react-icons/gr";
import { BiTransferAlt } from "react-icons/bi";
import ReusableForm from "./ReusableForm";

const ReusableDataTable = ({
    data = [],
    columns = [],
    className = "",
    enableDateFilter = false,
    dateKey = "",
}) => {
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnFilters, setColumnFilters] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [first, setFirst] = useState(0);
    const rows = 15;

    // input states
    const [fromDateInput, setFromDateInput] = useState("");
    const [toDateInput, setToDateInput] = useState("");

    // applied states
    const [appliedFromDate, setAppliedFromDate] = useState("");
    const [appliedToDate, setAppliedToDate] = useState("");


    /* ================= FILTER DATA ================= */
    const filteredData = useMemo(() => {
        let filtered = data;

        // 🔍 Global Search
        if (globalFilter) {
            filtered = filtered.filter((row) =>
                Object.values(row).some((val) =>
                    val?.toString().toLowerCase().includes(globalFilter.toLowerCase())
                )
            );
        }

        // 🔎 Column Search
        Object.entries(columnFilters).forEach(([col, val]) => {
            if (val) {
                filtered = filtered.filter((row) =>
                    row[col]?.toString().toLowerCase().includes(val.toLowerCase())
                );
            }
        });

        if (
            enableDateFilter &&
            dateKey &&
            appliedFromDate &&
            appliedToDate
        ) {
            const start = new Date(appliedFromDate + "T00:00:00").getTime();
            const end = new Date(appliedToDate + "T23:59:59").getTime();

            filtered = filtered.filter((row) => {
                if (!row[dateKey]) return false;
                const rowTime = new Date(row[dateKey]).getTime();
                if (isNaN(rowTime)) return false;
                return rowTime >= start && rowTime <= end;
            });
        }

        return filtered;
    }, [
        data,
        globalFilter,
        columnFilters,
        appliedFromDate,
        appliedToDate,
        enableDateFilter,
        dateKey,
    ]);

    /* ================= SORT DATA ================= */
    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue == null) return 1;
            if (bValue == null) return -1;

            if (typeof aValue === "string") {
                const comp = aValue.localeCompare(bValue);
                return sortConfig.direction === "asc" ? comp : -comp;
            }

            return sortConfig.direction === "asc"
                ? aValue - bValue
                : bValue - aValue;
        });
    }, [filteredData, sortConfig]);

    const paginatedData = sortedData?.slice(first, first + rows);

    const handleColumnSearch = (key, value) => {
        setColumnFilters((prev) => ({ ...prev, [key]: value }));
    };

    const exportToExcel = () => {
        const exportData = sortedData.map((row, index) => {
            const obj = { "#": index + 1 };
            columns.forEach((col) => {
                obj[col.label] = col.render
                    ? col.render(row[col.key], row, index)
                    : row[col.key];
            });
            return obj;
        });

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        saveAs(new Blob([excelBuffer]), "table_data.xlsx");
    };

    const dateInputClass =
        "py-[1.3rem] px-8 w-full rounded-xl bg-transparent border !border-gray-500 text-white text-xl focus:outline-none focus:ring-2 focus:ring-cyan-500";


    return (
        <div
            className={`p-4 bg-gray-950/20 border !border-gray-500 text-white rounded-2xl shadow ${className}`}
        >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-5">
                <div className="relative w-full sm:w-1/2 lg:w-1/3">
                    <ReusableForm
                        type="text"
                        name="globalFilter"
                        onChange={(e) => setGlobalFilter(e?.target?.value)}
                        placeholder={"Search Records"}
                        icon={SearchCheck}
                    />
                </div>

                {enableDateFilter && (
                    <div className="flex flex-wrap gap-3 items-end">
                        <div className="relative">
                            <input
                                type="date"
                                value={fromDateInput}
                                onChange={(e) => setFromDateInput(e.target.value)}
                                className={dateInputClass}
                            />
                            <Calendar
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
                                size={20}
                            />
                        </div>

                        <div className="relative">
                            <input
                                type="date"
                                value={toDateInput}
                                onChange={(e) => setToDateInput(e.target.value)}
                                className={dateInputClass}
                            />
                            <Calendar
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
                                size={20}
                            />
                        </div>

                        <button
                            onClick={() => {
                                setAppliedFromDate(fromDateInput);
                                setAppliedToDate(toDateInput);
                                setFirst(0); 
                            }}
                            className="py-[1.3rem] px-5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xl"
                        >
                            Apply Filter
                        </button>

                        <button
                            onClick={() => {
                                setFromDateInput("");
                                setToDateInput("");
                                setAppliedFromDate("");
                                setAppliedToDate("");
                                setFirst(0);
                            }}
                            className="py-[1.3rem] px-5 rounded-xl bg-gray-700 hover:bg-gray-600 text-white text-xl"
                        >
                            Clear
                        </button>
                    </div>
                )}


                <button
                    onClick={exportToExcel}
                    className="w-fit bg-[var(--cyan-active)] bg-opacity-20 border !border-gray-500 hover:bg-gray-700 text-white px-4 py-3 rounded-lg shadow"
                >
                    <GrDownload className="text-3xl" />
                </button>
            </div>

            {/* 📊 DataTable */}
            <DataTable
                value={paginatedData}
                className="custom-datatable whitespace-nowrap"
                emptyMessage={
                    <div className="text-center text-gray-400 py-10">
                        <p>No records found</p>
                    </div>
                }
            >
                {columns.map((col, i) => (
                    <Column
                        key={i}
                        field={col.key}
                        header={
                            <div
                                className={`flex items-center ${col.sortable !== false ? "cursor-pointer" : ""
                                    }`}
                                onClick={() =>
                                    col.sortable !== false &&
                                    setSortConfig((prev) => ({
                                        key: col.key,
                                        direction:
                                            prev.key === col.key && prev.direction === "asc"
                                                ? "desc"
                                                : "asc",
                                    }))
                                }
                            >
                                {col.label}
                                {col.sortable !== false && (
                                    <BiTransferAlt className="w-5 h-5 ml-1 rotate-90" />
                                )}
                            </div>
                        }
                        body={(row, options) =>
                            col.render
                                ? col.render(row[col.key], row, options.rowIndex)
                                : row[col.key] ?? "-"
                        }
                    />
                ))}
            </DataTable>

            {/* 📑 Pagination (SAME) */}
            <div className="flex justify-between items-center mt-4 text-lg text-gray-200">
                <span>
                    Showing {first + 1} to{" "}
                    {Math?.min(first + rows, sortedData?.length)} of{" "}
                    {sortedData?.length} entries
                </span>
                <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={sortedData?.length}
                    onPageChange={(e) => setFirst(e.first)}
                    template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    className="custom-paginator"
                />
            </div>

            <style jsx>{`
                .custom-datatable .p-datatable-thead > tr > th {
                    // background: #1d2630;
                    background: black;
                    color: #e2e8f0;
                    font-weight: 600;
                    font-size: 13px;
                    padding: 12px;
                    
                    
                }
                .custom-datatable .p-datatable-tbody > tr {
                    background: #131920;
                    border-bottom: 1px solid #1e293b;
                }
                .custom-datatable .p-datatable-tbody > tr:nth-child(even) {
                    background: #131922;
                }
                .custom-datatable .p-datatable-tbody > tr:hover {
                    background: #1d2630;
                    transition: 0.2s;
                }
                .custom-datatable .p-datatable-tbody td {
                    padding: 12px;
                    font-size: 14px;
                }
                .custom-paginator {
                    background: #131920 !important;
                    border-radius: 12px;
                    padding: 6px 12px;
                    border: 1px solid #1e293b;
                }
                .custom-paginator .p-paginator-pages .p-paginator-page {
                    background: #1e293b !important;
                    border-radius: 8px;
                    margin: 0 4px;
                    color: #e2e8f0;
                }
                .custom-paginator .p-paginator-pages .p-paginator-page:hover {
                    background: #475569;
                }
                .custom-paginator .p-paginator-first,
                .custom-paginator .p-paginator-prev,
                .custom-paginator .p-paginator-next,
                .custom-paginator .p-paginator-last {
                    color: #cbd5e1;
                    border-radius: 8px;
                    margin: 0 2px;
                    background: #1e293b;
                }
                .custom-paginator .p-paginator-first:hover,
                .custom-paginator .p-paginator-prev:hover,
                .custom-paginator .p-paginator-next:hover,
                .custom-paginator .p-paginator-last:hover {
                    background: #475569;
                    color: white;
                }

      
            `}</style>
        </div>
    );
};

export default ReusableDataTable;
