import { api } from "@/lib/api";
import type {
  DonationCreatePayload,
  DonationResponse,
  FoodDonationPayload,
  ImpactMetrics,
  Initiative,
  Paginated,
  PartnerPayload,
  Testimonial,
  VolunteerPayload,
} from "@/types";

export const initiativesApi = {
  list: async (): Promise<Initiative[]> => {
    const { data } = await api.get<Paginated<Initiative>>("/initiatives/");
    return data.results;
  },
  retrieve: async (slug: string): Promise<Initiative> => {
    const { data } = await api.get<Initiative>(`/initiatives/${slug}/`);
    return data;
  },
};

export const donationsApi = {
  create: async (payload: DonationCreatePayload): Promise<DonationResponse> => {
    const { data } = await api.post<DonationResponse>("/donations/", payload);
    return data;
  },
  verify: async (reference: string): Promise<DonationResponse> => {
    const { data } = await api.get<DonationResponse>(`/donations/verify/${reference}/`);
    return data;
  },
};

export const foodDonationsApi = {
  create: async (payload: FoodDonationPayload) => {
    const { data } = await api.post("/food-donations/", payload);
    return data;
  },
};

export const volunteersApi = {
  create: async (payload: VolunteerPayload) => {
    const form = new FormData();
    form.append("full_name", payload.full_name);
    form.append("email", payload.email);
    form.append("phone_number", payload.phone_number);
    form.append("location", payload.location);
    form.append("occupation", payload.occupation);
    payload.skills.forEach((skill) => form.append("skills", skill));
    form.append("availability", payload.availability);
    (payload.specific_dates ?? []).forEach((date) => form.append("specific_dates", date));
    form.append("profile_photo", payload.profile_photo);

    const { data } = await api.post("/volunteers/", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },
};

export const partnersApi = {
  create: async (payload: PartnerPayload) => {
    const { data } = await api.post("/partners/", payload);
    return data;
  },
};

export const testimonialsApi = {
  list: async (): Promise<Testimonial[]> => {
    const { data } = await api.get<Paginated<Testimonial>>("/testimonials/");
    return data.results;
  },
};

export const impactApi = {
  retrieve: async (): Promise<ImpactMetrics> => {
    const { data } = await api.get<ImpactMetrics>("/impact/");
    return data;
  },
};
