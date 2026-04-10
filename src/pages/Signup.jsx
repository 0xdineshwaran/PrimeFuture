import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  signupUser,
  getGoogleUserEmail,
  getGoogleUserName,
} from "../lib/firebaseAuth";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiChrome,
} from "react-icons/fi";
import { signInWithGoogle } from "../lib/firebaseAuth";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (form.email && !emailRegex.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!form.password.trim()) nextErrors.password = "Password is required.";
    if (form.password && form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }
    if (!form.confirmPassword.trim()) {
      nextErrors.confirmPassword = "Please confirm your password.";
    }
    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
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
      const user = await signupUser(form);
      console.log("Signup success:", user);

      alert("Account created successfully"); // ✅ ADD HERE
    } catch (error) {
      alert(error.message); // ✅ ALSO CHANGE
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleError("");
    setGoogleLoading(true);

    try {
      const user = await signInWithGoogle();
      const email = getGoogleUserEmail(user);
      const fullName = getGoogleUserName(user);
      setForm((prev) => ({
        ...prev,
        email: email || prev.email,
        fullName: fullName || prev.fullName,
      }));
      console.log("Google signup success", {
        uid: user.uid,
        email,
        fullName,
      });
    } catch (error) {
      setGoogleError(
        error.message || "Google sign up failed. Please try again.",
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const inputIconClass = "h-5 w-5 text-primary/70";
  const inputWrapClass =
    "mt-2 flex items-center rounded-2xl border border-primary/25 px-4";
  const inputClass =
    "w-full bg-transparent px-3 py-3 text-primary placeholder:text-primary/50 focus:outline-none";

  const strengthLabel = useMemo(() => {
    if (!form.password) return "Add at least 6 characters";
    if (form.password.length < 6) return "Weak";
    if (form.password.length < 10) return "Good";
    return "Strong";
  }, [form.password]);

  const strengthWidth = useMemo(() => {
    if (!form.password) return "w-1/4";
    if (form.password.length < 6) return "w-1/4";
    if (form.password.length < 10) return "w-2/4";
    return "w-full";
  }, [form.password]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-primary">
      <Helmet>
        <title>Sign Up | PrimeFuture Education</title>
        <meta
          name="description"
          content="Create your PrimeFuture Education account to start your personalized study abroad journey."
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
                Join PrimeFuture
              </p>
              <h1 className="relative mt-3 text-2xl font-semibold leading-tight sm:mt-4 sm:text-3xl md:text-4xl">
                Create Your Student Account
              </h1>
              <p className="relative mt-3 max-w-lg text-sm text-white/85 sm:mt-4 sm:text-base">
                Build your profile and get personalized counseling support for
                admissions, scholarships, and visa assistance.
              </p>

              <div className="relative mt-6 space-y-2.5 sm:mt-8 sm:space-y-3">
                {[
                  "1-on-1 counselor guidance",
                  "University and scholarship shortlisting",
                  "Application and visa support from start to finish",
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
                  { value: "3000+", label: "Students" },
                  { value: "10+", label: "Countries" },
                  { value: "98%", label: "Visa Success" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/15 bg-white/10 px-1.5 py-2.5 backdrop-blur-sm sm:rounded-2xl sm:px-2 sm:py-3"
                  >
                    <p className="text-base font-semibold sm:text-lg">
                      {stat.value}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/75 sm:text-xs sm:tracking-[0.25em]">
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
                Step 1 of 1
              </p>
              <h2 className="mt-2.5 text-2xl font-semibold sm:mt-3 sm:text-3xl">
                Create Account
              </h2>
              <p className="mt-2 text-sm text-primary/80 sm:text-base">
                Let&apos;s set up your profile in less than a minute.
              </p>

              <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="text-sm font-semibold uppercase tracking-[0.25em] text-primary/70"
                  >
                    Full Name
                  </label>
                  <div className={inputWrapClass}>
                    <FiUser className={inputIconClass} aria-hidden="true" />
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={inputClass}
                      autoComplete="name"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-primary">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold uppercase tracking-[0.25em] text-primary/70"
                  >
                    Email
                  </label>
                  <div className={inputWrapClass}>
                    <FiMail className={inputIconClass} aria-hidden="true" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass}
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-primary">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold uppercase tracking-[0.25em] text-primary/70"
                  >
                    Phone Number
                  </label>
                  <div className={inputWrapClass}>
                    <FiPhone className={inputIconClass} aria-hidden="true" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className={inputClass}
                      autoComplete="tel"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-sm text-primary">{errors.phone}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold uppercase tracking-[0.25em] text-primary/70"
                  >
                    Password
                  </label>
                  <div className={inputWrapClass}>
                    <FiLock className={inputIconClass} aria-hidden="true" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Create password"
                      className={inputClass}
                      autoComplete="new-password"
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
                  <div className="mt-3 h-1.5 rounded-full bg-primary/10">
                    <div
                      className={`h-1.5 rounded-full bg-primary transition-all duration-300 ${strengthWidth}`}
                    />
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-primary/65">
                    Password strength: {strengthLabel}
                  </p>
                  {errors.password && (
                    <p className="mt-2 text-sm text-primary">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-semibold uppercase tracking-[0.25em] text-primary/70"
                  >
                    Confirm Password
                  </label>
                  <div className={inputWrapClass}>
                    <FiLock className={inputIconClass} aria-hidden="true" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                      className={inputClass}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="text-primary/70 transition hover:text-primary"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff className="h-5 w-5" />
                      ) : (
                        <FiEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-primary">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:scale-[1.01]"
              >
                Create Account
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
                onClick={handleGoogleSignup}
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

              <p className="mt-4 text-center text-xs text-primary/70">
                By creating an account, you agree to our guidance process and
                communication updates.
              </p>

              <p className="mt-6 text-center text-sm text-primary/80">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-primary underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </Motion.div>
      </section>
    </div>
  );
};

export default Signup;
