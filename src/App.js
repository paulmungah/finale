import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Signin from './components/Signin'; 
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Loader from './components/Loader';
import Makepayment from './components/Makepayment';


function App() {
  return (
    <Router>
       <div className="App">
      <header className="App-header">
        Welcome to Music base
      </header>
      <Routes>
        <Route path='/signup'element={<Signup/>}/>
        <Route path ='/signin'element={< Signin/>}/>
        <Route path='/addproducts'element={<Addproducts/>}/>
        <Route path='/getproducts'element={<Getproducts/>}/>
        <Route path= '/loader'element={<Loader/>}/>
        <Route path='/makepayment'element={<Makepayment/>}/>

        
      </Routes>
    </div>
    </Router>
   
  );
}

export default App;
