/** @format */

import Image from "next/image";
import Reviews from "../review";
import Link from "next/link";
import styled from "@emotion/styled";
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import { useContext, useEffect, useState } from "react";
import HeaderContext from "../../context/headerContext";
import { Button, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useRouter } from "next/router";

const ActiveItem = () => {
	const logoLoader = ({ src, width, quality }) => {
		return `${src}?w=${width}&q=${quality || 100}`;
	};
	const {
		isCompare,
		activeId,
		setActiveId,
		compareIds,
		compareNames,
		setCompareNames,
		country
	} = useContext(HeaderContext);
	const [item, setItem] = useState(null);
	const [overview, setOverview] = useState([]);
	const [media, setMedia] = useState([]);
	const [alternates, setAlternates] = useState([]);
	const [loading, setLoading] = useState(true);
	const [info, setInfo] = useState([]);
	const [reading, setReading] = useState(false);
	const router = useRouter();

	const apiGet = async () => {
		const get = await localStorage.getItem("active_id");
		const activeId = await JSON.parse(get);
		if (get && activeId !== "") {
			const res = await fetch(`https://api.spotsaas.com/product/${activeId}`, { headers: { 'country_name': country } })
				.then((response) => response.json())
				.then((responseJSON) => {
					return responseJSON;
				});

			if (!res) {
				return {
					notFound: true,
				};
			}

			const overviewRes = await fetch(
				`https://api.spotsaas.com/product/${activeId}/overview`, { headers: { 'country_name': country } }
			)
				.then((response) => response.json())
				.then((responseJSON) => {
					return responseJSON;
				});

			const mediaRes = await fetch(
				`https://api.spotsaas.com/product/${activeId}/media`, { headers: { 'country_name': country } }
			)
				.then((response) => response.json())
				.then((responseJSON) => {
					return responseJSON;
				});

			const alternatesRes = await fetch(
				`https://api.spotsaas.com/product/${activeId}/alternates`, { headers: { 'country_name': country } }
			)
				.then((response) => response.json())
				.then((responseJSON) => {
					return responseJSON;
				});

			await setItem(res);
			await setOverview(overviewRes);
			await setMedia(mediaRes);
			await setAlternates(alternatesRes);
			await setLoading(false);
		}
	};

	useEffect(() => {
		apiGet();
		setTimeout(() => {
			setLoading(true);
		}, 500);
	}, [isCompare, activeId]);

	useEffect(() => {
		if (overview.desc) {
			const content = overview.desc.slice(0, 90);
			setInfo(content);
		}
	}, [loading]);

	const readMoreHandler = () => {
		const fullContent = overview.desc;
		setInfo(fullContent);
		setReading(true);
	};

	const closeHandler = () => {
		const fullContent = overview.desc.slice(0, 90);
		setInfo(fullContent);
		setReading(false);
	};

	const CloseItemHandler = async (name) => {
		localStorage.setItem("active_id", JSON.stringify(""));
		const getName = name.toLowerCase().replace(/ /g, '-');
		const slugArray = router.query.slug.split('-vs-');
		if (slugArray.includes(getName)) {
			const value = slugArray.filter((slug) => slug !== getName);
			const newSlug = value.join('-vs-');
			router.push(
				{
					pathname: `/compare/${newSlug}`,
				},
				undefined,
				{ shallow: true }
			);
		}
		setActiveId("");
	};

	return !loading ? (
		<>
			<ProductItem>
				<ProductImg>
					<Image
						loader={logoLoader}
						src={item.logo}
						alt={item.logoAltText}
						width={25}
						height={25}
						priority
					/>
					<h4>{item.name}</h4>
				</ProductImg>
				<ProductReviews>
					<Icons>
						<Reviews value={item.rating} />
					</Icons>
					<div className="review_reading">
						{item.ratingCount > 0 && (
							<Link href={`/product/${item.name}/reviews`}>
								<a>
									({item.ratingCount}{" "}
									{item.ratingCount > 1 ? "ratings" : "rating"})
								</a>
							</Link>
						)}
					</div>
				</ProductReviews>
				<ProductVisit>
					<a
						href={`${item.url}?utm_source=spotsaas.com&utm_medium=cpc`}
						target="_blank"
						className="sps-btn sps-btn-success"
						rel="noreferrer"
					>
						Visit Website
					</a>
				</ProductVisit>
				{compareIds.length > 0 && (
					<CloseItem onClick={() => CloseItemHandler(item.name)}>
						<RiCloseLine />
					</CloseItem>
				)}
			</ProductItem>
			<Overview>
				<h3>Overview</h3>
				<h5>Description</h5>
				<p>
					{`${info}${!reading && "..."}`}
					{overview.desc.length > 155 && (
						<>
							{!reading ? (
								<a
									className="sps-read-more-btn read_more_btn"
									onClick={readMoreHandler}
								>
									Read More
								</a>
							) : (
								<a
									className="sps-read-more-btn read_more_btn"
									onClick={closeHandler}
								>
									Close
								</a>
							)}
						</>
					)}
				</p>
				<ListItem>
					<h4>Platforms</h4>
					<ul className="list">
						{overview.platforms.map((value, index) => {
							if (value.toLowerCase().includes("web")) {
								return (
									<li key={index} className="d-flex gap-2 align-items-center">
										<span>
											<Image
												loader={logoLoader}
												src={`/assets/img/icons/web.png`}
												alt="category image"
												width={25}
												height={25}
												priority
											/>
										</span>
										{value}
									</li>
								);
							} else if (value.toLowerCase().includes("android")) {
								return (
									<li key={index} className="d-flex gap-2 align-items-center">
										<span>
											<Image
												loader={logoLoader}
												src={`/assets/img/icons/android.png`}
												alt="category image"
												width={25}
												height={25}
												priority
											/>
										</span>
										{value}
									</li>
								);
							} else if (value.toLowerCase().includes("ios")) {
								return (
									<li key={index} className="d-flex gap-2 align-items-center">
										<span>
											<Image
												loader={logoLoader}
												src={`/assets/img/icons/ios.png`}
												alt="category image"
												width={25}
												height={25}
												priority
											/>
										</span>
										{value}
									</li>
								);
							} else if (
								value.toLowerCase().includes("macos") ||
								value.toLowerCase().includes("mac")
							) {
								return (
									<li key={index} className="d-flex gap-2 align-items-center">
										<span>
											<Image
												loader={logoLoader}
												src={`/assets/img/icons/macos.png`}
												alt="category image"
												width={25}
												height={25}
												priority
											/>
										</span>
										{value}
									</li>
								);
							} else if (value.toLowerCase().includes("windows")) {
								return (
									<li key={index} className="d-flex gap-2 align-items-center">
										<span>
											<Image
												loader={logoLoader}
												src={`/assets/img/icons/windows.png`}
												alt="category image"
												width={25}
												height={25}
												priority
											/>
										</span>
										{value}
									</li>
								);
							} else if (value.toLowerCase().includes("linux")) {
								return (
									<li key={index} className="d-flex gap-2 align-items-center">
										<span>
											<Image
												loader={logoLoader}
												src={`/assets/img/icons/linux.png`}
												alt="category image"
												width={25}
												height={25}
												priority
											/>
										</span>
										{value}
									</li>
								);
							} else {
								return (
									<li key={index} className="d-flex gap-2 align-items-center">
										<span>
											<Image
												loader={logoLoader}
												src={`/assets/img/icons/draft.png`}
												alt="category image"
												width={25}
												height={25}
												priority
											/>
										</span>
										{value}
									</li>
								);
							}
						})}
					</ul>
				</ListItem>
				<ListItem>
					<h4>Customer Type</h4>
					<ul className="list">
						{item.customerTypes.map((name, index) => {
							if (name.toLowerCase().includes("business")) {
								return (
									<li key={index} className="d-flex gap-2 align-items-center">
										<span>
											<Image
												loader={logoLoader}
												src={`/assets/img/icons/big-business.png`}
												alt="category image"
												width={25}
												height={25}
												priority
											/>
										</span>
										{name}
									</li>
								);
							} else if (name.toLowerCase().includes("enterprises")) {
								return (
									<li key={index} className="d-flex gap-2 align-items-center">
										<span>
											<Image
												loader={logoLoader}
												src={`/assets/img/icons/small-enterprise.png`}
												alt="category image"
												width={25}
												height={25}
												priority
											/>
										</span>
										{name}
									</li>
								);
							} else if (name.toLowerCase().includes("mid-sized")) {
								return (
									<li key={index} className="d-flex gap-2 align-items-center">
										<span>
											<Image
												loader={logoLoader}
												src={`/assets/img/icons/mid-sized.png`}
												alt="category image"
												width={25}
												height={25}
												priority
											/>
										</span>
										{name}
									</li>
								);
							} else if (name.toLowerCase().includes("individual")) {
								return (
									<li key={index} className="d-flex gap-2 align-items-center">
										<span>
											<Image
												loader={logoLoader}
												src={`/assets/img/icons/individual.png`}
												alt="category image"
												width={25}
												height={25}
												priority
											/>
										</span>
										{name}
									</li>
								);
							} else if (name.toLowerCase().includes("freelancer")) {
								return (
									<li key={index} className="d-flex gap-2 align-items-center">
										<span>
											<Image
												loader={logoLoader}
												src={`/assets/img/icons/freelancer.png`}
												alt="category image"
												width={25}
												height={25}
												priority
											/>
										</span>
										{name}
									</li>
								);
							} else {
								return (
									<li key={index} className="d-flex gap-2 align-items-center">
										<span>
											<Image
												loader={logoLoader}
												src={`/assets/img/icons/draft.png`}
												alt="category image"
												width={25}
												height={25}
												priority
											/>
										</span>
										{name}
									</li>
								);
							}
						})}
					</ul>
				</ListItem>
			</Overview>
			<PricingWrapper id="pricing">
				<h3>Pricing</h3>
				<Disclaimer>
					<p>
						Disclaimer: The pricing details were last updated from the vendor
						website and may be different from actual. Please confirm with the
						vendor website before purchasing.
					</p>
				</Disclaimer>
				{media.priceImageInfo.length > 0 && (
					<PricingImage>
						<a
							href={`${item.productPricingUrl}?utm_source=spotsaas.com&utm_medium=cpc`}
							target="_blank"
							rel="noreferrer"
						>
							<Image
								loader={logoLoader}
								src={media.priceImageInfo[0].url}
								alt={media.priceImageInfo[0].altText}
								layout="responsive"
								priority
								width={1000}
								height={600}
							/>
						</a>
					</PricingImage>
				)}
			</PricingWrapper>
			<FeaturesWrapper id="features">
				<FeaturesTitle>Features</FeaturesTitle>
				<CheckLists>
					{item.features.map((item, index) => (
						<li key={index}>
							<Link
								href={`/glossary#${item.toLowerCase().replace(/ /g, "-")}`}
							>
								<a>
									<RiCheckLine /> {item}
									<OverlayTrigger
										placement="top"
										overlay={
											<Tooltip id={`popover-positioned-top`}>
												Features tooltip content will be here. when api have the
												info.
											</Tooltip>
										}
									>
										<Button className={`sps_overlay_trigger`}>
											<AiOutlineQuestionCircle className="font-small" />
										</Button>
									</OverlayTrigger>
								</a>
							</Link>
						</li>
					))}
				</CheckLists>
			</FeaturesWrapper>
			<RatingsReviewsWrapper id="ratings">
				<ReviewHeading>
					<div>
						<h3>Ratings</h3>
					</div>
					<div>
						<i>1000 ratings</i>
					</div>
				</ReviewHeading>
				<ReviewStars>
					<div className="d-flex gap-3 mb-3 stars-count">
						<div className="d-flex gap-1">
							<ImStarFull />
							<ImStarFull />
							<ImStarFull />
							<ImStarFull />
							<ImStarFull />
						</div>
						<div>
							<h4 className="stars-title">
								{item.ratingsInfo.fiveStarRatings}
							</h4>
						</div>
					</div>
					<div className="d-flex gap-3 mb-3 stars-count">
						<div className="d-flex gap-1">
							<ImStarFull />
							<ImStarFull />
							<ImStarFull />
							<ImStarFull />
							<ImStarEmpty />
						</div>
						<div>
							<h4 className="stars-title">
								{item.ratingsInfo.fourStarRatings}
							</h4>
						</div>
					</div>
					<div className="d-flex gap-3 mb-3 stars-count">
						<div className="d-flex gap-1">
							<ImStarFull />
							<ImStarFull />
							<ImStarFull />
							<ImStarEmpty />
							<ImStarEmpty />
						</div>
						<div>
							<h4 className="stars-title">
								{item.ratingsInfo.threeStarRatings}
							</h4>
						</div>
					</div>
					<div className="d-flex gap-3 mb-3 stars-count">
						<div className="d-flex gap-1">
							<ImStarFull />
							<ImStarFull />
							<ImStarEmpty />
							<ImStarEmpty />
							<ImStarEmpty />
						</div>
						<div>
							<h4 className="stars-title">{item.ratingsInfo.twoStarRatings}</h4>
						</div>
					</div>
					<div className="d-flex gap-3 mb-3 stars-count">
						<div className="d-flex gap-1">
							<ImStarFull />
							<ImStarEmpty />
							<ImStarEmpty />
							<ImStarEmpty />
							<ImStarEmpty />
						</div>
						<div>
							<h4 className="stars-title">{item.ratingsInfo.oneStarRatings}</h4>
						</div>
					</div>
				</ReviewStars>
			</RatingsReviewsWrapper>
			<AlternativesWrapper id="alternatives">
				<h3>Alternatives</h3>
				{alternates.length > 0 &&
					alternates.slice(0, 2).map((value, index) => (
						<div key={index}>
							<Image
								loader={logoLoader}
								src={value.logo}
								alt={value.logoAltText}
								width={85}
								height={85}
								priority
							/>
							<h4>{value.name}</h4>
						</div>
					))}
			</AlternativesWrapper>
		</>
	) : (
		<Spinner animation="border" role="status">
			<span className="visually-hidden">Loading...</span>
		</Spinner>
	);
};
export default ActiveItem;
const ProductItem = styled.div`
  padding: 20px 0;
  text-align: left;
  border-bottom: 1px solid var(--lighter);
  position: relative;
  min-height: 220px;
  display: grid;
  align-content: space-between;

  & p {
    margin: 0;
    font-size: var(--sm-p) !important;
  }

  @media (max-width: 900px) {
    padding-bottom: 0;
  }
`;
const ProductReviews = styled.div`
  margin-bottom: 20px;

  & span {
    font-weight: 400;
  }

  & .review_reading a {
    color: var(--light-primary);
  }
`;
const Icons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;
const ProductImg = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;

  & h4 {
    margin: 0;
  }

  & img {
    border-radius: 100px;
  }

  @media (max-width: 500px) {
    text-align: left;
    margin-bottom: 10px;
  }
