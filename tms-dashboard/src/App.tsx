import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AWBListPage from "./pages/AWBListPage";
import AWBDetailPage from "./pages/AWBDetailPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useNotificationPoller } from "./hooks/useNotificationPoller";

const NotFoundPage = () => <div className="flex items-center justify-center min-h-screen">404 - Page Not Found</div>;

const queryClient = new QueryClient();

// This component will handle global tasks for authenticated users
const AppServices = () => {
  useNotificationPoller();

  // TODO: Implement WebSocket connection for real-time updates.
  // This would replace or supplement the polling mechanism.
  // Example:
  // useEffect(() => {
  //   if (user) {
  //     const socket = new WebSocket('wss://your-backend-ws-url');
  //     socket.onmessage = (event) => {
  //       const data = JSON.parse(event.data);
  //       // Update query cache or trigger notifications
  //       queryClient.invalidateQueries(['awbs']);
  //     };
  //     return () => socket.close();
  //   }
  // }, [user]);

  return null; // This component does not render anything
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppServices />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/awbs" element={<AWBListPage />} />
            <Route path="/awbs/:awbId" element={<AWBDetailPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <Toaster richColors />
    </QueryClientProvider>
  );
}

export default App;
