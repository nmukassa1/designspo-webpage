import BrandName from "@/app/components/BrandName";

function page() {
  return (
    <>
      <div className="font-sans mx-auto my-8 max-w-3xl leading-relaxed text-gray-800">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>

        <p>
          At <strong>Designspo</strong>, we respect your privacy and are
          committed to protecting your personal information. This policy
          explains what data we collect, why we collect it, and how it's
          handled.
        </p>

        <h2 className="mt-8 text-xl font-semibold">🔐 What We Collect</h2>
        <ul className="list-disc list-inside">
          <li>
            We collect <strong>email addresses</strong> solely for the purpose
            of <strong>authenticating users</strong> and enabling access to
            their saved screenshots and dashboard content.
          </li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold">✅ How We Use Your Data</h2>
        <ul className="list-disc list-inside">
          <li>
            Email addresses are used to log users in and associate their saved
            inspiration content.
          </li>
          <li>
            We do <strong>not</strong> use emails for marketing, advertising, or
            tracking.
          </li>
          <li>No other personal data is collected or stored.</li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold">🚫 What We Don’t Do</h2>
        <ul className="list-disc list-inside">
          <li>
            We do <strong>not</strong> sell, share, or rent user data to any
            third parties.
          </li>
          <li>
            We do <strong>not</strong> track your browsing activity across
            websites.
          </li>
          <li>
            We do <strong>not</strong> store your browsing history.
          </li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold">
          🛠 Permissions We Use (Chrome Extension)
        </h2>
        <ul className="list-disc list-inside">
          <li>
            <code>activeTab</code>: To take screenshots of the current tab when
            you click capture.
          </li>
          <li>
            <code>cookies</code>: To maintain session state if applicable.
          </li>
          <li>
            <code>host permissions</code>: To access content only when the user
            takes a screenshot.
          </li>
          <li>
            <code>scripting</code>: To capture and process webpage visuals.
          </li>
          <li>
            <code>storage</code>: To locally save your screenshots and
            preferences.
          </li>
          <li>
            <code>tabs</code>: To get the active tab info when capturing.
          </li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold">
          🔒 Data Storage & Security
        </h2>
        <ul className="list-disc list-inside">
          <li>
            All user content (screenshots, dashboard data) is stored{" "}
            <strong>locally</strong> in your browser using Chrome's storage API.
          </li>
          <li>
            We do not transmit, process, or store data on external servers
            unless you opt into backup/export features.
          </li>
          <li>
            We take reasonable measures to protect your data from unauthorized
            access.
          </li>
        </ul>
      </div>
    </>
  );
}

export default page;
