import { HeaderNav } from '@/components/ui/Header';

export default function ExpediaHeader() {
  return (
    <>
      <HeaderNav />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-primary mb-4 text-3xl font-bold">Support</h1>
        <div className="bg-secondary/5 mb-6 rounded-lg p-6 shadow">
          <h2 className="text-primary mb-2 text-xl font-semibold">
            Need help? Our support team is available to assist you
          </h2>
          <ul className="text-primary/70 list-disc space-y-1 pl-5">
            <h3>You can contact us through the contact form, email, or live chat.</h3>
            <li>Frequently asked questions</li>
            <li>User guides</li>
            <li>Direct contact with support</li>
          </ul>
        </div>
      </div>
    </>
  );
}
