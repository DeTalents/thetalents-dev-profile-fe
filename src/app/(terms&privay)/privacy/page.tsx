import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | TheTalents.rw',
  description:
    'Learn how TheTalents.rw protects and manages your personal data and privacy.',
  keywords: [
    'TheTalents.rw',
    'privacy',
    'data protection',
    'Rwanda',
    'personal information',
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'Privacy Policy | TheTalents.rw',
    description:
      'Learn how TheTalents.rw protects and manages your personal data and privacy.',
    type: 'website',
    url: 'https://www.thetalents.rw/privacy',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | TheTalents.rw',
    description:
      'Learn how TheTalents.rw protects and manages your personal data and privacy.',
  },
};

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Privacy Policy for TheTalents.rw
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Effective Date: April 1st 2025
      </p>

      <p className="text-gray-700 mb-6">
        Welcome to TheTalents.rw! Your privacy is important to us, and we are
        committed to protecting your personal information. This Privacy Policy
        explains how we collect, use, and safeguard your data when you use our
        platform. By using TheTalents.rw, you consent to the practices described
        in this policy.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Personal Information</strong>: When you create an account
              or use our platform, we may collect your name, email address,
              profile picture, and other personal details you provide.
            </li>
            <li>
              <strong>Professional Information</strong>: We may collect data
              related to your professional background, such as your resume,
              portfolio, skills, and job preferences.
            </li>
            <li>
              <strong>Usage Data</strong>: We gather information about how you
              use our platform, including interactions, preferences, and
              activity logs.
            </li>
            <li>
              <strong>Device Information</strong>: We may collect information
              about your device, including device type, operating system, and
              unique identifiers.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            2. How We Use Your Data
          </h2>
          <p className="text-gray-700 mb-2">
            We use the collected data for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Platform Functionality</strong>: To facilitate connections
              between developers and clients, enabling job postings,
              applications, and communications.
            </li>
            <li>
              <strong>Personalization</strong>: To provide personalized job
              recommendations and content based on your profile and activity.
            </li>
            <li>
              <strong>Communication</strong>: To send updates, notifications,
              and other platform-related communications.
            </li>
            <li>
              <strong>Improvement</strong>: To analyze user behavior and improve
              our platforms functionality and user experience.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. Data Sharing</h2>
          <p className="text-gray-700 mb-2">We may share your data with:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Other Users</strong>: With your consent, we may share your
              profile information with potential employers or clients.
            </li>
            <li>
              <strong>Service Providers</strong>: We may use third-party
              services to process payments, provide analytics, or support
              platform operations.
            </li>
            <li>
              <strong>Legal Obligations</strong>: If required by law, we may
              disclose your information to comply with legal processes or
              protect our rights.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">4. User Controls</h2>
          <p className="text-gray-700">
            You can access, update, or delete your personal information within
            your account settings. You can also manage your communication
            preferences and opt out of marketing communications.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">5. Data Security</h2>
          <p className="text-gray-700">
            We implement reasonable security measures to protect your data from
            unauthorized access or disclosure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            6. Cookies and Tracking
          </h2>
          <p className="text-gray-700">
            Our platform may use cookies and tracking technologies to enhance
            your user experience and provide analytics. You can manage cookie
            preferences in your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">7. Childrens Privacy</h2>
          <p className="text-gray-700">
            Our platform is not intended for individuals under 18 years of age.
            We do not knowingly collect data from children. If we become aware
            that we have collected personal information from a child, we will
            take steps to delete such information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            8. Changes to Privacy Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. We will notify
            you of any significant changes through the platform or by email.
            Continued use of the platform after changes constitutes acceptance
            of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">9. Contact Us</h2>
          <p className="text-gray-700">
            If you have questions or concerns about your privacy or this Privacy
            Policy, please contact us at <strong>team@thetalents.rw</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">10. Legal Compliance</h2>
          <p className="text-gray-700">
            Our app complies with applicable laws, including law no. 058/2021 OF
            13/10/2021 relating to the protection of personal data and privacy.
          </p>
        </section>

        <div className="bg-gray-100 p-4 rounded-lg mt-8">
          <p className="text-gray-700 text-center">
            Thank you for using TheTalents.rw!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
