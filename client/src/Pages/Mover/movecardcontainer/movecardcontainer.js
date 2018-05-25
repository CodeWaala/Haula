import React from "react";
import "./movecardcontainer.css";
import { Grid, Col, Row } from "react-bootstrap";

export const MoveCardContainer = ({ children }) => {
    return <div className="flex-1"><Row>{children}</Row></div>
};

// export default MoveCardContainer;