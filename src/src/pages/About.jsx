import React from "react";
import PageWrapper from "components/PageWrapper";

import AnimatedText from "components/AnimatedText";

import "../css/About.css";

export default class About extends React.Component {
    render() {
        return (
            <PageWrapper animation={true}>
                <AnimatedText dropdown="true" hover="true" id="about-title">
                    Jennifer Rayman is AWESOME!!!
                </AnimatedText>
            </PageWrapper>
        );
    }
}
