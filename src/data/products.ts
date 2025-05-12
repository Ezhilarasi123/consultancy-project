// export interface Product {
//   id: number;
//   name: string;
//   category: string;
//   description: string;
//   price: number;
//   features: string[];
//   image: string;
//   inStock: boolean;
// }

// export const productCategories = [
//   "Industrial Machinery",
//   "Precision Components",
//   "Automation Systems",
//   "Custom Equipment"
// ];

// export const products: Product[] = [
//   {
//     id: 1,
//     name: "Industrial CNC Machine",
//     category: "Industrial Machinery",
//     description: "High-precision CNC machine for industrial applications. Features advanced controls and multi-axis capabilities.",
//     price: 45000,
//     features: [
//       "6-axis precision control",
//       "Advanced automation features",
//       "Integrated safety systems",
//       "User-friendly interface",
//       "Remote monitoring capabilities"
//     ],
//     image: "https://images.pexels.com/photos/5468962/pexels-photo-5468962.jpeg",
//     inStock: true
//   },
//   {
//     id: 2,
//     name: "Hydraulic Press System",
//     category: "Industrial Machinery",
//     description: "Heavy-duty hydraulic press system designed for manufacturing applications requiring high force.",
//     price: 28500,
//     features: [
//       "100-ton pressure capacity",
//       "Precise pressure control",
//       "Programmable operation cycles",
//       "Safety interlocks",
//       "Low maintenance design"
//     ],
//     image: "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg",
//     inStock: true
//   },
//   {
//     id: 3,
//     name: "Precision Gear Assembly",
//     category: "Precision Components",
//     description: "Custom-designed gear assembly for power transmission applications with high torque requirements.",
//     price: 7800,
//     features: [
//       "Hardened steel construction",
//       "Precision-machined teeth",
//       "Low noise operation",
//       "Extended service life",
//       "Custom ratios available"
//     ],
//     image: "https://images.pexels.com/photos/3655926/pexels-photo-3655926.jpeg",
//     inStock: true
//   },
//   {
//     id: 4,
//     name: "Automated Conveyor System",
//     category: "Automation Systems",
//     description: "Complete conveyor system with smart controls for factory automation and material handling.",
//     price: 32000,
//     features: [
//       "Modular design for easy expansion",
//       "Integrated sorting capabilities",
//       "Smart speed control",
//       "Low energy consumption",
//       "Compatible with industry standard systems"
//     ],
//     image: "https://images.pexels.com/photos/2233417/pexels-photo-2233417.jpeg",
//     inStock: true
//   },
//   {
//     id: 5,
//     name: "Custom Fabricated Components",
//     category: "Custom Equipment",
//     description: "Custom metal fabrication services for specialized industrial components according to client specifications.",
//     price: 15000,
//     features: [
//       "Custom design services",
//       "Multiple material options",
//       "Precision fabrication",
//       "Quality assurance testing",
//       "Fast turnaround times"
//     ],
//     image: "https://images.pexels.com/photos/3846208/pexels-photo-3846208.jpeg",
//     inStock: true
//   },
//   {
//     id: 6,
//     name: "Robotic Arm System",
//     category: "Automation Systems",
//     description: "Industrial robotic arm system for automation of repetitive tasks with high precision requirements.",
//     price: 52000,
//     features: [
//       "6-axis movement",
//       "Programmable controller",
//       "High payload capacity",
//       "Repeatable positioning",
//       "Advanced safety features"
//     ],
//     image: "https://images.pexels.com/photos/8294664/pexels-photo-8294664.jpeg",
//     inStock: false
//   },
//   {
//     id: 7,
//     name: "Industrial Pumping System",
//     category: "Industrial Machinery",
//     description: "High-capacity pumping system for industrial fluid transfer with precise flow control.",
//     price: 18500,
//     features: [
//       "High flow rate capability",
//       "Variable speed control",
//       "Corrosion-resistant materials",
//       "Monitoring sensors included",
//       "Energy-efficient design"
//     ],
//     image: "https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg",
//     inStock: true
//   },
//   {
//     id: 8,
//     name: "Precision Bearing Assembly",
//     category: "Precision Components",
//     description: "High-tolerance bearing assembly designed for high-speed and high-load applications.",
//     price: 4200,
//     features: [
//       "Precision-machined races",
//       "Heat-treated components",
//       "Low friction design",
//       "Extended service intervals",
//       "Custom sizes available"
//     ],
//     image: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg",
//     inStock: true
//   }
// ];

