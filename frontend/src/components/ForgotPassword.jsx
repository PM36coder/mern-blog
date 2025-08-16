import { useState } from "react";
import { API } from "../utils/Axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    try {
      setLoading(true);
      const res = await API.post("/user/forgot-password", { email }, { withCredentials: true });
      toast.success(res.data.message || "Email sent!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-2">Forgot Password</h1>
        <p className="text-gray-600 mb-6">
          Enter your account email. We’ll send you a password reset link.
        </p>

        <form onSubmit={handleSend} className="space-y-4">
          <input
            className="w-full border rounded-xl p-3"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-xl py-3 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
