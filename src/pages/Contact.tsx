
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
    setIsSubmitted(true);
    reset();
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="mb-4">Contact Us</h1>
            <p className="text-xl text-white/90">
              Have questions or need a quote? Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Information & Form */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary-50 p-3 rounded-full mr-4">
                      <MapPin className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Our Location</h3>
                      <p className="text-gray-600">
                        SF NO.7/52, Rajeswari layout, Govinda Agraharam, <br />
                        Hosur, Krishnagiri - 635126,<br />
                        TamilNadu, India.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-50 p-3 rounded-full mr-4">
                      <Phone className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-600">+91 99436 95400</p>
                      <p className="text-gray-600">+91 22 12345678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-50 p-3 rounded-full mr-4">
                      <Mail className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">srimadhuraengg2023@gmail.com</p>
                      <p className="text-gray-600">sales@madhuraengineering.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-50 p-3 rounded-full mr-4">
                      <Clock className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-green-50 p-4 rounded-lg flex items-center text-green-800"
                  >
                    <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                    <p>Thank you for your message! We'll get back to you as soon as possible.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                          id="name"
                          type="text"
                          className={`form-input ${errors.name ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                          {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && <p className="form-error">{errors.name.message}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          id="email"
                          type="email"
                          className={`form-input ${errors.email ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                        />
                        {errors.email && <p className="form-error">{errors.email.message}</p>}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                          id="phone"
                          type="tel"
                          className={`form-input ${errors.phone ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                          {...register('phone', { 
                            required: 'Phone number is required' 
                          })}
                        />
                        {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="form-label">Subject</label>
                        <input
                          id="subject"
                          type="text"
                          className={`form-input ${errors.subject ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                          {...register('subject', { required: 'Subject is required' })}
                        />
                        {errors.subject && <p className="form-error">{errors.subject.message}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea
                        id="message"
                        rows={5}
                        className={`form-input ${errors.message ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                        {...register('message', { required: 'Message is required' })}
                      ></textarea>
                      {errors.message && <p className="form-error">{errors.message.message}</p>}
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn btn-primary flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          Send Message <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="mb-4">Visit Our Facility</h2>
            <p className="text-lg text-gray-600">
              We're located in Hosur's industrial areas, easily accessible from all major routes.
            </p>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-md">
            {/* Using OpenStreetMap for demonstration
            <iframe 
              src="https://www.openstreetmap.org/export/embed.html?bbox=72.8018,19.0290,72.8580,19.0620&layer=mapnik" 
              width="100%"
              height="450" 
              frameBorder="0" 
              style={{ border: 0 }}
              title="Madhura Engineerings Map Location"
            ></iframe> */}

            <div className="rounded-lg overflow-hidden shadow-md">
              <iframe
              width="100%"
              height="450"
              frameBorder="0"
              style={{ border: 0 }}
              title="Madhura Engineerings Map Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.8260,12.7330,77.8320,12.7390&layer=mapnik&marker=12.7360,77.8290"
            ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;