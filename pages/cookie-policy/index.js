/** @format */

import styled from "@emotion/styled";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import HeaderContext from "../../context/headerContext";

const CookiePolicy = () => {
  const { setBreadcrumbs } = useContext(HeaderContext);
  const router = useRouter();

  useEffect(() => {
    if (router.asPath === "/cookie-policy/") {
      let array = [
        {
          name: "Home",
          link: "/",
        },
        {
          name: `Cookie Policy`,
          link: ``,
        },
      ];
      setBreadcrumbs(array);
    }
  }, [router]);
  return (
    <>
      <Head>
        <title>Cookie Policy | Spotsaas</title>
        <meta
          name="description"
          content="SpotSaaS is committed to ensuring that your privacy is protected. Please read the following cookie policy. Cookies consist of portions of code installed in the browser that assist the Owner..."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Container>
        <Row>
          <Col>
            <ContentWrapper>
              <h2>Cookie policy of spotSaaS</h2>
              <p>
                SpotSaaS is committed to ensuring that your privacy is
                protected. Please read the following cookie policy. Cookies
                consist of portions of code installed in the browser that assist
                the Owner in providing the Service according to the purposes
                described. Some of the purposes for which Cookies are installed
                may also require the User’s consent. Where the installation of
                Cookies is based on consent, such consent can be freely
                withdrawn at any time following the instructions provided in
                this document.
              </p>
              <h4>
                Technical Cookies and Cookies serving aggregated statistical
                purposes
              </h4>
              <h4>
                Activity strictly necessary for the functioning of the Service
              </h4>
              <p>
                SpotSaaS uses Cookies to save the User’s session and to carry
                out other activities that are strictly necessary for the
                operation of SpotSaaS, for example in relation to the
                distribution of traffic.
              </p>
              <h4>
                Activity regarding the saving of preferences, optimization, and
                statistics
              </h4>
              <p>
                SpotSaaS uses Cookies to save browsing preferences and to
                optimize the User’s browsing experience. Among these Cookies
                are, for example, those used for the setting of language and
                currency preferences or for the management of first party
                statistics employed directly by the Owner of the site.
              </p>
              <h4>
                Other types of Cookies or third parties that install Cookies
              </h4>
              <p>
                Some of the services listed below collect statistics in an
                anonymized and aggregated form and may not require the consent
                of the User or may be managed directly by the Owner - depending
                on how they are described - without the help of third parties.
                If any third party operated services are listed among the tools
                below, these may be used to track Users’ browsing habits – in
                addition to the information specified herein and without the
                Owner’s knowledge. Please refer to the privacy policy of the
                listed services for detailed information.
              </p>
              <h4>Advertising Cookies</h4>
              <p>
                This type of service allows User Data to be utilized for
                advertising communication purposes. These communications are
                displayed in the form of banners and other advertisements on
                SpotSaaS, possibly based on User interests.
              </p>
              <p>
                This does not mean that all Personal Data are used for this
                purpose. Information and conditions of use are shown below.
              </p>
              <p>
                Some of the services listed below may use Cookies or other
                Identifiers to identify Users or they may use the behavioral
                retargeting technique, i.e. displaying ads tailored to the
                User’s interests and behavior, including those detected outside
                SpotSaaS. For more information, please check the privacy
                policies of the relevant services.
              </p>
              <p>
                In addition to any opt-out feature offered by any of the
                services below, Users may opt out by visiting the Network
                Advertising Initiative opt-out page.
              </p>
              <p>
                <b>
                  {" "}
                  Users may also opt-out of certain advertising features through
                  applicable device settings, such as the device advertising
                  settings for mobile phones or ads settings in general.{" "}
                </b>
              </p>
              <p>
                <b>Advertising</b>
              </p>
              <p>List of Advertising Cookies and third parties</p>
              <ul>
                <li>
                  <b>Google AdSense (Google Inc.)</b>
                </li>
              </ul>
              <p>
                Google AdSense is an advertising service provided by Google Inc.
                This service uses the “DoubleClick” Cookie, which tracks use of
                SpotSaaS and User behavior concerning ads, products and services
                offered.
              </p>
              <p>
                Users may decide to disable all the DoubleClick Cookies by going
                to: {" "}
                <a
                  href="https://adssettings.google.com/authenticated?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Google Ad Settings.{" "}
                </a>
              </p>
              <p>Personal Data collected: Cookies and Usage Data.</p>
              <p>
                Place of processing: US – {" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Privacy Policy{" "}
                </a>{" "}
                 – {" "}
                <a
                  href="https://adssettings.google.com/authenticated#display_optout"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Opt Out{" "}
                </a>{" "}
                . Privacy Shield participant.
              </p>
              <ul>
                <li>
                  <b>Google Ad Manager (Google Inc.)</b>
                </li>
              </ul>
              <p>
                Google Ad Manager is an advertising service provided by Google
                Inc. that allows the Owner to run advertising campaigns in
                conjunction with external advertising networks that the Owner,
                unless otherwise specified in this document, has no direct
                relationship with. In order to opt out from being tracked by
                various advertising networks, Users may make use of
                Youronlinechoices. In order to understand Google’s use of data,
                consult Google’s partner policy.
              </p>
              <p>
                This service uses the “DoubleClick” Cookie, which tracks use of
                SpotSaaS and User behavior concerning ads, products and services
                offered. Users may decide to disable all the DoubleClick Cookies
                by going to: {" "}
                <a
                  href="https://adssettings.google.com/authenticated?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Google Ad Settings.{" "}
                </a>
              </p>
              <p>Personal Data collected: Cookies and Usage Data.</p>
              <p>
                Place of processing: US – {" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Privacy Policy{" "}
                </a>{" "}
                . Privacy Shield participant.
              </p>
              <p>
                <b>How to customize advertising tracking preferences</b>
              </p>
              <p>
                Select advertising services adhere to the IAB Transparency and
                Consent Framework and allow the User to set advertising tracking
                preferences.
              </p>
              <p>
                These settings can be accessed and customized by clicking on the
                cookie policy link inside the cookie notice banner and by then
                clicking on the link that leads to the advertising tracking
                settings, or by clicking the relevant link on SpotSaaS, if
                provided.
              </p>
              <p>
                The Owner declares that the IAB Transparency and Consent
                Framework is being used in full compliance with the rules laid
                out within the IAB Framework Policies.
              </p>
              <h4>Other Cookies</h4>
              <h4>Analytics</h4>
              <p>
                The services contained in this section enable the Owner to
                monitor and analyze web traffic and can be used to keep track of
                User behavior.
              </p>
              <ul>
                <li>
                  <b>Google Analytics (Google Inc.)</b>
                </li>
              </ul>
              <p>
                We use Google Analytics for aggregated, anonymized website
                traffic analysis. In order to track your session usage, Google
                drops a cookie (_ga) with a randomly-generated ClientID in your
                browser. This ID is anonymized and contains no identifiable
                information like email, phone number, name, etc. We also send
                Google your IP Address. We use GA to track aggregated website
                behavior, such as what pages you looked at, for how long, and so
                on. This information is important to us for improving the user
                experience and determining site effectiveness. If you would like
                to access what browsing information we have - or ask us to
                delete any GA data - please delete your _ga cookies, and/or
                install the {" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Google Analytics Opt-Out Browser Add-On{" "}
                </a>{" "}
                .
              </p>
              <ul>
                <li>
                  <b>Google Ads conversion tracking (Google Inc.)</b>
                </li>
              </ul>
              <p>
                Google Ads conversion tracking is an analytics service provided
                by Google LLC or by Google Ireland Limited, depending on the
                location this Website is accessed from, that connects data from
                the Google Ads advertising network with actions performed on
                this Website.
              </p>
              <p>Personal Data collected: Cookies and Usage Data.</p>
              <p>
                Place of processing: US – {" "}
                <a
                  href="https://www.google.com/intl/en/policies/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Privacy Policy{" "}
                </a>{" "}
                . Privacy Shield participant.
              </p>
              <h4>Displaying content from external platforms</h4>
              <p>
                This type of services allows you to view content hosted on
                external platforms directly from the pages of this Application
                and interact with them.
              </p>
              <p>
                This type of service might still collect web traffic data for
                the pages where the service is installed, even when Users do not
                use it.
              </p>
              <ul>
                <li>
                  <b>Google Fonts (Google Inc.)</b>
                </li>
              </ul>
              <p>
                Google Fonts is a typeface visualization service provided by
                Google LLC or by Google Ireland Limited, depending on the
                location this Application is accessed from, that allows this
                Application to incorporate content of this kind on its pages.
              </p>
              <p>
                Personal Data collected: Usage Data; various types of Data as
                specified in the privacy policy of the service.
              </p>
              <p>
                Place of processing: US – {" "}
                <a
                  href="https://www.google.it/intl/policies/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Privacy Policy{" "}
                </a>{" "}
                . Privacy Shield participant.
              </p>
              <ul>
                <li>
                  <b>YouTube video widget (Google Inc.)</b>
                </li>
              </ul>
              <p>
                YouTube is a video content visualization service provided by
                Google Inc. that allows this Application to incorporate content
                of this kind on its pages.
              </p>
              <p>Personal Data collected: Cookies; Usage Data. </p>
              <p>
                Place of processing: US – {" "}
                <a
                  href="http://www.google.it/intl/en/policies/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Privacy Policy.{" "}
                </a>
              </p>
              <ul>
                <li>
                  <b>YouTube video widget without cookies (Google Inc.)</b>
                </li>
              </ul>
              <p>
                YouTube is a video content visualization service provided by
                Google LLC or by Google Ireland Limited, depending on the
                location this Application is accessed from, that allows this
                Application to incorporate content of this kind on its pages. 
              </p>
              <p>
                This widget is set up in a way that ensures that YouTube won’t
                store information and cookies about Users on this Application
                unless they play the video.
              </p>
              <p>Personal Data collected: Usage Data.</p>
              <p>
                Place of processing: US – {" "}
                <a
                  href="http://www.google.it/intl/en/policies/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Privacy Policy{" "}
                </a>{" "}
                . Privacy Shield participant.
              </p>
              <h4>Registration and Authentication</h4>
              <p>
                By registering or authenticating, Users allow this Application
                to identify them and give them access to dedicated services.
              </p>
              <p>
                Depending on what is described below, third parties may provide
                registration and authentication services. In this case, this
                Application will be able to access some Data, stored by these
                third-party services, for registration or identification
                purposes.
              </p>
              <ul>
                <li>
                  <b>Linkedin OAuth (LinkedIn Corporation)</b>
                </li>
              </ul>
              <p>
                Linkedin Oauth is a registration and authentication service
                provided by Linkedin Corporation and is connected to the
                Linkedin social network.
              </p>
              <p>
                Personal Data collected: various types of Data as specified in
                the privacy policy of the service.
              </p>
              <p>
                Place of processing: US – {" "}
                <a
                  href="https://www.linkedin.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Privacy Policy.{" "}
                </a>
              </p>
              <h4>Heat Mapping, Session Recording and A/B Testing</h4>
              <p>
                Heat Mapping services are used to display the areas of a page
                where Users most frequently move the mouse or click. This shows
                where the points of interest are. These services make it
                possible to monitor and analyze web traffic and keep track of
                User behavior.
              </p>
              <p>
                Some of these services may record sessions and make them
                available for later visual playback.
              </p>
              <ul>
                <li>
                  <b>Hotjar Heatmaps &amp; Recordings (Hotjar Ltd.)</b>
                </li>
              </ul>
              <p>
                Hotjar is a session recording and heat mapping service provided
                by Hotjar Ltd.
              </p>
              <p>
                Hotjar honors generic “Do Not Track” headers. This means the
                browser can tell its script not to collect any of the User’s
                data. This is a setting that is available in all major browsers.
                Find Hotjar’s {" "}
                <a
                  href="https://www.hotjar.com/opt-out"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  opt-out information here.{" "}
                </a>
              </p>
              <p>
                Personal Data collected: Cookies; Usage Data; various types of
                Data as specified in the privacy policy of the service.
              </p>
              <p>
                Place of processing: Malta – {" "}
                <a
                  href="https://www.hotjar.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Privacy Policy{" "}
                </a>{" "}
                 – {" "}
                <a
                  href="https://www.hotjar.com/opt-out"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  opt-out information here.{" "}
                </a>
              </p>
              <ul>
                <li>
                  <b>Google Optimize (Google LLC)</b>
                </li>
              </ul>
              <p>
                Google Optimize is an A/B testing service provided by Google LLC
                {`("Google")`}. Google may use Personal Data to contextualize
                and personalize the ads of its own advertising network.
              </p>
              <p>Personal Data collected: Cookies; Usage Data. </p>
              <p>
                Place of processing: United States – {" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Privacy Policy{" "}
                </a>{" "}
                . Privacy Shield participant.
              </p>
              <h4>
                How to provide or withdraw consent to the installation of
                Cookies
              </h4>
              <p>
                In addition to what is specified in this document, the User can
                manage preferences for Cookies directly from within their own
                browser and prevent – for example – third parties from
                installing Cookies.
              </p>
              <p>
                Through browser preferences, it is also possible to delete
                Cookies installed in the past, including the Cookies that may
                have saved the initial consent for the installation of Cookies
                by this website. Users can, for example, find information about
                how to manage Cookies in the most commonly used browsers at the
                following addresses: Google Chrome, Mozilla Firefox, Apple
                Safari and Microsoft Internet Explorer.
              </p>
              <p>
                With regard to Cookies installed by third parties, Users can
                manage their preferences and withdrawal of their consent by
                clicking the related opt-out link (if provided), by using the
                means provided in the third party’s privacy policy, or by
                contacting the third party. Notwithstanding the above, the Owner
                informs that Users may follow the instructions provided on the
                subsequently linked initiatives by the Your Online Choices (EU),
                the Network Advertising Initiative (US) and the Digital
                Advertising Alliance (US), DAAC (Canada), DDAI (Japan) or other
                similar services. Such initiatives allow Users to select their
                tracking preferences for most of the advertising tools. The
                Owner thus recommends that Users make use of these resources in
                addition to the information provided in this document.
              </p>
              <h4>Owner and Data Controller</h4>
              <p>Spotsaas LLC,</p>
              <p>
                Owner contact email: {" "}
                <a
                  href="mailto:admin@sspotsaas.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  admin@spotSaaS.com{" "}
                </a>
              </p>
              <p>
                Since the installation of third-party Cookies and other tracking
                systems through the services used within SpotSaaS cannot be
                technically controlled by the Owner, any specific references to
                Cookies and tracking systems installed by third parties are to
                be considered indicative. In order to obtain complete
                information, the User is kindly requested to consult the privacy
                policy for the respective third-party services listed in this
                document. Given the objective complexity surrounding the
                identification of technologies based on Cookies, Users are
                encouraged to contact the Owner should they wish to receive any
                further information on the use of Cookies by SpotSaaS. 
              </p>
              <h4>Definitions and legal reference</h4>
              <h4>Personal Data (or Data)</h4>
              <p>
                Any information that directly, indirectly, or in connection with
                other information — including a personal identification number —
                allows for the identification or identifiability of a natural
                person.
              </p>
              <h4>Usage Data</h4>
              <p>
                Information collected automatically through SpotSaaS (or
                third-party services employed in SpotSaaS), which can include:
                the IP addresses or domain names of the computers utilized by
                the Users who use SpotSaaS, the URI addresses (Uniform Resource
                Identifier), the time of the request, the method utilized to
                submit the request to the server, the size of the file received
                in response, the numerical code indicating the status of the
                server’s answer (successful outcome, error, etc.), the country
                of origin, the features of the browser and the operating system
                utilized by the User, the various time details per visit (e.g.,
                the time spent on each page within the Application) and the
                details about the path followed within the Application with
                special reference to the sequence of pages visited, and other
                parameters about the device operating system and/or the User’s
                IT environment.
              </p>
              <h4>User</h4>
              <p>
                The individual using SpotSaaS who, unless otherwise specified,
                coincides with the Data Subject.
              </p>
              <h4>Data Subject</h4>
              <p>The natural person to whom the Personal Data refers.</p>
              <h4>Data Processor (or Data Supervisor)</h4>
              <p>
                The natural or legal person, public authority, agency or other
                body which processes Personal Data on behalf of the Controller,
                as described in this privacy policy.
              </p>
              <h4>Data Controller (or Owner)</h4>
              <p>
                The natural or legal person, public authority, agency or other
                body which, alone or jointly with others, determines the
                purposes and means of the processing of Personal Data, including
                the security measures concerning the operation and use of
                SpotSaaS. The Data Controller, unless otherwise specified, is
                the Owner of SpotSaaS.
              </p>
              <h4>SpotSaaS (or this Application)</h4>
              <p>
                The means by which the Personal Data of the User is collected
                and processed.
              </p>
              <h4>Service</h4>
              <p>
                The service provided by SpotSaaS as described in the relative
                terms (if available) and on this site/application.
              </p>
              <h4>European Union (or EU)</h4>
              <p>
                Unless otherwise specified, all references made within this
                document to the European Union include all current member states
                to the European Union and the European Economic Area.
              </p>
              <h4>Cookies</h4>
              <p>Small sets of data stored in the User’s device.</p>
              <h4>Legal information</h4>
              <p>
                This privacy statement has been prepared based on provisions of
                multiple legislations, including Art. 13/14 of Regulation (EU)
                2016/679 (General Data Protection Regulation). This privacy
                policy relates solely to SpotSaaS, if not stated otherwise
                within this document.
              </p>
            </ContentWrapper>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CookiePolicy;

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
