import React from "react";
import Navbar from "components/NavBar";
import Background from "components/Background";
import "../css/Astronomy.css";

export default class Astronomy extends React.Component {
    async componentDidMount() {
        await this.load_gallerys();
        document.getElementById("loading").style.display = "none";
        document.getElementById("gallery-container").style.display = "block";

        // add event listeners to all the gallery items to redirect to the full image
        let gallery_items = document.getElementsByClassName("gallery-item");
        for (let item of gallery_items) {
            item.addEventListener("click", (e) => {
                let link = e.currentTarget.getAttribute("href");
                window.open(link, "_blank");
            });
        }
    }

    async load_gallerys() {
        let ASTRO_KEY = process.env.REACT_APP_ASTROBIN_KEY;
        let ASTRO_SECRET = process.env.REACT_APP_ASTROBIN_SECRET;
        let url = "https://www.astrobin.com";
        let secret_string = `&api_key=${ASTRO_KEY}&api_secret=${ASTRO_SECRET}`;
        // request images from FuelRatting
        let reqUrl = url + "/api/v1/image/?user=FuelRatting" + secret_string;

        let data = await fetch(reqUrl);

        // data.body is a readstream
        let images_data = await data.json();
        let meta = images_data.meta;
        images_data = images_data.objects;

        // astrobin api only replies with a maximum of 20 images per request
        let total_count = meta.total_count;
        let pages = Math.ceil(total_count / 20) - 1; // since we already have the first page

        for (let i = 0; i < pages; i++) {
            let nextLink = meta.next;
            data = await fetch(url + nextLink);
            let nextImages = await data.json();
            nextImages = nextImages.objects;
            images_data = images_data.concat(nextImages);
            meta = nextImages.meta;
        }

        // put the image objects into a dictionary from their id,
        // so we can easily access them by id
        let images = {};
        for (let i = 0; i < images_data.length; i++) {
            let image = images_data[i];
            let image_id = image.id;
            images[image_id] = image;
        }

        // image urls for linking to the full image
        let image_urls_full = {};
        for (let image in images) {
            let imgurl = `https://www.astrobin.com/full/${images[image].hash}`;
            image_urls_full[images[image].id] = imgurl;
        }

        let image_ids = Object.keys(images);

        let image_urls_thumbs = {};
        for (let image in images) {
            image = images[image];
            let id = image.id;

            if (image.revisions.length > 0) {
                let revurl =
                    url +
                    image.revisions[0].substring(
                        0,
                        image.revisions[0].length - 1
                    ) +
                    "?" +
                    secret_string;

                let revdata = await fetch(revurl);
                let rev = await revdata.json();
                image = rev;
            }

            let imgurl = image.url_regular;
            image_urls_thumbs[id] = imgurl;
        }

        let deepsky_ids = [];
        let system_ids = [];

        // sort images into categories
        for (let i = 0; i < image_ids.length; i++) {
            let image_id = image_ids[i];
            let image = images[image_id];

            // if the image has been platesolved, it wil hava a ra value making it a deepsky image
            if (image.solution_status != "MISSING") {
                deepsky_ids.push(image_id);
            }
        }

        let deepsky_photos = [];

        for (let id of deepsky_ids) {
            let imgurl_full = image_urls_full[id];
            deepsky_photos.push({
                src: image_urls_thumbs[id],
                name: images[id].title,
                link: imgurl_full,
            });
        }

        deepsky_photos.reverse();

        this.add_images_to_gallery(deepsky_photos, "deepsky_gallery");

        // add solar system images
        let solar_system_ids = [];
        for (let i = 0; i < image_ids.length; i++) {
            let image_id = image_ids[i];
            let image = images[image_id];

            // if the image has been platesolved, it wil hava a ra value making it a deepsky image
            if (image.solution_status == "MISSING") {
                solar_system_ids.push(image_id);
            }
        }

        let solar_system_photos = [];

        for (let id of solar_system_ids) {
            let imgurl_full = image_urls_full[id];
            solar_system_photos.push({
                src: image_urls_thumbs[id],
                name: images[id].title,
                link: imgurl_full,
            });
        }

        solar_system_photos.reverse();

        this.add_images_to_gallery(solar_system_photos, "solarsystem_gallery");
    }

    add_images_to_gallery(images, gallery_name) {
        // console.log(images);
        for (let image of images) {
            let component = `
            <div class="gallery-item" href="${image.link}"/> 
                <div class="image-wrapper">
                    <img src="${image.src}" alt="${image.name}"> </img>
                </div>
                <div class="image-overlay">
                    <div class="image-title">${image.name}</div>
                </div>
            </div>
            `;
            document.getElementById(gallery_name).innerHTML += component;
        }
    }

    render() {
        return (
            <div className="about">
                <Navbar />
                <Background />
                <div id="content">
                    <h1 id="loading">Loading gallery...</h1>
                    <div id="gallery-container">
                        <h2>Deepsky Gallery</h2>
                        <div
                            id="deepsky_gallery"
                            className="photo-gallery"></div>
                        <h2>Solar System Gallery</h2>
                        <div
                            id="solarsystem_gallery"
                            className="photo-gallery"></div>
                    </div>
                </div>
            </div>
        );
    }
}