`;
const ProductVisit = styled.div`
  position: relative;
  height: 100%;
  margin-top: 15px;
`;
const CloseItem = styled.div`
  position: absolute;
  padding: 5px 10px;
  line-height: 15px;
  top: -15px;
  right: 10px;
  font-size: 22px;
  cursor: pointer;

  &:hover {
    color: var(--error);
  }
`;
const Overview = styled.div`
  text-align: left;
  padding: 20px 0;
  border-bottom: 1px solid var(--lighter);

  & .read_more_btn {
    margin-top: 10px;
    font-size: 14px;
    cursor: pointer;
  }

  & .review_source {
    margin-top: 15px;
  }

  & .sps-read-more-btn {
    margin-left: 10px;
    color: var(--primary);
    font-weight: 500;
  }
`;
const ListItem = styled.div`
  margin-bottom: 20px;
  min-height: 210px;
  @media (min-width: 1080px) {
    width: auto;
  }

  & h4 {
    margin-bottom: 10px;
  }

  & .list {
    padding: 0;

    & li {
      list-style: none;
      line-height: 35px;

      & span {
        line-height: 0;
      }
    }
  }
`;
const PricingWrapper = styled.div`
  border-bottom: 1px solid var(--lighter);
  padding: 20px 0;
  text-align: left;
  min-height: 380px;

  @media (max-width: 500px) {
    min-height: auto;
  }
