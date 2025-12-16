import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { PackageCard } from "@/components/package-card";
import { PackageDetailContent } from "./package-detail-content";
import { getPackageBySlug, getPackageById, getRelatedPackages } from "@/lib/services/packages";
import {
  getPackageById as getPackageByIdMock,
  getRelatedOrFeaturedPackages as getRelatedMock,
} from "@/lib/packages-data";

async function getPackageData(id: string) {
  try {
    // Intentar buscar por UUID (Supabase) o por slug
    let pkg = await getPackageById(id);
    if (!pkg) {
      pkg = await getPackageBySlug(id);
    }

    if (pkg) {
      const related = await getRelatedPackages(pkg.slug, pkg.destinationSlug, 3);
      return { pkg, related };
    }

    // Fallback a datos mock (si es un número)
    const numId = Number(id);
    if (!isNaN(numId)) {
      const mockPkg = getPackageByIdMock(numId);
      if (mockPkg) {
        const mockRelated = getRelatedMock(mockPkg, 3);
        return { pkg: mockPkg, related: mockRelated };
      }
    }

    return { pkg: null, related: [] };
  } catch {
    // Fallback a mock
    const numId = Number(id);
    if (!isNaN(numId)) {
      const mockPkg = getPackageByIdMock(numId);
      if (mockPkg) {
        const mockRelated = getRelatedMock(mockPkg, 3);
        return { pkg: mockPkg, related: mockRelated };
      }
    }
    return { pkg: null, related: [] };
  }
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { pkg, related } = await getPackageData(id);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header variant="solid" />
      <main className="pt-20">
        <PackageDetailContent pkg={pkg} relatedPackages={related} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
