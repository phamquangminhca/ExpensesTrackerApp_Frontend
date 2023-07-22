import { useContext, useEffect } from "react";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";
import { authContext } from "../context/AuthContext/AuthContext";

const AccountDashboard = () => {
  const { fetchProfileAction, profile, error } = useContext(authContext);

  //dispatch
  useEffect(() => {
    fetchProfileAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const accounts = profile?.user?.accounts;
  console.log(accounts);

  //Calculate total income
  const totalIncome = accounts?.reduce((acc1, account) => {
    const accountSum = account?.transactions?.reduce((acc2, transaction) => {
      if (transaction?.transactionType === "Income") {
        return acc2 + transaction?.amount;
      } else {
        return acc2;
      }
    }, 0);
    return acc1 + accountSum;
  }, 0);

  //Calculate total expenses
  const totalExpenses = accounts?.reduce((acc1, account) => {
    const accountSum = account?.transactions?.reduce((acc2, transaction) => {
      if (transaction?.transactionType === "Expenses") {
        return acc2 + transaction?.amount;
      } else {
        return acc2;
      }
    }, 0);
    return acc1 + accountSum;
  }, 0);

  //Calculate total intital balance
  const totalInititalBalance = accounts?.reduce((acc, account) => {
    return acc + account?.initialBalance;
  }, 0);

  return (
    <>
      {error ? (
        <div
          className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong> {""}
          <span className="block sm:inline ">{error}</span>
        </div>
      ) : (
        <>
          <AccountSummary
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            totalInititalBalance={totalInititalBalance}
          />
          <AccountList accounts={accounts} />
        </>
      )}
    </>
  );
};

export default AccountDashboard;
