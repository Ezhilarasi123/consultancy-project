import { motion } from 'framer-motion';
import { Award, Users, Clock, Briefcase } from 'lucide-react';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="mb-6">About Sri Madhura Engineering</h1>
            <p className="text-xl text-white/90">
              A legacy of engineering excellence since 1995, dedicated to precision, quality, and innovation.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <h2 className="mb-6">Our Story</h2>
              <p className="mb-4 text-gray-700">
                Madhura Engineerings was founded in 1995 with a vision to provide high-quality precision engineering solutions to industries across India. What started as a small workshop with a handful of skilled engineers has now grown into a leading engineering company with state-of-the-art facilities.
              </p>
              <p className="mb-4 text-gray-700">
                Over the years, we have continuously evolved, adopting new technologies and improving our processes to deliver products that meet the highest standards of quality and precision. Our commitment to excellence has earned us the trust of clients across various industries.
              </p>
              <p className="text-gray-700">
                Today, Madhura Engineerings stands as a symbol of reliability, innovation, and engineering excellence, with a team of over 100 skilled professionals working together to provide customized solutions for complex engineering challenges.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <div className="relative rounded-lg overflow-hidden h-[400px]">
                <img 
                  src="https://images.pexels.com/photos/3912982/pexels-photo-3912982.jpeg" 
                  alt="Madhura Engineerings History" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Clock className="w-10 h-10 text-primary-500" />,
                value: "25+", 
                label: "Years of Experience" 
              },
              { 
                icon: <Briefcase className="w-10 h-10 text-primary-500" />,
                value: "1000+", 
                label: "Projects Completed" 
              },
              { 
                icon: <Users className="w-10 h-10 text-primary-500" />,
                value: "100+", 
                label: "Team Members" 
              },
              { 
                icon: <Award className="w-10 h-10 text-primary-500" />,
                value: "15+", 
                label: "Industry Awards" 
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Mission & Values */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-4">Our Mission & Values</h2>
            <p className="text-lg text-gray-600">
              We are driven by our commitment to excellence, integrity, and innovation in everything we do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card p-8"
            >
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-700 mb-4">
                To provide innovative engineering solutions that empower industries to achieve operational excellence and sustainable growth.
              </p>
              <p className="text-gray-700">
                We aim to be at the forefront of engineering innovation, continuously pushing the boundaries of what's possible while maintaining the highest standards of quality and reliability.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card p-8"
            >
              <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <strong className="text-gray-800">Excellence:</strong>
                    <span className="text-gray-700"> We are committed to delivering products and services of the highest quality.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <strong className="text-gray-800">Integrity:</strong>
                    <span className="text-gray-700"> We conduct our business with honesty, transparency, and ethical standards.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <strong className="text-gray-800">Innovation:</strong>
                    <span className="text-gray-700"> We continuously explore new technologies and methods to improve our products.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <strong className="text-gray-800">Customer Focus:</strong>
                    <span className="text-gray-700"> We prioritize our customers' needs and work towards exceeding their expectations.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <strong className="text-gray-800">Teamwork:</strong>
                    <span className="text-gray-700"> We believe in the power of collaboration and the strength of a unified team.</span>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-600">
              Meet the experienced professionals who lead Madhura Engineerings with vision and expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh",
                position: "Founder & CEO",
                image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
                bio: "With over 30 years of experience in engineering, Rajesh founded Madhura Engineerings with a vision to deliver precision excellence."
              },
              {
                name: "Priya",
                position: "Chief Operations Officer",
                image: "https://media.istockphoto.com/id/911901526/photo/portrait-of-a-traditionally-dressed-happy-south-indian-woman.jpg?s=612x612&w=0&k=20&c=dF7bsN1HmLdLh74kj-s7RYh-x3bGnuSj8BvRs0F5Zeg=",
                bio: "Priya leads our operations with strategic insight, ensuring efficiency and quality across all our processes."
              },
              {
                name: "Vikram",
                position: "Head of Engineering",
                image: "https://static.vecteezy.com/system/resources/thumbnails/049/174/246/small/a-smiling-young-indian-man-with-formal-shirts-outdoors-photo.jpg",
                bio: "Vikram brings innovation to our engineering department, leading a team of talented engineers to create cutting-edge solutions."
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card overflow-hidden"
              >
                <div className="h-72">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary-500 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;