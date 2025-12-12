"use client";
import React, { useState } from "react";
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  X,
  Moon,
  Sun,
  ShoppingBag,
  Package,
  CreditCard,
  ArrowRight,
  Home,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import { colors } from "@/styles/colors";

interface Address {
  id: number;
  type: "home" | "work";
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const orderItems = [
  {
    id: 1,
    name: "Professional Cordless Drill Set",
    price: 8999,
    quantity: 1,
    image: "/products/product1.jpg",
  },
  {
    id: 2,
    name: "Impact Driver Set",
    price: 7499,
    quantity: 1,
    image: "/products/product2.jpg",
  },
];
// Load Razorpay script
const loadRazorpay = () => {
  console.log("loading razorpay");
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const [isDark, setIsDark] = useState(true);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: "home",
      name: "John Doe",
      phone: "+91 98765 43210",
      address: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      isDefault: true,
    },
    {
      id: 2,
      type: "work",
      name: "John Doe",
      phone: "+91 98765 43210",
      address: "456 Business Park, Tower A, Floor 5",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400051",
      isDefault: false,
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Omit<Address, "id">>({
    type: "home",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  const theme = {
    bg: isDark ? colors.black : colors.white,
    cardBg: isDark ? colors.slate : "#f9f9f9",
    border: isDark ? colors.gray : "#e0e0e0",
    text: isDark ? colors.white : colors.black,
    textSecondary: isDark ? colors.lightGray : "#666",
    hover: isDark ? colors.dark : "#f0f0f0",
  };

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitAddress = () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (editingAddress) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress.id ? { ...formData, id: addr.id } : addr
        )
      );
    } else {
      setAddresses([...addresses, { ...formData, id: Date.now() }]);
    }

    resetForm();
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    const { id, ...rest } = address;
    setFormData(rest);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (id: number) => {
    const updated = addresses.filter((addr) => addr.id !== id);
    setAddresses(updated);

    if (selectedAddress === id) {
      setSelectedAddress(updated.length ? updated[0].id : null);
    }
  };

