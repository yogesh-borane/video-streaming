import { useRoutes } from "react-router-dom";
import Login from "../authComponent/Login";
import PasswordReset from "../authComponent/PasswordReset";
import PhoneAuth from "../authComponent/PhoneAuth";
import Signup from "../authComponent/Signup";
import ProtectedRoute from "../helpers/ProtectedRoute";
import Home from "../pages/home/Home";
import NotFound from "../pages/notfound/NotFound";
import MyAccount from "../profile/MyAccount";
import MyProfile from "../profile/MyProfile";
import UpdatePassword from "../profile/UpdatePassword";
import UploadProfilePhoto from "../profile/UploadProfilePhoto";

const StreamBaseRouter = () => {
  let StreamRoutes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "password-reset",
      element: <PasswordReset />,
    },
    {
      path: "phone-reset",
      element: <PhoneAuth />,
    },
    {
      path: "myprofile",
      element: (
        <ProtectedRoute>
          <MyProfile />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "upload-photo",
          element: <UploadProfilePhoto />,
        },
        {
          path:"update-password",
          element:<UpdatePassword/>
        },
        {
          path: "my-account",
          element: <MyAccount />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return StreamRoutes;
};

export default StreamBaseRouter;
