import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import TweetList from "./TweetList";
import SearchBar from "./SearchBar";
import UserList from "./UserList";
import TrendList from "./TrendList";

export default function Home({ token }) {
  return (
    <div>
      <Container>
        <Row>
          <Col
            md={2}
            sm={4}
            xs={4}
            className="d-block d-sm-block d-md-none d-xl-none d-lg-none"
          >
            <NavbarMobile />
          </Col>
          <Col md={2} className="d-none d-md-block d-lg-block">
            <NavbarDesktop />
          </Col>
          <Col md={7} sm={8} xs={8}>
            <TweetList token={token} />
          </Col>
          <Col md={3} className="d-none d-md-block d-lg-block">
            <div className="mb-4">
              Tendenze
              <TrendList />
            </div>
            <div>
              Profili da seguire
              <UserList />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
