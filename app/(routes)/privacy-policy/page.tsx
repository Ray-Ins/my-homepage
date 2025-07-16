import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Inspire Partners",
  description: "Learn about how Inspire Partners collects, uses, and protects your personal information. Our privacy policy explains our data practices and your rights.",
  keywords: ["privacy policy", "data protection", "cookie policy", "personal information", "Inspire Partners privacy"],
  openGraph: {
    title: "Privacy Policy - Inspire Partners",
    description: "Our commitment to protecting your privacy and personal information.",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div
      className="py-12 min-h-screen relative"
      style={{
        backgroundColor: "#003447",
        color: "#052f46",
        backgroundImage: `url('/background/background.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
      }}
    >
      <div className="max-w-4xl mx-auto container">
        <h1
          className="text-4xl font-bold mb-8 text-center"
          style={{ color: "#052f46" }}
        >
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none" style={{ color: "#052f46" }}>
          <p className="text-lg mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#052f46" }}
            >
              Information We Collect
            </h2>
            <p className="mb-4">
              We collect information you provide directly to us, such as when
              you:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Fill out our contact forms</li>
              <li>Register for events</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us via email or phone</li>
            </ul>
            <p>
              This information may include your name, email address, phone
              number, organization, and any other information you choose to
              provide.
            </p>
          </section>

          <section className="mb-8">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#052f46" }}
            >
              How We Use Your Information
            </h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Process event registrations</li>
              <li>Send you important updates and notifications</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our website and services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#052f46" }}
            >
              Cookies and Third-Party Services
            </h2>
            <p className="mb-4">
              Our website uses cookies and may integrate with third-party
              services:
            </p>

            <h3
              className="text-xl font-semibold mb-3"
              style={{ color: "#052f46" }}
            >
              Essential Cookies
            </h3>
            <p className="mb-4">
              These cookies are necessary for the website to function properly
              and cannot be disabled.
            </p>

            <h3
              className="text-xl font-semibold mb-3"
              style={{ color: "#052f46" }}
            >
              Third-Party Services
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Google Maps:</strong> We embed Google Maps to show our
                office location. Google may set cookies for analytics and
                personalization.
              </li>
              <li>
                <strong>Email Services:</strong> We use email services to send
                event confirmations and communications.
              </li>
            </ul>

            <p className="mb-4">
              You can control cookie settings through your browser preferences.
              However, disabling certain cookies may affect website
              functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#052f46" }}
            >
              Information Sharing
            </h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personal
              information to third parties, except in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>
                With trusted service providers who assist us in operating our
                website
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#052f46" }}
            >
              Data Security
            </h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#052f46" }}
            >
              Your Rights
            </h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Withdraw consent for data processing</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#052f46" }}
            >
              Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div
              className="bg-gray-100 p-4 rounded-lg"
              style={{ backgroundColor: "rgba(227, 211, 160, 0.1)" }}
            >
              <p className="mb-2">
                <strong>Email:</strong> RayJ@inspirepartners.com.au
              </p>
              <p className="mb-2">
                <strong>Phone:</strong> 04 4958 8614
              </p>
              <p>
                <strong>Address:</strong> L1/534 Whitehorse Road, Mitcham, Vic
                3132
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
