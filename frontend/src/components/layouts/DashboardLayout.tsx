import ProtectedRoute from "../common/ProtectedRoute"

function DashboardLayout() {
  return (
    <ProtectedRoute>
        <h1>DashboardLayout</h1>
    </ProtectedRoute>
  )
}

export default DashboardLayout