//** @format *//

import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import "react-circular-progressbar/dist/styles.css";
import "swiper/css/swiper.css";
import ContextWrapper from "../components/contextWrapper";
import Layout from "../components/layout";
import { GTM_ID, pageview } from "../lib/gtm";
import "../styles/globals.css";
import "../styles/scss/index.scss";
//<<<<<<< bux-fixing-3-02
import Script from 'next/script';
var loc = null;

const myAxios = axios.create({
  baseURL: 'https://ashikkaiser.com/',
  withCredentials: true,
});
function MyApp({ Component, pageProps, country }) {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);

  if (typeof window !== "undefined") {
    localStorage.setItem('loc', loc);
  }

  return (
    <>
      <Head>
        <script
          id={GTM_ID}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
            
        {/* <script
          id={"iubenda"}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function (w,d) { 
              var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);`,
          }}
        />
        <script
          id="stripe-js"
          dangerouslySetInnerHTML={{
            __html: `window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
                heap.load("395494023");`,
          }}
        />
        <script
          id="iubenda"
          dangerouslySetInnerHTML={{
            __html: `var _iub = _iub || [];
            _iub.csConfiguration = {"enableCcpa":true,"countryDetection":true,"invalidateConsentWithoutLog":true,"consentOnContinuedBrowsing":false,"enableTcf":true,"googleAdditionalConsentMode":true,"ccpaAcknowledgeOnDisplay":true,"whitelabel":false,"lang":"en","siteId":2493818,"floatingPreferencesButtonDisplay":"bottom-right","cookiePolicyId":35788438, "banner":{ "closeButtonRejects":true,"acceptButtonDisplay":true,"customizeButtonDisplay":true,"acceptButtonColor":"#0073CE","acceptButtonCaptionColor":"white","customizeButtonColor":"#DADADA","customizeButtonCaptionColor":"#4D4D4D","rejectButtonDisplay":true,"rejectButtonColor":"#0073CE","rejectButtonCaptionColor":"white","explicitWithdrawal":true,"position":"float-bottom-center","textColor":"black","backgroundColor":"white" }};`,
          }}
        />*/}

        <meta key="robots" name="robots" content="index,follow" />
        <meta key="googlebot" name="googlebot" content="index,follow" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw=="
          crossOrigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <ContextWrapper localInfo={loc}>

        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <NextNProgress
          color="#66bb6a"
          startPosition={0.3}
          stopDelayMs={200}
          height={6}
          options={{ easing: "ease", speed: 500 }}
          showOnShallow={true}
        />
        <Layout country={country.country}>
          <Component country={country.country} {...pageProps} />
        </Layout>

      </ContextWrapper>
    </>
  );
}

MyApp.getInitialProps = async ({ ctx: { req } }) => {
  if (typeof window !== "undefined") {
    const { data } = await myAxios.get('api/geo')

    return { country: data }
  } else {
    return {
      country: { 'country': req.cookies.countryCode || "null" }
    }
  }
}




export default MyApp;
