import React from "react";
import Navbar from "components/NavBar";
import Background from "components/Background";
import "../css/Astronomy.css";

import skymap from "../images/skymap.png";

export default class Astronomy extends React.Component {
    async componentDidMount() {
        await this.load_gallerys();
        this.draw_skymap();
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
        let image_urls_small = {};
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
            image_urls_small[id] = image.url_gallery;
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

        this.deepsky_photos = [];

        for (let id of deepsky_ids) {
            let imgurl_full = image_urls_full[id];
            this.deepsky_photos.push({
                src: image_urls_thumbs[id],
                name: images[id].title,
                link: imgurl_full,
                ra: images[id].ra,
                dec: images[id].dec,
                thumb: image_urls_small[id],
                id: id,
            });
        }

        this.deepsky_photos.reverse();

        this.add_images_to_gallery(this.deepsky_photos, "deepsky_gallery");

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

    async draw_skymap() {
        let canvas = document.getElementById("skymap-canvas");
        let ctx = canvas.getContext("2d");

        let width = (canvas.width =
            document.getElementById("skymap-canvas").clientWidth);
        let height = (canvas.height =
            document.getElementById("skymap-canvas").clientHeight);

        let background = new Image();
        background.src = skymap;

        // wait for image to load
        await new Promise((resolve) => {
            background.onload = resolve;
        });

        let deepsky_photos = this.deepsky_photos;

        function drawcanvas() {
            ctx.drawImage(background, 0, 0, width, height);

            for (let image of deepsky_photos) {
                // draw a point on the map at the ra and dec of the image
                let ra = (image.ra - 180) * -1 + 180;
                let dec = image.dec * -1;

                if (image.ra == null || image.dec == null) {
                    continue;
                }

                let x = (ra / 360) * width;

                let y = ((dec + 90) / 180) * height;
                // point
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = "#dc82f8";
                ctx.fill();
            }
        }

        drawcanvas();

        // load thumbnails
        let thumbnails = {};
        for (let image of this.deepsky_photos) {
            let img = new Image();
            img.src = image.thumb;
            await new Promise((resolve) => {
                img.onload = resolve;
            });
            thumbnails[image.id] = img;
        }

        // track mouse for hover
        let last = null;

        canvas.addEventListener("mousemove", (e) => {
            let x = e.offsetX;
            let y = e.offsetY;

            let ra = ((x / width) * 360 - 180) * -1 + 180;
            let dec = ((y / height) * 180 - 90) * -1;

            // check for images near the mouse
            let closest = null;
            let distance = 100000;
            for (let image of this.deepsky_photos) {
                if (image.ra == null || image.dec == null) {
                    continue;
                }
                let _distance = Math.sqrt(
                    (ra - image.ra) ** 2 + (dec - image.dec) ** 2
                );
                if (_distance < distance) {
                    distance = _distance;
                    closest = image;
                }
            }

            distance = distance / width;

            if (distance < 0.005) {
                if (last != closest) {
                    drawcanvas();
                }
                last = closest;
                // draw the image
                let img = thumbnails[closest.id];
                let img_width = width / 10;
                let img_height = width / 10;

                let ra = (closest.ra - 180) * -1 + 180;
                let dec = closest.dec * -1;
                let x = (ra / 360) * width;
                let y = ((dec + 90) / 180) * height;

                ctx.drawImage(
                    img,
                    x - img_width / 2,
                    y - img_height / 2,
                    img_width,
                    img_height
                );
            } else {
                if (last != null) {
                    drawcanvas();
                }
                last = null;
            }
        });

        canvas.addEventListener("click", (e) => {
            let x = e.offsetX;
            let y = e.offsetY;
            let ra = ((x / width) * 360 - 180) * -1 + 180;
            let dec = ((y / height) * 180 - 90) * -1;

            // check for images near the mouse
            let closest = null;
            let distance = 100000;
            for (let image of this.deepsky_photos) {
                if (image.ra == null || image.dec == null) {
                    continue;
                }
                let _distance = Math.sqrt(
                    (ra - image.ra) ** 2 + (dec - image.dec) ** 2
                );
                if (_distance < distance) {
                    distance = _distance;
                    closest = image;
                }
            }
            distance = distance / width;
            if (distance < 0.005) {
                // jump down to the image in the gallery
                let gallery = document.getElementById("deepsky_gallery");
                let gallery_items =
                    gallery.getElementsByClassName("gallery-item");
                for (let item of gallery_items) {
                    if (item.getAttribute("href") == closest.link) {
                        item.scrollIntoView({ behavior: "smooth" });
                        highlight_image(closest.link);
                    }
                }
            }
        });

        function highlight_image(link) {
            let gallery_items = document.getElementsByClassName("gallery-item");
            for (let item of gallery_items) {
                item.classList.remove("highlighted");
                if (item.getAttribute("href") == link) {
                    // children
                    item = item.getElementsByClassName("image-wrapper")[0];
                    item = item.getElementsByTagName("img")[0];

                    item.classList.add("highlighted");
                    setTimeout(() => {
                        item.classList.remove("highlighted");
                    }, 2000);
                }
            }
        }
    }

    shift(n, amm, max, min) {
        n = parseInt(n);
        n += amm;
        if (n > max) {
            n = min + (n - max);
        }
        if (n < min) {
            n = max - (min - n);
        }
        return n;
    }

    render() {
        return (
            <div className="about">
                <Navbar />
                <Background />
                <h1 id="loading">Loading gallery...</h1>
                <div id="about">
                    <h1>Astrophotography</h1>
                    <p>
                        This page is for all my astrohpotography things. On it
                        you'll find a skymap with points that show where the
                        deepsky images I've taken are in the sky. If you hover
                        over those points you'll see a preview of the image and
                        if you click on them you'll be taken to the image in the
                        gallery. The gallery is split into two sections, deepsky
                        and solar system. The deepsky gallery is for images of
                        galaxies, nebulae, star clusters, etc. The solar system
                        gallery is for images of planets, the moon, and the sun.
                        The gallery is sorted by date, with the most recent
                        images at the top. Astrobin's api only allows for a
                        small preview of the image to be shown, so if you want
                        to view the full resolution image just click on the
                        image in the gallery. On the Astrobin page you'll also
                        be able to see information about the equipment I used to
                        capture the image, as well as the exposure time and
                        other information. All images are taken by me, and are
                        hosted on{" "}
                        <a href="https://www.astrobin.com/users/FuelRatting/">
                            my Astrobin
                        </a>
                        .
                    </p>
                </div>
                <div id="skymap-container">
                    <h2>Skymap</h2>
                    <div id="skymap">
                        <canvas id="skymap-canvas"></canvas>
                    </div>
                </div>
                <div id="content">
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
