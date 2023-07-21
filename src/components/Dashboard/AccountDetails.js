import { Link, useParams } from "react-router-dom";
import AllTransactions from "./AllTransactions";
import { useContext, useEffect } from "react";
import { accountContext } from "../context/AccountContext/AccountContext";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function AccountDetails() {
  const { accountID } = useParams();
  // const { userAuth } = useContext(authContext);
  // const author = userAuth?.userAuth?.fullname;
  const { getAccountDetails, account } = useContext(accountContext);
  useEffect(() => {
    getAccountDetails(accountID);
  }, [accountID]);
  console.log(account?.data?.initialBalance);
  console.log(account?.data);

  //Calculate total income
  const totalIncome = account?.data?.transactions?.reduce(
    (acc, transaction) => {
      if (transaction?.transactionType === "Income") {
        return acc + transaction?.amount;
      } else {
        return acc;
      }
    },
    0
  );

  //Calculate total expenses
  const totalExpenses = account?.data?.transactions?.reduce(
    (acc, transaction) => {
      if (transaction?.transactionType === "Expenses") {
        return acc + transaction?.amount;
      } else {
        return acc;
      }
    },
    0
  );

  return (
    <>
      {account?.data?.transactions?.length <= 0 ? (
        <>
          <h2 className="text-center text-red-500 m-10">
            No transactions found
          </h2>
          <div className="text-center">
            <Link to={`/add-transaction/${accountID}`} className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800">
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              <span>New Transaction</span>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="bg-gray-50 pt-12 sm:pt-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {account?.data?.name}
                </h2>
                <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Repellendus repellat laudantium.
                </p>
              </div>
            </div>
            <div className="mt-10 bg-white pb-12 sm:pb-16">
              <div className="relative">
                <div className="absolute inset-0 h-1/2 bg-gray-50" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="mx-auto max-w-4xl">
                    <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                      <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                        <dt className=" mt-2 text-lg font-medium leading-6 text-gray-500">
                          Total Balance
                        </dt>
                        <dd className=" text-5xl font-bold tracking-tight text-indigo-600">
                          ${" "}
                          {totalIncome +
                            account?.data?.initialBalance -
                            totalExpenses}
                        </dd>
                      </div>
                      <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                        <dt className=" mt-2 text-lg font-medium leading-6 text-gray-500">
                          Total Expenses
                        </dt>
                        <dd className=" text-5xl font-bold tracking-tight text-red-600">
                          $ {totalExpenses}
                        </dd>
                        <Link
                          // to={`/expenses-list/${accountID}`}
                          className="  font-bold tracking-tight text-green-600"
                        >
                          View History
                        </Link>
                      </div>
                      <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                        <dt className=" mt-2 text-lg font-medium leading-6 text-gray-500">
                          Total Income
                        </dt>
                        <dd className=" text-5xl font-bold tracking-tight text-green-600">
                          $ {totalIncome + account?.data?.initialBalance}
                        </dd>
                        <Link
                          // to={`/income-list/${accountID}`}
                          className="  font-bold tracking-tight text-green-600"
                        >
                          View History
                        </Link>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AllTransactions transactions={account?.data?.transactions} />
        </>
      )}
    </>
  );
}
