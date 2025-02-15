import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export const metadata = {
  title: "Mkg Consultancy/Terms and Conditions",
  description: "Terms and Conditions",
};

export default function TermsAndConditions() {
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

      <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
      
      <Card className="p-6 max-w-3xl w-full space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
        <p className="text-sm sm:text-base">
          Welcome to Mkg Consultancy Ltd. These terms and conditions outline the rules and regulations for the use of our website and services.
        </p>

        <h3 className="text-lg font-medium">Acceptance of Terms</h3>
        <p className="text-sm sm:text-base">
          By accessing and using our website and services, you accept and agree to be bound by these terms and conditions. If you do not agree to these terms, please do not use our website or services.
        </p>

        <h3 className="text-lg font-medium">Changes to Terms</h3>
        <p className="text-sm sm:text-base">
          We reserve the right to modify these terms and conditions at any time. We will notify you of any changes by posting the new terms and conditions on our website. You are advised to review these terms periodically for any changes.
        </p>

        <h3 className="text-lg font-medium">Use of Services</h3>
        <p className="text-sm sm:text-base">
          You agree to use our services only for lawful purposes and in accordance with these terms and conditions. You agree not to use our services in any way that could damage, disable, overburden, or impair our website or interfere with any other party's use of our services.
        </p>

        <h3 className="text-lg font-medium">Intellectual Property</h3>
        <p className="text-sm sm:text-base">
          The content, design, and layout of our website and services are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from any content on our website without our prior written consent.
        </p>

        <h3 className="text-lg font-medium">Limitation of Liability</h3>
        <p className="text-sm sm:text-base">
          Mkg Consultancy Ltd shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our website or services, even if we have been advised of the possibility of such damages.
        </p>

        <h3 className="text-lg font-medium">Governing Law</h3>
        <p className="text-sm sm:text-base">
          These terms and conditions are governed by and construed in accordance with the laws of the United Kingdom, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </p>

        <h3 className="text-lg font-medium">Contact Us</h3>
        <p className="text-sm sm:text-base">
          If you have any questions about these terms and conditions, please contact us at mkg.consultancy.uk@gmail.com .
        </p>
      </Card>
    </div>
  );
}