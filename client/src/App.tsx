import { Navigate, Route, Routes as Router } from "react-router-dom";
import { lazy, Suspense } from "react";

import { Routes } from "./constants/routes-names";
import AuthLayout from "./layout/AuthLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LoadUserLayer from "./layers/load-user.layer";
import CheckUserLayer from "./layers/check-user.layer";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Router>
        <Route path={Routes.auth} element={<AuthLayout />}>
          <Route index element={<Navigate to={Routes.login} replace />} />
          <Route path={Routes.signup} element={<Signup />} />
          <Route path={Routes.login} element={<Login />} />
        </Route>
        <Route element={<LoadUserLayer />}>
          <Route element={<CheckUserLayer />}>
            <Route path={Routes.chat} element={<Chat />} />
            <Route path={Routes.profile} element={<Profile />} />
            <Route path="*" element={<Navigate to={"/"} replace />} />
          </Route>
        </Route>
      </Router>
    </>
  );
}

export default App;
