// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ConsentForm from './ConsentForm.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConsentForm />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} /> 
    </>
  );
}

export default App;