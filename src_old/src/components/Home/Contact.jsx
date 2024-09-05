import react from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";

import "../../css/Contact-Moon.css";

export default class Contact extends react.Component {
    render() {
        return (
            <div id="contact">
                <h2 id="contact-header">Contact Me!</h2>
                <div id="contacts">
                    <div className="contact">
                        <AiOutlineMail className="icon" />
                        <div id="text">Email me at: </div>
                        <a
                            href="mailto:contact@michaelmanders.com"
                            className="link">
                            contact@michaelmanders.com
                        </a>
                    </div>
                    <div className="contact">
                        <BsDiscord className="icon" />
                        <div id="text">Message me on Discord: </div>
                        <div className="link">cmdr_boomer_sooner</div>
                    </div>
                </div>
            </div>
        );
    }
}
