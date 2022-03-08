/** @format */

export const GTM_ID = "GTM-TJ7SRHP";

export const pageview = (url) => {
  window.dataLayer.push({
    event: "pageview",
    page: url,
  });
};
