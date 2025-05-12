export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  customerId: number;
  customer: Customer;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  notes?: string;
}

// Generate mock order data
export const orders: Order[] = [
  {
    id: 1,
    customerId: 1,
    customer: {
      id: 1,
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '9876543210',
      company: 'Tech Industries'
    },
    orderNumber: 'ORD-2025-001',
    date: '2025-05-12T10:30:00',
    status: 'delivered',
    items: [
      {
        id: 1,
        productId: 1,
        productName: 'Industrial CNC Machine',
        quantity: 1,
        unitPrice: 45000
      }
    ],
    totalAmount: 45000,
    shippingAddress: '123 Main St, Mumbai, Maharashtra, 400001',
    paymentMethod: 'Bank Transfer',
    notes: 'Priority delivery requested'
  },
  {
    id: 2,
    customerId: 2,
    customer: {
      id: 2,
      name: 'Priya Patel',
      email: 'priya@example.com',
      phone: '8765432109',
      company: 'Global Manufacturing'
    },
    orderNumber: 'ORD-2025-002',
    date: '2025-05-10T14:20:00',
    status: 'shipped',
    items: [
      {
        id: 2,
        productId: 3,
        productName: 'Precision Gear Assembly',
        quantity: 5,
        unitPrice: 7800
      },
      {
        id: 3,
        productId: 8,
        productName: 'Precision Bearing Assembly',
        quantity: 10,
        unitPrice: 4200
      }
    ],
    totalAmount: 81000,
    shippingAddress: '456 Industrial Zone, Delhi, 110001',
    paymentMethod: 'Credit Card'
  },
  {
    id: 3,
    customerId: 3,
    customer: {
      id: 3,
      name: 'Vikram Mehta',
      email: 'vikram@example.com',
      phone: '7654321098',
      company: 'Mehta Enterprises'
    },
    orderNumber: 'ORD-2025-003',
    date: '2025-05-08T09:15:00',
    status: 'processing',
    items: [
      {
        id: 4,
        productId: 4,
        productName: 'Automated Conveyor System',
        quantity: 1,
        unitPrice: 32000
      }
    ],
    totalAmount: 32000,
    shippingAddress: '789 Business Park, Bangalore, Karnataka, 560001',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 4,
    customerId: 4,
    customer: {
      id: 4,
      name: 'Ananya Singh',
      email: 'ananya@example.com',
      phone: '6543210987',
      company: 'Singh Fabrications'
    },
    orderNumber: 'ORD-2025-004',
    date: '2025-05-05T16:40:00',
    status: 'pending',
    items: [
      {
        id: 5,
        productId: 5,
        productName: 'Custom Fabricated Components',
        quantity: 3,
        unitPrice: 15000
      }
    ],
    totalAmount: 45000,
    shippingAddress: '101 Industrial Estate, Chennai, Tamil Nadu, 600001',
    paymentMethod: 'Credit Card',
    notes: 'Custom specifications attached'
  },
  {
    id: 5,
    customerId: 5,
    customer: {
      id: 5,
      name: 'Raj Malhotra',
      email: 'raj@example.com',
      phone: '5432109876',
      company: 'Malhotra Automation'
    },
    orderNumber: 'ORD-2025-005',
    date: '2025-05-03T11:20:00',
    status: 'cancelled',
    items: [
      {
        id: 6,
        productId: 6,
        productName: 'Robotic Arm System',
        quantity: 1,
        unitPrice: 52000
      }
    ],
    totalAmount: 52000,
    shippingAddress: '222 Tech Park, Hyderabad, Telangana, 500001',
    paymentMethod: 'Bank Transfer',
    notes: 'Cancelled due to project delays'
  },
  {
    id: 6,
    customerId: 6,
    customer: {
      id: 6,
      name: 'Neha Kapoor',
      email: 'neha@example.com',
      phone: '4321098765',
      company: 'Kapoor Industries'
    },
    orderNumber: 'ORD-2025-006',
    date: '2025-05-01T13:50:00',
    status: 'delivered',
    items: [
      {
        id: 7,
        productId: 7,
        productName: 'Industrial Pumping System',
        quantity: 2,
        unitPrice: 18500
      }
    ],
    totalAmount: 37000,
    shippingAddress: '333 Industrial Area, Pune, Maharashtra, 411001',
    paymentMethod: 'Credit Card'
  },
  {
    id: 7,
    customerId: 7,
    customer: {
      id: 7,
      name: 'Arjun Kumar',
      email: 'arjun@example.com',
      phone: '3210987654',
      company: 'Kumar Engineering'
    },
    orderNumber: 'ORD-2025-007',
    date: '2025-04-28T10:10:00',
    status: 'processing',
    items: [
      {
        id: 8,
        productId: 2,
        productName: 'Hydraulic Press System',
        quantity: 1,
        unitPrice: 28500
      },
      {
        id: 9,
        productId: 3,
        productName: 'Precision Gear Assembly',
        quantity: 2,
        unitPrice: 7800
      }
    ],
    totalAmount: 44100,
    shippingAddress: '444 Manufacturing Hub, Ahmedabad, Gujarat, 380001',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 8,
    customerId: 8,
    customer: {
      id: 8,
      name: 'Sanjay Verma',
      email: 'sanjay@example.com',
      phone: '2109876543',
      company: 'Verma & Sons'
    },
    orderNumber: 'ORD-2025-008',
    date: '2025-04-25T09:30:00',
    status: 'shipped',
    items: [
      {
        id: 10,
        productId: 8,
        productName: 'Precision Bearing Assembly',
        quantity: 20,
        unitPrice: 4200
      }
    ],
    totalAmount: 84000,
    shippingAddress: '555 Business Center, Kolkata, West Bengal, 700001',
    paymentMethod: 'Credit Card'
  }
];

export const getOrderById = (id: number): Order | undefined => {
  return orders.find(order => order.id === id);
};

export const getOrdersByStatus = (status: OrderStatus): Order[] => {
  return orders.filter(order => order.status === status);
};

export const getOrdersByCustomerId = (customerId: number): Order[] => {
  return orders.filter(order => order.customerId === customerId);
};

export const getOrderStatistics = () => {
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const completedOrders = orders.filter(order => order.status === 'delivered').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  
  return {
    totalOrders,
    pendingOrders,
    completedOrders,
    totalRevenue
  };
};