window.onload = function () {
    var h = document.getElementById("hamburger");
    var s = document.getElementById("sidebar");

    if (h && s) {
        h.addEventListener("click", function () {
            s.classList.toggle("open");
        });
    }
};