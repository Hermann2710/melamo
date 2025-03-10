import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useEffect } from "react";
import { fetchPosts } from "./store/posts";
import { checkAuth } from "./store/auth";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/dashboard/layout";
import Dashboard from "./screens/dashboard";
import Notfound from "./screens/notfound";
import Loader from "./components/common/loader";
import Login from "./screens/auth/login";
import AuthLayout from "./components/auth/layout";
import Register from "./screens/auth/register";
import ForgotPassword from "./screens/auth/forgot-password";
import DashboardPosts from "./screens/dashboard/posts";
import DashboardUsers from "./screens/dashboard/users";
import { fetchUsers } from "./store/users";
import DashboardSettings from "./screens/dashboard/settings";
import DashboardProfile from "./screens/dashboard/settings/profile";
import DashboardUsersDetails from "./screens/dashboard/users/details";
import HomeLayout from "./components/home/layout";
import HomePage from "./screens/home";
import Posts from "./screens/home/posts";
import DetailsPost from "./screens/home/posts/details";
import HomeUsers from "./screens/home/users";
import HomeMessages from "./screens/home/messages";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchUsers());
    dispatch(fetchPosts({}));
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      {/* Home Routes */}
      <Route path="/" Component={HomeLayout}>
        <Route path="" Component={HomePage} />
        <Route path="posts" Component={Posts} />
        <Route path="posts/:post_id" Component={DetailsPost} />
        <Route path="users" Component={HomeUsers} />
        <Route path="users/:username" Component={HomeUsers} />
        <Route path="messages" Component={HomeMessages} />
        <Route path="messages/:username" Component={HomeMessages} />
      </Route>
      {/* Auth routes */}
      <Route path="/auth" Component={AuthLayout}>
        <Route path="register" Component={Register} />
        <Route path="login" Component={Login} />
        <Route path="forgot-password" Component={ForgotPassword} />
      </Route>
      {/* Dashboard routes */}
      <Route path="/dashboard" Component={DashboardLayout}>
        {/* Dashboard General */}
        <Route path="" Component={Dashboard} />
        <Route path="posts" Component={DashboardPosts} />
        <Route path="users" Component={DashboardUsers} />
        <Route path="users/:username" Component={DashboardUsersDetails} />
        {/* Dashboard Settings */}
        <Route path="settings" Component={DashboardSettings} />
        <Route path="profile" Component={DashboardProfile} />
      </Route>

      {/* Not found page */}
      <Route path="*" Component={Notfound} />
    </Routes>
  );
}

export default App;
