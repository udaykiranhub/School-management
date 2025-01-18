import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { 
  GraduationCap,
  Search,
  CreditCard,
  Calendar,
  User,
  BookOpen,
  DollarSign,
  Shield,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowRight,
  Receipt,
  Clock,
  HelpCircle,
  FileText
} from "lucide-react";

function FeeSubmission() {
  const [formData, setFormData] = useState({
    class: "",
    studentName: "",
    admissionNumber: "",
    session: "2025-2026",
    feeAmount: "",
    feeType: "tuition", // New field for fee type
  });
  const [isStudentFound, setIsStudentFound] = useState(null);
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const studentExists = formData.studentName === "John Doe" || formData.admissionNumber === "12345";
      setIsStudentFound(studentExists);
      setIsPaymentVisible(studentExists);
      setLoading(false);
    }, 1000);
  };

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        const options = {
          key: "YOUR_RAZORPAY_KEY_ID",
          amount: formData.feeAmount * 100,
          currency: "INR",
          name: "Vivekananda School",
          description: `${formData.feeType} Fee Payment - ${formData.session}`,
          handler: function (response) {
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          },
          prefill: {
            name: formData.studentName,
            email: "student@example.com",
          },
          theme: {
            color: "#4F46E5",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.error("Razorpay Error:", error);
      }
    };
    document.body.appendChild(script);
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-gray-50 to-white w-full overflow-hidden mt-44">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-900 py-16 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c')] opacity-10 bg-cover bg-center"></div>
          <div className="container mx-auto px-6 text-center relative z-10" data-aos="fade-up">
            <CreditCard className="w-16 h-16 mx-auto mb-6 text-indigo-300" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Online Fee Payment</h1>
            <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
              Fast, secure, and convenient way to pay your school fees online
            </p>
          </div>
        </section>

        <div className="container mx-auto px-6 py-12">
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Secure Payments",
                content: "Bank-grade security for all transactions",
                color: "bg-blue-100 text-blue-600"
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: "Instant Receipt",
                content: "Get payment confirmation immediately",
                color: "bg-green-100 text-green-600"
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "24/7 Available",
                content: "Pay fees anytime, anywhere",
                color: "bg-purple-100 text-purple-600"
              },
              {
                icon: <Receipt className="w-6 h-6" />,
                title: "Multiple Options",
                content: "Various payment methods supported",
                color: "bg-amber-100 text-amber-600"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>

          {/* Fee Payment Form */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8" data-aos="fade-up">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-800">Fee Payment Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" style={{color:"white"}}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Academic Session
                    </span>
                  </label>
                  <select
                    name="session"
                    value={formData.session}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select Session</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2025-26">2025-26</option>
                    <option value="2026-27">2026-27</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <span className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Class
                    </span>
                  </label>
                  <select
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Fee Type
                    </span>
                  </label>
                  <select
                    name="feeType"
                    value={formData.feeType}
                    style={{backgroundColor:"black"}}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="tuition">Tuition Fee</option>
                    <option value="transport">Transport Fee</option>
                    <option value="library">Library Fee</option>
                    <option value="examination">Examination Fee</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <span className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Fee Amount (INR)
                    </span>
                  </label>
                  <input
                    type="number"
                    name="feeAmount"
                    value={formData.feeAmount}
                    onChange={handleInputChange}
                    placeholder="Enter fee amount"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Student Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    placeholder="Enter student name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="px-4 text-gray-500">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <span className="flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Admission Number
                    </span>
                  </label>
                  <input
                    type="text"
                    name="admissionNumber"
                    value={formData.admissionNumber}
                    onChange={handleInputChange}
                    placeholder="Enter admission number"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? (
                  "Searching..."
                ) : (
                  <>
                    Search Student
                    <Search className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {isStudentFound === false && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <p>No student found with the provided details. Please verify and try again.</p>
              </div>
            )}

            {isPaymentVisible && (
              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg" data-aos="fade-up">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  Student Found - Proceed to Payment
                </h3>
                <button
                  onClick={loadRazorpay}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-8 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  Pay Now
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Payment Instructions */}
          <div className="max-w-3xl mx-auto mt-12" data-aos="fade-up">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-6 h-6 text-indigo-600" />
              <h3 className="text-xl font-bold text-gray-800">Payment Instructions</h3>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  Enter correct student details and fee amount
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  Verify the information before proceeding to payment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  Keep the payment confirmation for your records
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  Contact school administration for any payment-related queries
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FeeSubmission;