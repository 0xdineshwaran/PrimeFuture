/**
 * Contact.jsx
 * Contact page with form, contact information and social links
 * Key features: validated contact form, contact details, social media links
 * Used on: /contact
 */

import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiInstagram,
  FiFacebook,
  FiClock,
} from "react-icons/fi";
import { useReveal } from "../hooks/useReveal";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

/**
 * Contact
 * Displays contact form and office information
 */
const Contact = () => {
  // Form state object containing user inputs
  const [form, setForm] = useState(initialForm);
  // Field-level validation errors
  const [errors, setErrors] = useState({});
  // Loading indicator for form submission
  const [loading, setLoading] = useState(false);
  // Success flag displayed after submission
  const [success, setSuccess] = useState(false);

  // Section reveal refs
  const [heroRef, heroControls] = useReveal();
  const [formRef, formControls] = useReveal();
  const [socialRef, socialControls] = useReveal();

  // Validate form fields and return errors object
  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email))
      nextErrors.email = "Enter a valid email.";
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!form.message.trim()) nextErrors.message = "Message is required.";
    return nextErrors;
  };

  // Update form state when inputs change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // When user submits the contact form, validate and simulate an async submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    setLoading(true);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbwl1u0PqRtjfO_UsT9cyv1YjxVe_WsVJBF-RX3J_A88FS9BOnaEJxPNdEuZTus5VoFRfg/exec", {
        method: "POST",
        body: JSON.stringify(form),
      });

      setSuccess(true);
      setForm(initialForm);
    } catch (error) {
      console.log("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white text-primary">
      <Helmet>
        <title>Contact PrimeFuture Education</title>
        <meta
          name="description"
          content="Contact PrimeFuture Education for premium study abroad guidance. Call, email, or visit us today."
        />
      </Helmet>

      <Motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 50 }}
        animate={heroControls}
        className="px-6 pb-16 pt-32 text-center"
      >
        <p className="text-sm uppercase tracking-[0.4em] text-primary/70">
          Home &gt; Contact
        </p>
        <h1 className="mt-6 text-4xl font-semibold">Get In Touch</h1>
        <p className="mt-4 text-primary/80">
          Let&apos;s Start Your Journey Together
        </p>
      </Motion.section>

      {/* ===== SECTION: Contact Form ===== */}
      <Motion.section
        ref={formRef}
        initial={{ opacity: 0, y: 50 }}
        animate={formControls}
        className="px-6 pb-16"
      >
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[3fr_2fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-primary/10 p-10 shadow-elevation"
          >
            <h2 className="text-2xl font-semibold">Send us a message</h2>
            <p className="mt-2 text-primary/80">
              We&apos;ll respond within one business day.
            </p>
            <div className="mt-8 space-y-6">
              {["name", "email", "phone"].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70"
                  >
                    {field === "name"
                      ? "Name"
                      : field === "email"
                        ? "Email"
                        : "Phone Number"}
                  </label>
                  <input
                    id={field}
                    name={field}
                    type={
                      field === "email"
                        ? "email"
                        : field === "phone"
                          ? "tel"
                          : "text"
                    }
                    value={form[field]}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-2xl border border-primary/30 bg-white px-4 py-3 text-primary shadow-inner focus:border-primary focus:outline-none"
                  />
                  {errors[field] && (
                    <p className="mt-2 text-sm text-primary">{errors[field]}</p>
                  )}
                </div>
              ))}
              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-primary/30 bg-white px-4 py-3 text-primary shadow-inner focus:border-primary focus:outline-none"
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-primary">{errors.message}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:scale-[1.01] disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
            {success && (
              <p className="mt-4 text-center text-primary">
                Thank you! We&apos;ll contact you soon.
              </p>
            )}
          </form>

          <div className="space-y-8">
            <div className="rounded-3xl bg-primary/5 p-8">
              <h3 className="text-xl font-semibold">Contact Information</h3>
              <ul className="mt-6 space-y-4 text-primary/80">
                <li className="flex gap-4">
                  <FiMail className="mt-1 h-5 w-5" aria-hidden="true" />
                  <a href="mailto:primefutureeducation@gmail.com">
                    primefutureeducation@gmail.com
                  </a>
                </li>
                <li className="flex gap-4">
                  <FiPhone className="mt-1 h-5 w-5" aria-hidden="true" />
                  <div className="space-y-2">
                    {[
                      "+91 90258 92194",
                      "+91 86677 02580",
                      "+91 93604 07866",
                    ].map((number) => (
                      <a
                        key={number}
                        href={`tel:${number.replace(/\s+/g, "")}`}
                        className="block"
                      >
                        {number}
                      </a>
                    ))}
                  </div>
                </li>
                <li className="flex gap-4">
                  <FiMapPin className="mt-1 h-5 w-5" aria-hidden="true" />
                  <span>
                    1st Floor, Prime Plaza, 30/13, K.R, College Rd, E Layout,
                    Tirupur, Tamil Nadu 641602
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-primary/10 p-8 text-center">
              {/* Embedded Google Map - quick iframe method (no API key required) */}
              <iframe
                title="PrimeFuture Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.075599339864!2d77.32175321009761!3d11.107743589016238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba90710483874e1%3A0xba8a7864aa8afa5e!2sPrimeFuture%20Education!5e0!3m2!1sen!2sin!4v1763637613692!5m2!1sen!2sin"
                className="w-full h-64 rounded-2xl border-4 border-primary/20"
                loading="lazy"
                style={{ border: 0 }}
              />
            </div>
            <div className="rounded-3xl bg-primary/5 p-8">
              <h3 className="text-xl font-semibold">Office Hours</h3>
              <div className="mt-4 flex items-center gap-3 text-primary/80">
                <FiClock />
                <div>
                  <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Motion.section>

      {/* ===== SECTION: Social Media ===== */}
      <Motion.section
        ref={socialRef}
        initial={{ opacity: 0, y: 50 }}
        animate={socialControls}
        className="px-6 pb-20 text-center"
      >
        <h2 className="text-3xl font-semibold">Connect With Us</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-4xl">
          {[
            {
              icon: <FiLinkedin />,
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/primefuture-education",
            },
            {
              icon: <FiInstagram />,
              label: "Instagram",
              href: "https://www.instagram.com/primefuture.education?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
            },
            {
              icon: <FiFacebook />,
              label: "Facebook",
              href: "https://www.facebook.com/",
            },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="flex h-20 w-20 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary hover:text-white"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </Motion.section>
    </div>
  );
};

export default Contact;
