import { useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { loginUser } from "../lib/firebaseAuth";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiChrome,
} from "react-icons/fi";
import { signInWithGoogle, getGoogleUserEmail } from "../lib/firebaseAuth";

const initialForm = {
  email: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState("");
  const [googleSuccess, setGoogleSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (!form.password.trim()) nextErrors.password = "Password is required.";
    if (form.password && form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    try {
      const user = await loginUser(form.email, form.password);
      console.log("Login success:", user);

      alert("Login successful"); // ✅ ADD THIS HERE
    } catch (error) {
      alert(error.message); // ✅ ALSO CHANGE THIS
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleError("");
    setGoogleSuccess("");
    setGoogleLoading(true);

    try {
      const user = await signInWithGoogle();
      const email = getGoogleUserEmail(user);
      if (email) {
        setForm((prev) => ({ ...prev, email }));
        setGoogleSuccess(`Signed in with ${email}`);
      }
      console.log("Google login success", {
        uid: user.uid,
        email,
      });
    } catch (error) {
      setGoogleError(error.message || "Google login failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-primary">
      <Helmet>
        <title>Login | PrimeFuture Education</title>
        <meta
          name="description"
          content="Login to your PrimeFuture Education account to track your study abroad journey."
        />
      </Helmet>

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <section className="relative px-4 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-28 md:pt-32 lg:pt-36">
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-elevation sm:rounded-3xl"
        >
          <div className="grid lg:grid-cols-[1.05fr_1fr]">
            <div className="relative order-2 bg-primary p-6 text-white sm:p-8 md:p-10 lg:order-1 lg:p-12">
              <div className="absolute -left-10 top-16 hidden h-40 w-40 rounded-full border border-white/15 sm:block" />
              <div className="absolute right-6 top-8 hidden h-24 w-24 rounded-full border border-white/15 sm:block" />

              <p className="relative text-[11px] uppercase tracking-[0.28em] text-white/75 sm:text-xs sm:tracking-[0.4em]">
                Welcome Back
              </p>
              <h1 className="relative mt-3 text-2xl font-semibold leading-tight sm:mt-4 sm:text-3xl md:text-4xl">
                Login to Continue Your Journey
              </h1>
              <p className="relative mt-3 max-w-lg text-sm text-white/85 sm:mt-4 sm:text-base">
                Access your dashboard, application updates, and personalized
                guidance from the PrimeFuture team.
              </p>

              <div className="relative mt-6 space-y-2.5 sm:mt-8 sm:space-y-3">
                {[
                  "Track your profile progress",
                  "Continue your saved applications",
                  "Chat with counselors faster",
                ].map((item) => (
                  <p
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-white/90 sm:gap-3"
                  >
                    <FiCheckCircle className="h-4 w-4" aria-hidden="true" />
                    <span>{item}</span>
                  </p>
                ))}
              </div>

              <div className="relative mt-6 grid grid-cols-3 gap-2 text-center sm:mt-8 sm:gap-3">
                {[
                  { value: "24h", label: "Support" },
                  { value: "10+", label: "Destinations" },
                  { value: "Trusted", label: "By Students" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/15 bg-white/10 px-1.5 py-2.5 backdrop-blur-sm sm:rounded-2xl sm:px-2 sm:py-3"
                  >
                    <p className="text-base font-semibold sm:text-lg">
                      {stat.value}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/75 sm:text-xs sm:tracking-[0.2em]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="order-1 p-6 sm:p-8 md:p-10 lg:order-2 lg:p-12"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary/65 sm:text-xs sm:tracking-[0.35em]">
                Student Portal
              </p>
              <h2 className="mt-2.5 text-2xl font-semibold sm:mt-3 sm:text-3xl">
                Login
              </h2>
              <p className="mt-2 text-sm text-primary/80 sm:text-base">
                Use your email and password.
              </p>

              <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold uppercase tracking-[0.25em] text-primary/70"
                  >
                    Email
                  </label>
                  <div className="mt-2 flex items-center rounded-2xl border border-primary/25 px-4">
                    <FiMail
                      className="h-5 w-5 text-primary/70"
                      aria-hidden="true"
                    />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full bg-transparent px-3 py-3 text-primary placeholder:text-primary/50 focus:outline-none"
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-primary">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold uppercase tracking-[0.25em] text-primary/70"
                  >
                    Password
                  </label>
                  <div className="mt-2 flex items-center rounded-2xl border border-primary/25 px-4">
                    <FiLock
                      className="h-5 w-5 text-primary/70"
                      aria-hidden="true"
                    />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      className="w-full bg-transparent px-3 py-3 text-primary placeholder:text-primary/50 focus:outline-none"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-primary/70 transition hover:text-primary"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5" />
                      ) : (
                        <FiEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-primary">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 text-right">
                <button
                  type="button"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70 transition hover:text-primary"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:scale-[1.01]"
              >
                Login
              </button>

              <div className="mt-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-primary/20" />
                <span className="text-xs uppercase tracking-[0.24em] text-primary/60">
                  or
                </span>
                <span className="h-px flex-1 bg-primary/20" />
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-primary/30 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary transition hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiChrome className="h-4 w-4" aria-hidden="true" />
                {googleLoading ? "Connecting..." : "Continue with Google"}
              </button>

              {googleError && (
                <p className="mt-3 text-center text-sm text-primary">
                  {googleError}
                </p>
              )}
              {googleSuccess && (
                <p className="mt-3 text-center text-sm text-primary">
                  {googleSuccess}
                </p>
              )}

              <p className="mt-6 text-center text-sm text-primary/80">
                New here?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-primary underline"
                >
                  Create account
                </Link>
              </p>
            </form>
          </div>
        </Motion.div>
      </section>
    </div>
  );
};

export default Login;
