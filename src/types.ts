export type UserRole = 'customer' | 'seller';

export type CategoryType =
  | 'All'
  | 'Power Tools'
  | 'Lawn & Garden'
  | 'Woodworking'
  | 'Heavy Equipment & Concrete'
  | 'Automotive'
  | 'Cleaning & Pressure Washers'
  | 'Plumbing & Electrical'
  | 'Painting & Drywall'
  | 'Loadshedding & Solar';

export type PowerSourceType =
  | 'Cordless Battery'
  | 'Corded Electric'
  | 'Gasoline / Petrol'
  | 'Diesel Generator Compatible'
  | 'Manual / Hydraulic'
  | 'Pneumatic';

export type ConditionType = 'Like New' | 'Excellent' | 'Good' | 'Well-Used';

export interface BankDetails {
  bankName: string; // e.g. 'FNB', 'Capitec', 'Standard Bank', 'Nedbank', 'Absa', 'TymeBank'
  accountHolder: string;
  accountNumber: string;
  branchCode: string;
  accountType: 'Cheque / Current' | 'Savings';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string; // e.g. +27 82 555 1234
  role: UserRole;
  avatar: string;
  city: string; // e.g. 'Johannesburg', 'Cape Town', 'Durban', 'Pretoria'
  province: string; // e.g. 'Gauteng', 'Western Cape', 'KwaZulu-Natal'
  suburb: string; // e.g. 'Sandton', 'Sea Point', 'Umhlanga'
  ficaVerified: boolean;
  idNumberMasked: string; // e.g. '920412••••085'
  memberSince: string;
  rating: number;
  reviewCount: number;
  completedTransactions: number;
  bankDetails?: BankDetails;
  businessName?: string;
  taxVatNumber?: string;
}

export interface ToolOwner {
  id: string;
  name: string;
  avatar: string;
  type: 'Neighbor' | 'Pro Contractor' | 'Plant & Tool Hire';
  rating: number;
  reviewCount: number;
  memberSince: string;
  verified: boolean;
  ficaVerified?: boolean;
  responseRatePercent: number;
  responseTime: string;
  completedLends: number;
  location: string;
  bakkieDeliveryAvailable?: boolean;
}

export interface ToolSpec {
  label: string;
  value: string;
}

export interface ToolReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  project: string;
  comment: string;
}

export interface ToolItem {
  id: string;
  title: string;
  brand: string;
  model: string;
  category: CategoryType;
  dailyRate: number; // in ZAR (Rands)
  hourlyRate?: number; // in ZAR (Rands)
  weeklyDiscountPercent: number;
  securityDeposit: number; // in ZAR (Rands)
  replacementValue: number; // in ZAR (Rands)
  images: string[];
  description: string;
  specs: ToolSpec[];
  includedAccessories: string[];
  safetyGuidelines: string[];
  condition: ConditionType;
  powerSource: PowerSourceType;
  location: {
    city: string;
    province: string;
    neighborhood: string; // Suburb
    postalCode: string;
    distanceKm: number;
  };
  deliveryAvailable: boolean; // Bakkie Delivery
  deliveryFee: number; // in ZAR (Rands)
  instantBooking: boolean;
  owner: ToolOwner;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  isAvailable: boolean;
  status?: 'active' | 'rented' | 'maintenance' | 'paused';
  tags: string[];
  reviews?: ToolReview[];
}

export interface Booking {
  id: string;
  toolId: string;
  tool: ToolItem;
  startDate: string;
  endDate: string;
  days: number;
  dailyRate?: number;
  dailyPrice: number; // in ZAR (Rands)
  totalRental: number; // in ZAR (Rands)
  damageProtectionFee: number; // in ZAR (Rands)
  serviceFee: number; // in ZAR (Rands)
  deliveryFee: number; // in ZAR (Rands)
  safetyGearIncluded?: boolean;
  safetyGearFee?: number; // in ZAR (Rands)
  refundableDeposit: number; // in ZAR (Rands)
  totalPaid: number; // in ZAR (Rands)
  status: 'pending' | 'accepted' | 'active' | 'upcoming' | 'completed' | 'declined' | 'cancelled';
  deliveryType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  createdAt: string;
  qrCodeCheckin: string;
  pickupInstructions: string;
  renterName: string;
  renterId?: string;
  renterPhone?: string;
}

export type BookingRequest = Booking;


export interface ProjectKit {
  id: string;
  title: string;
  category: CategoryType;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedDuration: string;
  image: string;
  toolIds: string[];
  materialsList: string[];
  stepsCount: number;
  bundleDiscountPercent: number;
  keySteps: { title: string; desc: string; toolUsed?: string }[];
}

export interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  timestamp: string;
  attachment?: string;
}

export interface MessageThread {
  id: string;
  toolId: string;
  toolTitle: string;
  toolImage: string;
  otherUser: {
    name: string;
    avatar: string;
    role: 'owner' | 'renter';
    online: boolean;
  };
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  messages: Message[];
}

export interface CommunityImpact {
  totalSavedRands: number;
  toolsSharedCount: number;
  co2EmissionsSavedKg: number;
  activeCommunityMembers: number;
}
