import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function Contact() {
  const [ref, controls] = useScrollAnimation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Show loading state
    try {
      const response = await fetch('https://portfolio-backend-4plr.onrender.com/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsMessageSent(true); // Switch to thank-you message
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred.');
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  const handleBackToContact = () => {
    setIsMessageSent(false); // Switch back to form view
  };

  return (
    <section id="contact" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        {isMessageSent ? (
          // Thank You Message
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-pixel font-commodore text-bright-yellow mb-4">
              🎉 ACHIEVEMENT UNLOCKED 🎉
            </h2>
            <p className="text-pixel font-commodore text-bright-green mb-6">
              Thank You for Getting in Touch!
            </p>
            <p className="text-pixel font-commodore text-white">
              I’ll get back to you as soon as possible. 🚀
            </p>
            <button
              className="mt-8 px-6 py-3 bg-bright-pink text-black font-commodore rounded-lg hover:bg-bright-yellow transition-all"
              onClick={handleBackToContact}
            >
              Back to Contact
            </button>
          </motion.div>
        ) : (
          // Contact Form
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-lg p-8"
          >
            <h2 className="text-pixel font-commodore text-bright-pink text-center mb-12">
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-bright-pink font-commodore">
                  Contact Information
                </h3>
                <div className="space-y-4 text-bright-pink">
                  <div className="flex items-center gap-3">
                    <Mail className="text-bright-green" />
                    <span>dsid271@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-bright-green" />
                    <span>+91 6309787190</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-bright-green" />
                    <span>Hyderabad, India</span>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-bright-yellow mb-1 font-commodore">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-bright-green focus:ring-2 focus:ring-bright-pink focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bright-yellow mb-1 font-commodore">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-bright-green focus:ring-2 focus:ring-bright-pink focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bright-yellow mb-1 font-commodore">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-bright-green focus:ring-2 focus:ring-bright-pink focus:border-transparent transition-all duration-300"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`w-full py-2 px-4 rounded-lg font-commodore transition-all duration-300 ${
                    loading
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-bright-pink hover:bg-bright-yellow text-black'
                  }`}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
