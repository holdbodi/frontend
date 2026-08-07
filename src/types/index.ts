export type InitiativeType = "sara" | "event";

export type InitiativeStatus = "active" | "upcoming" | "completed";

export interface Initiative {
  id: number;
  title: string;
  slug: string;
  initiative_type: InitiativeType;
  event_tag: string | null;
  description: string;
  detailed_description?: string;
  cover_image: string | null;
  status: InitiativeStatus;
  is_standing: boolean;
  target_amount: string | null;
  target_beneficiaries: number | null;
  amount_raised: string;
  beneficiaries_funded: number;
  donations_count: number;
  progress_percentage: number;
  start_date: string | null;
  end_date: string | null;
  cost_per_beneficiary?: string;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type DonationStatus = "pending" | "successful" | "failed" | "abandoned";

export interface DonationCreatePayload {
  initiative: string; // slug
  amount: string;
  is_anonymous: boolean;
  donor_name?: string;
  donor_email?: string;
  donor_phone?: string;
}

export interface DonationResponse {
  reference: string;
  amount: string;
  beneficiaries_supported: number;
  currency: string;
  status: DonationStatus;
  payment_url: string | null;
  display_name: string;
}

export type DeliveryOption = "pickup" | "delivery";

export interface FoodDonationPayload {
  full_name: string;
  email: string;
  phone_number: string;
  food_item: string;
  quantity: string;
  delivery_option: DeliveryOption;
  preferred_date: string;
  additional_notes?: string;
}

export type VolunteerAvailability = "weekends" | "weekdays" | "flexible" | "specific_dates";

export interface VolunteerPayload {
  full_name: string;
  email: string;
  phone_number: string;
  location: string;
  occupation: string;
  skills: string[];
  availability: VolunteerAvailability;
  specific_dates?: string[];
  profile_photo: File;
}

export type PartnerSupportType = "funding" | "food_items" | "product_support" | "other";

export interface PartnerPayload {
  company_name: string;
  contact_person: string;
  email: string;
  phone_number: string;
  support_type: PartnerSupportType;
  estimated_contribution?: string;
  initiatives?: string[]; // slugs
}

export type TestimonialAuthorRole = "community" | "volunteer" | "partner";

export interface Testimonial {
  id: number;
  author_name: string;
  author_role: TestimonialAuthorRole;
  photo: string | null;
  content: string;
  initiative: number | null;
  initiative_title: string | null;
  is_featured: boolean;
  display_order: number;
}

export interface ImpactMetrics {
  people_supported: number;
  volunteers: number;
  brands: number;
  communities_reached: number;
  total_amount_donated: string;
}
