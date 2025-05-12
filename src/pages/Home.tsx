import { Link } from 'react-router-dom';
import { ChevronRight, Award, Zap, Settings, PenTool as Tool, Users, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container-custom py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-6">Precision Engineering for Industrial Excellence</h1>
              <p className="text-lg mb-8 text-white/90 max-w-xl">
                At Sri Madhura Engineerings, we provide premium quality precision engineering solutions, custom components, and industrial machinery to drive your business forward.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn btn-accent">
                  Explore Products <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/contact" className="btn bg-white text-primary-700 hover:bg-white/90">
                  Contact Us
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[320px] lg:h-[400px] rounded-lg overflow-hidden"
            >
              <img 
                src="https://content.jdmagicbox.com/comp/def_content/industrial-fabricators/3-industrial-fabricators-3-pain6.jpg" 
                alt="Electric Motor" 
                className="absolute w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-primary-900/20 rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-4">Why Choose Sri Madhura Engineerings?</h2>
            <p className="text-lg text-gray-600">
              We combine precision engineering with exceptional service to deliver quality products that meet the highest industry standards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-10 h-10 text-primary-500" />,
                title: 'Quality Assurance',
                desc: 'Every product undergoes rigorous quality checks to ensure it meets industry standards.'
              },
              {
                icon: <Tool className="w-10 h-10 text-primary-500" />,
                title: 'Precision Engineering',
                desc: 'Using advanced technology to deliver high-precision components and machinery.'
              },
              {
                icon: <Zap className="w-10 h-10 text-primary-500" />,
                title: 'Fast Turnaround',
                desc: 'Efficient processes to deliver your orders on time, every time.'
              },
              {
                icon: <Settings className="w-10 h-10 text-primary-500" />,
                title: 'Customized Solutions',
                desc: 'Tailored engineering solutions designed to meet your specific requirements.'
              },
              {
                icon: <Users className="w-10 h-10 text-primary-500" />,
                title: 'Expert Team',
                desc: 'Skilled engineers and technicians with years of industry experience.'
              },
              {
                icon: <BarChart className="w-10 h-10 text-primary-500" />,
                title: 'Continuous Innovation',
                desc: 'Constantly evolving our processes and technologies to stay ahead.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Products Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="mb-3">Our Featured Products</h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Explore our range of high-quality products designed for precision and efficiency.
              </p>
            </div>
            <Link 
              to="/products" 
              className="btn btn-outline mt-6 md:mt-0 self-start md:self-center"
            >
              View All Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Electric Motor',
                image: 'https://engineersmate.com/wp-content/uploads/2022/01/1111.jpg',
                desc: 'Durable and efficient electric motor designed for heavy-duty industrial operations.'
              },
              {
                name: 'Door Closer',
                image: 'https://qualitydoor.com/cdn/shop/products/Norton-CPS7500-689-Closer-Plus-Spring-Parallel-Arm-Door-Closer-Push-Side-Aluminum_800x.png?v=1678392527',
                desc: 'Smooth-action door closer engineered for safety and controlled door movement.'
              },
              {
                name: 'Electric Generator',
                image: 'https://5.imimg.com/data5/SELLER/Default/2023/6/319482128/SO/HB/GR/40552405/500-kva-cummins-diesel-generator-1000x1000.jpg',
                desc: 'Reliable electric generator delivering consistent power for industrial and commercial use.'
              }
              
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card overflow-hidden group"
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.desc}</p>
                  <Link 
                    to="/products" 
                    className="text-primary-500 font-medium inline-flex items-center hover:text-primary-600"
                  >
                    Learn More <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container-custom text-center">
          <h2 className="mb-6">Ready to Transform Your Engineering Projects?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Partner with Sri Madhura Engineerings for precision-engineered solutions tailored to your specific needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn btn-accent">
              Request a Quote
            </Link>
            <Link to="/products" className="btn bg-white/10 text-white border border-white/30 hover:bg-white/20">
              Explore Our Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;