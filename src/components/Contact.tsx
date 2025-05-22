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
    <section id="contact" className="py-20 bg-genshin-bg text-genshin-text">
      <div className="container mx-auto px-4">
        {isMessageSent ? (
          // Thank You Message
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl text-genshin-gold mb-4">
              🎉 ACHIEVEMENT UNLOCKED 🎉
            </h2>
            <p className="text-genshin-text mb-6">
              Thank You for Getting in Touch!
            </p>
            <p className="text-genshin-text-darker">
              I’ll get back to you as soon as possible. 😁
            </p>
            <button
              className="mt-8 inline-block bg-genshin-blue text-genshin-text py-3 px-6 pixel-text font-bold hover:bg-genshin-blue-dark border-2 border-genshin-blue-dark hover:border-genshin-blue transition-all duration-200 transform hover:scale-105 rounded-sm"
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
            className="max-w-3xl mx-auto bg-genshin-bg-light border border-genshin-blue rounded-md p-8"
          >
            <h2 className="text-3xl text-genshin-gold text-center mb-12 pixel-text">
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl text-genshin-aqua mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4 text-genshin-text-darker">
                  <div className="flex items-center gap-3">
                    <Mail className="text-genshin-aqua" />
                    <span>dsid271@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-genshin-aqua" />
                    <span>+91 6309787190</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-genshin-aqua" />
                    <span>Hyderabad, India</span>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-genshin-text-darker mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-genshin-bg border border-genshin-blue text-genshin-text focus:ring-2 focus:ring-genshin-gold focus:border-genshin-gold rounded-sm p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-genshin-text-darker mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-genshin-bg border border-genshin-blue text-genshin-text focus:ring-2 focus:ring-genshin-gold focus:border-genshin-gold rounded-sm p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-genshin-text-darker mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-genshin-bg border border-genshin-blue text-genshin-text focus:ring-2 focus:ring-genshin-gold focus:border-genshin-gold rounded-sm p-2"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`w-full py-3 px-6 pixel-text font-bold text-genshin-text rounded-sm transition-all duration-200 transform hover:scale-105 border-2 border-genshin-blue-dark ${
                    loading
                      ? 'bg-genshin-text-darker cursor-not-allowed'
                      : 'bg-genshin-blue hover:bg-genshin-blue-dark hover:border-genshin-blue'
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
