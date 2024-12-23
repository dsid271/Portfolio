import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function Contact() {
  const [ref, controls] = useScrollAnimation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isMessageSent, setIsMessageSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://portfolio-backend-4plr.onrender.com/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsMessageSent(true); // Show Thank You message
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred.');
    }
  };

  const handleBackToContact = () => {
    // Reset the message state to re-render form completely
    setIsMessageSent(false);
  };

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {isMessageSent ? (
          // Thank You Message
          <div className="text-center">
            <motion.h2
              className="text-pixel font-commodore text-bright-yellow mb-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              🎉 ACHIEVEMENT UNLOCKED 🎉
            </motion.h2>
            <motion.p
              className="text-pixel font-commodore text-bright-green mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Thank You for Getting in Touch!
            </motion.p>
            <motion.div
              className="text-pixel font-commodore text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              I’ll get back to you as soon as possible. 🚀
            </motion.div>
            <motion.button
              className="mt-8 px-6 py-3 bg-bright-pink text-black font-commodore rounded-lg hover:bg-bright-yellow transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              onClick={handleBackToContact}
            >
              Back to Contact
            </motion.button>
          </div>
        ) : (
          // Contact Form with a Key Prop to Force Re-render
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-lg p-8"
            key={isMessageSent} // This forces a re-render when isMessageSent changes
          >
            <motion.h2
              className="text-pixel font-commodore text-bright-pink text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Get in Touch
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-bright-pink">
              <div>
                <h3 className="text-xl font-semibold mb-4 font-commodore">Contact Information</h3>
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mail className="text-bright-green" />
                    <span>dsid271@gmail.com</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Phone className="text-bright-green" />
                    <span>+91 6309787190</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MapPin className="text-bright-green" />
                    <span>Hyderabad, India</span>
                  </motion.div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div>
                  <label className="block text-sm font-medium text-bright-yellow mb-1 font-commodore">Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-bright-green focus:ring-2 focus:ring-bright-pink focus:border-transparent transition-all duration-300"
                    required
                  />
                </motion.div>
                <motion.div>
                  <label className="block text-sm font-medium text-bright-yellow mb-1 font-commodore">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-bright-green focus:ring-2 focus:ring-bright-pink focus:border-transparent transition-all duration-300"
                    required
                  />
                </motion.div>
                <motion.div>
                  <label className="block text-sm font-medium text-bright-yellow mb-1 font-commodore">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-bright-green focus:ring-2 focus:ring-bright-pink focus:border-transparent transition-all duration-300"
                    required
                  ></textarea>
                </motion.div>
                <motion.button 
                  type="submit"
                  className="w-full bg-bright-pink text-black py-2 px-4 rounded-lg hover:bg-bright-yellow transition-all duration-300 font-commodore"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
