import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | TheTalents.rw',
  description:
    'Read the terms and conditions for TheTalents.rw, a platform connecting developers and clients in Rwanda.',
  keywords: [
    'TheTalents.rw',
    'terms',
    'conditions',
    'Rwanda',
    'developers',
    'clients',
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'Terms and Conditions | TheTalents.rw',
    description:
      'Read the terms and conditions for TheTalents.rw, a platform connecting developers and clients in Rwanda.',
    type: 'website',
    url: 'https://www.thetalents.rw/terms',
  },
  twitter: {
    card: 'summary',
    title: 'Terms and Conditions | TheTalents.rw',
    description:
      'Read the terms and conditions for TheTalents.rw, a platform connecting developers and clients in Rwanda.',
  },
};

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Terms and Conditions for TheTalents.rw
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Effective Date: April 1st 2025
      </p>

      <p className="text-gray-700 mb-6">
        Welcome to TheTalents.rw, a platform dedicated to connecting developers
        and clients in Rwanda. By accessing or using our platform, you agree to
        comply with the following terms and conditions.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. User Registration</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Users must create an account to access certain features.</li>
            <li>
              You are responsible for maintaining the security of your account.
            </li>
            <li>
              Providing false information or impersonating others is strictly
              prohibited.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. Profile Listings</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Developers and clients are responsible for ensuring the accuracy
              and completeness of their profiles.
            </li>
            <li>
              TheTalents.rw functions solely as a connector and does not take
              responsibility for job placements or the quality of services
              provided by talent/developers.
            </li>
            <li>
              Any content uploaded must not infringe on third-party rights or be
              misleading.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            3. Privacy and Data Usage
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Personal data collected is governed by our Privacy Policy.</li>
            <li>
              By using TheTalents.rw, you consent to the collection, storage,
              and processing of your information.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">4. User Conduct</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Users must act professionally and respectfully within the
              platform.
            </li>
            <li>
              Harassment, discrimination, and spamming are strictly prohibited.
            </li>
            <li>Violations may result in account suspension or termination.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            5. Liability and Disclaimers
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              TheTalents.rw provides the platform as is without warranties.
            </li>
            <li>
              We do not guarantee job success, service quality, or uninterrupted
              platform operation.
            </li>
            <li>
              TheTalents.rw is not liable for damages resulting from the use of
              our platform.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            6. Termination of Accounts
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              TheTalents.rw reserves the right to suspend or terminate accounts
              for violations of these Terms.
            </li>
            <li>Users may request account deletion by contacting support.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            7. Governing Law and Jurisdiction
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>These Terms are governed by the laws of Rwanda.</li>
            <li>Any disputes will be resolved in competent Rwandan courts.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">8. Changes to Terms</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>TheTalents.rw may update these Terms at any time.</li>
            <li>
              Continued use of the platform after changes constitutes acceptance
              of the updated Terms.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">9. Legal Compliance</h2>
          <p className="text-gray-700">
            Our app complies with applicable laws, including law no. 058/2021 OF
            13/10/2021 relating to the protection of personal data and privacy.
          </p>
        </section>

        <div className="bg-gray-100 p-4 rounded-lg mt-8">
          <p className="text-gray-700 text-center">
            Thank you for using TheTalents.rw.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
