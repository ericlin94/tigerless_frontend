import type {
  HomeContent,
  ConsultationRequest,
  ConsultationPreview,
} from "./contracts";
import { homeContent } from "./mock-content";

// Replace this adapter with a validated API response when the backend exists.
export async function getHomeContent(): Promise<HomeContent> {
  return homeContent;
}

export function previewConsultation(
  request: ConsultationRequest,
): ConsultationPreview {
  const service = homeContent.services.find(
    (item) => item.id === request.serviceId,
  );
  if (!service || !homeContent.languages.includes(request.language)) {
    throw new Error("Unknown care program or language.");
  }
  return {
    status: "preview",
    serviceLabel: service.label,
    language: request.language,
    email: request.email,
  };
}
