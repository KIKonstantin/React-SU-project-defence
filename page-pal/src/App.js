import { Routes, Route } from 'react-router-dom';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from './components/Logout/Logout';

function App() {

    return (
        <div className="App">
            <Header />
            <div className="main-content">
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/logout' element={<Logout/>}/>
                    <Route path='/register' element={<Register/>}/>
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
