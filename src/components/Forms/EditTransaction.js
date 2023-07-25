import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext/TransactionsContext";
import { useParams } from "react-router-dom";

export default function EditTransaction() {
  const { transactionID } = useParams();
  const { getTransactionDetails, transaction, loading, updateTransactionDetails } = useContext(TransactionContext);

  const [formData, setFormData] = useState({
    name: "",
    transactionType: "default",
    amount: "",
    category: "default",
    notes: "",
  });

  useEffect(() => {
    getTransactionDetails(transactionID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionID]);

  useEffect(() => {
    if (!loading && transaction?.data) {
      const { name, transactionType, amount, category, notes } = transaction?.data;
      setFormData({
        name: name || '',
        transactionType: transactionType || '',
        amount: amount || '',
        category: category || '',
        notes: notes || '',
      });
    }
  }, [transaction, loading]);

  console.log(transaction?.data);

  //handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    updateTransactionDetails(transactionID, formData);
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Update Transaction
          </h2>
        </div>

        {!loading && (
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Transaction Type
                  </label>
                  <select
                    name="transactionType"
                    value={formData.transactionType}
                    onChange={handleChange}
                    className="mt-1 block w-full border-2 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="default" disabled>
                      Select an option...
                    </option>
                    <option value="Income">Income (+)</option>
                    <option value="Expenses">Expenses (-)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount ($)
                  </label>
                  <div className="mt-1">
                    <input
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      type="number"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Transaction Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full border-2 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="default" disabled>
                      Select an option...
                    </option>
                    <option value=" Food">Food</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Healt">Health</option>
                    <option value="Travel">Travel</option>
                    <option value="Education">Education</option>
                    <option value="Personal">Personal</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Bills">Bills</option>
                    <option value="Uncategorized">Uncategorized</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Add Note
                  </label>
                  <div className="mt-1">
                    <textarea
                      rows={4}
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      className="block w-full border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add New Transaction
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
