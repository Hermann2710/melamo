import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useEffect } from "react";
import { checkAuthUser } from "./store/auth";
import { Loader } from "lucide-react";
import UserDashboard from "./pages/dashboard";
import BlogHome from "./pages/blog/home";
import BlogLayout from "./components/layouts/BlogLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminHome from "./pages/admin";
import AdminTopics from "./pages/admin/topics";
import { fetchTopics } from "./store/topics";
import AdminTopicsDetails from "./pages/admin/topics/details";
import AdminPosts from "./pages/admin/posts";
import { fetchPosts } from "./store/posts";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkAuthUser());
    dispatch(fetchTopics());
    dispatch(fetchPosts({}));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex gap-2">
          <Loader className="animate-spin" />
          Loading...
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Blog Home */}
      <Route path="/" element={<BlogLayout />}>
        <Route path="" element={<BlogHome />} />
      </Route>
      {/* Auth routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
      {/* User dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="" element={<UserDashboard />} />
      </Route>
      {/* Admin Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="" element={<AdminHome />} />
        <Route path="topics" element={<AdminTopics />} />
        <Route path="topics/:slug" element={<AdminTopicsDetails />} />
        <Route path="posts" element={<AdminPosts />} />
      </Route>
    </Routes>
  );
}

export default App;
