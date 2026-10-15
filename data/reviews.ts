export interface ClientReview {
  id: string;
  name: string; // Client name or company name.
  role?: string; // Optional role and/or company beneath the name.
  image?: string; // e.g. /reviews/client.webp
  imageType?: "photo" | "logo";
  quote: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  services: string[];
  project?: { label: string; href: string }; // Internal path or HTTPS project URL.
}

// Add client-approved reviews here. Every entry in this list is public.
// Keep the client's wording and only add a rating if they supplied one.
// Example structure (replace all placeholder text before publishing):
// {
//   id: "client-project",
//   name: "Client name",
//   role: "Role, Company",
//   image: "/reviews/client.webp",
//   imageType: "photo", // Use "logo" to show the full logo without cropping.
//   quote: "Their review, in their own words.",
//   rating: 5,
//   services: ["Website Design & Development", "SEO"],
//   project: { label: "View their website", href: "https://example.com" },
// },
export const clientReviews: ClientReview[] = [];