  const resetForm = () => {
    setFormData({
      type: "home",
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
    });
    setEditingAddress(null);
    setShowAddressForm(false);
  };
  // Trigger Razorpay Payment
  const handlePayment = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }

    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Check your internet.");
      return;
    }

    // ⚠️ Demo order — ideally this should come from your backend
    const orderData = {
      amount: total * 1000, // Razorpay uses paise
      currency: "INR",
    };

    const options = {
      key: "rzp_test_Rqj3YxzkR2AkYC",
      amount: orderData.amount,
      currency: "INR",
      name: "SupplyTap Tools",
      description: "Order Payment",
      image: "/logo.png",
      handler: function (response: any) {
        console.log("Payment success", response);

        alert("Payment Successful!");
        // TODO: save order in Firebase or redirect to success page
      },
      prefill: {
        name: addresses.find((a) => a.id === selectedAddress)?.name,
        email: "user@example.com", // Replace with Firebase logged-in user email
        contact: addresses.find((a) => a.id === selectedAddress)?.phone,
      },
      notes: {
        address: "SupplyTap Tools Checkout",
      },
      theme: {
        color: "#ffcc00",
      },
    };

    // @ts-ignore
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Header */}
      <div
        className="border-b sticky top-0 z-50 backdrop-blur-sm"
        style={{
          borderColor: theme.border,
          backgroundColor: isDark ? `${colors.black}dd` : `${colors.white}dd`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShoppingBag size={24} style={{ color: colors.primary }} />
            <h1
              className="text-xl sm:text-2xl font-bold"
              style={{ color: theme.text }}
            >
              Checkout
            </h1>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-3 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: theme.cardBg,
              color: theme.text,
            }}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Addresses and Order Items */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Address Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-1 h-6"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <h2
                    className="text-xl sm:text-2xl font-bold"
                    style={{ color: theme.text }}
                  >
                    Delivery Address
                  </h2>
                </div>
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="flex items-center gap-2 px-4 py-2 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.black,
                  }}
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline">Add New</span>
                </button>
              </div>

              {/* Address Form */}
              {showAddressForm && (
                <div
                  className="mb-6 border p-6 rounded-lg"
                  style={{
                    borderColor: theme.border,
                    backgroundColor: theme.cardBg,
                  }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3
                      className="text-lg font-bold"
                      style={{ color: theme.text }}
                    >
                      {editingAddress ? "Edit Address" : "Add New Address"}
                    </h3>
                    <button
                      onClick={resetForm}
                      style={{ color: theme.textSecondary }}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="home"
                          checked={formData.type === "home"}
                          onChange={handleInputChange}
                          className="w-4 h-4"
                          style={{ accentColor: colors.primary }}
                        />
                        <Home
                          size={18}
                          style={{ color: theme.textSecondary }}
                        />
                        <span style={{ color: theme.text }}>Home</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="work"
                          checked={formData.type === "work"}
                          onChange={handleInputChange}
                          className="w-4 h-4"
                          style={{ accentColor: colors.primary }}
                        />
                        <Briefcase
                          size={18}
                          style={{ color: theme.textSecondary }}
                        />
                        <span style={{ color: theme.text }}>Work</span>
                      </label>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border rounded-lg outline-none focus:border-primary transition-colors"
                        style={{
                          borderColor: theme.border,
                          backgroundColor: theme.bg,
                          color: theme.text,
                        }}
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border rounded-lg outline-none focus:border-primary transition-colors"
                        style={{
                          borderColor: theme.border,
                          backgroundColor: theme.bg,
                          color: theme.text,
                        }}
                      />
                    </div>
                    <textarea
                      name="address"
                      placeholder="Address (House No, Building, Street) *"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border rounded-lg outline-none focus:border-primary transition-colors resize-none"
                      style={{
                        borderColor: theme.border,
                        backgroundColor: theme.bg,
                        color: theme.text,
                      }}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City *"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border rounded-lg outline-none focus:border-primary transition-colors"
                        style={{
                          borderColor: theme.border,
                          backgroundColor: theme.bg,
                          color: theme.text,
                        }}
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State *"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border rounded-lg outline-none focus:border-primary transition-colors"
                        style={{
                          borderColor: theme.border,
                          backgroundColor: theme.bg,
                          color: theme.text,
                        }}
                      />
                      <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode *"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border rounded-lg outline-none focus:border-primary transition-colors"
                        style={{
                          borderColor: theme.border,
                          backgroundColor: theme.bg,
                          color: theme.text,
                        }}
                      />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isDefault"
                        checked={formData.isDefault}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                        style={{ accentColor: colors.primary }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: theme.textSecondary }}
                      >
                        Set as default address
                      </span>
                    </label>
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleSubmitAddress}
                        className="flex-1 py-3 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:opacity-90 rounded-lg"
                        style={{
                          backgroundColor: colors.primary,
                          color: colors.black,
                        }}
                      >
                        {editingAddress ? "Update Address" : "Save Address"}
                      </button>
                      <button
                        onClick={resetForm}
                        className="px-6 py-3 border font-bold text-sm tracking-wider uppercase transition-all duration-300 rounded-lg"
                        style={{
                          borderColor: theme.border,
                          color: theme.text,
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Address List */}
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="border rounded-lg p-5 cursor-pointer transition-all duration-300"
                    style={{
                      borderColor:
                        selectedAddress === address.id
                          ? colors.primary
                          : theme.border,
                      backgroundColor:
                        selectedAddress === address.id
                          ? isDark
                            ? `${colors.primary}11`
                            : `${colors.primary}22`
                          : theme.cardBg,
                      borderWidth:
                        selectedAddress === address.id ? "2px" : "1px",
                    }}
                    onClick={() => setSelectedAddress(address.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: isDark ? colors.slate : "#e0e0e0",
                            color: theme.text,
                          }}
                        >
                          {address.type === "home" ? (
                            <Home size={14} />
                          ) : (
                            <Briefcase size={14} />
                          )}
                          {address.type}
                        </div>
                        {address.isDefault && (
                          <span
                            className="px-2 py-1 rounded-full text-xs font-bold"
                            style={{
                              backgroundColor: colors.success,
                              color: colors.white,
                            }}
                          >
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditAddress(address);
                          }}
                          className="p-2 hover:bg-opacity-80 transition-colors rounded-lg"
                          style={{ color: colors.accent }}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAddress(address.id);
                          }}
                          className="p-2 hover:bg-opacity-80 transition-colors rounded-lg"
                          style={{ color: colors.danger }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold" style={{ color: theme.text }}>
                        {address.name}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: theme.textSecondary }}
                      >
                        {address.phone}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: theme.textSecondary }}
                      >
                        {address.address}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: theme.textSecondary }}
                      >
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                    </div>
                    {selectedAddress === address.id && (
                      <div
                        className="flex items-center gap-2 mt-3 pt-3 border-t"
                        style={{ borderColor: theme.border }}
                      >
                        <CheckCircle
                          size={18}
                          style={{ color: colors.success }}
                        />
                        <span
                          className="text-sm font-medium"
                          style={{ color: colors.success }}
                        >
                          Delivering to this address
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-1 h-6"
                  style={{ backgroundColor: colors.primary }}
                />
                <h2
                  className="text-xl sm:text-2xl font-bold"
                  style={{ color: theme.text }}
                >
                  Order Items
                </h2>
              </div>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border rounded-lg p-4"
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.cardBg,
                    }}
                  >
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 border rounded-lg flex items-center justify-center"
                      style={{
                        borderColor: theme.border,
                        backgroundColor: theme.hover,
                      }}
                    >
                      <Package
                        size={32}
                        style={{ color: theme.border, opacity: 0.5 }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-bold mb-1 text-sm sm:text-base truncate"
                        style={{ color: theme.text }}
                      >
                        {item.name}
                      </h3>
                      <p
                        className="text-sm mb-2"
                        style={{ color: theme.textSecondary }}
                      >
                        Quantity: {item.quantity}
                      </p>
                      <p
                        className="font-bold text-lg"
                        style={{ color: theme.text }}
                      >
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div
                className="border rounded-lg p-6"
                style={{
                  borderColor: theme.border,
                  backgroundColor: theme.cardBg,
                }}
              >
                <h2
                  className="text-xl font-bold mb-6"
                  style={{ color: theme.text }}
                >
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span style={{ color: theme.textSecondary }}>Subtotal</span>
                    <span className="font-medium" style={{ color: theme.text }}>
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: theme.textSecondary }}>Shipping</span>
                    <span
                      className="font-medium"
                      style={{ color: colors.success }}
                    >
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: theme.textSecondary }}>
                      Tax (18%)
                    </span>
                    <span className="font-medium" style={{ color: theme.text }}>
                      ₹{tax.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div
                    className="border-t pt-4"
                    style={{ borderColor: theme.border }}
                  >
                    <div className="flex justify-between">
                      <span
                        className="text-lg font-bold"
                        style={{ color: theme.text }}
                      >
                        Total
                      </span>
                      <span
                        className="text-2xl font-bold"
                        style={{ color: theme.text }}
                      >
                        ₹{total.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  disabled={!selectedAddress}
                  onClick={handlePayment}
                  className="w-full py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.black,
                  }}
                >
                  <CreditCard size={18} />
                  Proceed to Payment
                  <ArrowRight size={18} />
                </button>

                <p
                  className="text-xs text-center mt-4"
                  style={{ color: theme.textSecondary }}
                >
                  By proceeding, you agree to our Terms & Conditions
                </p>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div
                  className="text-center p-4 border rounded-lg"
                  style={{
                    borderColor: theme.border,
                    backgroundColor: theme.cardBg,
                  }}
                >
                  <CheckCircle
                    size={24}
                    className="mx-auto mb-2"
                    style={{ color: colors.success }}
                  />
                  <p
                    className="text-xs font-medium"
                    style={{ color: theme.textSecondary }}
                  >
                    Secure Payment
                  </p>
                </div>
                <div
                  className="text-center p-4 border rounded-lg"
                  style={{
                    borderColor: theme.border,
                    backgroundColor: theme.cardBg,
                  }}
                >
                  <Package
                    size={24}
                    className="mx-auto mb-2"
                    style={{ color: colors.primary }}
                  />
                  <p
                    className="text-xs font-medium"
                    style={{ color: theme.textSecondary }}
                  >
                    Easy Returns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
