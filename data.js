// Mock data for SaigonRide application

const stations = [
  {
    id: 'st1',
    name: 'Ben Thanh Station',
    address: '01 Le Loi, District 1',
    district: 'District 1',
    availableBikes: 15,
    availableScooters: 8,
    capacity: 30,
    lowInventory: false,
  },
  {
    id: 'st2',
    name: 'Nguyen Hue Station',
    address: 'Nguyen Hue Walking Street',
    district: 'District 1',
    availableBikes: 3,
    availableScooters: 2,
    capacity: 25,
    lowInventory: true,
  },
  {
    id: 'st3',
    name: 'Opera House Station',
    address: '07 Cong Truong Lam Son',
    district: 'District 1',
    availableBikes: 12,
    availableScooters: 10,
    capacity: 28,
    lowInventory: false,
  },
  {
    id: 'st4',
    name: 'Notre Dame Station',
    address: '01 Cong xa Paris',
    district: 'District 1',
    availableBikes: 2,
    availableScooters: 1,
    capacity: 20,
    lowInventory: true,
  },
  {
    id: 'st5',
    name: 'Bitexco Station',
    address: '02 Hai Trieu, District 1',
    district: 'District 1',
    availableBikes: 18,
    availableScooters: 12,
    capacity: 35,
    lowInventory: false,
  },
  {
    id: 'st6',
    name: 'District 7 Station',
    address: 'Nguyen Thi Thap, District 7',
    district: 'District 7',
    availableBikes: 20,
    availableScooters: 15,
    capacity: 40,
    lowInventory: false,
  },
];

const paymentMethods = [
  {
    id: 'momo',
    name: 'MoMo',
    description: 'Vietnamese e-wallet',
  },
  {
    id: 'vnpay',
    name: 'VNPay',
    description: 'Vietnamese payment gateway',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'International payment',
  },
  {
    id: 'applepay',
    name: 'Apple Pay',
    description: 'Apple payment service',
  },
  {
    id: 'cash',
    name: 'Cash',
    description: 'Pay at station',
  },
];

const pricing = {
  bike: 500,
  scooter: 1500,
  lowInventoryDiscount: 0.15,
};

const mockUsers = [
  {
    id: 'user1',
    username: 'commuter',
    email: 'commuter@example.com',
    role: 'user',
    name: 'Nguyen Van A',
  },
  {
    id: 'user2',
    username: 'admin',
    email: 'admin@saigonride.com',
    role: 'admin',
    name: 'Admin User',
  },
  {
    id: 'user3',
    username: 'tourist',
    email: 'tourist@example.com',
    role: 'user',
    name: 'John Smith',
  },
];

const revenueData = [
  { month: 'Jan', revenue: 45000000, rentals: 3200 },
  { month: 'Feb', revenue: 52000000, rentals: 3680 },
  { month: 'Mar', revenue: 61000000, rentals: 4100 },
  { month: 'Apr', revenue: 58000000, rentals: 3900 },
  { month: 'May', revenue: 67000000, rentals: 4500 },
  { month: 'Jun', revenue: 75000000, rentals: 5000 },
];

const mockRentals = [
  {
    id: 'r1',
    userId: 'user1',
    vehicleType: 'bike',
    startStation: 'Ben Thanh Station',
    returnStation: 'Opera House Station',
    duration: 30,
    price: 15000,
    discount: 0,
    status: 'completed',
    paymentMethod: 'MoMo',
  },
  {
    id: 'r2',
    userId: 'user3',
    vehicleType: 'scooter',
    startStation: 'Bitexco Station',
    returnStation: 'Nguyen Hue Station',
    duration: 20,
    price: 25500,
    discount: 4500,
    status: 'completed',
    paymentMethod: 'PayPal',
  },
  {
    id: 'r3',
    userId: 'user1',
    vehicleType: 'scooter',
    startStation: 'Ben Thanh Station',
    returnStation: 'District 7 Station',
    duration: 0,
    price: 0,
    discount: 0,
    status: 'active',
  },
];
