import { Routes } from 'react-router-dom';

import Header from './components/Header';


function App() {

    return (
        <div className="App">
            <Header />
            <div className="main-content">
                <Routes>
                </Routes>
            </div>
        </div>
    );
}

export default App;
