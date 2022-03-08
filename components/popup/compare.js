/** @format */

import styled from "@emotion/styled";
import _ from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { GrFormClose } from "react-icons/gr";
import { useMediaQuery } from "react-responsive";
import HeaderContext from "../../context/headerContext";
import Item from "./product-item";

const ComparePopup = () => {
  const {
    isCompare,
    setIsCompare,
    activeId,
    setActiveId,
    closeComparePopup,
    compareNames,
    setCompareNames,
    country
  } = useContext(HeaderContext);
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const isTablet = useMediaQuery({ query: "(max-width:1080px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  useEffect(() => {
    const AltGet = async () => {
      if (activeId !== "" && isCompare) {
        const res = await fetch(
          `https://api.spotsaas.com/product/${activeId}/alternates`, {
          headers: {
            'country_name': country
          }
        }
        )
          .then((response) => response.json())
          .then((responseJSON) => {
            return responseJSON;
          });
        const activeItem = await fetch(
          `https://api.spotsaas.com/product/${activeId}`, {
          headers: {
            'country_name': country
          }
        }
        )
          .then((response) => response.json())
          .then((responseJSON) => {
            return responseJSON;
          });
        if (res || activeItem) {
          setActiveItem(activeItem);
          setData(res);
        } else {
          setError("Api is not found the product (Id) ☹️");
        }
      }
    };
    AltGet();
  }, [activeId, isCompare]);

  useEffect(() => {
    //Fix This Section (Ashik) there have in error. I dont Know about your datastracture thats why icant fix it ..
    //   const filteredData = data.filter((item) => selectedId.includes(item.slug));
    //   setSelectedData(filteredData);

  }, [selectedId]);

  const selectIdHandler = async (name) => {
    if (selectedId.length < 4) {
      if (!selectedId.includes(name)) {
        await setSelectedId([...selectedId, name]);
      }
      if (!compareNames.includes(name)) {
        await setCompareNames([...compareNames, name]);
      }
    }
  };

  const closeSelectIdHandler = async (name) => {
    const filtered = await selectedId.filter((item) => item !== name);
    if (selectedId.length === 0) {
      await setSelectedId([]);
    }

    const filteredName = await compareNames.filter((item) => item !== name);

    await setCompareNames(filteredName);
    await setSelectedId(filtered);
  };

  const goToComparePageHandler = async () => {
    let slug;
    if (compareNames.length > 0) {
      const addValue = `${_.concat([activeItem.slug], compareNames)}`;
      slug = addValue.replace(/,/g, "-vs-");
    } else {
      slug = activeItem.slug;
    }

    if (selectedId.length > 0) {
      router.push(
        {
          pathname: `/compare/${slug}`,
        },
        undefined,
        { shallow: true }
      );
    } else {
      router.push(
        {
          pathname: `/compare/${slug}`,
        },
        undefined,
        { shallow: true }
      );
    }

    await setIsCompare(false);
    await setCompareNames([]);
    await window.scrollTo(0, 0);
    setTimeout(() => {
      setSelectedData([]);
      setSelectedId([]);
      setData([]);
      setActiveItem(null);
    }, 200);
  };

  return (
    <>
      <PopupWrapper className={`${isCompare ? "open" : ""}`}>
        {data.length < 1 ? (
          <>
            {error === "" ? (
              <div className={`sps_loader ${isCompare ? "show" : ""}`}>
                <Loader />
              </div>
            ) : (
              <div>
                <h4>{error}</h4>
              </div>
            )}
          </>
        ) : (
          <Wrapper>
            {(selectedData.length > 0 || activeItem !== null) && (
              <>
                <h3 className={`selected_title`}>Compare Products</h3>
                <SelectedItems>
                  {activeItem !== null && (
                    <div>
                      <Item
                        item={activeItem}
                        active
                        close={closeSelectIdHandler}
                      />
                    </div>
                  )}
                  {_.map(selectedData, (item, index) => {
                    return (
                      <div key={index}>
                        <Item item={item} close={closeSelectIdHandler} />
                      </div>
                    );
                  })}
                </SelectedItems>
              </>
            )}
            <GoButton>
              <div onClick={goToComparePageHandler}>
                <button type="button" className={`sps-btn sps-btn-outline`}>
                  Go to Compare Page
                </button>
              </div>
            </GoButton>
            {data.length > 0 ? (
              <>
                {isMobile ? (
                  <>
                    {selectedData.length < 1 && (
                      <>
                        <SuggestedWrapper>
                          <h3 className={`suggested_title`}>Suggested</h3>
                          <SuggestedList>
                            {_.map(data, (item, index) => (
                              <div key={index}>
                                <ListItem
                                  onClick={() => {
                                    if (selectedId.includes(item.slug)) {
                                      closeSelectIdHandler(item.slug);
                                    } else {
                                      selectIdHandler(item.slug);
                                    }
                                  }}
                                  className={`${selectedId.includes(item.slug)
                                    ? "active"
                                    : ""
                                    }`}
                                >
                                  <Image
                                    loader={logoLoader}
                                    src={item.logo}
                                    alt={item.logoAltText}
                                    width={64}
                                    height={64}
                                    priority
                                  />
                                  <h4>{item.name}</h4>
                                </ListItem>
                              </div>
                            ))}
                          </SuggestedList>
                        </SuggestedWrapper>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {selectedData.length < (isTablet ? 2 : 3) && (
                      <>
                        <SuggestedWrapper>
                          <h3 className={`suggested_title`}>Suggested</h3>
                          <SuggestedList>
                            {_.map(data, (item, index) => (
                              <div key={index}>
                                <ListItem
                                  onClick={() => {
                                    if (selectedId.includes(item.slug)) {
                                      closeSelectIdHandler(
                                        item.slug,
                                        item.name
                                      );
                                    } else {
                                      selectIdHandler(item.slug, item.name);
                                    }
                                  }}
                                  className={`${selectedId.includes(item.slug)
                                    ? "active"
                                    : ""
                                    }`}
                                >
                                  <Image
                                    loader={logoLoader}
                                    src={item.logo}
                                    alt={item.logoAltText}
                                    width={64}
                                    height={64}
                                    priority
                                  />
                                  <div>
                                    <h4>{item.name}</h4>
                                    <p className="m-0">{item.subtitle}</p>
                                  </div>
                                </ListItem>
                              </div>
                            ))}
                          </SuggestedList>
                        </SuggestedWrapper>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="text-center">
                <h4>This product do not have any suggested product. ☹️</h4>
              </div>
            )}
          </Wrapper>
        )}
        <Close
          onClick={() => {
            closeComparePopup();
            setSelectedId([]);
            setData([]);
            setActiveId("");
            setActiveItem(null);
          }}
        >
          <GrFormClose />
        </Close>
      </PopupWrapper>
      <Overlay
        onClick={() => {
          closeComparePopup();
          setSelectedId([]);
          setData([]);
          setActiveId("");
          setActiveItem(null);
        }}
        className={`${isCompare ? "open" : ""}`}
      />
    </>
  );
};

export const Loader = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};
export default ComparePopup;
const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 90vh;
  overflow: auto;
  max-width: 600px;
  padding: 40px 30px;
  background: var(--white);
  border-radius: 8px 0 0 8px;
  box-shadow: var(--shadow);
  transition: all ease-in-out 300ms;
  transform: translateX(665px);
  visibility: hidden;
  opacity: 0;
  z-index: 9999;

  @media (max-width: 500px) {
    padding: 20px;
  }

  &.open {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
  }

  & .sps_loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: var(--primary);

    &.show {
      opacity: 1;
      visibility: visible;
    }
  }
`;
const Close = styled.div`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 30px;

  & svg {
    font-size: 32px;
  }
`;
const Wrapper = styled.div`
  & .selected_title {
    margin-bottom: 25px;
  }
`;
const SelectedItems = styled.div`
  & > div {
    border-bottom: 1px solid var(--lighter);

    &:first-of-type {
      border-top: 1px solid var(--lighter);
    }
  }
`;
const SuggestedWrapper = styled.div`
  & .suggested_title {
    margin-bottom: 20px;
  }
`;
const SuggestedList = styled.div`
  display: grid;

  & h4 {
    margin-bottom: 2px;
  }

  @media (max-width: 900px) {
    & h4 {
      font-size: 16px !important;
    }
  }

  @media (max-width: 500px) {
    & h4 {
      font-size: 14px !important;
    }
  }
`;
const ListItem = styled.div`
  cursor: pointer;
  display: flex;
  gap: 20px;
  border-bottom: 1px solid var(--lighter);
  padding: 20px 10px;
  word-wrap: anywhere;
  align-items: center;

  & div:first-of-type {
    flex: 0 0 auto;
  }

  & p {
    font-size: 14px !important;
  }

  & img {
    border-radius: 100px;
  }

  &.active {
    background: var(--primary);
    color: var(--white);
    padding: 10px 10px;
    border-radius: 5px;
    margin-top: 20px;
    border: none;
    box-shadow: var(--shadow);

    & p {
      color: var(--white);
    }
  }
`;
const GoButton = styled.div`
  text-align: center;
  margin: 20px 0 40px 0;

  & > div {
    display: inline-block;
  }

  & .sps-btn {
    margin: 25px 0 0 0;
    padding: 10px 20px;
  }
`;
const Overlay = styled.div`
  position: unset;
  width: 100%;
  height: 100%;
  background: var(--dark);
  opacity: 0.7;
  z-index: 1000;
  top: 0;
  left: 0;
  display: none;
  transition: all ease-in-out 300ms;

  &.open {
    position: fixed;
    display: block;
  }
`;
