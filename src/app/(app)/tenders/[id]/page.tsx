import { tenders, suppliers } from "@/lib/mock-data";
import TenderDetailClient from "./TenderDetailClient";

export async function generateStaticParams() {
  return tenders.map((tender) => ({ id: tender.id }));
}

export default function TenderDetail({ params }: { params: { id: string } }) {
  const tender = tenders.find((t) => t.id === params.id) ?? tenders[0];
  const candidates = suppliers.slice(0, 4);

  return <TenderDetailClient tender={tender} candidates={candidates} />;
}
