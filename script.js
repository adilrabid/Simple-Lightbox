document.addEventListener('DOMContentLoaded', function () {
    console.log("Welcome to simple lightbox plugin");

    let shwocaseItems = document.querySelectorAll(".showcase-item");
    let lightbox = document.getElementById("lightbox");
    let lightboxCloseBtn = document.getElementById("lightbox-close-btn");

    shwocaseItems.forEach(showcaseItem => {
        showcaseItem.addEventListener('click', function (e) {
            console.log(e.target);
            lightbox.classList.add('active');
        });

        lightboxCloseBtn.addEventListener('click', function (e) {
            lightbox.classList.remove('active');
        });
    })
})