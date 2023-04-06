import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';
import './App.css'


import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';

import Catalog from './components/Catalog/Catalog';
import BookDetails from './components/BookDetails';
import CreateBook from './components/CreateBook/CreateBook';
import Profile from './components/Profile/Profile';

function App() {

    return (
        <AuthProvider>
            <BookProvider>
        <div className="App">
            <nav>
                <Header />
            </nav>
            <div className='main-content'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />}/>
                    <Route path='/register' element={<Register />}/>
                    <Route path='/logout' element={<Logout/>}/>
                    <Route path='/users/me' element={<Profile/>}/>
                    <Route path='/catalog' element={<Catalog />} />
                    <Route path='/create-book' element={<CreateBook />} />
                    <Route path='/catalog/:bookId' element={<BookDetails />} />
                </Routes>
            </div>
        </div>
        </BookProvider>
        </AuthProvider>
    );
} 

export default App;
