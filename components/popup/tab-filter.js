import Offcanvas from 'react-bootstrap/Offcanvas'
import { useState } from 'react'
import styled from '@emotion/styled'
import { Row, Col } from 'react-bootstrap'
import { FiFilter } from 'react-icons/fi'
import { BsArrowDownUp } from 'react-icons/bs'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Rating from '../filter/ratings'

const TabFilter = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <FilterWrapper>
        <Row className="bg-white py-3">
          <Col>
            <Content onClick={handleShow}>
              <FiFilter /> <span>Filter</span>
            </Content>
          </Col>
          <Col>
            <Content>
              <BsArrowDownUp /> <span>Sort By</span>
            </Content>
          </Col>
        </Row>
      </FilterWrapper>

      <Offcanvas show={show} onHide={handleClose}>
        <HeaderWrapper>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="text-white">
              Filter Results by
            </Offcanvas.Title>
          </Offcanvas.Header>
        </HeaderWrapper>
        <Offcanvas.Body className="pt-0">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={4} className="bg-light p-3">
                <Nav className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="rating">Rating</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="pricing">Pricing</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="features">Features</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="MarketSegment">
                      Market Segments
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  <Tab.Pane eventKey="rating">
                    <Rating />
                  </Tab.Pane>
                  <Tab.Pane eventKey="pricing">
                    <h1>hello </h1>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default TabFilter
const HeaderWrapper = styled.div`
  background-color: var(--primary);
`

const FilterWrapper = styled.div`
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  box-shadow: 10px 0 20px 0px #fff;
`
const Content = styled.div`
  border-right: 2px solid #000;
  height: 100%;
`
