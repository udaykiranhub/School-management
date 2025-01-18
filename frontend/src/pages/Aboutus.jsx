import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { 
  BookOpen, 
  Target, 
  Heart, 
  Users, 
  Trophy, 
  GraduationCap,
  Library,
  Microscope,
  Music,
  Dumbbell,
  Star,
  ChevronRight,
  Building2,
  History,
  Award,
  School
} from "lucide-react";

function AboutUs() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <Header />
      <div className="bg-white w-full overflow-hidden mt-44">
        {/* Hero Section */}
        <section
          className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-20 text-white"
          data-aos="fade-up"
        >
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
              Shaping Tomorrow's Leaders
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto">
              For over three decades, we've been nurturing minds and building character through excellence in education.
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <div
              className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              data-aos="fade-right"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-purple-100 p-4 rounded-xl">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To create an inspiring environment where students thrive academically and personally, fostering critical thinking, creativity, and character development through innovative teaching methods and personalized attention.
              </p>
            </div>
            <div
              className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              data-aos="fade-left"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-100 p-4 rounded-xl">
                  <Heart className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To be a leading educational institution that empowers students to become global citizens, innovative thinkers, and compassionate leaders who make meaningful contributions to society.
              </p>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="bg-gray-50 py-20" data-aos="fade-up">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-4 mb-12">
              <History className="w-10 h-10 text-purple-600" />
              <h2 className="text-4xl font-bold text-gray-800">Our Journey</h2>
            </div>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xl text-gray-600 leading-relaxed">
                Founded in 1985, our institution has evolved from a small local school to a renowned center of educational excellence. Our commitment to innovation, coupled with traditional values, has shaped thousands of successful careers and lives over the past 38 years.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">
            Our Core Values
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <GraduationCap className="w-8 h-8 text-amber-500" />,
                title: "Academic Excellence",
                description: "Pursuing the highest standards of academic achievement through innovative teaching and continuous learning."
              },
              {
                icon: <Users className="w-8 h-8 text-emerald-500" />,
                title: "Inclusive Community",
                description: "Creating a welcoming environment that celebrates diversity and promotes collaboration among students and faculty."
              },
              {
                icon: <Star className="w-8 h-8 text-purple-500" />,
                title: "Character Development",
                description: "Building strong moral foundations and leadership skills that last a lifetime."
              }
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                data-aos="flip-left"
                data-aos-delay={index * 100}
              >
                <div className="bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Facilities Section */}
        <section className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-20 text-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">
              World-Class Facilities
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <Library className="w-8 h-8" />,
                  name: "Modern Library",
                  description: "Extensive collection of books, digital resources, and quiet study spaces"
                },
                {
                  icon: <Microscope className="w-8 h-8" />,
                  name: "Science Labs",
                  description: "State-of-the-art laboratories for hands-on learning and research"
                },
                {
                  icon: <Dumbbell className="w-8 h-8" />,
                  name: "Sports Complex",
                  description: "Professional facilities for various sports and physical education"
                },
                {
                  icon: <Music className="w-8 h-8" />,
                  name: "Arts Center",
                  description: "Dedicated spaces for music, drama, and visual arts"
                }
              ].map((facility, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    {facility.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{facility.name}</h3>
                  <p className="text-gray-300">{facility.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="flex items-center justify-center gap-4 mb-16">
            <Trophy className="w-10 h-10 text-amber-500" />
            <h2 className="text-4xl font-bold text-gray-800">Our Achievements</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "National Excellence Award",
                year: "2023",
                description: "Recognized for outstanding academic performance and innovative teaching methods"
              },
              {
                title: "Best STEM Program",
                year: "2022",
                description: "Awarded for exceptional science and technology education initiatives"
              },
              {
                title: "Community Impact",
                year: "2023",
                description: "Honored for significant contributions to local community development"
              }
            ].map((achievement, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Award className="w-12 h-12 text-amber-500 mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{achievement.title}</h3>
                <p className="text-amber-600 font-semibold mb-4">{achievement.year}</p>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 py-20">
          <div className="container mx-auto px-6 text-center">
            <div
              className="bg-white/10 backdrop-blur-lg p-12 rounded-2xl max-w-4xl mx-auto"
              data-aos="fade-up"
            >
              <School className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-6">
                Begin Your Journey With Us
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Join our vibrant community and give your child the gift of exceptional education.
              </p>
              <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-4 px-8 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all inline-flex items-center gap-2">
                Schedule a Visit
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;