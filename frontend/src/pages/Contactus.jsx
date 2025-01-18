import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  HelpCircle
} from "lucide-react";

const ContactUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_knmustd",
        "template_020bdnh",
        e.target,
        "MHS7WKg9GgQ8ebBX1"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully!");
          console.log(result.text);
        },
        (error) => {
          toast.error("Error sending message. Please try again.");
          console.log(error.text);
        }
      );

    e.target.reset();
  };

  return (
    <>
      <Header />
      <div className="bg-white w-full overflow-hidden mt-44">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-20 text-white">
          <div className="container mx-auto px-6 text-center" data-aos="fade-up">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              We're here to help and answer any questions you might have. We look forward to hearing from you.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-6 py-20">
          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "Visit Us",
                content: "Andhra Pradesh, Vizianagaram",
                color: "bg-purple-100 text-purple-600"
              },
              {
                icon: <Mail className="w-6 h-6" />,
                title: "Email Us",
                content: "info@vivekananda.com",
                color: "bg-indigo-100 text-indigo-600"
              },
              {
                icon: <Phone className="w-6 h-6" />,
                title: "Call Us",
                content: "+91 XXXXXXXX",
                color: "bg-blue-100 text-blue-600"
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Working Hours",
                content: "Mon - Fri: 8:00 - 17:00",
                color: "bg-emerald-100 text-emerald-600"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>

          {/* Contact Form and Map Section */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl" data-aos="fade-right">
              <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="w-8 h-8 text-purple-600" />
                <h2 className="text-3xl font-bold text-gray-800">Send Message</h2>
              </div>
              <form onSubmit={sendEmail} className="space-y-6" style={{color:"white"}}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="from_name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="from_email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all inline-flex items-center gap-2"
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="bg-white p-8 rounded-2xl shadow-xl" data-aos="fade-left">
              <div className="flex items-center gap-3 mb-8">
                <MapPin className="w-8 h-8 text-purple-600" />
                <h2 className="text-3xl font-bold text-gray-800">Find Us</h2>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5127888539487!2d-122.41941868468106!3d37.77492927975893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808f4f4c77b5%3A0x87629a57c4b3e7b4!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1603896581274!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                ></iframe>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-20">
            <div className="flex items-center justify-center gap-3 mb-12">
              <HelpCircle className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  question: "What is the school's admission process?",
                  answer: "Our admission process involves filling out an application form, attending an interview, and providing necessary documents. For more details, please visit our Admissions page."
                },
                {
                  question: "What are the school's working hours?",
                  answer: "Our school operates from 8:00 AM to 3:00 PM, Monday to Friday. For any changes or special schedules, please check our website or contact us directly."
                },
                {
                  question: "How can I reach the school administration?",
                  answer: "You can reach the school administration through our contact form above, by calling us, or sending an email. We aim to respond to all queries within 24 hours."
                },
                {
                  question: "Are there transportation services available?",
                  answer: "Yes, we provide safe and reliable transportation services covering major areas of the city. Contact us for route information and scheduling."
                }
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Social Media Section */}
          <section className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8" data-aos="fade-up">
              Connect With Us
            </h2>
            <div className="flex justify-center gap-6" data-aos="fade-up">
              {[
                { icon: <Facebook className="w-6 h-6" />, color: "hover:text-blue-600" },
                { icon: <Twitter className="w-6 h-6" />, color: "hover:text-blue-400" },
                { icon: <Instagram className="w-6 h-6" />, color: "hover:text-pink-600" },
                { icon: <Linkedin className="w-6 h-6" />, color: "hover:text-blue-700" }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`text-gray-400 ${social.color} transition-colors duration-300`}
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;