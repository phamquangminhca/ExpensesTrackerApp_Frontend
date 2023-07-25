import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Forms/Login';
import HomePage from './components/HomePage/HomePage';
import Register from './components/Forms/Register';
import Navbar from './components/Navbar/Navbar';
import AddTransaction from './components/Forms/AddTransaction';
import AccountDashboard from './components/Dashboard/AccountDashboard';
import AccountDetails from './components/Dashboard/AccountDetails';
import AddAccount from './components/Forms/AddAccount';
import EditTransaction from './components/Forms/EditTransaction';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/add-transaction/:accountID' element={<AddTransaction/>}/>
        <Route path='/dashboard' element={<AccountDashboard/>}/>
        <Route path='/account-details/:accountID' element={<AccountDetails/>}/>
        <Route path='/dashboard/accounts/create' element={<AddAccount/>}/>
        <Route path='/update-transaction/:transactionID' element={<EditTransaction/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
