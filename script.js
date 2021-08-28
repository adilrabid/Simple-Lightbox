document.addEventListener("DOMContentLoaded", function () {
    console.log("Welcome to simple slb plugin");

    let shwocaseItems = document.querySelectorAll(".showcase-item");
    let slb = document.getElementById("slb");
    let slbWrap = document.getElementById("slb-wrap");
    let slbContent = document.getElementById("slb-content");
    let slbActiveContainer = document.getElementById("slb-active-container");
    let slbCloseBtn = document.getElementById("slb-close-btn");

    shwocaseItems.forEach((showcaseItem) => {
        showcaseItem.addEventListener("click", function (e) {
            e.preventDefault();
            let _source = e.target.parentElement.href;
            let _nodeName = e.target.nodeName;

            let newNode = document.createElement(_nodeName);
            newNode.src = _source;
            // newNode.style.height = "";
            // newNode.style.width = "auto";
            newNode.classList.add('slb-active-media');
            appendElement(slbActiveContainer, newNode);
            console.log(slbWrap);
            slb.classList.add("slb-active");
        });

        slbCloseBtn.addEventListener("click", function (e) {
            closeslb();
        });

    });

    function appendElement(parent, child) {
        parent.appendChild(child);
    }

    function closeslb() {
        slb.classList.remove("slb-active");
    }
});
