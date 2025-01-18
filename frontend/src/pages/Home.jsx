import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BookOpen, Users, Brain, ChevronRight, Rocket, GraduationCap, Heart, Target } from "lucide-react";

const teachers = [
  {
    name: "Dr. Michelle Andrade",
    subjects: "English Literature & Spanish",
    description: "Ph.D. in Comparative Literature with 15+ years of teaching experience. Specializes in creative writing and cultural studies.",
    color: "bg-amber-500",
  },
  {
    name: "Prof. John Stamos",
    subjects: "Linguistics & Modern Languages",
    description: "Expert in language acquisition methodologies with research focus on multilingual education approaches.",
    color: "bg-emerald-500",
  },
  {
    name: "Dr. Kelly Masterson",
    subjects: "French & Scandinavian Studies",
    description: "Certified language instructor with expertise in immersive learning techniques and cultural integration.",
    color: "bg-indigo-500",
  },
  {
    name: "Dr. Michael Wong",
    subjects: "Asian Languages & Literature",
    description: "Specialist in East Asian linguistics with extensive experience in language technology integration.",
    color: "bg-violet-500",
  },
];

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <Header />

      <div className="min-w-[85vw] overflow-hidden bg-white w-full mt-44">
        {/* Hero Section */}
        <div
          className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-center py-16 px-6 sm:py-24"
          data-aos="fade-up"
        >
          <h1 className="text-white text-4xl sm:text-6xl font-bold mb-8 leading-tight">
            Transform Your Future <br /> Through Education
          </h1>
          <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 px-8 rounded-full inline-flex items-center gap-2 hover:from-amber-600 hover:to-amber-700 transition-all">
            EXPLORE PROGRAMS
            <Rocket className="w-5 h-5" />
          </button>
          
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12"
            data-aos="fade-up"
          >
            <div className="bg-white/10 backdrop-blur-lg text-white p-8 rounded-2xl shadow-lg hover:transform hover:-translate-y-1 transition-all">
              <GraduationCap className="w-12 h-12 mb-4 text-amber-400 mx-auto" />
              <h2 className="text-xl font-bold mb-2">EXPERT FACULTY</h2>
              <p className="text-gray-200 mb-4">Learn from industry leaders and accomplished academics</p>
              <a className="text-amber-400 inline-flex items-center gap-1 hover:gap-2 transition-all" href="#">
                Learn More <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg text-white p-8 rounded-2xl shadow-lg hover:transform hover:-translate-y-1 transition-all">
              <Users className="w-12 h-12 mb-4 text-amber-400 mx-auto" />
              <h2 className="text-xl font-bold mb-2">GLOBAL COMMUNITY</h2>
              <p className="text-gray-200 mb-4">Join a network of 10,000+ successful alumni worldwide</p>
              <a className="text-amber-400 inline-flex items-center gap-1 hover:gap-2 transition-all" href="#">
                Learn More <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg text-white p-8 rounded-2xl shadow-lg hover:transform hover:-translate-y-1 transition-all">
              <Brain className="w-12 h-12 mb-4 text-amber-400 mx-auto" />
              <h2 className="text-xl font-bold mb-2">INNOVATIVE LEARNING</h2>
              <p className="text-gray-200 mb-4">Cutting-edge curriculum and teaching methodologies</p>
              <a className="text-amber-400 inline-flex items-center gap-1 hover:gap-2 transition-all" href="#">
                Learn More <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* What We Offer Section */}
        <div className="py-20 px-6">
          <div className="container mx-auto px-4">
            <header className="text-center max-w-4xl mx-auto" data-aos="fade-down">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Excellence in Education
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mt-6">
                At Vivekananda Schools, we foster an environment where academic excellence meets character development. Our comprehensive approach ensures students are prepared for the challenges of tomorrow.
              </p>
            </header>

            <main>
              <section className="my-16 flex flex-col gap-20">
                <div
                  className="flex flex-col md:flex-row justify-between items-center gap-12"
                  data-aos="fade-right"
                >
                  <div className="md:w-1/2">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
                      Personalized Learning Journey
                    </h2>
                    <p className="text-lg text-gray-600">
                      Our adaptive learning platform tailors the educational experience to each student's unique needs and learning pace. With a student-to-teacher ratio of 15:1, we ensure every student receives the attention they deserve.
                    </p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800"
                    className="rounded-2xl shadow-2xl md:w-[500px] h-[300px] object-cover"
                    alt="Personalized Learning"
                  />
                </div>

                <div
                  className="flex flex-col md:flex-row-reverse justify-between items-center gap-12"
                  data-aos="fade-left"
                >
                  <div className="md:w-1/2">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
                      Character Development
                    </h2>
                    <p className="text-lg text-gray-600">
                      Beyond academics, we emphasize values, ethics, and leadership skills. Our holistic approach helps students develop into well-rounded individuals ready to make a positive impact on society.
                    </p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800"
                    className="rounded-2xl shadow-2xl md:w-[500px] h-[300px] object-cover"
                    alt="Character Development"
                  />
                </div>

                <div
                  className="flex flex-col md:flex-row justify-between items-center gap-12"
                  data-aos="fade-right"
                >
                  <div className="md:w-1/2">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
                      Future-Ready Education
                    </h2>
                    <p className="text-lg text-gray-600">
                      Our curriculum integrates technology and real-world applications, preparing students for the digital age. We focus on developing critical thinking, creativity, and problem-solving skills.
                    </p>
                    <button className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all inline-flex items-center gap-2">
                      Schedule a Visit
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800"
                    className="rounded-2xl shadow-2xl md:w-[500px] h-[300px] object-cover"
                    alt="Future-Ready Education"
                  />
                </div>
              </section>
            </main>
          </div>
        </div>

        {/* Teachers Section */}
        <div className="p-8 sm:p-16 bg-gray-50">
          <div className="container mx-auto">
            <h1
              className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
              data-aos="fade-up"
            >
              Meet Our Expert Faculty
            </h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto" data-aos="fade-up">
              Our educators bring together decades of experience and a passion for transformative education.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teachers.map((teacher, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 text-center relative shadow-lg hover:shadow-xl transition-all"
                  data-aos="flip-left"
                  data-aos-delay={index * 100}
                >
                  <div
                    className={`w-16 h-16 rounded-full absolute -top-8 left-1/2 transform -translate-x-1/2 ${teacher.color} flex items-center justify-center`}
                  >
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-${1500000000000 + index}?auto=format&fit=crop&w=300`}
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{teacher.name}</h2>
                  <p className="text-sm font-medium text-indigo-600 mb-4">
                    {teacher.subjects}
                  </p>
                  <p className="text-gray-600 text-sm">{teacher.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Get Started Section */}
        <div className="flex items-center justify-center min-h-[40vh] bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900">
          <div
            className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between w-11/12 md:w-3/4 gap-8"
            data-aos="fade-up"
          >
            <div className="text-center md:text-left">
              <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
                Begin Your Journey Today
              </h1>
              <p className="text-gray-200 text-lg">
                Take the first step towards academic excellence and personal growth. Join our community of lifelong learners.
              </p>
            </div>
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-4 px-8 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all inline-flex items-center gap-2">
              ENROLL NOW
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;