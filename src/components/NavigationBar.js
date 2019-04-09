import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    .navbar{
        background-color: #005380;
        width: 100%;
        height: 45px;
        text-align: center;
    }

    .navbar-brand, .navbar-nav .nav-link {
        color: #fff;

        &:hover {
            color: white;
        }
    }
`;

const NavigationBar = () => {
    return (
        <Styles>
            <Navbar expand="lg">
                <Navbar.Brand href="/">Time Coach</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
                    <Nav className="ml-auto">
                        <Nav.Item><Nav.Link href="/estimates">Estimate</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/activities">Activity</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/results">Results</Nav.Link></Nav.Item>
                    </Nav>
            </Navbar>
        </Styles>
    );
};

export default NavigationBar;