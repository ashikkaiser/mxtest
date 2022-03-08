/** @format */

import styled from "@emotion/styled";
import {Col, Container, Row} from "react-bootstrap";

const Support = ({data}) => {
	return (
		<SupportWrapper id="support">
			<Container>
				<Row>
					<Col xs={12} md={12} lg={7}>
						<h3>Support</h3>
						<Row className="position-relative">
							<Col xs={12} md={6}>
								<ContactInfo>
									{data.contact !== "" && (
										<>
											<Title>Contact</Title>
											<p className="mt-2">{data.contact}</p>
										</>
									)}
									<Title>Customer Service</Title>
									<p className="mt-2">24*7</p>
								</ContactInfo>
							</Col>
							<Col xs={12} md={6}>
								{data.location !== "" && (
									<Location>
										<Title>Location</Title>
										<p>{data.location}</p>
									</Location>
								)}
							</Col>
						</Row>
					</Col>
					{/*
				<Col xs={12} md={12} lg={5} className="d-flex justify-content-end">
					<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2133.854776737075!2d88.34601456132363!3d22.496283421422618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0270c187a8d32d%3A0x754910432b8b75ef!2sGolf%20Club%20Rd%2C%20Rajendra%20Prasad%20Colony%2C%20Tollygunge%2C%20Kolkata%2C%20West%20Bengal%2C%20India!5e0!3m2!1sen!2sbd!4v1636081983805!5m2!1sen!2sbd"
							width="100%"
							height="200"
					></iframe>
				</Col>
			*/}
				</Row>
			</Container>
		</SupportWrapper>
	);
};
export default Support;
const SupportWrapper = styled.div`
  padding-top: 190px;
  padding-bottom: 30px;
  margin-top: -140px;

  @media (max-width:900px){
	margin-top: -170px;
  }
`;
const Title = styled.h4`
  font-weight: 500 !important;
`;
const ContactInfo = styled.div`
  margin-top: 15px;
`;
const Location = styled.div`
  height: 100%;
  display: grid;
  align-content: end;
  position: relative;
`;
