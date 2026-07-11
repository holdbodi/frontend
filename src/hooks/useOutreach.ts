import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  donationsApi,
  foodDonationsApi,
  impactApi,
  initiativesApi,
  partnersApi,
  testimonialsApi,
  volunteersApi,
} from "@/lib/endpoints";
import type { DonationCreatePayload, FoodDonationPayload, PartnerPayload, VolunteerPayload } from "@/types";

export const queryKeys = {
  initiatives: ["initiatives"] as const,
  initiative: (slug: string) => ["initiatives", slug] as const,
  testimonials: ["testimonials"] as const,
  impact: ["impact"] as const,
};

export function useInitiatives() {
  return useQuery({
    queryKey: queryKeys.initiatives,
    queryFn: initiativesApi.list,
  });
}

export function useInitiative(slug: string | undefined) {
  return useQuery({
    queryKey: queryKeys.initiative(slug ?? ""),
    queryFn: () => initiativesApi.retrieve(slug as string),
    enabled: Boolean(slug),
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: queryKeys.testimonials,
    queryFn: testimonialsApi.list,
  });
}

export function useImpactMetrics() {
  return useQuery({
    queryKey: queryKeys.impact,
    queryFn: impactApi.retrieve,
    // Impact counters are meant to feel "live" - refresh periodically.
    refetchInterval: 60_000,
  });
}

export function useCreateDonation() {
  return useMutation({
    mutationFn: (payload: DonationCreatePayload) => donationsApi.create(payload),
  });
}

export function useVerifyDonation(reference: string | undefined) {
  return useQuery({
    queryKey: ["donation-verify", reference],
    queryFn: () => donationsApi.verify(reference as string),
    enabled: Boolean(reference),
    retry: 2,
  });
}

export function useCreateFoodDonation() {
  return useMutation({
    mutationFn: (payload: FoodDonationPayload) => foodDonationsApi.create(payload),
  });
}

export function useCreateVolunteer() {
  return useMutation({
    mutationFn: (payload: VolunteerPayload) => volunteersApi.create(payload),
  });
}

export function useCreatePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: PartnerPayload) => partnersApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.impact });
    },
  });
}
