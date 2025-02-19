import ProtectedRoute from "../common/ProtectedRoute";

function BlogLayout() {
  return (
    <ProtectedRoute>
      <h1>BlogLayout</h1>
    </ProtectedRoute>
  );
}

export default BlogLayout;
