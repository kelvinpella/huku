import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – Huku",
  description:
    "The official Privacy Policy of Huku. Learn how we collect, store, and use your personal information. We are committed to safeguarding your data and respecting your right to privacy.",
};

export default function PrivacyPolicy() {
  return (
    <div className="w-full lg:max-w-screen-lg mx-auto px-2 py-6 my-12">
      <h1>Privacy Policy</h1>

      <p>
        <strong>Huku</strong> is committed to protecting and respecting your
        privacy. If you have any questions about your personal information,
        please contact us.
      </p>

      <h2>Information We Collect About You</h2>
      <p>The type of information we collect about you includes:</p>
      <ul className="list-disc list-inside">
        <li>Your name or username</li>
        <li>Your email address (used when you sign up).</li>
        <li>The date and time of your job post.</li>
        <li>Information about your job.</li>
        <li>
          Any other information you provide to enable you to use this service.
        </li>
      </ul>

      <p>
        We may collect some or all of this information in the following ways:
      </p>
      <ul className="list-disc list-inside">
        <li>You register as a user of this website.</li>
        <li>You fill out a contact form.</li>
        <li>You post a job.</li>
        <li>You fill out a profile section.</li>
      </ul>

      <h2>How We Use Your Personal Information</h2>
      <p>We may use your personal information in the following ways:</p>
      <ul className="list-disc list-inside">
        <li>
          Keeping records of website visitors for the security and stability of
          our system.
        </li>
        <li>
          Enabling you to become a registered member and contribute posts to
          this website.
        </li>
        <li>
          Using your email to send you important information about this website.
        </li>
        <li>
          Communicating with all users regularly through important posts via
          email.
        </li>
      </ul>
      <p>
        We may also collect information that does not directly identify you,
        such as the type of device you use. This is for the purpose of analytics
        and tracking the number of visitors to our website.
      </p>

      <h2>Protection of Your Information</h2>
      <p>
        hukutz.com is committed to ensuring that all the information you provide
        to us is secure. We have implemented appropriate measures and procedures
        to prevent the leakage of personal information.
      </p>

      <h2>Cookie Policy</h2>
      <p>
        Cookies are small text files that we place on your computer to enable
        certain services, such as logging into your account without having to
        enter your password repeatedly. You can read more about our use of
        cookies.
      </p>

      <h2>Your Rights</h2>
      <p>You have the right to:</p>
      <ul className="list-disc list-inside">
        {/* <li>Request a copy of the personal information we hold about you.</li> */}
        <li>Correct or complete inaccurate or incomplete information.</li>
        <li>
          Request that we delete your information entirely from our system.
        </li>
      </ul>

      <h2>Acceptance of This Policy</h2>
      <p>
        Continuing to use our website confirms that you have agreed to this
        policy. If you do not agree, please do not use this website.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        <strong>Huku</strong> may make changes to this policy at any time.
        You may be asked to review and re-accept this policy if there are
        significant changes in the future.
      </p>
    </div>
  );
}
