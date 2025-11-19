import type { TAgent } from "../types";
import { agentImages } from "./images";

export const agents: TAgent[] = [
  {
    id: "a1",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "555-1234",
    profileImage: agentImages["jane-doe"],
    bio: "Jane is a dedicated real estate agent with over 10 years of experience.",
    listingIds: ["1", "2"],
    fullBio:
      "Jane has been helping clients buy and sell homes for over a decade. Her expertise in the local market and commitment to customer satisfaction make her a top choice for anyone looking to navigate the real estate landscape.",
  },
  {
    id: "a2",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "555-5678",
    profileImage: agentImages["john-smith"],
    bio: "John specializes in luxury properties and has a strong track record.",
    listingIds: ["3", "4"],
    fullBio:
      "With a focus on luxury real estate, John has built a reputation for excellence in service and results. His deep understanding of high-end markets and personalized approach ensures that his clients receive the best possible experience when buying or selling premium properties.",
  },
];
