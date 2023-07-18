import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Forms/Login';
import HomePage from './components/HomePage/HomePage';
import Register from './components/Forms/Register';
import Navbar from './components/Navbar/Navbar';
import AddTransaction from './components/Forms/AddTransaction';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/add-transaction' element={<AddTransaction/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
