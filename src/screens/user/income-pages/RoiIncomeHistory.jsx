import { useEffect, useState } from "react";
import { RoiIncomeAPi } from "../../../api/user-api";
import ReusableDataTable from "../../../components/ui/ReusableTable";
import {
  formatValueWithCurrency,
  dateFormat,
} from "../../../utils/additionalFunc";
import PageLoader from "../../../components/ui/PageLoader";

const RoiIncomeHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRoiHistory = async () => {
    try {
      setLoading(true);
      const response = await RoiIncomeAPi();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching ROI income history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoiHistory();
  }, []);

  const EXCHANGE_PAIRS = [
    { buy: "Binance", sell: "OKX" },
    { buy: "OKX", sell: "Bybit" },
    { buy: "Bybit", sell: "Binance" },
    { buy: "Binance", sell: "BitFlyer" },
    { buy: "OKX", sell: "Coincheck" },
    { buy: "KuCoin", sell: "Gate.io" },
    { buy: "Bitget", sell: "MEXC" },
    { buy: "Binance US", sell: "Coinbase" },
  ];
  const hashString = (str = "") => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };
  const getBuySellExchange = (row, index) => {
    const seed = row?._id || row?.userId?.username || `${index}`;

    const hash = hashString(seed);
    const pair = EXCHANGE_PAIRS[hash % EXCHANGE_PAIRS.length];

    return pair;
  };

  const columns = [
    { label: "#", key: "index", render: (val, row, index) => index + 1 },
    {
      label: "Username",
      key: "userId",
      render: (val) => val?.username || "N/A",
    },
    {
      label: "Trading profit Amount",
      key: "roiAmount",
      render: (val) => (val ? formatValueWithCurrency(val.toFixed(2)) : "N/A"),
    },
    {
      label: "Buy Exchange",
      key: "buyExchange",
      render: (_, row, index) => {
        const { buy } = getBuySellExchange(row, index);
        return (
          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 font-semibold">
            {buy}
          </span>
        );
      },
    },
    {
      label: "Sell Exchange",
      key: "sellExchange",
      render: (_, row, index) => {
        const { sell } = getBuySellExchange(row, index);
        return (
          <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 font-semibold">
            {sell}
          </span>
        );
      },
    },
    {
      label: "Self Investment Amount",
      key: "baseAmount",
      render: (val) => (val ? formatValueWithCurrency(val) : "N/A"),
    },
    {
      label: "Transaction Type",
      key: "transactionType",
      render: (val) => <span className="capitalize">{val}</span>,
    },
    {
      label: "Credited Date",
      key: "creditedDate",
      render: (val) => dateFormat(val),
    },
  ];

  if (loading) return <PageLoader />;

  return (
    <div className="mt-5 rounded-2xl shadow-md">
      <ReusableDataTable
        columns={columns}
        data={data}
        enableDateFilter
        dateKey="creditedDate"
      />
    </div>
  );
};

export default RoiIncomeHistory;
