import {useState} from 'react';
import './App.css';
import './components/account/Login'
import Login from './components/account/Login';
import DataProvider from './context/DataProvider';
import Home from './components/home/Home';
import {BrowserRouter,Routes,Route, Navigate, Outlet} from 'react-router-dom';
import Header from './components/header/Header';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';
import Update from './components/create/Update';
import About from './components/about/About';
import Contact from './components/contact/Contact';


const PrivateRoute=({isAuthenticated,...props})=>{


  return isAuthenticated?
    <>
      <Header/>
      <Outlet/>
    </>
    :
    <Navigate replace to='/login'/>
}


function App() {

  const [isAuthenticated,isUserAuthenticated]=useState(false);
  return (
    
      <DataProvider>
        <BrowserRouter>
          
          <div style={{marginTop:64}}>
            <Routes>
              <Route path="/login" element={<Login isUserAuthenticated={isUserAuthenticated}/>}></Route>

              <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                <Route path="/" element={<Home/>}></Route>
              </Route>

              <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                <Route path="/create" element={<CreatePost/>}></Route>
              </Route>

              <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                <Route path="/details/:id" element={<DetailView/>}></Route>
              </Route>

              <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                <Route path="/update/:id" element={<Update/>}></Route>
              </Route>

              <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                <Route path="/about" element={<About/>}></Route>
              </Route>

              <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                <Route path="/contact" element={<Contact/>}></Route>
              </Route>
              
            </Routes>
          </div>
        </BrowserRouter>
      </DataProvider>
      
    
  );
}

export default App;
