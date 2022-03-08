/** @format */

import styled from "@emotion/styled";
import { CgMoreR } from "react-icons/cg";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const SocialMediaIcon = ({ data }) => {
  return (
    <SocialWrapper>
      <Icons>
        {data.twitterUrl !== "" && (
          <Item className="twitter_icon">
            <a href={data.twitterUrl} target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
          </Item>
        )}
        {data.instagramUrl !== "" && (
          <Item className="instagram_icon">
            <a href={data.instagramUrl} target="_blank" rel="noreferrer">
              <RiInstagramFill />
            </a>
          </Item>
        )}
        {data.facebookUrl !== "" && (
          <Item className="facebook_icon">
            <a href={data.facebookUrl} target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
          </Item>
        )}
        {data.youtubeUrl !== "" && (
          <Item className="youtube_icon">
            <a href={data.youtubeUrl} target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
          </Item>
        )}
        {data.linkedinUrl !== "" && (
          <Item className="linkedin_icon">
            <a href={data.linkedinUrl} target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
          </Item>
        )}
        {data.otherSocialUrls !== "" && (
          <Item className="others_icon">
            <a href={data.otherSocialUrls} target="_blank" rel="noreferrer">
              <CgMoreR />
            </a>
          </Item>
        )}
      </Icons>
    </SocialWrapper>
  );
};
export default SocialMediaIcon;
const SocialWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 60%;
  z-index: 999;
`;
const Icons = styled.div``;
const Item = styled.div`
  margin-bottom: 10px;

  &.twitter_icon {
    & a {
      background: #1da1f2;
    }
  }

  &.instagram_icon {
    & a {
      background: #bc2a8d;
    }
  }

  &.facebook_icon {
    & a {
      background: #3b5998;
    }
  }

  &.youtube_icon {
    & a {
      background: #c4302b;
    }
  }

  &.linkedin_icon {
    & a {
      background: #0077b5;
    }
  }

  & a {
    width: 38px;
    height: 38px;
    border-radius: 0 5px 5px 0;
    background: var(--primary);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    line-height: 44px;
    color: var(--white);
    @media (max-width: 500px) {
      font-size: 18px;
      width: 30px;
      height: 30px;
    }
  }
`;
