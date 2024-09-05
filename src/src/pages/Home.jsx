import React from "react";
import PageWrapper from "components/PageWrapper";
import AnimatedText from "components/AnimatedText";
import Casino from "components/Casino";

import "../css/Home.css";

export default class Home extends React.Component {
    render() {
        return (
            <PageWrapper animation={true}>
                <div id="fun"></div>
                <AnimatedText dropdown="true" hover="true" id="home-title">
                    Michael Manders
                </AnimatedText>
                {/* <Casino /> */}
            </PageWrapper>
        );
    }
}
