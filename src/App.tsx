
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginForm } from './components/LoginForm/LoginForm';
import { PrivateRoutes } from './components/route/PrivateRoure';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import FakeDashboard from './components/FakeDashboard/FakeDashboard';
import { useEffect } from 'react';
import { useLoginStore } from './store/store';

function App() {
  const token = localStorage.getItem('token');
  const {setIsToken,isToken } = useLoginStore();

  useEffect(()=>{
    if(token){
      setIsToken(true);
    }
  },[])
  return (
    <div className='pt-10'>
      <Routes>
      <Route element={<PrivateRoutes isAuthenticated={!isToken ? true : false } redirectPath={'/dashboard'}/>}>
      <Route path='/login' element={ <LoginForm/>}/>
      <Route path='/forgot-password' element={ <ForgotPassword/>}/>
      <Route path='/password-reset' element={ <ResetPassword/>}/>

      </Route>
      <Route element={<PrivateRoutes isAuthenticated={isToken ? true : false } redirectPath={'/login'}/>}>
      <Route path='/dashboard' element={ <FakeDashboard/>}/>

      </Route>
      </Routes>
     
    </div>
    
  );
}

export default App;
