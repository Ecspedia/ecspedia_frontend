import { HeaderNav } from "@/components/ui/Header";

export default function ExpediaHeader() {

  return (
    <>
      <HeaderNav />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-primary">Support</h1>
        <div className="bg-secondary/5 p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold text-primary mb-2">
            Need help? Our support team is available to assist you
          </h2>
          <ul className="list-disc pl-5 text-primary/70 space-y-1">
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