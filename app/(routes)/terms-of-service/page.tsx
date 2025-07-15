import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Inspire Partners",
  description:
    "Read the terms and conditions for using Inspire Partners' website and services. Understand your rights and obligations when using our financial advisory services.",
  keywords: [
    "terms of service",
    "terms and conditions",
    "website terms",
    "service agreement",
    "Inspire Partners terms",
  ],
  openGraph: {
    title: "Terms of Service - Inspire Partners",
    description:
      "Terms and conditions for using our website and financial services.",
    type: "website",
  },
};

export default function TermsOfServicePage() {
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
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-4xl mx-auto container">
        <h1
          className="text-4xl font-bold mb-8 text-center"
          style={{ color: "#052f46" }}
        >
          Terms of Service
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
              Acceptance of Terms
            </h2>
            <p className="mb-4">
              By accessing and using this website, you accept and agree to be
              bound by the terms and provision of this agreement. If you do not
              agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#052f46" }}
            >
              Use License
            </h2>
            <p className="mb-4">
              Permission is granted to temporarily download one copy of the
              materials on Inspire Partners&apos; website for personal,
              non-commercial transitory viewing only.
            </p>
            <p className="mb-4">
              This is the grant of a license, not a transfer of title, and under
              this license you may not:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Modify or copy the materials</li>
              <li>
                Use the materials for any commercial purpose or for any public
                display
              </li>
              <li>
                Attempt to reverse engineer any software contained on the
                website
              </li>
              <li>
                Remove any copyright or other proprietary notations from the
                materials
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#052f46" }}
            >
              Disclaimer
            </h2>
            <p className="mb-4">
              The materials on Inspire Partners&apos; website are provided on an
              &apos;as is&apos; basis. Inspire Partners makes no warranties,
              expressed or implied, and hereby disclaims and negates all other
              warranties including without limitation, implied warranties or
              conditions of merchantability, fitness for a particular purpose,
              or non-infringement of intellectual property or other violation of
              rights.
            </p>
          </section>

          <section className="mb-8">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#052f46" }}
            >
              Limitations
            </h2>
            <p className="mb-4">
              In no event shall Inspire Partners or its suppliers be liable for
              any damages (including, without limitation, damages for loss of
              data or profit, or due to business interruption) arising out of
              the use or inability to use the materials on Inspire
              Partners&apos; website, even if Inspire Partners or a Inspire
              Partners authorized representative has been notified orally or in
              writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#052f46" }}
            >
              Accuracy of Materials
            </h2>
            <p className="mb-4">
              The materials appearing on Inspire Partners&apos; website could
              include technical, typographical, or photographic errors. Inspire
              Partners does not warrant that any of the materials on its website
              are accurate, complete, or current. Inspire Partners may make
              changes to the materials contained on its website at any time
              without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#052f46" }}
            >
              Links
            </h2>
            <p className="mb-4">
              Inspire Partners has not reviewed all of the sites linked to its
              website and is not responsible for the contents of any such linked
              site. The inclusion of any link does not imply endorsement by
              Inspire Partners of the site. Use of any such linked website is at
              the user&apos;s own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#052f46" }}
            >
              Modifications
            </h2>
            <p className="mb-4">
              Inspire Partners may revise these terms of service for its website
              at any time without notice. By using this website you are agreeing
              to be bound by the then current version of these Terms of Service.
            </p>
          </section>

          <section className="mb-8">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#052f46" }}
            >
              Governing Law
            </h2>
            <p className="mb-4">
              These terms and conditions are governed by and construed in
              accordance with the laws of Australia and you irrevocably submit
              to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section className="mb-8">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#052f46" }}
            >
              Contact Information
            </h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please
              contact us:
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
