import  { useState } from "react";
import AddTransactionDialog from "./AddTransactionDialog";

const FirstTransaction = ({ isChecked }: { isChecked: (value: boolean) => void }) => {
  const [showAdd, setShowAdd] = useState(
    JSON.parse(localStorage.getItem("transactions_data") || "[]").length === 0,
  );

  const handleFirstTransaction = () => {
    const check = JSON.parse(localStorage.getItem("transactions_data") || "[]").length === 0;
    setShowAdd(false);
    isChecked(check);
  };

  return (
    <div>{showAdd && <AddTransactionDialog onClose={() => handleFirstTransaction()} />}</div>
  );
};

export default FirstTransaction;
