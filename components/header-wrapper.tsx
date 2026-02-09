import { getCachedHeaderData } from "@/lib/cache";
import { Header } from "./header";

interface HeaderWrapperProps {
  variant?: "transparent" | "solid";
}

export async function HeaderWrapper({ variant = "transparent" }: HeaderWrapperProps) {
  const { destinations, specialSections } = await getCachedHeaderData();

  return (
    <Header
      variant={variant}
      destinations={destinations.map((d) => ({
        name: d.name,
        slug: d.slug,
        image: d.image_url || "",
        description: "",
      }))}
      specialSections={specialSections}
    />
  );
}
