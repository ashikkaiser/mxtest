/** @format */

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeaderContext from "../context/headerContext";

const ContextWrapper = ({ children }) => {
  const router = useRouter();
  const [country, setCountry] = useState(null); // site window width size get
  const [windowWidth, setWindowWidth] = useState(0); // site window width size get
  const [openSearch, setOpenSearch] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]); // header breadcrumbs array
  const [searchData, setSearchData] = useState([]); // Search box default data
  const [searchTerm, setSearchTerm] = useState(""); // Search term value

  const [reviewId, setReviewId] = useState([]); // filter active id's for review
  const [reviewCheckedId, setReviewCheckedId] = useState([]); // filter active id's for review

  const [pricingId, setPricingId] = useState([]); // filter active id's for pricing
  const [pricingCheckedId, setPricingCheckedId] = useState([]); // filter active id's for pricing
  const [pricingNameChecked, setPricingNameChecked] = useState([]); // filter pricing checked names
  const [pricingName, setPricingName] = useState([]); // filter active id's for pricing

  const [featureId, setFeatureId] = useState([]); // filter active id's for features
  const [featureCheckedId, setFeatureCheckedId] = useState([]); // filter checked id's for features
  const [featureNameChecked, setFeatureNameChecked] = useState([]); // filter features checked name's
  const [featureName, setFeatureName] = useState([]); // filter features active names

  const [marketSegmentId, setMarketSegmentId] = useState([]); // filter active id's for market segment
  const [marketSegmentCheckedId, setMarketSegmentCheckedId] = useState([]); // filter active id's for market segment
  const [marketSegmentNameChecked, setMarketSegmentNameChecked] = useState([]); // filter marketSegment checked name's
  const [marketSegmentName, setMarketSegmentName] = useState([]); // filter market segment active names

  const [DeploymentId, setDeploymentId] = useState([]); // filter active id's for Deployment Type
  const [DeploymentCheckedId, setDeploymentCheckedId] = useState([]); // filter active id's for Deployment Type
  const [deploymentNameChecked, setDeploymentNameChecked] = useState([]); // filter deployment type checked name's
  const [deploymentName, setDeploymentName] = useState([]); // filter deployment type active name's
  const [currentPage, setCurrentPage] = useState(1); // pagination current page number

  const [sortBy, setSortBy] = useState(""); // filter sort by
  const [sortByChecked, setSortByChecked] = useState(""); // filter sort by checked
  const [reviewSortBy, setReviewSortBy] = useState(""); // filter review page sort by
  const [reviewSortByChecked, setReviewSortByChecked] = useState(""); // filter review page sort by

  const [isSticky, setIsSticky] = useState(false); // the state for the header sticky header
  const [isCompare, setIsCompare] = useState(false); // the state for the compare popup section
  const [allIds, setAllIds] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [compareIds, setCompareIds] = useState([]);
  const [compareNames, setCompareNames] = useState([]);
  const [siteLoading, setSiteLoading] = useState(false);

  const openComparePopup = async (id) => {
    await setActiveId(id);
    await setIsCompare(true);
  };

  const currentPageDefault = () => {
    setCurrentPage(1);
  };

  const closeComparePopup = () => {
    setIsCompare(false);
    setCompareNames([]);
  };

  const openSiteLoadingPopup = () => {
    // setSiteLoading(true);
    // setTimeout(() => {
    // 	setSiteLoading(false);
    // }, 1500);
  };

  useEffect(() => {
    const resizeWindow = () => {
      setWindowWidth(window.innerWidth);
    };
    resizeWindow();

    window.addEventListener("resize", resizeWindow);

    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  useEffect(() => {
    if (router.asPath.includes("compare")) {
      setCompareNames([]);
    }
    closeComparePopup();
  }, [router]);

  return (
    <HeaderContext.Provider
      value={{
        windowWidth,
        openSearch,
        setOpenSearch,
        breadcrumbs,
        setBreadcrumbs,
        searchData,
        setSearchData,
        searchTerm,
        setSearchTerm,
        reviewId,
        setReviewId,
        reviewCheckedId,
        setReviewCheckedId,
        pricingId,
        setPricingId,
        pricingCheckedId,
        pricingName,
        setPricingName,
        setPricingCheckedId,
        pricingNameChecked,
        setPricingNameChecked,
        featureId,
        setFeatureId,
        featureName,
        setFeatureName,
        featureCheckedId,
        setFeatureCheckedId,
        featureNameChecked,
        setFeatureNameChecked,
        marketSegmentId,
        setMarketSegmentId,
        marketSegmentName,
        setMarketSegmentName,
        marketSegmentNameChecked,
        setMarketSegmentNameChecked,
        marketSegmentCheckedId,
        setMarketSegmentCheckedId,
        DeploymentId,
        setDeploymentId,
        deploymentName,
        setDeploymentName,
        DeploymentCheckedId,
        setDeploymentCheckedId,
        deploymentNameChecked,
        setDeploymentNameChecked,
        sortBy,
        setSortBy,
        sortByChecked,
        setSortByChecked,
        reviewSortBy,
        setReviewSortBy,
        reviewSortByChecked,
        setReviewSortByChecked,
        currentPage,
        setCurrentPage,
        isSticky,
        setIsSticky,
        isCompare,
        setIsCompare,
        openComparePopup,
        closeComparePopup,
        openSiteLoadingPopup,
        currentPageDefault,
        allIds,
        setAllIds,
        activeId,
        setActiveId,
        compareIds,
        setCompareIds,
        compareNames,
        setCompareNames,
        siteLoading,
        setSiteLoading,
        country,
        setCountry
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export default ContextWrapper;
