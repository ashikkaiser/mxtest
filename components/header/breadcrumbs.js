/** @format */

import {useRouter} from "next/router";
import styled from "@emotion/styled";
import {Breadcrumb, Container} from "react-bootstrap";
import Link from "next/link";
import {useContext} from "react";
import HeaderContext from "../../context/headerContext";

const Breadcrumbs = () => {
	const router = useRouter();
	const {breadcrumbs} = useContext(HeaderContext);
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, "0");
	var mm = today.getMonth();
	var yy = today.getFullYear();
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const FullDate = dd + " " + monthNames[mm] + ", " + yy;
	
	return (
		breadcrumbs.length > 0 && (
			<MainWrapper>
				<Container>
					<InfoBox>
						<Breadcrumb>
							{breadcrumbs.map((item, index) => {
								if (index === 0) {
									return (
										<Breadcrumb.Item key={index} active>
											<Link href={item.link}>
												<a>
													<svg
														width="12"
														height="13"
														viewBox="0 0 12 13"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M6.20967 0.754211C6.38421 0.756683 6.54918 0.834397 6.66224 0.9674L11.8066 7.01959C11.9594 7.19934 11.9938 7.45147 11.8948 7.66559C11.7958 7.87971 11.5814 8.01678 11.3455 8.01678H10.4376V11.6481C10.4376 11.9823 10.1667 12.2533 9.83241 12.2533H6.80632V9.22722H5.59588V12.2533H2.56978C2.23553 12.2533 1.96456 11.9823 1.96456 11.6481V8.01678H0.754126C0.515118 8.01678 0.298495 7.87612 0.201258 7.65779C0.10402 7.43945 0.144382 7.18434 0.30427 7.00669L5.75124 0.954499C5.86802 0.82475 6.03513 0.751739 6.20967 0.754211ZM2.11306 6.80634H3.175V11.0429H4.38544V8.01678H8.01675V11.0429H9.22719V6.80634H10.0367L6.18808 2.27854L2.11306 6.80634Z"
															fill="white"
														/>
													</svg>
													{item.name}
												</a>
											</Link>
										</Breadcrumb.Item>
									);
								} else if (index === breadcrumbs.length - 1) {
									return (
										<Breadcrumb.Item key={index} active>
											{item.name}
										</Breadcrumb.Item>
									);
								} else {
									return (
										<Breadcrumb.Item key={index} active>
											<Link href={item.link}>
												<a>{item.name}</a>
											</Link>
										</Breadcrumb.Item>
									);
								}
							})}
						</Breadcrumb>
						<span>Updated on: {FullDate}</span>
					</InfoBox>
				</Container>
			</MainWrapper>
		)
	);
};

export default Breadcrumbs;
const MainWrapper = styled.div`
  padding: 8px 0;
  background: var(--light-primary);
  display: flex;
  align-items: center;

  & .breadcrumb {
    margin: 0;
    gap: 6px;

    & svg {
      margin-right: 5px;
      margin-bottom: 2px;
    }
  }

  & .breadcrumb-item.active,
  a,
  .breadcrumb-item + .breadcrumb-item::before {
    color: var(--white);
    font-size: var(--sm-p);
    display: flex;
    padding-left: 0;
    align-items: center;
  }

  & .breadcrumb-item + .breadcrumb-item {
    display: flex;
    align-items: center;
  }
`;
const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: var(--white);

  & .breadcrumb-item {
    text-transform: capitalize;
  }

  @media only screen and (max-width: 500px) {
    font-size: 12px;
    display: grid;
    gap: 2px;
    justify-content: center;
	 text-align: center;
  }
`;
