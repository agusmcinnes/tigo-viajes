"use server";

import { updateTag } from "next/cache";

export async function revalidatePackages() {
  updateTag("packages");
}

export async function revalidateDestinations() {
  updateTag("destinations");
  updateTag("header-data");
}

export async function revalidateSections() {
  updateTag("sections");
  updateTag("header-data");
}
