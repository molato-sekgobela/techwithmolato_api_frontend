import { BrowserRouter, Routes, Route } from 'react-router-dom'

// * IMPORT COMPONENTS
import Login from './components/auth/login'
import Register from './components/auth/register'
import Dashboard from './components/auth/dashboard'
import HealthStatus from './components/core/healthstatus'
import AdminDashboard from './components/auth/admindashboard'
import UpdateUser from './components/auth/updateuser'


function App() {
  return (
    <main className='main-container w-100'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/health-check' element={<HealthStatus />} />
          <Route path='/admindashboard' element={<AdminDashboard />} />
          <Route path='/update-user' element={<UpdateUser />} />
          
        </Routes>

      </BrowserRouter>
    </main>
  );
}

export default App;
