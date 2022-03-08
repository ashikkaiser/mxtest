import styled from "@emotion/styled";
import _ from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Swiper from "react-id-swiper";

const EditorsPicks = ({ slug }) => {
  const [editorsPicks, setEditorsPicks] = useState([]);
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  useEffect(() => {
    const editorApi = async () => {
      if (slug) {
        const editorData = await fetch(
          `https://api.spotsaas.com/category/${slug}/products/editor-picks`
        )
          .then((response) => response.json())
          .then((responseJSON) => {
            return responseJSON;
          });
        setEditorsPicks(editorData);
      }
    };
    editorApi();
  }, [slug]);

  const params = {
    slidesPerView: 4,
    spaceBetween: 17,
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 17,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 17,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      320: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
    },
  };
  return (
    <MainWrapper>
      <Title>Editors Picks</Title>
      <EditorsLists>
        {editorsPicks.length > 0 ? (
          <Swiper {...params}>
            {_.map(editorsPicks, (item, index) => (
              <ListItem key={index}>
                <Image
                  loader={logoLoader}
                  src={item.image}
                  alt="img"
                  width={300}
                  height={150}
                  priority
                />
                <ItemBody>
                  <p>{item.name}</p>
                </ItemBody>
              </ListItem>
            ))}
          </Swiper>
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </EditorsLists>
    </MainWrapper>
  );
};
export default EditorsPicks;
const MainWrapper = styled.div`
  padding: 0 0 25px 0;
`;
const Title = styled.h4`
  font-weight: 500 !important;
`;
const EditorsLists = styled.div``;
const ListItem = styled.div`
  background: var(--white);
  border-radius: 8px;
  box-shadow: var(--shadow);
  & img {
    border-radius: 8px 8px 0 0;
  }
`;
const ItemBody = styled.div`
  padding: 5px 14px 14px;

  & p {
    margin: 0;
    font-size: 14px;
  }
`;
