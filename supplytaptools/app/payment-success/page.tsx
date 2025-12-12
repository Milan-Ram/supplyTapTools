export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 className="text-3xl font-bold text-green-700">
        Payment Successful 🎉
      </h1>
      <p className="mt-3 text-gray-700">
        Thank you for your purchase. Your payment has been completed!
      </p>

      <a
        href="/"
        className="mt-6 bg-yellow-400 px-6 py-3 rounded-lg font-semibold"
      >
        Go Back Home
      </a>
    </div>
  );
}
