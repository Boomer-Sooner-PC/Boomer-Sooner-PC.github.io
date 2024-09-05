import React from "react";

export default class PageWrapper extends React.Component {
    render() {
        return <div className="PageWrapper">{this.props.children}</div>;
    }
}
