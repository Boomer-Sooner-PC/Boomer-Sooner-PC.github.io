import react from "react";

import "../../css/FeaturedPhotos.css";

import photo1 from "../../images/featured-projects/1.png";
import photo2 from "../../images/featured-projects/2.png";
import photo3 from "../../images/featured-projects/3.png";
import photo4 from "../../images/featured-projects/4.png";
import photo5 from "../../images/featured-projects/5.png";

export default class FeaturedProjects extends react.Component {
    render() {
        return (
            <div id="featured-photos">
                <h2 id="title">Featured Projects</h2>
                <div id="gallery">
                    <div id="scrolly-bit">
                        <img src={photo1} alt="" className="photo" />
                        <img src={photo2} alt="" className="photo" />
                        <img src={photo3} alt="" className="photo" />
                        <img src={photo4} alt="" className="photo" />
                        <img src={photo5} alt="" className="photo" />

                        <img src={photo1} alt="" className="photo" />
                        <img src={photo2} alt="" className="photo" />
                        <img src={photo3} alt="" className="photo" />
                        <img src={photo4} alt="" className="photo" />
                        <img src={photo5} alt="" className="photo" />
                    </div>
                </div>
                <p>
                    View more <a href="/projects">here</a>
                </p>
            </div>
        );
    }
}
