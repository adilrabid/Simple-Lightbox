document.addEventListener("DOMContentLoaded", function () {
    console.log("Welcome to simple lightbox plugin");

    let shwocaseItems = document.querySelectorAll(".showcase-item");
    let lightbox = document.getElementById("lightbox");
    let lightboxWrap = document.getElementById("lightbox-wrap");
    let lightboxContent = document.getElementById("lightbox-content");
    let lightboxActiveContainer = document.getElementById("lightbox-active-container");
    let lightboxCloseBtn = document.getElementById("lightbox-close-btn");

    shwocaseItems.forEach((showcaseItem) => {
        showcaseItem.addEventListener("click", function (e) {
            e.preventDefault();
            let _source = e.target.parentElement.href;
            let _nodeName = e.target.nodeName;

            let newNode = document.createElement(_nodeName)
            newNode.src = _source;
            newNode.style.height = "100%";
            newNode.style.width = "auto";
            newNode.classList.add('lightbox-active-item');
            appendElement(lightboxActiveContainer, newNode);
            console.log(lightboxWrap);
            lightbox.classList.add("lb-active");
        });

        lightboxCloseBtn.addEventListener("click", function (e) {
            closeLightbox();
        });

    });

    function appendElement(parent, child) {
        parent.appendChild(child);
    }

    function closeLightbox() {
        lightbox.classList.remove("lb-active");
    }
});