`;
const Disclaimer = styled.div`
  margin: 10px 0;
`;
const PricingImage = styled.div``;
const FeaturesWrapper = styled.div`
  border-bottom: 1px solid var(--lighter);
  padding: 20px 0;
  text-align: left;
`;
const FeaturesTitle = styled.h3`
  margin-bottom: 10px;
`;
const CheckLists = styled.ul`
  padding: 0;
  display: grid;
  gap: 10px;
  min-height: 700px;

  & a {
    color: var(--black);
  }

  & .sps_overlay_trigger {
    background: transparent;
    padding: 0 5px;
    border-color: transparent;
    color: var(--darker);
  }

  & li {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 22px;

    & svg {
      font-size: 25px;
    }

    & .font-small {
      font-size: var(--sm-p) !important;
    }
  }
`;
const RatingsReviewsWrapper = styled.div`
  border-bottom: 1px solid var(--lighter);
  padding: 20px 0;
  text-align: left;

  & .reviews-item-wrapper {
    height: 100%;
  }
`;
const ReviewHeading = styled.div`
  margin-bottom: 20px;
`;
const ReviewStars = styled.div`
  & svg {
    font-size: 22px;
    color: var(--warning);
    @media (max-width: 1080px) {
      font-size: 16px;
    }
    @media (max-width: 500px) {
      font-size: 14px;
    }
  }

  & .stars-title {
    font-weight: 400 !important;
    font-size: 20px !important;
    line-height: 24px;
    margin: 0;
    @media (max-width: 500px) {
      font-size: 18px !important;
      line-height: 22px;
    }
  }
`;
const AlternativesWrapper = styled.div`
  padding: 20px 0;
  text-align: left;
  margin-bottom: 40px;

  & > div {
    text-align: center;
    margin-bottom: 15px;
  }

  & img {
    border-radius: 100px;
  }

  & h3 {
    margin-bottom: 25px;
  }
`;
const ErrorMassage = styled.div`
  height: 37vh;
  display: grid;
  align-items: center;

  & h4 {
    margin-bottom: 20px;
  }

  & .sps-btn {
    padding: 8px 30px;
  }
`;
