import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Contact number is required (min 10 digits)"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await addDoc(collection(db, "messages"), {
        ...data,
        createdAt: serverTimestamp(),
      });
      toast.success("Message sent successfully! We will get back to you soon.");
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500"
          >
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-5xl font-light text-stone-900 md:text-6xl"
          >
            Let's Start a{" "}
            <span className="italic font-serif">Conversation</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-3xl font-light text-stone-900">
                Contact Information
              </h2>
              <p className="text-lg text-stone-600 leading-relaxed">
                Whether you're planning a luxury home renovation or a
                large-scale commercial construction, our team is ready to assist
                you.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-stone-100 text-stone-900">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-stone-900">
                    Our Office
                  </h4>
                  <p className="mt-2 text-stone-600">
                    10, Patwa Market, Near Bharat Talkies, Bhopal, Madhya
                    Pradesh 462016, India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-stone-100 text-stone-900">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-stone-900">
                    Phone / WhatsApp
                  </h4>
                  <p className="mt-2 text-stone-600">+91 78933 65987</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-stone-100 text-stone-900">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-stone-900">
                    Email
                  </h4>
                  <p className="mt-2 text-stone-600">
                    info@apkainteriorwala.com
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video w-full bg-stone-100 grayscale overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
                alt="Map Placeholder"
                className="h-full w-full object-cover opacity-50"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-stone-50 p-8 md:p-12 rounded-3xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
                    Full Name *
                  </label>
                  <input
                    {...register("name")}
                    className="w-full border-b border-stone-200 bg-transparent py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-[10px] text-red-500 uppercase tracking-widest">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    className="w-full border-b border-stone-200 bg-transparent py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-500 uppercase tracking-widest">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
                    Phone Number *
                  </label>
                  <input
                    {...register("phone")}
                    className="w-full border-b border-stone-200 bg-transparent py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors"
                    placeholder="+91 00000 00000"
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-red-500 uppercase tracking-widest">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
                    What are you looking for? *
                  </label>
                  <select
                    {...register("service")}
                    className="w-full border-b border-stone-200 bg-transparent py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option value="Interior Designing">
                      Interior Designing
                    </option>
                    <option value="Consultation">Consultation</option>
                    <option value="3D Visualisation">3D Visualisation</option>
                    <option value="Architecture">Architecture</option>
                  </select>
                  {errors.service && (
                    <p className="text-[10px] text-red-500 uppercase tracking-widest">
                      {errors.service.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  className="w-full border-b border-stone-200 bg-transparent py-3 text-stone-900 focus:border-stone-900 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <p className="text-[10px] text-red-500 uppercase tracking-widest">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center space-x-3 bg-stone-900 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800 disabled:opacity-50"
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                {!isSubmitting && (
                  <Send
                    size={18}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
