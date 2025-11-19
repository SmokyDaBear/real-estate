import type { TPage } from "../types";

export const navigateTo = (
  page: TPage | "home" | "listings" | "contact" | "agents"
) => {
  window.location.hash = `/${page}`;
};

export const navigateToListing = (id: string) => {
  window.location.hash = `/listings/${id}`;
};

export const navigateToAgent = (id: string) => {
  window.location.hash = `/agents/${id}`;
};
