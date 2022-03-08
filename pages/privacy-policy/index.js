/** @format */

import styled from "@emotion/styled";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import HeaderContext from "../../context/headerContext";

export default function PrivacyPolicy() {
  const { setBreadcrumbs } = useContext(HeaderContext);
  const router = useRouter();

  useEffect(() => {
    if (router.asPath === "/privacy-policy/") {
      let array = [
        {
          name: "Home",
          link: "/",
        },
        {
          name: `Privacy Policy`,
          link: ``,
        },
      ];
      setBreadcrumbs(array);
    }
  }, [router]);
  return (
    <>
      <Head>
        <title>Privacy Policy | Spotsaas</title>
        <meta
          name="description"
          content="SpotSaaS is a part of the Spotsaas LLC. When you visit our website [www.spotSaaS.com] (“Website”) and use any of our services, you trust us with your personal information."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Container>
        <Row>
          <Col>
            <ContentWrapper>
              <h2>SpotSaaS Privacy Policy</h2>
              <p>
                SpotSaaS is a part of the Spotsaas LLC. When
                you visit our website [www.spotSaaS.com] (“Website”) and use any
                of our services, you trust us with your personal information. We
                take your privacy seriously. When you use our website, we
                collect your personal data to improve our services and to know
                how we do that, read on for our organization’s privacy policy. 
              </p>
              <h4>What data do we collect?</h4>
              <p>
                The SpotSaaS website and services cater to prospective software
                buyers and SaaS software makers. 
              </p>
              <h4>
                1. We collect the information provided by you, which comprise
                your Name, Email address, Phone Number, and Country. 
              </h4>
              <p>
                <b>
                  Categories of information that we collect about you include:
                </b>
              </p>
              <ul>
                <li>
                  <span>
                    your basic profile information when you register or sign in
                    via LinkedIn that has your first name, last name, profile
                    photo, and profile URL
                  </span>
                </li>
                <li>
                  <span>
                    information that you may have provided while writing a
                    review for a product listed on the website 
                  </span>
                </li>
                <li>
                  <span>
                    other information that you might have given in your
                    communications with us i.e. your name, contact details,
                    business email address, phone number along with details of
                    other communications 
                  </span>
                </li>
              </ul>
              <p>
                <b>
                  This information is utilised for certain activities,
                  including:
                </b>
              </p>
              <ul>
                <li>
                  <span>management of your profile and review(s);</span>
                </li>
                <li>
                  <span>
                    to verify the validity of your review(s) and making sure
                    that false or malicious reviews aren’t published;
                  </span>
                </li>
                <li>
                  <span>
                    to send service emails to you (e.g. service announcements
                    and account-related messages);
                  </span>
                </li>
                <li>
                  <span>
                    to provide consultation services and respond to
                    service-related queries;
                  </span>
                </li>
                <li>
                  <span>
                    to administer our services and website, investigate any
                    complaints and provide customer service;
                  </span>
                </li>
                <li>
                  <span>
                    to respond to your questions and requests and customize your
                    digital experience on the site;
                  </span>
                </li>
                <li>
                  <span>to resolve disputes;</span>
                </li>
                <li>
                  <span>
                    for doing internal analysis and research as well as improve
                    our services;
                  </span>
                </li>
                <li>
                  <span>to prevent prohibited or illegal activities; and</span>
                </li>
                <li>
                  <span>to enforce our policies.</span>
                </li>
              </ul>
              <p>
                <b>We use this information because:</b>
              </p>
              <ul>
                <li>
                  <span>as a business, we want to:</span>
                  <ul>
                    <li>
                      <span>
                        manage as well as promote our business and brand;
                      </span>
                    </li>
                    <li>
                      <span>provide and improve our services;</span>
                    </li>
                    <li>
                      <span>
                        improve the performance and user experience on our
                        website;
                      </span>
                    </li>
                    <li>
                      <span>
                        monitor, investigate and report any attempts to breach
                        the security of our website; and
                      </span>
                    </li>
                    <li>
                      <span>
                        resolve any concerns or disputes that you may have.
                      </span>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>
                    you have provided your consent (where required under
                    applicable law) to use your information for marketing
                    purposes. If we rely upon your consent, you do have the
                    right to withdraw the same by contacting us or unsubscribing
                    via the opt-out functionality provided in our marketing
                    communications sent to you.
                  </span>
                </li>
              </ul>
              <h4>Information we collect about your use of our website</h4>
              <p>
                <b>Categories of information we collect about you comprise:</b>
              </p>
              <ul>
                <li>
                  <span>
                    information that’s captured in our web logs such as device
                    details (e.g. device brand and model, and its screen
                    dimensions), unique identification numbers (e.g. IP address
                    and device ID), browser information (e.g. browser type,
                    pages viewed), date and time of access, website traffic,
                    geo-location and other device-specific information, as well
                    as internet connection information;
                  </span>
                </li>
                <li>
                  <span>behavioral information; and</span>
                </li>
                <li>
                  <span>
                    information that’s captured by our cookies (see our 
                    <a
                      href="https://www.spotsaas.com/cookie-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Cookie Policy</span>
                    </a>
                    ).
                  </span>
                </li>
              </ul>
              <p>
                <b>We use this information for certain activities such as:</b>
              </p>
              <ul>
                <li>
                  <span>to personalize your experience on our website;</span>
                </li>
                <li>
                  <span>
                    to administer our website and develop our products and
                    services;
                  </span>
                </li>
                <li>
                  <span>
                    to perform statistical and trend analysis to improve the
                    user experience and performance of the website;
                  </span>
                </li>
                <li>
                  <span>
                    to facilitate your access to and use of our site; and
                  </span>
                </li>
                <li>
                  <span>to resolve disputes and troubleshoot problems</span>
                </li>
              </ul>
              <p>
                <b>We use this information for:</b>
              </p>
              <ul>
                <li>
                  <span>
                    being compliant with any legal or regulatory obligations;
                  </span>
                </li>
                <li>
                  <span>having a business interest to:</span>
                  <ul>
                    <li>
                      <span>
                        monitor, investigate as well as report any attempts to
                        breach the security of our site;
                      </span>
                    </li>
                    <li>
                      <span>
                        improve the performance and user experience; and
                      </span>
                    </li>
                    <li>
                      <span>
                        develop our product and service offerings for users.
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
              <h4>1.2 Further information</h4>
              <p>
                Your information is collected and utilised for our legitimate
                interests that are mentioned above. Your interests as well as
                rights requiring protection of your personal information will
                only be honoured if they don’t override our legitimate
                interests. To know more about legitimate interests and how they
                apply to your personal information, kindly reach out to us. 
              </p>
              <p>
                Our website and online services are meant for individuals who
                are at least 18 years of age. 
              </p>
              <p>
                On the request of a law enforcement or regulatory agency, we may
                also process your personal information. This might be in order
                to uphold legal claims or investigate illegal activities,
                suspected fraud, situations that could physically harm an
                individual and violate the terms of our website.  
              </p>
              <h4>2. When we disclose your information</h4>
              <h4>Publication of reviews</h4>
              <p>
                Our website accepts reviews for different products so that
                others can also know your experience with a certain product.
                When you are providing an opinion on our website, your username
                will appear alongside your review. It must be noted that if you
                are using your name as your username, then your identity could
                be revealed. Of course, you could choose to use a pseudonym in
                order to avoid such a scenario. So we’d recommend you to
                carefully device whether you want to make this information
                available. 
              </p>
              <p>
                Additionally, we may share aggregate or anonymous information
                about you (which doesn’t include any sort of personal
                information) to develop content and services in order to improve
                your experience on our website.
              </p>
              <h4>3. Data Subject Rights</h4>
              <p>
                We assure you that your personal information on our website will
                be accurate and used for stated purpose(s) only. You can view
                and get your information updated or even close your account by
                sending us an email on 
                <a href="mailto:admin@spotsaas.com">
                  <span>
                    <b>admin@spotSaaS.com</b>
                  </span>
                </a>
                . In case, you’re a citizen of the EU (European Union), you also
                have the rights listed below. If you are living in California,
                please refer to Section 10 below for more detailed information
                on your rights under the California law. 
              </p>
              <h4>3.1 European Union residents </h4>
              <p>
                Depending upon the instance, you can exercise certain rights
                with regards to your personal information. We’ve summarised each
                of the rights and how you could use them below. Kindly contact
                for exercising the rights. Do note that your request should
                include information that allows us to verify your identity (e.g.
                your full name, address, email address or any other information
                that may be required).
              </p>
              <p>
                We will respond to your requests within the stipulated time
                required by the applicable law. However, if the requests are
                complicated or numerous, then the response might be delayed in
                such cases. 
              </p>
              <p>
                The information asked by you will be provided free of charge,
                unless it’s excessive. In such scenarios, we may charge a
                reasonable fee or may decline your request. We will reach out to
                you for the information about the fees (if applicable) before
                carrying out your request. 
              </p>
              <p>
                To verify your identity, we may ask for more information before
                processing your request.
              </p>
              <h4>Right to access and/or correct your personal information</h4>
              <p>
                Whatever information we hold about you, you’ve the right to
                access it and ask for its copy. In case we have any information
                that’s inaccurate, you have the right to correct it.
              </p>
              <h4>Right to restrict use of your personal information </h4>
              <p>
                You have the right to restrict the processing of your personal
                information on the website, if: 
              </p>
              <ul>
                <li>
                  <span>
                    the processing is unlawful, but instead of getting it
                    deleted, you want us to restrict the use of the data; 
                  </span>
                </li>
                <li>
                  <span>
                    the personal information isn’t accurate, and the restriction
                    will be applicable until we’ve verified the accuracy of the
                    information or corrected it 
                  </span>
                </li>
                <li>
                  <span>
                    we no longer need your personal information, but are
                    required to keep it in connection with a legal claim; 
                  </span>
                </li>
                <li>
                  <span>
                    you have exercised your right to object to the processing of
                    your personal information. The restriction will apply until
                    we have taken the steps to verify whether we have compelling
                    legitimate grounds to continue processing. 
                  </span>
                </li>
              </ul>
              <h4>Right to request deletion of your personal information </h4>
              <p>
                In most cases, you have the right to get your personal
                information deleted. You can choose to opt-out from our
                marketing communications, and in such cases, we’ll retail your
                information with a “<i>do not contact</i>” flag so that we know
                not to contact you in the future.
              </p>
              <p>
                However, there are certain exceptions where we may refuse a
                request for erasure of your information. For example, when the
                information is required to comply with a legal obligation or for
                the defense of legal claims. 
              </p>
              <h4>
                Right to object to processing of your personal information
              </h4>
              <p>
                You have the right to object to our use of your personal
                information for marketing purposes.
              </p>
              <p>
                Furthermore, even if we have legitimate interests to process
                your personal information, you have the right to object to that
                as well. In such scenarios, we’ll stop processing your personal
                info till the time we are able to verify whether we have
                compelling legitimate reasons to continue processing your data
                that outweigh your interests and rights, or in cases where we
                might need to adhere to legal norms. 
              </p>
              <h4>Right to data portability</h4>
              <p>
                You have the right to ask for all your personal information
                that’s on our website and receive it in a structured,
                machine-readable format. You could also choose to transmit this
                data to another data controller, if it’s technically possible. 
              </p>
              <h4>Right to lodge a complaint with a supervisory authority </h4>
              <p>
                In case you have concerns as to how we are processing your
                personal info, you have the right to reach out to the data
                protection authority in the country of your residence or where
                you work, or wherever such infringement of data protection laws
                has taken place.
              </p>
              <h4>4. International transfers</h4>
              <p>
                Any such transfers that take place will comply with applicable
                law(s) and we’ll ensure that your personal information is
                protected. 
              </p>
              <p>
                Under this policy, we may transfer and maintain the personal
                info of individuals on servers that are outside EEA (European
                Economic Area). However, some of these countries may not have a
                similar protection policy for data as in the EEA. 
              </p>
              <h4>5. Retention periods </h4>
              <p>
                The personal information will be retained as long as it’s needed
                for the purposes for which the data is collected, as well as if
                there’s any legal / regulatory reasons for us to keep it. 
              </p>
              <p>
                Generally, this means that your personal information will be
                with us for the duration of our relationship and:
              </p>
              <ul>
                <li>
                  <span>
                    the time period required by tax and company laws and
                    regulations; and
                  </span>
                </li>
                <li>
                  <span>
                    as long as it’s necessary for you to be able to bring a
                    claim against us and for us to be able to defend ourselves
                    against any legal claims.
                  </span>
                </li>
              </ul>
              <h4>6. Choices about your information </h4>
              <p>
                It’s important for us to give you choices as to how we’ll use
                your information. In case we want to use your info for
                purpose(s) not mentioned in this policy, we’ll first get your
                explicit consent for the same before proceeding ahead. 
              </p>
              <h4>Marketing communications </h4>
              <p>
                If you don’t wish to receive marketing communications from us,
                then we respect your choice. To change your preference, you can
                drop an email at 
                <a href="mailto:admin@spotSaaS.com">
                  <span>
                    <b>admin@spotSaaS.com</b>
                  </span>
                </a>
                . Do note that we’ll still send you service-related information
                even if you’ve opted out of marketing communication. We assure
                that you that your information won’t be sold or shared with
                third parties (other than our subsidiaries or affiliates) for
                the purposes of their promotion and marketing unless we’ve
                gotten your consent.
              </p>
              <h4>7. Security </h4>
              <p>
                For preventing unauthorized access, we have implemented
                administrative, technical, and physical security measures. That
                said, it’s difficult to guarantee or warrant the security of the
                information transmitted via our website since data transmission
                on the internet can’t be entirely secure. We hold you
                responsible for maintaining the security of your credentials for
                accessing our site, and if you suspect any unauthorized
                activity, then you must report that to us. 
              </p>
              <p>
                The access to your information is restricted to only those who
                need in order to operate, improve and deliver our services. 
              </p>
              <h4>8. Cookies and similar technologies </h4>
              <p>
                Some of our website pages may contain cookies or web beacons
                (also known as clear gifs, tags or pixels) that lets us count
                users who have visited these pages. Web beacons are able to
                collect only limited information, such as a cookie number, time
                and date of a page view, and a description of the page on which
                the web beacon resides. Some of the web beacons on our website
                might be placed by third-party advertisers. However, these
                beacons don’t carry any sort of info that could lead to your
                identification. 
              </p>
              <p>
                The web beacons are also carried in our email messages as well
                as newsletter to know whether our communication is being opened.
                This helps us customize our services and measure the
                effectiveness of our content, ad campaigns and services offered
                through our website.  
              </p>
              <p>
                Flash cookies are different than browser cookies and can’t be
                removed by cookie management tools available in the website
                browser. If you want to manage flash cookies, then you should go
                to the Adobe website and customize the Global Privacy Settings
                Panel. 
              </p>
              <p>
                To know more about how we use cookies and other web technologies
                on the website, you can 
                <a
                  href="https://www.spotsaas.com/cookie-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>check this page</span>
                </a>
                .
              </p>
              <h4>9. Miscellaneous</h4>
              <h4>9.1 Links </h4>
              <p>
                As a website, we provide links to other sites or resources that
                have no connection with products or services offered by us. We
                don’t control such websites or their privacy practices, and any
                info that you give to these websites is subjected to their
                respective privacy policies. 
              </p>
              <h4>9.2 Changes to this policy </h4>
              <p>
                The policy may change and / or updated from time to time. If we
                do change the policy, then the updated version will be posted
                here. We would suggest you to regularly check this page to make
                sure that you remain aware about our information practices or
                any significant changes as such. 
              </p>
              <h4>10. California Privacy Rights </h4>
              <p>
                For California residents, CCPA (California Consumer Privacy Act)
                requires us to provide additional info as to how we collect,
                use, and share your “personal information”. 
              </p>
              <p>
                Here, we’ll detail how we use specific pieces of info about
                users. 
              </p>
              <p>
                The categories of personal information that we collect are: 
              </p>
              <ul>
                <li>
                  <span>
                    Identifiers (such as your name and title, contact details,
                    and company name);
                  </span>
                </li>
                <li>
                  <span>
                    Internet or device activity (such as browsing history);
                  </span>
                </li>
                <li>
                  <span>Inference data about you; and</span>
                </li>
                <li>
                  <span>
                    Other information that helps us in identifying or
                    associating with you.
                  </span>
                </li>
              </ul>
              <p>Use of categories of personal information: </p>
              <p>
                The categories of personal info mentioned above could be used to
                achieve the operational purpose for which it was collected or
                processed, or for other compatible operational purposes. 
              </p>
              <p>Sale of personal information: </p>
              <p>
                As per the definition of “sell” under the CCPA and under current
                regulatory guidance, we don’t engage in any such activity not
                have we engaged in such activity in the past one year (including
                the fact that we don’t “sell” the personal info of minors under
                16 years of age). We do share certain info as mentioned in
                Sections 1 and 2 of this privacy policy, and also allow third
                parties to collect certain info about your activity, cookies for
                instance, as stated in our cookie policy. 
              </p>
              <h4>Individual rights </h4>
              <p>
                CCPA provides you certain rights and enable you to request the
                following:  
              </p>
              <ul>
                <li>
                  <span>
                    Mention the categories of personal info we have collected or
                    disclosed about in the past 12 months, including the
                    category of such information, whether we collected it for
                    commercial purposes, and if we shared it with third parties 
                  </span>
                </li>
                <li>
                  <span>
                    Give you access to or provide copy of certain info that we
                    have about you
                  </span>
                </li>
                <li>
                  <span>Delete the info that we hold about you</span>
                </li>
              </ul>
              <p>
                You also have the right to receive information about the
                financial incentives that we offer to you (if any).
                Additionally, you have the right to not be discriminated against
                (as provided for in any applicable law) for exercising some of
                your rights. However, certain info that we hold may be exempt
                from such requests under applicable law. For e.g., we need
                certain information so that we can provide the services to you
                and for compliance with applicable law. If you ask us to delete
                such info, you may no longer be able to access or use the
                services provided by the website.
              </p>
              <p>
                In case, you’d like to exercise any of the rights mentioned
                above, you can email us as at 
                <a href="mailto:admin@spotSaaS.com">
                  <span>
                    <b>admin@spotSaaS.com</b>
                  </span>
                </a>
                . You can send your written request to Administrator,
                Spotsaas LLC, The gardens, Jumeriah, Dubai. Do note that you’ll
                be required to verify your identity before we are able to
                fulfill your request(s). You also have the right to use an
                authorized agent to make such request(s) on your behalf by
                providing us a written authorization or a power of attorney
                that’s signed by you and mention that they agent is acting on
                your behalf. However, you’ll still need to verify your identity
                before we proceed. 
              </p>
              <h4>
                California Online Privacy Protection Act Notice Concerning Do
                Not Track signals
              </h4>
              <p>
                Certain web browsers offer DNT (Do Not Track) as a privacy
                preference. As a website, we don’t recognize or respond to
                browser-related DNT flags, as the industry is still working on a
                common approach for DNT. If you want to learn more about Do Not
                Track, 
                <a
                  href="https://allaboutdnt.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>check here</span>
                </a>
                .
              </p>
              <h4>11. Nevada Privacy Rights </h4>
              <p>
                As per the Nevada law, customers should have the option of
                opting out of the “sale” of their “personally identifiable
                information”. As stated above however, we don’t engage in such
                activity. If you are a resident living in Nevada, you can submit
                an opt-out request for any potential future sales by emailing us
                at 
                <a href="mailto:legal@spotSaaS.com">
                  <span>
                    <b>admin@spotSaaS.com</b>
                  </span>
                </a>
                . Once your identity is verified, we’ll uphold your choice in
                case our practices change. 
              </p>
            </ContentWrapper>
          </Col>
        </Row>
      </Container>
    </>
  );
}

const ContentWrapper = styled.div`
  padding: 60px 0;
  & b,
  strong {
    font-weight: 600 !important;
  }
  & a {
    color: var(--primary);

    &:hover {
      color: var(--dark-primary);
      text-decoration: underline !important;
    }
  }
`;
