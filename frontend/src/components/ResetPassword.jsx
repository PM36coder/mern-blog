import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../utils/Axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!password || password.length < 6) return toast.error("Min 6 chars");
    if (password !== cpassword) return toast.error("Passwords do not match");

    try {
      setLoading(true);
      const res = await API.post(`/user/reset-password/${token}`, { password }, { withCredentials: true });
      toast.success(res.data.message || "Password reset done");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid/expired link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-2">Set New Password</h1>
        <p className="text-gray-600 mb-6">Create a strong password for your account.</p>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            className="w-full border rounded-xl p-3"
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="w-full border rounded-xl p-3"
            type="password"
            placeholder="Confirm new password"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-xl py-3 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
