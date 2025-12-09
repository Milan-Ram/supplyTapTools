"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Package,
  FileText,
  Users,
  CheckCircle,
  Upload,
  Building,
} from "lucide-react";
import { colors } from "@/styles/colors";
import { color } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  productCategory: string;
  quantity: string;
  timeline: string;
}

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  detail: string;
  subdetail: string;
}

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ContactBulkOrderPage() {
  const [activeTab, setActiveTab] = useState<"contact" | "bulk">("contact");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    productCategory: "",
    quantity: "",
    timeline: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: <Phone size={24} />,
      title: "Phone",
      detail: "+91 98765 43210",
      subdetail: "Mon-Sat, 9AM-7PM",
    },
    {
      icon: <Mail size={24} />,
      title: "Email",
      detail: "sales@hardwarestore.com",
      subdetail: "Response within 24 hours",
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      detail: "123 Industrial Area, Mumbai",
      subdetail: "Maharashtra, India 400001",
    },
    {
      icon: <Clock size={24} />,
      title: "Working Hours",
      detail: "Mon-Sat: 9:00 AM - 7:00 PM",
      subdetail: "Sunday: Closed",
    },
  ];

  const bulkBenefits: Benefit[] = [
    {
      icon: <Package size={32} />,
      title: "Volume Discounts",
      description: "Up to 30% off on bulk orders over ₹50,000",
    },
    {
      icon: <Users size={32} />,
      title: "Dedicated Support",
      description: "Personal account manager for your business needs",
    },
    {
      icon: <FileText size={32} />,
      title: "Custom Quotations",
      description: "Tailored pricing and product packages",
    },
    {
      icon: <Building size={32} />,
      title: "Trade Credit",
      description: "Net 30/60 payment terms for qualified businesses",
    },
  ];

  return (
    <>
      <section
        className="relative w-full"
        style={{ backgroundColor: colors.black, minHeight: "100vh" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-1 h-8"
                style={{ backgroundColor: colors.primary }}
              />
              <span
                className="text-sm font-bold tracking-wider uppercase"
                style={{ color: colors.primary }}
              >
                Get In Touch
              </span>
            </div>
            <h1
              className="text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
              style={{ color: colors.white }}
            >
              Contact Us
            </h1>
            <p
              className="text-lg max-w-2xl"
              style={{ color: colors.lightGray }}
            >
              Whether you need assistance with an order or want to discuss bulk
              pricing, we're here to help
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-4 mb-12">
            <button
              onClick={() => setActiveTab("contact")}
              className="px-6 py-3 border transition-all duration-300"
              style={{
                backgroundColor:
                  activeTab === "contact" ? colors.primary : "transparent",
                borderColor:
                  activeTab === "contact" ? colors.primary : colors.gray,
                color: activeTab === "contact" ? colors.black : colors.white,
              }}
            >
              <span className="text-sm font-bold tracking-wider uppercase">
                General Inquiry
              </span>
            </button>

            <button
              onClick={() => setActiveTab("bulk")}
              className="px-6 py-3 border transition-all duration-300"
              style={{
                backgroundColor:
                  activeTab === "bulk" ? colors.primary : "transparent",
                borderColor:
                  activeTab === "bulk" ? colors.primary : colors.gray,
                color: activeTab === "bulk" ? colors.black : colors.white,
              }}
            >
              <span className="text-sm font-bold tracking-wider uppercase">
                Bulk Orders
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {/* Contact / Bulk Form */}
            <div className="lg:col-span-2">
              <div
                className="p-8 border"
                style={{
                  backgroundColor: colors.slate,
                  borderColor: colors.gray,
                }}
              >
                {activeTab === "contact" ? (
                  <>
                    <h3
                      className="text-2xl font-bold mb-6"
                      style={{ color: colors.white }}
                    >
                      Send us a Message
                    </h3>

                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label
                            className="block text-sm font-bold mb-2"
                            style={{ color: colors.light }}
                          >
                            Your Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border transition-all duration-300"
                            style={{
                              backgroundColor: colors.black,
                              borderColor: colors.gray,
                              color: colors.white,
                            }}
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label
                            className="block text-sm font-bold mb-2"
                            style={{ color: colors.light }}
                          >
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border transition-all duration-300"
                            style={{
                              backgroundColor: colors.black,
                              borderColor: colors.gray,
                              color: colors.white,
                            }}
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label
                          className="block text-sm font-bold mb-2"
                          style={{ color: colors.light }}
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border transition-all duration-300"
                          style={{
                            backgroundColor: colors.black,
                            borderColor: colors.gray,
                            color: colors.white,
                          }}
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div className="mb-6">
                        <label
                          className="block text-sm font-bold mb-2"
                          style={{ color: colors.light }}
                        >
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border transition-all duration-300 resize-none"
                          style={{
                            backgroundColor: colors.black,
                            borderColor: colors.gray,
                            color: colors.white,
                          }}
                          placeholder="How can we help you?"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2"
                        style={{
                          backgroundColor: colors.primary,
                          color: colors.black,
                        }}
                      >
                        {submitted ? (
                          <>
                            <CheckCircle size={20} />
                            Message Sent!
                          </>
                        ) : (
                          <>
                            <Send size={20} />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <h3
                      className="text-2xl font-bold mb-6"
                      style={{ color: colors.white }}
                    >
                      Request Bulk Order Quote
                    </h3>

                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Name */}
                        <div>
                          <label
                            className="block text-sm font-bold mb-2"
                            style={{ color: colors.light }}
                          >
                            Your Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border transition-all duration-300"
                            style={{
                              backgroundColor: colors.black,
                              borderColor: colors.gray,
                              color: colors.white,
                            }}
                            placeholder="John Doe"
                          />
                        </div>

                        {/* Company */}
                        <div>
                          <label
                            className="block text-sm font-bold mb-2"
                            style={{ color: colors.light }}
                          >
                            Company Name *
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border transition-all duration-300"
                            style={{
                              backgroundColor: colors.black,
                              borderColor: colors.gray,
                              color: colors.white,
                            }}
                            placeholder="ABC Industries"
                          />
                        </div>
                      </div>

                      {/* Email + Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label
                            className="block text-sm font-bold mb-2"
                            style={{ color: colors.light }}
                          >
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border transition-all duration-300"
                            style={{
                              backgroundColor: colors.black,
                              borderColor: colors.gray,
                              color: colors.white,
                            }}
                            placeholder="john@company.com"
                          />
                        </div>

                        <div>
                          <label
                            className="block text-sm font-bold mb-2"
                            style={{ color: colors.light }}
                          >
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border transition-all duration-300"
                            style={{
                              backgroundColor: colors.black,
                              borderColor: colors.gray,
                              color: colors.white,
                            }}
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      {/* Category + Quantity */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label
                            className="block text-sm font-bold mb-2"
                            style={{ color: colors.light }}
                          >
                            Product Category *
                          </label>
                          <select
                            name="productCategory"
                            value={formData.productCategory}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border transition-all duration-300"
                            style={{
                              backgroundColor: colors.black,
                              borderColor: colors.gray,
                              color: colors.white,
                            }}
                          >
                            <option value="">Select Category</option>
                            <option value="power-tools">Power Tools</option>
                            <option value="hand-tools">Hand Tools</option>
                            <option value="electronics">Electronics</option>
                            <option value="safety">Safety Equipment</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label
                            className="block text-sm font-bold mb-2"
                            style={{ color: colors.light }}
                          >
                            Estimated Quantity *
                          </label>
                          <input
                            type="text"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border transition-all duration-300"
                            style={{
                              backgroundColor: colors.black,
                              borderColor: colors.gray,
                              color: colors.white,
                            }}
                            placeholder="e.g., 100 units"
                          />
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="mb-6">
                        <label
                          className="block text-sm font-bold mb-2"
                          style={{ color: colors.light }}
                        >
                          Required Timeline
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border transition-all duration-300"
                          style={{
                            backgroundColor: colors.black,
                            borderColor: colors.gray,
                            color: colors.white,
                          }}
                        >
                          <option value="">Select Timeline</option>
                          <option value="urgent">Urgent (1-2 weeks)</option>
                          <option value="normal">Normal (3-4 weeks)</option>
                          <option value="flexible">
                            Flexible (1-2 months)
                          </option>
                        </select>
                      </div>

                      {/* Additional Details */}
                      <div className="mb-6">
                        <label
                          className="block text-sm font-bold mb-2"
                          style={{ color: colors.light }}
                        >
                          Additional Details
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-4 py-3 border transition-all duration-300 resize-none"
                          style={{
                            backgroundColor: colors.black,
                            borderColor: colors.gray,
                            color: colors.white,
                          }}
                          placeholder="Please provide specific product details…"
                        />
                      </div>

                      {/* File Upload */}
                      <div
                        className="mb-6 p-4 border"
                        style={{
                          backgroundColor: colors.black,
                          borderColor: colors.gray,
                        }}
                      >
                        <label
                          className="flex items-center justify-center gap-3 cursor-pointer"
                          style={{ color: colors.lightGray }}
                        >
                          <Upload size={24} />
                          <span className="text-sm">
                            Upload Product List (Optional)
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.xlsx,.csv"
                          />
                        </label>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2"
                        style={{
                          backgroundColor: colors.primary,
                          color: colors.black,
                        }}
                      >
                        {submitted ? (
                          <>
                            <CheckCircle size={20} />
                            Quote Request Sent!
                          </>
                        ) : (
                          <>
                            <Send size={20} />
                            Request Quote
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="p-6 border transition-all duration-300"
                  style={{
                    backgroundColor:
                      hoveredCard === index ? colors.slate : "transparent",
                    borderColor:
                      hoveredCard === index ? colors.primary : colors.gray,
                  }}
                >
                  <div
                    className="mb-4 transition-all duration-300"
                    style={{
                      color:
                        hoveredCard === index
                          ? colors.primary
                          : colors.lightGray,
                    }}
                  >
                    {info.icon}
                  </div>

                  <h4
                    className="text-lg font-bold mb-2"
                    style={{ color: colors.white }}
                  >
                    {info.title}
                  </h4>
                  <p className="text-sm mb-1" style={{ color: colors.light }}>
                    {info.detail}
                  </p>
                  <p className="text-xs" style={{ color: colors.lightGray }}>
                    {info.subdetail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bulk Order Benefits */}
          <div
            className="mb-20 p-12 border"
            style={{
              backgroundColor: colors.slate,
              borderColor: colors.gray,
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-1 h-6"
                style={{ backgroundColor: colors.primary }}
              />
              <h3
                className="text-2xl font-bold tracking-tight"
                style={{ color: colors.white }}
              >
                Why Choose Us for Bulk Orders?
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bulkBenefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div
                    className="inline-flex items-center justify-center mb-4"
                    style={{ color: colors.primary }}
                  >
                    {benefit.icon}
                  </div>

                  <h4
                    className="text-lg font-bold mb-2"
                    style={{ color: colors.white }}
                  >
                    {benefit.title}
                  </h4>

                  <p className="text-sm" style={{ color: colors.lightGray }}>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Bottom CTA */}
      <div
        style={{ background: colors.white }}
        className="w-full h-fit flex items-center justify-center py-10"
      >
        <div
          className="p-12 border relative overflow-hidden"
          style={{
            borderColor: colors.gray,
            backgroundColor: colors.slate,
          }}
        >
          <div
            className="absolute top-0 right-0 w-[80vw] h-64 opacity-10"
            style={{
              background: `radial-gradient(circle, ${colors.primary}, transparent)`,
            }}
          />

          <div className="relative z-10 text-center w-[83vw] mx-auto">
            <h3
              className="text-3xl font-bold mb-4"
              style={{ color: colors.white }}
            >
              Need Immediate Assistance?
            </h3>

            <p className="text-lg mb-6" style={{ color: colors.lightGray }}>
              Our sales team is ready to help you with quotes, product
              recommendations, and custom solutions
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919876543210"
                className="px-6 py-3 font-bold text-sm tracking-wider uppercase transition-all duration-300 inline-flex items-center justify-center gap-2"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.black,
                }}
              >
                <Phone size={18} />
                Call Now
              </a>

              <a
                href="mailto:sales@hardwarestore.com"
                className="px-6 py-3 border font-bold text-sm tracking-wider uppercase transition-all duration-300 inline-flex items-center justify-center gap-2"
                style={{
                  borderColor: colors.gray,
                  color: colors.white,
                }}
              >
                <Mail size={18} />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
