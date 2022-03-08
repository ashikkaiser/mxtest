/** @format */

import styled from "@emotion/styled";
import _ from "lodash";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { Accordion, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import { BsArrowDownUp } from "react-icons/bs";
import { FiFilter, FiSearch } from "react-icons/fi";
import { HiChevronLeft } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import HeaderContext from "../../context/headerContext";
import Pagination from "../pagination";
import ProductsItem from "../products/item";
import InputItem, {
  FiveReviewInput,
  FourReviewInput,
  OneReviewInput,
  ThreeReviewInput,
  TwoReviewInput,
} from "./input-item";
import ShowPageProduct from "./show-page-product";
import Player from "../shimmerAnimation/player"

const FilterResultsForm = ({ filter }) => {
  const router = useRouter();
  const pricingFilter = filter.filters.pricing;
  const featureFilter = filter.filters.features;
  const marketSegmentFilter = filter.filters.marketSegments;
  const deploymentType = filter.filters.deploymentTypes;

  const isTablet = useMediaQuery({ query: "(max-width: 1080px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  /*------------------ Review star array ------------------------- */
  const starsArray = ["5", "4", "3", "2", "1"];

  /*----------------- Stars filter values ----------------------*/
  const oneStarRating = filter.products.filter(
    (item) => Math.floor(item.rating) === 1
  );
  const twoStarRating = filter.products.filter(
    (item) => Math.floor(item.rating) === 2
  );
  const threeStarRating = filter.products.filter(
    (item) => Math.floor(item.rating) === 3
  );
  const fourStarRating = filter.products.filter(
    (item) => Math.floor(item.rating) === 4
  );
  const fiveStarRating = filter.products.filter(
    (item) => Math.floor(item.rating) === 5
  );

  /*-------------- Filter active tag items ----------------- */
  const [allData, setAllData] = useState([]); // filtered get all data here
  const {
    reviewId,
    setReviewId,
    reviewCheckedId,
    setReviewCheckedId,
    pricingId,
    setPricingId,
    pricingName,
    setPricingName,
    pricingCheckedId,
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
    marketSegmentNameChecked,
    setMarketSegmentNameChecked,
    marketSegmentName,
    setMarketSegmentName,
    marketSegmentCheckedId,
    setMarketSegmentCheckedId,
    DeploymentId,
    setDeploymentId,
    deploymentNameChecked,
    setDeploymentNameChecked,
    deploymentName,
    setDeploymentName,
    DeploymentCheckedId,
    setDeploymentCheckedId,
    sortBy,
    setSortBy,
    sortByChecked,
    setSortByChecked,
    currentPage,
    setCurrentPage,
    openSiteLoadingPopup,
    country
  } = useContext(HeaderContext);
  const [filterProducts, setFilterProducts] = useState([]); // filter all product from filtered

  /* ----------------------- Popup search tag ----------------------------*/
  const [popupShow, setPopupShow] = useState(false);
  const [searchPopupTerm, setSearchPopupTerm] = useState("");
  const [searchPopupResults, setSearchPopupResults] = useState([]);

  /*------------------- Sidebar review Dom here ---------------------*/
  const filterRef = useRef([]);
  filterRef.current = [];

  const applyFilterRef = useRef([]);
  applyFilterRef.current = [];

  const filterAddToRef = (el) => {
    if (el && !filterRef.current.includes(el)) {
      filterRef.current.push(el);
    }

    return filterRef.current;
  };
  const applyFilterAddToRef = (el) => {
    if (el && !applyFilterRef.current.includes(el)) {
      applyFilterRef.current.push(el);
    }

    return applyFilterRef.current;
  };

  /*------------------ Review Dom useRef -----------------------*/
  const filterReviewRef = useRef();
  const filterTwoReviewRef = useRef();
  const filterThreeReviewRef = useRef();
  const filterFourReviewRef = useRef();
  const filterFiveReviewRef = useRef();

  const filterMobileReviewRef = useRef();
  const filterMobileTwoReviewRef = useRef();
  const filterMobileThreeReviewRef = useRef();
  const filterMobileFourReviewRef = useRef();
  const filterMobileFiveReviewRef = useRef();

  /* ------------------------------------------------------------------------ */
  /*                       Fetch api filter products                          */
  /* ------------------------------------------------------------------------ */
  useEffect(() => {
    const reviewString =
      reviewId.length > 0
        ? `&&rating=${reviewId.toString().replace(/,/g, "%2C")}`
        : ``;
    const pricingString =
      pricingId.length > 0
        ? `&pricing=${pricingId.toString().replace(/,/g, "%2C")}`
        : ``;
    const featureString =
      featureId.length > 0
        ? `&&features=${featureId.toString().replace(/,/g, "%2C")}`
        : ``;
    const marketSegmentString =
      marketSegmentId.length > 0
        ? `&&marketSegments=${marketSegmentId.toString().replace(/,/g, "%2C")}`
        : ``;
    const DeploymentString =
      DeploymentId.length > 0
        ? `&&deploymentTypes=${DeploymentId.toString().replace(/,/g, "%2C")}`
        : ``;

    if (isTablet) {
      const deployTime = setTimeout(() => {
        const AllMobileProductsFilterHandler = async () => {
          if (
            reviewId.length > 0 ||
            pricingId.length > 0 ||
            featureId.length > 0 ||
            marketSegmentId.length > 0 ||
            DeploymentId.length > 0 ||
            sortBy !== ""
          ) {
            const res = await fetch(
              `https://api.spotsaas.com/category/${filter.slug
              }/products?page=${currentPage}${sortBy !== "" ? `&sort=${sortBy}` : ``
              }${pricingString}${DeploymentString}${marketSegmentString}${featureString}${reviewString}`, { headers: { 'country_name': country } }
            )
              .then((response) => response.json())
              .then((responseJSON) => {
                // do stuff with responseJSON here...
                return responseJSON;
              });

            if (!res) {
              return {
                notFound: true,
              };
            }

            const data = res.products;
            await setFilterProducts(data);
            await setAllData(res);
          } else {
            const res = await fetch(
              `https://api.spotsaas.com/category/${filter.slug
              }/products?page=${currentPage}${sortBy !== "" ? `&sort=${sortBy}` : ""
              }`, { headers: { 'country_name': country } }
            )
              .then((response) => response.json())
              .then((responseJSON) => {
                // do stuff with responseJSON here...
                return responseJSON;
              });

            const data = await res.products;

            if (!data) {
              return {
                notFound: true,
              };
            }

            await setAllData(filter);
            await setFilterProducts(data);
          }
          if (searchPopupResults.length < 1) {
            setSearchPopupResults(featureFilter.sort());
          }
        };
        AllMobileProductsFilterHandler();
      }, 300);
      return () => clearTimeout(deployTime);
    } else {
      const AllProductsFilterHandler = async () => {
        if (
          reviewId.length > 0 ||
          pricingId.length > 0 ||
          featureId.length > 0 ||
          marketSegmentId.length > 0 ||
          DeploymentId.length > 0 ||
          sortBy !== ""
        ) {
          const res = await fetch(
            `https://api.spotsaas.com/category/${filter.slug
            }/products?page=${currentPage}${sortBy !== "" ? `&sort=${sortBy}` : ``
            }${pricingString}${DeploymentString}${marketSegmentString}${featureString}${reviewString}`, { headers: { 'country_name': country } }
          )
            .then((response) => response.json())
            .then((responseJSON) => {
              // do stuff with responseJSON here...
              return responseJSON;
            });

          if (!res) {
            return {
              notFound: true,
            };
          }

          const data = res.products;
          await setFilterProducts(data);
          await setAllData(res);
        } else {
          const res = await fetch(
            `https://api.spotsaas.com/category/${filter.slug
            }/products?page=${currentPage}${sortBy !== "" ? `&sort=${sortBy}` : ""
            }`, { headers: { 'country_name': country } }
          )
            .then((response) => response.json())
            .then((responseJSON) => {
              // do stuff with responseJSON here...
              return responseJSON;
            });

          const data = await res.products;

          if (!data) {
            return {
              notFound: true,
            };
          }

          await setAllData(filter);
          await setFilterProducts(data);
        }
        if (searchPopupResults.length < 1) {
          setSearchPopupResults(featureFilter.sort());
        }
      };
      AllProductsFilterHandler();
    }
  }, [
    filter,
    reviewId,
    pricingName,
    featureName,
    marketSegmentName,
    deploymentName,
    currentPage,
    sortBy,
  ]);

  useEffect(() => {
    const ratingUrl =
      reviewId.length > 0 ? `?ratings=${reviewId.toString()}` : ``;
    const pricingUrl =
      pricingName.length > 0
        ? `${reviewId.length > 0 ? "&" : "?"}pricing=${pricingName
          .toString()
          .replace(/ /g, "-")}`
        : ``;
    const featureUrl =
      featureName.length > 0
        ? `${ratingUrl ? "&" : `${pricingUrl ? "&" : "?"}`
        }features=${featureName.toString().replace(/ /g, "-")}`
        : ``;
    const marketSegmentUrl =
      marketSegmentName.length > 0
        ? `${ratingUrl
          ? "&"
          : `${pricingUrl ? "&" : `${featureUrl ? "&" : "?"}`}`
        }marketSegment=${marketSegmentName.toString().replace(/ /g, "-")}`
        : ``;
    const deploymentTypeUrl =
      deploymentName.length > 0
        ? `${ratingUrl
          ? "&"
          : `${pricingUrl
            ? "&"
            : `${featureUrl ? "&" : `${marketSegmentUrl ? "&" : `?`}`}`
          }`
        }deploymentType=${deploymentName.toString().replace(/ /g, "-")}`
        : ``;

    router.replace(
      `/category/${filter.slug}/${ratingUrl}${pricingUrl}${featureUrl}${marketSegmentUrl}${deploymentTypeUrl}`,
      undefined,
      { shallow: true }
    );
  }, [reviewId, pricingName, featureName, marketSegmentName, deploymentName]);

  /* ------------------------------------------------------------------------ */
  /*                        Review active Id                                  */
  /* ------------------------------------------------------------------------ */
  const filterReview = async (number) => {
    const value = number.toString();

    if (!reviewId.includes(value)) {
      await setReviewId([...reviewId, value]);
      await setCurrentPage(1);
    }
  };
  const filterCloseReview = async (number) => {
    const value = number.toString();

    const filteredArray = reviewId.filter((item) => item !== value);

    if (reviewId.length === 0) {
      await setReviewId([]);
    }
    await setReviewId(filteredArray);
    await setCurrentPage(1);
  };

  // Review Apply filters button function
  const applyFilterReview = async (number) => {
    const value = number.toString();

    if (!reviewCheckedId.includes(value)) {
      await setReviewCheckedId([...reviewCheckedId, value]);
    }
  };
  const applyFilterCloseReview = async (number) => {
    const value = number.toString();
    const sum = reviewId.concat(reviewCheckedId);
    const newIds = [...new Set(sum)];
    const filteredArray = newIds.filter((item) => item !== value);

    if (reviewCheckedId.length === 0) {
      await setReviewCheckedId([]);
    }
    await setReviewCheckedId(filteredArray);
    await setReviewId(filteredArray);
  };

  /* ------------------------------------------------------------------------ */
  /*                        Pricing active Id                                 */
  /* ------------------------------------------------------------------------ */
  const filterPricingIdHandler = async (id, value) => {
    if (!pricingId.includes(id)) {
      await setPricingId([...pricingId, id]);
      if (!pricingName.includes(value)) {
        await setPricingName([...pricingName, value]);
      }
      await setCurrentPage(1);
    }
  };
  const filterRemovePricingIdHandler = async (id, value) => {
    const filteredArray = await pricingId.filter((item) => item !== id);

    await setPricingId(filteredArray);

    const nameFiltered = await pricingName.filter((item) => item !== value);

    await setPricingName(nameFiltered);

    if (pricingId.length === 0) {
      await setPricingId([]);
    }
    await setCurrentPage(1);
  };

  // Price Apply filters button function
  const applyFilterPricingIdHandler = async (id, value) => {
    if (!pricingCheckedId.includes(id)) {
      await setPricingCheckedId([...pricingCheckedId, id]);
      await setPricingNameChecked([...pricingNameChecked, value]);
    }
  };
  const applyFilterRemovePricingIdHandler = async (id, value) => {
    const targetName = await filterRef.current.filter(
      (item) => item.children[0].id === id
    );

    await targetName.map((item) => item.lastChild.classList.remove("active"));
    const filteredArray = await pricingCheckedId.filter((item) => item !== id);

    await setPricingCheckedId(filteredArray);

    if (pricingCheckedId.length === 0) {
      await setPricingCheckedId([]);
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                      Apply Features active Id                            */
  /* ------------------------------------------------------------------------ */
  const filterFeaturesIdHandler = async (id, value) => {
    if (!featureId.includes(id)) {
      await setFeatureId([...featureId, id]);
      if (!featureName.includes(value)) {
        await setFeatureName([...featureName, value]);
      }
      await setCurrentPage(1);
      await openSiteLoadingPopup();
    }
  };
  const filterRemoveFeaturesIdHandler = async (id, value) => {
    const filteredArray = await featureId.filter((item) => item !== id);

    const nameFiltered = await featureName.filter((item) => item !== value);

    await setFeatureName(nameFiltered);
    if (featureId.length === 0) {
      await setFeatureId([]);
    }
    await setFeatureId(filteredArray);
    await setCurrentPage(1);
    await openSiteLoadingPopup();
  };

  // Features Apply filters button function
  const applyFilterFeaturesIdHandler = async (id, value) => {
    const targetName = await applyFilterRef.current.filter((item) => {
      item.children[0].id === id;
    });

    await targetName.map((item) => item.lastChild.classList.add("active"));

    if (!featureCheckedId.includes(id)) {
      await setFeatureCheckedId([...featureCheckedId, id]);
    }
    if (!featureNameChecked.includes(value)) {
      await setFeatureNameChecked([...featureNameChecked, value]);
    }
  };
  const applyRemovedFilterFeaturesIdHandler = async (id, value) => {
    const targetName = await applyFilterRef.current.filter(
      (item) => item.children[0].id === id
    );

    await targetName.map((item) => item.lastChild.classList.remove("active"));
    const filteredArray = await featureCheckedId.filter((item) => item !== id);

    await setFeatureCheckedId(filteredArray);

    const nameFiltered = await featureNameChecked.filter(
      (item) => item !== value
    );

    await setFeatureNameChecked(nameFiltered);

    if (featureCheckedId.length === 0) {
      await setFeatureCheckedId([]);
      await setFeatureNameChecked([]);
    }
    if (featureId.includes(id)) {
      const getId = await featureId.filter((i) => i !== id);
      setFeatureId(getId);
    }
  };
  /* ------------------------------------------------------------------------ */
  /*                      Market Segment active id                            */
  /* ------------------------------------------------------------------------ */
  const filterMarketSegmentIdHandler = async (id, value) => {
    if (!marketSegmentId.includes(id)) {
      await setMarketSegmentId([...marketSegmentId, id]);
      if (!marketSegmentName.includes(value)) {
        await setMarketSegmentName([...marketSegmentName, value]);
      }
      await setCurrentPage(1);
      await openSiteLoadingPopup();
    }
  };
  const filterRemoveMarketSegmentIdHandler = async (id, value) => {
    const filteredArray = await marketSegmentId.filter((item) => item !== id);

    const nameFiltered = await marketSegmentName.filter(
      (item) => item !== value
    );

    await setMarketSegmentName(nameFiltered);
    if (marketSegmentId.length === 0) {
      await setMarketSegmentId([]);
    }
    await setMarketSegmentId(filteredArray);
    await setCurrentPage(1);
    await openSiteLoadingPopup();
  };

  // Market Segment Apply filters button function
  const applyFilterMarketSegmentIdHandler = async (id, value) => {
    if (!marketSegmentCheckedId.includes(id)) {
      await setMarketSegmentCheckedId([...marketSegmentCheckedId, id]);
    }

    if (!marketSegmentNameChecked.includes(value)) {
      await setMarketSegmentNameChecked([...marketSegmentNameChecked, value]);
    }
  };
  const applyFilterRemoveMarketSegmentIdHandler = async (id, value) => {
    const targetName = await filterRef.current.filter(
      (item) => item.children[0].id === id
    );

    await targetName.map((item) => item.lastChild.classList.remove("active"));
    const filteredArray = await marketSegmentCheckedId.filter(
      (item) => item !== id
    );

    await setMarketSegmentCheckedId(filteredArray);

    const nameFiltered = await marketSegmentNameChecked.filter(
      (item) => item !== value
    );

    await setMarketSegmentNameChecked(nameFiltered);

    if (marketSegmentCheckedId.length === 0) {
      await setMarketSegmentCheckedId([]);
      await setMarketSegmentNameChecked([]);
    }
  };
  /* ------------------------------------------------------------------------ */
  /*                      Deployment Type active id                            */
  /* ------------------------------------------------------------------------ */
  const filterDeploymentIdHandler = async (id, value) => {
    if (!DeploymentId.includes(id)) {
      await setDeploymentId([...DeploymentId, id]);
      if (!deploymentName.includes(value)) {
        await setDeploymentName([...deploymentName, value]);
      }
      await setCurrentPage(1);
      await openSiteLoadingPopup();
    }
  };
  const filterRemoveDeploymentIdHandler = async (id, value) => {
    const filteredArray = await DeploymentId.filter((item) => item !== id);

    const nameFiltered = await deploymentName.filter((item) => item !== value);

    await setDeploymentName(nameFiltered);
    if (DeploymentId.length === 0) {
      await setDeploymentId([]);
    }
    await setDeploymentId(filteredArray);
    await setCurrentPage(1);
    await openSiteLoadingPopup();
  };

  // Deployment Type Apply filters button function
  const applyFilterDeploymentIdHandler = async (id, value) => {
    // Market Segment Apply filters button function

    if (!DeploymentCheckedId.includes(id)) {
      await setDeploymentCheckedId([...DeploymentCheckedId, id]);
    }

    if (!deploymentNameChecked.includes(value)) {
      await setDeploymentNameChecked([...deploymentNameChecked, value]);
    }
  };
  const applyFilterRemoveDeploymentIdHandler = async (id, value) => {
    const targetName = await filterRef.current.filter(
      (item) => item.children[0].id === id
    );

    await targetName.map((item) => item.lastChild.classList.remove("active"));
    const filteredArray = await DeploymentCheckedId.filter(
      (item) => item !== id
    );

    await setDeploymentCheckedId(filteredArray);

    const nameFiltered = await deploymentNameChecked.filter(
      (item) => item !== value
    );

    await setDeploymentNameChecked(nameFiltered);

    if (DeploymentCheckedId.length === 0) {
      await setDeploymentCheckedId([]);
      await setDeploymentNameChecked([]);
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                        Apply filters API call                            */
  /* ------------------------------------------------------------------------ */
  const applyFiltersHandler = async () => {
    const sum = featureId.concat(featureCheckedId);
    const nameSum = featureName.concat(featureNameChecked);
    const newArray = [...new Set(sum)];
    const nameNewArray = [...new Set(nameSum)];
    if (featureCheckedId.length > 0) {
      await setFeatureId(newArray);
      await setFeatureName(nameNewArray);
    } else if (featureCheckedId.length < 1) {
      await setFeatureId([]);
      await setFeatureName([]);
    }
    await setPopupShow(false);
    await setMobileFilter(false);
    await setMobileSortBy(false);
    await window.scrollTo(0, 150);
    await openSiteLoadingPopup();
  };

  const sortByHandler = async (e) => {
    await setSortBy(e.target.value);
    await openSiteLoadingPopup();
  };
  const applySortByHandler = async (e) => {
    await setSortByChecked(e.target.value);
  };

  const mobileApplyFilterHandler = async () => {
    if (reviewCheckedId.length > 0) {
      await setReviewId(reviewCheckedId);
    } else if (reviewCheckedId.length < 1) {
      await setReviewId([]);
    }

    if (pricingCheckedId.length > 0) {
      await setPricingId(pricingCheckedId);
      await setPricingName(pricingNameChecked);
    } else if (pricingCheckedId.length < 1) {
      await setPricingId([]);
      await setPricingName([]);
    }

    if (featureCheckedId.length > 0) {
      await setFeatureId(featureCheckedId);
      await setFeatureName(featureNameChecked);
    } else if (featureCheckedId.length < 1) {
      await setFeatureId([]);
      await setFeatureName([]);
    }
    if (marketSegmentCheckedId.length > 0) {
      await setMarketSegmentId(marketSegmentCheckedId);
      await setMarketSegmentName(marketSegmentNameChecked);
    } else if (marketSegmentCheckedId.length < 1) {
      await setMarketSegmentId([]);
      await setMarketSegmentName([]);
    }

    if (DeploymentCheckedId.length > 0) {
      await setDeploymentId(DeploymentCheckedId);
      await setDeploymentName(deploymentNameChecked);
    } else if (DeploymentCheckedId.length < 1) {
      await setDeploymentId([]);
      await setDeploymentName([]);
    }

    if (sortByChecked !== "") {
      await setSortBy(sortByChecked);
    } else if (sortByChecked === "") {
      await setSortBy("");
    }

    await setMobileFilter(false);
    await setMobileSortBy(false);
    await window.scrollTo(0, 150);
    await openSiteLoadingPopup();
  };

  /* ------------------------------------------------------------------------ */
  /*                    Features filter search functions                      */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (searchPopupTerm === "") {
      setSearchPopupResults(featureFilter.sort());
    }
  }, [featureFilter, searchPopupTerm]);

  const SearchHandler = (event) => {
    const data = event.target.value;
    setSearchPopupTerm(data);
    const NewContactList = featureFilter.filter((el) => {
      return Object.values(el)
        .join(" ")
        .toLowerCase()
        .includes(searchPopupTerm.toLowerCase());
    });
    if (searchPopupTerm !== "") {
      setSearchPopupResults(NewContactList);
    }
  };
  const closeSearchTerm = () => {
    setSearchPopupTerm("");
    setSearchPopupResults(featureFilter.sort());
  };

  const handleClose = () => {
    setPopupShow(false);
    setFeatureCheckedId([]);
  };
  const handleShow = () => setPopupShow(true);

  const [mobileFilter, setMobileFilter] = useState(false);
  const [mobileSortBy, setMobileSortBy] = useState(false);

  const handleFilterClose = () => setMobileFilter(false);
  const handleFilterShow = () => setMobileFilter(true);
  const handleSortByShow = () => setMobileSortBy(true);
  const handleSortByClose = () => setMobileSortBy(false);

  // Clear all filters
  const clearFiltersHandler = () => {
    setReviewId([]);
    setReviewCheckedId([]);
    setFeatureId([]);
    setFeatureName([]);
    setFeatureCheckedId([]);
    setPricingId([]);
    setPricingName([]);
    setPricingCheckedId([]);
    setMarketSegmentId([]);
    setMarketSegmentName([]);
    setMarketSegmentCheckedId([]);
    setDeploymentId([]);
    setDeploymentName([]);
    setDeploymentCheckedId([]);
    setCurrentPage(1);
    setSortBy("");
    setSortByChecked("");
    openSiteLoadingPopup();
  };

  const isThere =
    reviewId.length > 0 ||
    reviewCheckedId.length > 0 ||
    pricingId.length > 0 ||
    pricingCheckedId.length > 0 ||
    featureId.length > 0 ||
    featureCheckedId.length > 0 ||
    marketSegmentId.length > 0 ||
    marketSegmentCheckedId.length > 0 ||
    DeploymentId.length > 0 ||
    DeploymentCheckedId.length > 0 ||
    sortBy !== "" ||
    sortByChecked !== "";

  return (
    <>
      <Col xs={12} lg={3} className="d-none d-lg-block">
        {/* Filter Desktop function */}
        <DesktopFilter>
          <FilterTitle>
            <h4>Filter Results by</h4>
            {(reviewId.length > 0 ||
              pricingId.length > 0 ||
              featureId.length > 0 ||
              marketSegmentId.length > 0 ||
              DeploymentId.length > 0 ||
              sortBy !== "") && (
                <span onClick={clearFiltersHandler}>Reset All</span>
              )}
          </FilterTitle>
          <FormBox>
            {/* Ratings */}
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header as="h4">Ratings</Accordion.Header>
                <Accordion.Body>
                  {_.map(starsArray, (item, key) => {
                    return (
                      <div key={key}>
                        {item === "5" && (
                          <FiveReviewInput
                            domRef={filterFiveReviewRef}
                            value={allData?.ratingInfo?.fiveStarRatings}
                            count={5}
                            show={filterReview}
                            hide={filterCloseReview}
                          />
                        )}
                        {item === "4" && (
                          <FourReviewInput
                            domRef={filterFourReviewRef}
                            value={allData?.ratingInfo?.fourStarRatings}
                            count={4}
                            show={filterReview}
                            hide={filterCloseReview}
                          />
                        )}
                        {item === "3" && (
                          <ThreeReviewInput
                            domRef={filterThreeReviewRef}
                            value={allData?.ratingInfo?.threeStarRatings}
                            count={3}
                            show={filterReview}
                            hide={filterCloseReview}
                          />
                        )}
                        {item === "2" && (
                          <TwoReviewInput
                            domRef={filterTwoReviewRef}
                            value={allData?.ratingInfo?.twoStarRatings}
                            count={2}
                            show={filterReview}
                            hide={filterCloseReview}
                          />
                        )}
                        {item === "1" && (
                          <OneReviewInput
                            domRef={filterReviewRef}
                            value={allData?.ratingInfo?.oneStarRatings}
                            count={1}
                            show={filterReview}
                            hide={filterCloseReview}
                          />
                        )}
                      </div>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {/* Pricing */}
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Pricing Model</Accordion.Header>
                <Accordion.Body>
                  {_.map(pricingFilter, (item, key) => {
                    return (
                      <div key={key} ref={filterAddToRef}>
                        <InputItem
                          show={filterPricingIdHandler}
                          hide={filterRemovePricingIdHandler}
                          Id={item._id}
                          name={item.name}
                          value={item.count}
                        />
                      </div>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {/* Features */}
            {featureFilter.length > 0 && (
              <>
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Features</Accordion.Header>
                    <Accordion.Body>
                      {featureFilter
                        .sort()
                        .slice(0, 10)
                        .map((item, index) => {
                          return (
                            <div key={index} ref={filterAddToRef}>
                              <InputItem
                                show={filterFeaturesIdHandler}
                                hide={filterRemoveFeaturesIdHandler}
                                Id={item._id}
                                name={item.name}
                                value={item.count}
                              />
                            </div>
                          );
                        })}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <a
                  className="sps-btn sps-btn-primary sps-btn-x-small sps-btn-full mb-4"
                  onClick={handleShow}
                >
                  Search and Explore Features
                </a>
                {/* Desktop search features popup */}
                <Modal
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={popupShow}
                  className={`features-popup-wrapper`}
                  onHide={handleClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Search and Explore for Features
                    </Modal.Title>
                  </Modal.Header>
                  <FeaturesFilterPopupBody>
                    <Modal.Body>
                      <SearchBox>
                        <input
                          type="text"
                          placeholder="Search for Features"
                          value={searchPopupTerm}
                          onChange={SearchHandler}
                        />
                        {searchPopupTerm !== "" && (
                          <CloseIcon
                            className="search-close-icon"
                            onClick={closeSearchTerm}
                          >
                            <RiCloseLine />
                          </CloseIcon>
                        )}
                        <button type="button" className="search-btn">
                          <FiSearch />
                        </button>
                      </SearchBox>
                      <FilterItemsList>
                        {_.map(searchPopupResults, (item, index) => {
                          return (
                            <div key={index} ref={applyFilterAddToRef}>
                              <InputItem
                                show={applyFilterFeaturesIdHandler}
                                hide={applyRemovedFilterFeaturesIdHandler}
                                Id={item._id}
                                name={item.name}
                                value={item.count}
                              />
                            </div>
                          );
                        })}
                      </FilterItemsList>
                    </Modal.Body>
                  </FeaturesFilterPopupBody>
                  <Modal.Footer>
                    <FeaturesFooter>
                      <div>
                        <a
                          className="close_filter"
                          onClick={clearFiltersHandler}
                        >
                          {(featureId.length > 0 ||
                            featureCheckedId.length > 0) && (
                              <span>Close Filters</span>
                            )}
                        </a>
                      </div>
                      <div>
                        {(featureId.length > 0 ||
                          featureCheckedId.length > 0) && (
                            <button
                              type="button"
                              onClick={applyFiltersHandler}
                              className="apply_filter"
                            >
                              Apply Filters
                            </button>
                          )}
                      </div>
                    </FeaturesFooter>
                  </Modal.Footer>
                </Modal>
              </>
            )}
            {/* market Segment */}
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Market Segment</Accordion.Header>
                <Accordion.Body>
                  {_.map(marketSegmentFilter, (item, index) => {
                    return (
                      <div key={index} ref={filterAddToRef}>
                        <InputItem
                          show={filterMarketSegmentIdHandler}
                          hide={filterRemoveMarketSegmentIdHandler}
                          Id={item._id}
                          name={item.name}
                          value={item.count}
                        />
                      </div>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {/* Deployment Type */}
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Deployment Type</Accordion.Header>
                <Accordion.Body>
                  {_.map(deploymentType, (item, index) => {
                    return (
                      <div key={index} ref={filterAddToRef}>
                        <InputItem
                          show={filterDeploymentIdHandler}
                          hide={filterRemoveDeploymentIdHandler}
                          Id={item._id}
                          name={item.name}
                          value={item.count}
                        />
                      </div>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </FormBox>
        </DesktopFilter>
      </Col>

      <Col xs={12} lg={12} xl={9}>
        {!isTablet && (
          <ShowPageProduct
            currentPage={currentPage}
            totalProducts={allData.totalProductsCount}
            pageItems={filterProducts.length}
            setSortBy={sortByHandler}
          />
        )}
        {isTablet && (
          <div className="mb-4">
            <span>
              Showing{" "}
              {allData.totalProductsCount > 0
                ? `${currentPage > 1
                  ? `${currentPage * 10 + 1 - 10}`
                  : currentPage
                }-${filterProducts.length < 10
                  ? allData.totalProductsCount
                  : currentPage * 10
                }`
                : "0 - 0"}{" "}
              out of {allData.totalProductsCount}
            </span>
          </div>
        )}
        {filterProducts.length > 0 ? (
          <>
            {_.map(filterProducts, (item, index) => (
              <div key={index}>
                {(() => {
                  if (index === 2) {
                    return (
                      <>
                        {/* <EditorsPicks slug={filter.slug} /> */}
                        <ProductsItem item={item} />
                      </>
                    );
                  } else {
                    return <ProductsItem item={item} />;
                  }
                })()}
                {/*
								 else if (index === 9) {
										 return (
											 <>
												 <CategoryQuickCompare />
												 <ProductsItem key={index} item={item} />
											 </>
										 );
									 }
								 */}
              </div>
            ))}
          </>
        ) : (
          // <NoDataFound>No data found! 😔 </NoDataFound>
          isMobile ? (<>
            <Player width="370px" height="300px" src="/assets/json/CategoryShimmerMobile.json" />
            <Player width="370px" height="300px" src="/assets/json/CategoryShimmerMobile.json" />
          </>) : (<>
            <Player width="900px" height="150px" src="/assets/json/CategoryShimmerDesktop.json" />
            <Player width="900px" height="150px" src="/assets/json/CategoryShimmerDesktop.json" />
            <Player width="900px" height="150px" src="/assets/json/CategoryShimmerDesktop.json" />
            <Player width="900px" height="150px" src="/assets/json/CategoryShimmerDesktop.json" />
            <Player width="900px" height="150px" src="/assets/json/CategoryShimmerDesktop.json" />
            <Player width="900px" height="150px" src="/assets/json/CategoryShimmerDesktop.json" />
            <Player width="900px" height="150px" src="/assets/json/CategoryShimmerDesktop.json" />
            <Player width="900px" height="150px" src="/assets/json/CategoryShimmerDesktop.json" />
            <Player width="900px" height="150px" src="/assets/json/CategoryShimmerDesktop.json" />
            <Player width="900px" height="150px" src="/assets/json/CategoryShimmerDesktop.json" />
          </>)
        )}
        {allData.totalProductsCount > 10 && (
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalCount={allData.totalProductsCount}
          />
        )}
      </Col>

      <Col xs={12} className="d-block d-lg-none">
        <MobileWrapper>
          {/* Filter Mobile function */}
          <MobileFilter>
            <FilterPopup>
              <Content onClick={handleFilterShow}>
                <FiFilter /> <span>Filter</span>
              </Content>
              <Content onClick={handleSortByShow}>
                <BsArrowDownUp /> <span>Sort By</span>
              </Content>
            </FilterPopup>
          </MobileFilter>

          <MobileSortByPopup className={`${mobileSortBy ? "show" : "hide"}`}>
            <HeaderWrapper>
              <div onClick={handleSortByClose} className="filter_close">
                <HiChevronLeft />
              </div>
              <h4>Filter Results by</h4>
              <p onClick={clearFiltersHandler} className="filter_reset">
                {isThere && <span>Close Filters</span>}
              </p>
            </HeaderWrapper>
            <MobileSortByBody>
              <ShowPageProduct
                currentPage={currentPage}
                totalProducts={allData.totalProductsCount}
                pageItems={filterProducts.length}
                setSortBy={applySortByHandler}
              />
            </MobileSortByBody>
            <FooterWrapper>
              {isThere && (
                <button onClick={mobileApplyFilterHandler}>Apply Filter</button>
              )}
            </FooterWrapper>
          </MobileSortByPopup>

          <MobileFilterPopup className={`${mobileFilter ? "show" : "hide"}`}>
            <HeaderWrapper>
              <div onClick={handleFilterClose} className="filter_close">
                <HiChevronLeft />
              </div>
              <h4>Filter Results by</h4>
              <p onClick={clearFiltersHandler} className="filter_reset">
                {isThere && <span>Close Filters</span>}
              </p>
            </HeaderWrapper>
            <Tab.Container id="left-tabs-example" defaultActiveKey="rating">
              <MobileFilterWrapper>
                <MobileFilterSidebar>
                  <Nav className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="rating">Rating</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="pricing">Pricing</Nav.Link>
                    </Nav.Item>
                    {featureFilter.length > 0 && (
                      <Nav.Item>
                        <Nav.Link eventKey="features">Features</Nav.Link>
                      </Nav.Item>
                    )}
                    <Nav.Item>
                      <Nav.Link eventKey="market-segments">
                        Market Segments
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="deployment-type">
                        Deployment Type
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </MobileFilterSidebar>
                <MobileFilterBody>
                  <Tab.Content>
                    <Tab.Pane eventKey="rating">
                      <div className="lists_body">
                        {_.map(starsArray, (item, index) => {
                          return (
                            <div key={index}>
                              {item === "5" && (
                                <FiveReviewInput
                                  domRef={filterMobileFiveReviewRef}
                                  value={fiveStarRating.length}
                                  count={5}
                                  show={applyFilterReview}
                                  hide={applyFilterCloseReview}
                                />
                              )}
                              {item === "4" && (
                                <FourReviewInput
                                  domRef={filterMobileFourReviewRef}
                                  value={fourStarRating.length}
                                  count={4}
                                  show={applyFilterReview}
                                  hide={applyFilterCloseReview}
                                />
                              )}
                              {item === "3" && (
                                <ThreeReviewInput
                                  domRef={filterMobileThreeReviewRef}
                                  value={threeStarRating.length}
                                  count={3}
                                  show={applyFilterReview}
                                  hide={applyFilterCloseReview}
                                />
                              )}
                              {item === "2" && (
                                <TwoReviewInput
                                  domRef={filterMobileTwoReviewRef}
                                  value={twoStarRating.length}
                                  count={2}
                                  show={applyFilterReview}
                                  hide={applyFilterCloseReview}
                                />
                              )}
                              {item === "1" && (
                                <OneReviewInput
                                  domRef={filterMobileReviewRef}
                                  value={oneStarRating.length}
                                  count={1}
                                  show={applyFilterReview}
                                  hide={applyFilterCloseReview}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="pricing">
                      <div className="lists_body">
                        {_.map(pricingFilter, (item, index) => {
                          return (
                            <div key={index} ref={filterAddToRef}>
                              <InputItem
                                show={applyFilterPricingIdHandler}
                                hide={applyFilterRemovePricingIdHandler}
                                Id={item._id}
                                name={item.name}
                                value={item.count}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="features">
                      {searchPopupResults.length > 0 && (
                        <>
                          <SearchBox>
                            <input
                              type="text"
                              placeholder="Search for Features"
                              value={searchPopupTerm}
                              onChange={SearchHandler}
                            />
                            {searchPopupTerm !== "" && (
                              <CloseIcon
                                className="search-close-icon"
                                onClick={closeSearchTerm}
                              >
                                <RiCloseLine />
                              </CloseIcon>
                            )}
                            <button type="button" className="search-btn">
                              <FiSearch />
                            </button>
                          </SearchBox>
                          <div className="lists_body">
                            {_.map(searchPopupResults, (item, index) => {
                              return (
                                <div key={index} ref={applyFilterAddToRef}>
                                  <InputItem
                                    show={applyFilterFeaturesIdHandler}
                                    hide={applyRemovedFilterFeaturesIdHandler}
                                    Id={item._id}
                                    name={item.name}
                                    value={item.count}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </Tab.Pane>
                    <Tab.Pane eventKey="market-segments">
                      <div className="lists_body">
                        {_.map(marketSegmentFilter, (item, index) => {
                          return (
                            <div key={index} ref={filterAddToRef}>
                              <InputItem
                                show={applyFilterMarketSegmentIdHandler}
                                hide={applyFilterRemoveMarketSegmentIdHandler}
                                Id={item._id}
                                name={item.name}
                                value={item.count}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="deployment-type">
                      <div className="lists_body">
                        {_.map(deploymentType, (item, index) => {
                          return (
                            <div key={index} ref={filterAddToRef}>
                              <InputItem
                                show={applyFilterDeploymentIdHandler}
                                hide={applyFilterRemoveDeploymentIdHandler}
                                Id={item._id}
                                name={item.name}
                                value={item.count}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </MobileFilterBody>
              </MobileFilterWrapper>
            </Tab.Container>
            <FooterWrapper>
              {isThere && (
                <button onClick={mobileApplyFilterHandler}>Apply Filter</button>
              )}
            </FooterWrapper>
          </MobileFilterPopup>
        </MobileWrapper>
      </Col>
    </>
  );
};

export default FilterResultsForm;
const DesktopFilter = styled.div`
  & .review-star {
    width: 20px !important;
    height: 20px !important;
  }

  @media (max-width: 1080px) {
    display: none;
  }
`;
const MobileWrapper = styled.div`
  display: none;
  @media (max-width: 1080px) {
    display: block;
  }
`;
const MobileFilter = styled.div``;
const MobileFilterPopup = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background: var(--white);
  z-index: 999;
  padding: 0;
  transition: all ease-in-out 400ms;

  & h4 {
    margin: 0;
    font-weight: 400 !important;
  }

  &.hide {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-150px);
  }

  &.show {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }

  & .filter_close,
  .filter_reset {
    cursor: pointer;
    color: var(--white);
    margin: 0;
    line-height: 60px;
    padding: 0 20px;
    font-weight: 400 !important;
  }

  & .filter_reset {
    background-color: var(--error);
    border-radius: 4px;
    line-height: 32px;
    margin-right: 10px;
  }
`;
const MobileSortByPopup = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background: var(--white);
  z-index: 999;
  padding: 0;
  transition: all ease-in-out 400ms;

  & h4 {
    margin: 0;
    font-weight: 400 !important;
  }

  &.hide {
    opacity: 0;
    visibility: hidden;
    transform: translateX(150px);
  }

  &.show {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }

  & .filter_close,
  .filter_reset {
    cursor: pointer;
    color: var(--white);
    margin: 0;
    line-height: 60px;
    padding: 0 20px;
    font-weight: 400 !important;
  }

  & .filter_reset {
    background-color: var(--error);
    border-radius: 4px;
    line-height: 32px;
    margin-right: 10px;
  }
`;
const MobileFilterWrapper = styled.div`
  display: flex;
`;
const MobileFilterSidebar = styled.div`
  width: 170px;
  height: 100vh;
  background-color: var(--lightest);

  & .nav-link {
    font-size: 16px;
    color: var(--dark);
    padding: 11px;
    cursor: pointer;

    &.active {
      background: var(--white);
    }
  }
`;
const MobileFilterBody = styled.div`
  width: 100%;

  & .tab-pane {
    overflow: auto;
    height: 90vh;
    padding: 20px 25px;

    & .lists_body {
      max-width: 280px;
    }
  }

  & .review-star {
    width: 20px;
    height: 20px;
  }
`;
const HeaderWrapper = styled.div`
  background-color: var(--primary);
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--white);

  & svg {
    font-size: 25px;
  }
`;
const FooterWrapper = styled.div`
  background-color: var(--primary);
  height: 50px;
  width: 100%;
  justify-content: end;
  align-items: center;
  margin-top: -110px;
  z-index: 999;
  position: relative;
  display: flex;

  & button {
    margin-right: 40px;
    border: none;
    padding: 5px 15px;
    border-radius: 4px;
    background: var(--bs-green);
    color: var(--white);
  }
`;
const MobileSortByBody = styled.div`
  padding: 20px;
  height: 100vh;
`;
const FilterPopup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: fixed;
  left: 0;
  bottom: 0;
  box-shadow: 10px 0 20px 0 #fff;
  background: var(--white);
  z-index: 99;
`;
const Content = styled.div`
  padding: 10px;
  cursor: pointer;
  color: var(--primary);
  display: flex;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &:first-of-type {
    border-right: 2px solid var(--lighter);
  }

  @media (max-width: 500px) {
    font-size: 18px;
  }
`;
const FeaturesFooter = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .close_filter {
    color: var(--primary);

    &:hover {
      color: var(--error);
    }
  }

  & .apply_filter {
    border: none;
    padding: 10px 30px;
    border-radius: 4px;
    background: var(--primary);
    color: var(--white);
    font-weight: 500;
    transition: all ease-in-out 300ms;

    &:hover {
      background: var(--success);
    }
  }
`;
const FilterTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;

  & h4 {
    margin: 0;
  }

  & span {
    font-size: var(--p);
    color: var(--error);
    padding: 5px 10px;
    cursor: pointer;
  }
`;
const FormBox = styled.div`
  & > div {
    margin-bottom: 16px;

    &:last-of-type {
      margin: 0;
    }
  }

  & .accordion-body {
    font-size: 14px;
  }

  & .form-check {
    display: inline-flex;
    padding: 0;

    & label {
      line-height: 18px;
      margin-left: 10px;
    }
  }

  & .accordion-button {
    padding: 0.5rem 1.25rem;
    font-weight: bold;

    &:focus {
      border: none;
      box-shadow: none;
    }

    &:not(.collapsed) {
      color: var(--dark);
      background-color: transparent;
      box-shadow: none;
    }

    &::after {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='var(--primary)'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    }
  }

  @media (min-width: 1400px) {
    & .sps-btn {
      margin: 0 1.25rem;
    }
  }
`;
const NoDataFound = styled.div`
  text-align: center;
  padding: 15px 0;
  background: var(--lightest);
  border-radius: 10px;
`;
const FeaturesFilterPopupBody = styled.div`
  overflow: auto !important;
  height: 70vh !important;
  padding: 20px 15px;
`;
const FilterItemsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  & > div {
    padding: 0 20px;
    border-right: 1px solid var(--lighter);

    &:nth-of-type(2n) {
      border-right: 0;
    }

    @media (max-width: 500px) {
      padding: 0;
      border: 0;
    }
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const CloseIcon = styled.div`
  position: absolute;
  right: 120px;
  top: 0;
  height: 60px;
  width: 30px;
  display: grid;
  justify-content: center;
  align-items: center;
  font-size: var(--h3);
  cursor: pointer;
  transition: all ease-in-out 200ms;
  color: initial;

  &.search-close-icon {
    right: 65px;
    height: 60px;
  }

  &:hover {
    color: var(--error);
  }

  @media only screen and (max-width: 500px) {
    height: 49px;
    right: 60px;
  }
`;
const SearchBox = styled.div`
  position: relative;
  margin-bottom: 35px;
  z-index: 10;

  & .search-btn {
    background-color: transparent;
    position: absolute;
    border-width: 0 0 0 2px;
    height: 100%;
    right: 0;
    padding: 0 15px;
    color: var(--lighter);
    font-size: var(--h3);
    font-weight: 600;
    border-radius: 0 8px 8px 0;
    line-height: 34px;
    border-color: #b0b4c3;
    border-style: solid;
    display: inline-flex;
    align-items: center;
    @media only screen and (max-width: 500px) {
      font-size: var(--h5);
    }
  }

  & input {
    width: 100%;
    border: 2px solid #b0b4c3;
    padding: 8px 20px;
    border-radius: 8px;
    font-size: var(--h4);
    line-height: 35px;
    font-weight: 300;
    font-family: ProximaNovo, serif;
    @media only screen and (max-width: 1080px) {
      min-width: 100%;
    }
    @media only screen and (max-width: 500px) {
      padding: 0 10px;
      font-size: 14px;
    }
  }
`;
