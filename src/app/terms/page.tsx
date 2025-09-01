import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms of Service – Huku",
  description:
    "Read the terms of service for Huku. The official Huku terms regarding service usage, user content, and your rights as a user.",
};

export default function TermsNotice() {
  return (
    <div className="w-full lg:max-w-screen-lg mx-auto px-2 py-6 my-12">
      <h1 className="text-2xl font-bold">Terms of Service</h1>

      <p>
        <strong>Huku</strong> is not responsible for any job postings submitted
        by users. All submitted advertisements reflect solely the views of their
        respective authors.
      </p>

      <p>
        You agree not to use this Service to post or associate any
        advertisements that are defamatory, abusive, hateful, threatening, spam
        or spam-like, offensive, contain adult or inappropriate content,
        disclose personal information of others, infringe copyright, promote
        criminal activity, or violate any law.
      </p>

      <p>
        All advertisements you submit <strong>MAY</strong> be reviewed by our
        moderation team. They may also be shared with third-party verification
        services (including anti-spam services). Please refer to our guidelines
        for more information.
      </p>

      <p>
        We reserve the right to remove or modify any submitted advertisements
        for any valid reason without providing an explanation. Requests for
        removal or modification of advertisements will be considered at our sole
        discretion. We also reserve the right to take action against any account
        at any time.
      </p>

      <p>
        By submitting content, you grant us a perpetual, irrevocable, and
        unlimited license to use, publish, or republish your advertisements in
        the context of the hukutz.com service. However, you retain copyright
        over your advertisements.
      </p>

      <p>
        We respect your right to be forgotten, and you may delete your account
        at any time.
      </p>

      <p>
        These terms may be changed at any time without notice. If you do not
        agree with these terms, please do not register for or use this service.
      </p>
    </div>
  );
}
