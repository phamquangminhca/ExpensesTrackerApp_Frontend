import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { authContext } from "../context/AuthContext/AuthContext";
import { useContext } from "react";

export default function Navbar() {
  const { logoutUserAction, token } = useContext(authContext);
  console.log(token);
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Desktop */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  <Link
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>

                  {token && (
                    <>
                      <Link
                        to="/add-transaction"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Add Transaction
                      </Link>
                      <Link
                        to="/dashboard"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Dashboard
                      </Link>
                    </>
                  )}

                  {!token && (
                    <>
                      <Link
                        to="/login"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Register
                      </Link>
                    </>
                  )}

                  {token && (
                    <>
                      <button
                        onClick={logoutUserAction}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
              {token && (
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link
                      to="/dashboard/accounts/create"
                      className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <PlusIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      <span>Create Account</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              <Link
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>

              {token && (
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </Link>
              )}

              {!token && (
                <>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Register
                  </Link>
                </>
              )}

              {token && (
                <button
                  onClick={logoutUserAction}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
