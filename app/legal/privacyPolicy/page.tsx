import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "Mkg Consultancy/Privacy Policy",
  description: "Privacy Policy",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-8 px-4 relative">
      
      {/* Sticky Back Button */}
      <Button
        asChild
        variant="outline"
        size="lg"
        className="fixed top-4 left-4 z-50 flex items-center gap-2"
      >
        <Link href="/" aria-label="Back to Home">
          Back
        </Link>
      </Button>

      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      
      <Card className="p-6 max-w-3xl w-full space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
        <p className="text-sm sm:text-base">
          At Mkg Consultancy Ltd, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
        </p>

        <h3 className="text-lg font-medium">Information We Collect</h3>
        <p className="text-sm sm:text-base">
          We may collect personal information that you provide to us directly, such as your name, email address, phone number, and any other information you choose to provide. We may also collect information automatically when you use our website, such as your IP address, browser type, and usage data.
        </p>

        <h3 className="text-lg font-medium">How We Use Your Information</h3>
        <p className="text-sm sm:text-base">
          We use the information we collect to provide, maintain, and improve our services, to communicate with you, to monitor and analyze usage and trends, and to comply with legal obligations.
        </p>

        <h3 className="text-lg font-medium">Sharing Your Information</h3>
        <p className="text-sm sm:text-base">
          We may share your information with third-party service providers who perform services on our behalf, such as hosting, data analysis, and customer service. We may also share your information to comply with legal obligations, to protect our rights and property, and with your consent.
        </p>

        <h3 className="text-lg font-medium">Your Rights</h3>
        <p className="text-sm sm:text-base">
          You have the right to access, correct, or delete your personal information. You may also have the right to object to or restrict certain processing of your information. To exercise these rights, please contact us at [contact email].
        </p>

        <h3 className="text-lg font-medium">Changes to This Privacy Policy</h3>
        <p className="text-sm sm:text-base">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h3 className="text-lg font-medium">Contact Us</h3>
        <p className="text-sm sm:text-base">
          If you have any questions about this Privacy Policy, please contact us at [contact email].
        </p>
      </Card>
    </div>
  );
}