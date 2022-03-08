import styled from '@emotion/styled'
import {Col, Container, Row} from 'react-bootstrap'
import Image from 'next/image'

const compareItems = [1, 2, 3, 4, 5, 6]
const QuickCompare = () => {
	const logoLoader = ({src, width, quality}) => {
		return `${src}?w=${width}&q=${quality || 75}`
	}
	
	return (
		<QuickCompareWrapper id="quick-compare">
			<h3>QuickCompare</h3>
			<Container>
				<Row>
					{compareItems.map((item) => (
						<Col xs={6} md={4} lg={2} key={item} className="my-2">
							<ContentWrapper className="shadow">
								<ProductOne>
									<Image
										loader={logoLoader}
										src="http://images.spotsaas.s3.us-west-1.amazonaws.com/products/eyeson/logo_1622748526.0142388.png"
										alt="product-1"
										width={40}
										height={40}
										priority
									/>
									<h6>Product 1</h6>
								</ProductOne>
								<span className="font-small text-center w-100 d-block">vs</span>
								<ProductOne>
									<Image
										loader={logoLoader}
										src="http://images.spotsaas.s3.us-west-1.amazonaws.com/products/eyeson/logo_1622748526.0142388.png"
										alt="product-1"
										width={40}
										height={40}
										priority
									/>
									<h6>Product 1</h6>
								</ProductOne>
							</ContentWrapper>
						</Col>
					))}
				</Row>
			</Container>
		</QuickCompareWrapper>
	)
}
export default QuickCompare
const QuickCompareWrapper = styled.div`
  border-bottom: 1px solid var(--lighter);
  margin-bottom: 40px;
  padding-top: 190px;
  padding-bottom: 30px;
  margin-top: -140px;
  
  @media (max-width:900px){
	margin-top: -170px;
  	padding-bottom: 20px;
  }
`
const ContentWrapper = styled.div`
  padding: 15px;
  border-radius: 10px;
`

const ProductOne = styled.div`
  display: flex;
  align-items: self-end;

  & h6 {
    margin-left: 10px;
  }
`

const ProductTwo = styled.div``
