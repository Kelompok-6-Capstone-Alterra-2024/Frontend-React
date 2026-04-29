import React, { useState, FormEvent } from "react";
import { Navigate, Link } from "react-router-dom";

interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { login } = await import("../../utils/auth");
      const result: LoginResponse = await login(username, password);

      if (result.success) {
        setIsLoggedIn(true);
        window.location.reload();
      } else {
        setError(result.message || "Login gagal. Silakan coba lagi.");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Login gagal. Silakan coba lagi.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Company Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-darker via-primary to-primary-lighter opacity-90" />

        <div className="relative z-10 flex flex-col items-center px-12 text-center">
          <img
            src="/Logo-img.png"
            alt="MindEase Logo"
            className="w-24 h-24 mb-8 drop-shadow-lg"
          />
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-md">
            MindEase
          </h2>
          <p className="text-lg text-white/90 max-w-md leading-relaxed">
            Dukungan Profesional untuk Kesehatan Mental Anda. Kami hadir untuk
            membantu Anda menemukan kedamaian dan keseimbangan hidup.
          </p>

          <div className="mt-12">
            <img
              src="/Login/scientist.png"
              alt="Company Illustration"
              className="max-h-72 drop-shadow-2xl"
            />
          </div>

          <div className="absolute top-12 left-8 opacity-30">
            <img src="/Login/chat2.png" alt="" className="max-h-16" />
          </div>
          <div className="absolute top-28 right-12 opacity-30">
            <img src="/Login/chat1.png" alt="" className="max-h-16" />
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12">
        <div className="max-w-md w-full">
          {/* Mobile Logo */}
          <div className="flex justify-center lg:hidden mb-8">
            <img
              src="/Logo-img.png"
              alt="MindEase Logo"
              className="w-16 h-16"
            />
          </div>

          <h1 className="text-heading1 font-semibold text-dark-1 text-center">
            Selamat Datang
          </h1>
          <p className="text-body1 text-dark-3 text-center mt-2 mb-10">
            Masuk ke akun Anda untuk melanjutkan
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-dark-1 mb-1"
              >
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-dark-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-light-3 border border-dark-4 rounded-lg text-sm text-dark-1 placeholder-dark-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="Masukkan username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-dark-1 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-dark-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-light-3 border border-dark-4 rounded-lg text-sm text-dark-1 placeholder-dark-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5 text-dark-3 hover:text-dark-1 transition-colors"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-dark-3 hover:text-dark-1 transition-colors"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-primary hover:text-primary-darker transition-colors"
              >
                Lupa password?
              </a>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-error/10 border border-error-lighter rounded-lg p-3 text-center">
                <p className="text-sm text-error-darker">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Memproses...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-8 text-center text-sm text-dark-3">
            Tidak punya akun?{" "}
            <Link
              to="/register"
              className="text-primary font-semibold hover:text-primary-darker transition-colors"
            >
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
