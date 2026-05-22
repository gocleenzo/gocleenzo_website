export const metadata = {
  title: 'Privacy Policy — Cleenzo',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose">
      <h1>Privacy Policy</h1>
      <p className="text-gray-500">Last updated: May 2025</p>

      <h2>Information we collect</h2>
      <p>We collect information you provide: name, phone number, and address when you register for the Cleenzo app. We also collect booking history and payment confirmation records.</p>

      <h2>How we use your information</h2>
      <p>We use your information to match you with cleaning professionals, process bookings, send you updates via SMS and push notifications, and improve our services.</p>

      <h2>Data sharing</h2>
      <p>We share your address and name with the assigned cleaning professional for the purpose of completing your booking. We do not sell your personal data to third parties.</p>

      <h2>Data security</h2>
      <p>Your data is stored securely using industry-standard encryption. We use Supabase for data storage, which complies with international data security standards.</p>

      <h2>Contact us</h2>
      <p>For any privacy-related questions, email us at: privacy@cleenzo.in</p>
    </div>
  );
}