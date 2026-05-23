import { motion } from "motion/react";
import {
  CheckCircle2,
  Award,
  Users,
  Target,
  Rocket,
  Instagram,
  Linkedin,
} from "lucide-react";
import { usePageContent } from "../hooks/usePageContent";

const DEFAULT_ABOUT_CONTENT = {
  introTitle: "Our Journey of Excellence",
  introText:
    "Founded in Bhopal, Apka Interior Wala has grown into an international agency known for its commitment to quality and innovation.",
  mission:
    "To transform our clients' visions into reality through exceptional design and superior craftsmanship.",
  vision:
    "To be the global leader in luxury interior design and sustainable construction solutions.",
  founderName: "Zainab Khan",
  founderRole: "Founder & Principal Architect",
  founderBio:
    "With a passion for architecture and a keen eye for detail, Zainab Khan leads the team in creating spaces that are both functional and breathtaking.",
  founderImage: "/images/founder-zainab-khan.jpeg",
  introImage: "/images/living-room-partition.jpg",
};

export default function About() {
  const { content, loading } = usePageContent("about", DEFAULT_ABOUT_CONTENT);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-primary"></div>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-32 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-5xl font-light text-stone-900 md:text-7xl"
          >
            Designing the <span className="italic font-serif">Future</span> of
            Bhopal
          </motion.h1>
        </div>

        {/* Introduction */}
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 items-center mb-32">
          <div className="space-y-8">
            <h2 className="text-3xl font-light leading-tight text-stone-900 md:text-4xl">
              {content.introTitle}
            </h2>
            <p className="text-lg leading-relaxed text-stone-600">
              {content.introText}
            </p>
            <p className="text-lg leading-relaxed text-stone-600">
              Our team of architects, interior designers, and engineers work in
              harmony to deliver turnkey solutions that are as functional as
              they are beautiful. From luxury villas in Arera Colony to modern
              corporate hubs in MP Nagar, our footprint is visible across
              Bhopal's skyline.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl">
              <img
                src={content.introImage}
                alt="Our Studio - Bespoke Interiors"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="mb-32 bg-primary rounded-theme overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-[500px] lg:h-auto">
              <img
                src={content.founderImage}
                alt={content.founderName}
                className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-12 lg:p-20 flex flex-col justify-center space-y-8 text-white">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-stone-500">
                  The Visionary
                </span>
                <h2 className="text-4xl font-light md:text-5xl">
                  {content.founderName}
                </h2>
                <p className="text-sm uppercase tracking-widest text-stone-400">
                  {content.founderRole}
                </p>
              </div>
              <p className="text-lg leading-relaxed text-stone-300 font-light italic">
                "{content.founderBio}"
              </p>
              <div className="pt-4 flex space-x-6">
                <a
                  href="#"
                  className="text-stone-500 hover:text-white transition-colors"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="#"
                  className="text-stone-500 hover:text-white transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 mb-32">
          <div className="bg-stone-50 p-12 rounded-3xl space-y-6">
            <div className="h-12 w-12 bg-primary text-white flex items-center justify-center rounded-xl">
              <Target size={24} />
            </div>
            <h3 className="text-2xl font-bold text-stone-900">Our Mission</h3>
            <p className="text-stone-600 leading-relaxed">{content.mission}</p>
          </div>
          <div className="bg-primary p-12 rounded-3xl space-y-6 text-white">
            <div className="h-12 w-12 bg-white text-stone-900 flex items-center justify-center rounded-xl">
              <Rocket size={24} />
            </div>
            <h3 className="text-2xl font-bold">Our Vision</h3>
            <p className="text-stone-400 leading-relaxed">{content.vision}</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-stone-900">
              Why Choose Apka Interior Wala?
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "International Standards",
                desc: "We bring global design trends and construction techniques to every project.",
              },
              {
                title: "Turnkey Solutions",
                desc: "From initial concept to the final handover, we manage everything for you.",
              },
              {
                title: "Expert Team",
                desc: "Our professionals are highly trained and passionate about creating excellence.",
              },
              {
                title: "Quality Assurance",
                desc: "We use only the finest materials and follow strict quality control protocols.",
              },
              {
                title: "Timely Delivery",
                desc: "We value your time and ensure all projects are completed within the agreed timeline.",
              },
              {
                title: "Client Centric",
                desc: "Your satisfaction is our priority. We listen, adapt, and deliver beyond expectations.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <CheckCircle2
                  size={24}
                  className="text-stone-900 shrink-0 mt-1"
                />
                <div>
                  <h4 className="text-lg font-bold text-stone-900">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
