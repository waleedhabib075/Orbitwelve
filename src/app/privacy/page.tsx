import { pageMetadata } from "@/lib/seo";
import PrivacyClient from "./PrivacyClient";

export const metadata = pageMetadata({
  title: "Privacy Policy | Orbitwelve",
  description:
    "How Orbitwelve collects, uses, stores, and protects personal information, and the choices available to you.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <PrivacyClient />;
}
