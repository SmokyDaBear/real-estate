export type TPropertyListing = {
  id: string;
  agentId: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  hasPool?: boolean;
  images: string[];
  listedDate: Date;
  listingStatus: "available" | "pending" | "sold";
};

export type TAgent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  bio: string;
  fullBio: string;
  listingIds: string[]; // Array of PropertyListing IDs
};

export type TReview = {
  id: string;
  propertyId: string;
  reviewerName: string;
  rating: number; // 1 to 5
  comment: string;
  reviewDate: Date;
};

export type TAppointment = {
  id: string;
  propertyId: string;
  agentId: string;
  clientName: string;
  clientEmail: string;
  appointmentDate: Date;
  status: "scheduled" | "completed" | "canceled";
};
export type TPage = "home" | "listings" | "contact" | "agents" | "404";
