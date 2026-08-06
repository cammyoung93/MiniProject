import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MapScreen from "./screens/MapScreen";
import ScanScreen from "./screens/ScanScreen";
import MenuScreen from "./screens/MenuScreen";
import WalletScreen from "./screens/WalletScreen";
import PastRentalsScreen from "./screens/PastRentalsScreen";
import CouponsScreen from "./screens/CouponsScreen";
import HelpScreen from "./screens/HelpScreen";
import SettingsScreen from "./screens/SettingsScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import LiveChatScreen from "./screens/LiveChatScreen";
import "./screens/screens.css";

/** Phone-width canvas that every screen renders inside. */
function Canvas() {
  return (
    <div className="cc-canvas">
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Canvas />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/map" element={<MapScreen />} />
        <Route path="/scan" element={<ScanScreen />} />
        <Route path="/menu" element={<MenuScreen />} />
        <Route path="/wallet" element={<WalletScreen />} />
        <Route path="/rentals" element={<PastRentalsScreen />} />
        <Route path="/coupons" element={<CouponsScreen />} />
        <Route path="/help" element={<HelpScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/profile" element={<EditProfileScreen />} />
        <Route path="/chat" element={<LiveChatScreen />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
}
