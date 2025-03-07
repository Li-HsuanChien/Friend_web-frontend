import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './pages/index/Main';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Add from './pages/data/Add';
import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './AppContext';
// eslint-disable-next-line node/no-unpublished-import
import {HashRouter, Routes, Route} from 'react-router-dom';
import PrivateRoutes  from './auth/privateroutes';
import VerifiedRoutes from './auth/verifiedroutes';
import DataRoutes from './auth/hasdataroutes';
import PasswordResetSetter from './pages/resetpass/passwordResetSetter';
import EmailConfirmSender from './pages/emailconfirmation/emailConfirmSender';
import EmailConfirmLanding from './pages/emailconfirmation/emailConfirmationLanding';
import PasswordResetSender from './pages/resetpass/passwordResetSender';
import InviteConfirmLanding from './pages/invite/InviteLanding';
import IntroductionPage from './pages/intro';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AppProvider>
    <HashRouter>
      <Routes>
        {/* <Route element={<PrivateRoutes/>}>
          <Route element={<VerifiedRoutes/>}>
            <Route element={<DataRoutes/>}>
              <Route path ="/" element={<Main />} />
            </Route>
            <Route path="/add" element={<Add />} />
          </Route>
          <Route path="/please-verify" element={<EmailConfirmSender/>}/>
        </Route>
        <Route path="/reset-password/:passwordResetCode" element={<PasswordResetSetter />} />
        <Route path="/verify/:verificationToken" element={<EmailConfirmLanding />} />
        <Route path="/invite/:inviteToken" element={<InviteConfirmLanding />} />
        <Route path="/forgot-password" element={<PasswordResetSender />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/" element={<IntroductionPage />} />
      </Routes>
    </HashRouter>
  </AppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
