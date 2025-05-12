export type EmployeeRole = 'engineer' | 'technician' | 'sales' | 'management' | 'administration';

export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: EmployeeRole;
  department: string;
  joinDate: string;
  status: 'active' | 'on-leave' | 'inactive';
  avatar?: string;
}

// Generate mock employee data
export const employees: Employee[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh@madhuraengineering.com',
    phone: '9876543210',
    role: 'engineer',
    department: 'Design',
    joinDate: '2018-05-10',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya@madhuraengineering.com',
    phone: '9876543211',
    role: 'management',
    department: 'Operations',
    joinDate: '2019-02-15',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/3746314/pexels-photo-3746314.jpeg'
  },
  {
    id: 3,
    name: 'Vikram Mehta',
    email: 'vikram@madhuraengineering.com',
    phone: '9876543212',
    role: 'engineer',
    department: 'R&D',
    joinDate: '2017-11-03',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg'
  },
  {
    id: 4,
    name: 'Ananya Singh',
    email: 'ananya@madhuraengineering.com',
    phone: '9876543213',
    role: 'sales',
    department: 'Marketing',
    joinDate: '2020-07-22',
    status: 'active'
  },
  {
    id: 5,
    name: 'Mihir Patel',
    email: 'mihir@madhuraengineering.com',
    phone: '9876543214',
    role: 'technician',
    department: 'Production',
    joinDate: '2019-09-14',
    status: 'on-leave'
  },
  {
    id: 6,
    name: 'Deepa Joshi',
    email: 'deepa@madhuraengineering.com',
    phone: '9876543215',
    role: 'administration',
    department: 'HR',
    joinDate: '2018-12-05',
    status: 'active'
  },
  {
    id: 7,
    name: 'Arjun Nair',
    email: 'arjun@madhuraengineering.com',
    phone: '9876543216',
    role: 'engineer',
    department: 'Design',
    joinDate: '2021-01-10',
    status: 'active'
  },
  {
    id: 8,
    name: 'Kavita Reddy',
    email: 'kavita@madhuraengineering.com',
    phone: '9876543217',
    role: 'technician',
    department: 'Quality Control',
    joinDate: '2019-06-18',
    status: 'inactive'
  },
  {
    id: 9,
    name: 'Rahul Desai',
    email: 'rahul@madhuraengineering.com',
    phone: '9876543218',
    role: 'sales',
    department: 'Business Development',
    joinDate: '2020-03-25',
    status: 'active'
  },
  {
    id: 10,
    name: 'Meera Kapoor',
    email: 'meera@madhuraengineering.com',
    phone: '9876543219',
    role: 'management',
    department: 'Finance',
    joinDate: '2018-08-12',
    status: 'active'
  }
];

export const getEmployeeById = (id: number): Employee | undefined => {
  return employees.find(employee => employee.id === id);
};

export const getEmployeesByRole = (role: EmployeeRole): Employee[] => {
  return employees.filter(employee => employee.role === role);
};

export const getEmployeesByDepartment = (department: string): Employee[] => {
  return employees.filter(employee => employee.department === department);
};

export const getEmployeesByStatus = (status: 'active' | 'on-leave' | 'inactive'): Employee[] => {
  return employees.filter(employee => employee.status === status);
};

export const getDepartments = (): string[] => {
  return [...new Set(employees.map(employee => employee.department))];
};

export const getRoles = (): EmployeeRole[] => {
  return [...new Set(employees.map(employee => employee.role))];
};

export const getEmployeeStatistics = () => {
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(employee => employee.status === 'active').length;
  const onLeaveEmployees = employees.filter(employee => employee.status === 'on-leave').length;
  const inactiveEmployees = employees.filter(employee => employee.status === 'inactive').length;
  
  return {
    totalEmployees,
    activeEmployees,
    onLeaveEmployees,
    inactiveEmployees
  };
};