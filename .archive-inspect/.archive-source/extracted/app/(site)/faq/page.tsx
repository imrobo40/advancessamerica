export default function FAQPage() {
  const companyName = "Advance America"

  return (
    <div className="pt-16">
      <section className="faq-section py-5">
        <div className="container-xl">
          {/* Main Title */}
          <div className="row align-items-center mb-5">
            <h2 className="section-title" data-aos="smooth-fade-up">
              FAQs
            </h2>
            <div className="title-divider mx-auto"></div>
          </div>

          {/* FAQ Items */}
          <div className="faq-items-container">
            {/* FAQ 1 */}
            <div className="faq-item">
              <div className="row">
                <div className="col-lg-5 col-md-6 mb-4 mb-md-0">
                  <h3 className="faq-title" data-aos="smooth-fade-up">
                    How secure is my financial data?
                  </h3>
                </div>
                <div className="col-lg-7 col-md-6">
                  <p className="faq-description" data-aos="smooth-fade-up">
                    We prioritize the security and confidentiality of your financial information. {companyName} employs
                    advanced encryption technologies to safeguard your data and ensure secure transactions.
                  </p>
                </div>
              </div>
            </div>

            <div className="faq-divider my-4"></div>

            {/* FAQ 2 */}
            <div className="faq-item">
              <div className="row">
                <div className="col-lg-5 col-md-6 mb-4 mb-md-0">
                  <h3 className="faq-title" data-aos="smooth-fade-up">
                    Is {companyName} compatible with mobile devices?
                  </h3>
                </div>
                <div className="col-lg-7 col-md-6">
                  <p className="faq-description" data-aos="smooth-fade-up">
                    Yes, {companyName} is compatible with a wide range of devices, including smartphones, tablets, and
                    desktop computers. You can access your financial information seamlessly across all your devices.
                  </p>
                </div>
              </div>
            </div>

            <div className="faq-divider my-4"></div>

            {/* FAQ 3 */}
            <div className="faq-item">
              <div className="row">
                <div className="col-lg-5 col-md-6 mb-4 mb-md-0">
                  <h3 className="faq-title" data-aos="smooth-fade-up">
                    Can I sync my bank accounts with {companyName}?
                  </h3>
                </div>
                <div className="col-lg-7 col-md-6">
                  <p className="faq-description" data-aos="smooth-fade-up">
                    {companyName} allows you to securely link your bank accounts for automated transaction syncing. This
                    feature enables you to view all your financial data in one place, making it easier to manage your
                    finances.
                  </p>
                </div>
              </div>
            </div>

            <div className="faq-divider my-4"></div>

            {/* FAQ 4 */}
            <div className="faq-item">
              <div className="row">
                <div className="col-lg-5 col-md-6 mb-4 mb-md-0">
                  <h3 className="faq-title" data-aos="smooth-fade-up">
                    How can {companyName} help me save money?
                  </h3>
                </div>
                <div className="col-lg-7 col-md-6">
                  <p className="faq-description" data-aos="smooth-fade-up">
                    {companyName} offers various tools and insights to help you manage your finances effectively and
                    save money.
                  </p>
                </div>
              </div>
            </div>

            <div className="faq-divider my-4"></div>

            {/* FAQ 5 */}
            <div className="faq-item">
              <div className="row">
                <div className="col-lg-5 col-md-6 mb-4 mb-md-0">
                  <h3 className="faq-title" data-aos="smooth-fade-up">
                    What customer support options does {companyName} offer?
                  </h3>
                </div>
                <div className="col-lg-7 col-md-6">
                  <p className="faq-description" data-aos="smooth-fade-up">
                    {companyName} provides 24/7 customer support via email, phone, and live chat. Our dedicated team is
                    here to assist you with any questions or concerns you may have.
                  </p>
                </div>
              </div>
            </div>

            <div className="faq-divider my-4"></div>

            {/* FAQ 6 */}
            <div className="faq-item">
              <div className="row">
                <div className="col-lg-5 col-md-6 mb-4 mb-md-0">
                  <h3 className="faq-title" data-aos="smooth-fade-up">
                    Is {companyName} free to use?
                  </h3>
                </div>
                <div className="col-lg-7 col-md-6">
                  <p className="faq-description" data-aos="smooth-fade-up">
                    {companyName} offers a free trial period for new users. After the trial, you can choose from various
                    pricing plans depending on your needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
