import Link from "next/link";
import { notFound } from "next/navigation";
import { createClassNames } from "@/lib/component-class-names";
import uiStyles from "@/components/ui/ui.module.css";
import styles from "./information-page.module.css";
const classNames = createClassNames({ ...uiStyles, ...styles });

const pages: Record<string, { title: string; body: string }> = {
  terms: {
    title: "Terms & Conditions",
    body: "This take-home project is a frontend demonstration. No purchases, prescriptions, accounts, or consultations are created. Production terms would be supplied by Apsu before launch.",
  },
  privacy: {
    title: "Privacy Policy",
    body: "This demonstration does not send or persist form entries. A production privacy policy, data retention rules, and consent flow would be supplied before connecting a backend.",
  },
  safety: {
    title: "Medication Safety Information",
    body: "Medical care is provided by independent, licensed providers. Payment does not guarantee a prescription. Compounded medication is not FDA-approved or evaluated by the FDA. Treatment eligibility is determined by a physician. If this is an emergency, call 911.",
  },
  blogs: {
    title: "Apsu Journal",
    body: "There are no articles in the mock content yet. Future editorial content will be provided through the content API.",
  },
};
export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}
export default async function InformationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();
  return (
    <main className={classNames("information-page")}>
      <Link href="/" className={classNames("action action-outline")}>
        Back to Apsu
      </Link>
      <h1>{page.title}</h1>
      <p>{page.body}</p>
    </main>
  );
}