// export const getProductById = (id: number): Product | undefined => {
//   return products.find(product => product.id === id);
// };

// export const getProductsByCategory = (category: string): Product[] => {
//   return products.filter(product => product.category === category);
// };



export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  features: string[];
  image: string;
  inStock: boolean;
}

export const productCategories = [
  "Electric Motor",
  "Electric Generator",
  "Electric Control Panel",
  "Door Closer",
  "Electrical Switch Board",
  "Metal Door",
  "Metal Fittings"
];

export const products: Product[] = [
  {
    id: 1,
    name: "Single Phase Electric Motor",
    category: "Electric Motor",
    description: "Efficient single phase electric motor suitable for light-duty applications.",
    price: 2500,
    features: ["Compact design", "Low maintenance", "High efficiency"],
    image: "https://th.bing.com/th/id/OIP.OS2CNRd0DQOcNK3ok57aVQAAAA?rs=1&pid=ImgDetMain",
    inStock: true
  },
  {
    id: 2,
    name: "Three Phase Electric Motor",
    category: "Electric Motor",
    description: "Robust three phase motor for industrial use.",
    price: 4200,
    features: ["Durable", "Energy efficient", "High torque"],
    image: "https://media.istockphoto.com/id/136630492/photo/electric-motor-for-whirlpool.jpg?s=612x612&w=0&k=20&c=6zagS-0zdLJ40TLTM6HvrBaNzMDG1vDaaVEa3NY4noU=",
    inStock: true
  },
  {
    id: 3,
    name: "Electric Power Generator",
    category: "Electric Generator",
    description: "Reliable electric power generator for backup and continuous power supply.",
    price: 15000,
    features: ["Automatic start", "Low noise", "Fuel efficient"],
    image: "https://th.bing.com/th/id/OIP.lc9dttqoM-Y0dfU4lA1S_AHaE8?rs=1&pid=ImgDetMain",
    inStock: true
  },
  {
    id: 4,
    name: "Electric Control Panel",
    category: "Electric Control Panel",
    description: "Customizable electric control panel for various applications.",
    price: 8000,
    features: ["Modular design", "Safety features", "Easy installation"],
    image: "https://3.imimg.com/data3/SI/AT/MY-3540779/industrial-power-control-panel-1000x1000.jpg",
    inStock: true
  },
  {
    id: 5,
    name: "Automatic Door Closer",
    category: "Door Closer",
    description: "Smooth and silent automatic door closer for residential and commercial doors.",
    price: 1200,
    features: ["Adjustable speed", "Compact", "Durable"],
    image: "https://5.imimg.com/data5/WHATSAPP/Doc/2024/5/419907745/XJ/ZA/BA/222085708/new-product-1000x1000.jpeg",
    inStock: true
  },
  {
    id: 6,
    name: "Electrical Switch Board",
    category: "Electrical Switch Board",
    description: "High-quality switch boards for residential and industrial use.",
    price: 3000,
    features: ["Shockproof", "Easy installation", "Fire retardant"],
    image: "https://miro.medium.com/v2/resize:fit:640/format:webp/0*WzzWkOhI1t7361cj.png",
    inStock: true
  },
  {
    id: 7,
    name: "Metal Doors",
    category: "Metal Door",
    description: "Strong and secure metal doors for all types of buildings.",
    price: 6500,
    features: ["Corrosion resistant", "Modern design", "Soundproof"],
    image: "https://aimantdoors.com/wp-content/uploads/2022/12/Untitled-design-14.png",
    inStock: true
  },
  {
    id: 8,
    name: "Metal Fitting",
    category: "Metal Fittings",
    description: "Precision metal fittings for various industrial applications.",
    price: 500,
    features: ["Durable", "Custom sizes", "High quality finish"],
    image: "https://3.imimg.com/data3/LJ/QY/MY-6462933/stainless-steel-fittings-1000x1000.jpeg",
    inStock: true
  }
];


export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};