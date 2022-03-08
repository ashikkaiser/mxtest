/** @format */

import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import HeaderContext from "../../context/headerContext";
import BoxItem from "../products/box-item";

const SuggestedList = ({ slug }) => {
  const { compareNames, allIds, country } = useContext(HeaderContext);
  const [suggestData, setSuggestData] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchApi = async () => {
    if (router.query.slug) {
      const slug = router.query.slug.split("-vs-");
      const res = await fetch(
        `https://api.spotsaas.com/product/${slug[0]}/alternates`, {
        headers: {
          'country_name': country
        }
      }
      )
        .then((response) => response.json())
        .then((responseJSON) => {
          return responseJSON;
        });

      const filteredData = res.alternatives.filter(
        (item) =>
          !slug.includes(
            item.name
              .toLowerCase()
              .replace(/[ |.|/]/g, "-")
              .replace(/[(|)]/g, "")
          )
      );
      await setSuggestData(filteredData);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [allIds, compareNames]);
  return (
    <MainWrapper>
      <h4>Suggestions</h4>
      {suggestData !== null ? (
        <>
          {/* {suggestData.length > 0 ? (
            suggestData.map((item, index) => {
              return (
                <Item key={index}>
                  <BoxItem compareList item={item} />
                </Item>
              );
            })
          ) : (
            <p className="text-center">No Suggested Products ☹️</p>
          )} */}
        </>
      ) : error === "" ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <p>{error}</p>
      )}
    </MainWrapper>
  );
};
export default SuggestedList;
const MainWrapper = styled.div`
  width: 80%;
  margin: 30px auto;

  & > h4 {
    text-align: left;
    margin-bottom: 15px;
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;
const Item = styled.div`
  margin-bottom: 25px;
`;
