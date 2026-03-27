import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../../constants/Routes";
import AuthMain from "../../components/auth/AuthMain";
import AuthRegisterForm from "../../components/auth/AuthRegisterForm";
import AuthLoginForm from "../../components/auth/AuthLoginForm";
import UserMain from "../website/UserMain";
import AuthAdminLoginForm from "../../components/auth/AuthAdminLoginForm";
import Maintenance from "../../components/Maintenance";
import ForgotPassword from "../../components/auth/ForgotPassword";

const Auth = () => {
  return (
    <>
      <Routes>
        <Route
          path={AuthRoutes.LOGIN}
          element={<AuthMain inner={<AuthLoginForm />} />}
        />
        <Route
          path={AuthRoutes.ADMIN_LOGIN}
          element={<AuthMain inner={<AuthAdminLoginForm />} />}
        />
        <Route
          path={AuthRoutes.REGISTER}
          element={<AuthMain inner={<AuthRegisterForm />} />}
        />
        <Route
          path={AuthRoutes.CHANGE_PASSSORD}
          element={<AuthMain inner={<ForgotPassword />} />}
        />
        <Route
          path={AuthRoutes.MAINTENANCE}
          element={<Maintenance />}
        />

        <Route path="*" element={<UserMain />} />
      </Routes>
    </>
  );
};

export default Auth;
