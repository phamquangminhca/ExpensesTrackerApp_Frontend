import { Link, useParams } from "react-router-dom";
import AllTransactions from "./AllTransactions";
import { useContext, useEffect } from "react";
import { accountContext } from "../context/AccountContext/AccountContext";

export default function AccountDetails() {
  const { accountID } = useParams();
  // const { userAuth } = useContext(authContext);
  // const author = userAuth?.userAuth?.fullname;
  const { getAccountDetails, account } = useContext(accountContext);
  useEffect(() => {
    getAccountDetails(accountID);
  }, [accountID]);
  console.log(account?.data);
  console.log(account?.data?.transactions);
  return (
    <>
      {account?.data?.transactions?.length <= 0 ? (
        <h2 className="text-center text-red-500 m-10">No transactions found</h2>
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
                          $ 4000
                        </dd>
                      </div>
                      <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                        <dt className=" mt-2 text-lg font-medium leading-6 text-gray-500">
                          Total Expenses
                        </dt>
                        <dd className=" text-5xl font-bold tracking-tight text-red-600">
                          $ 3000
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
                          $ 900
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
