function menu_open() {
    menu = document.getElementById("menu");
    overlay = document.getElementById("menu_overlay");

    menu.style = "transform: translateY(0%);"
    overlay.style = "opacity:1;"
}
function menu_close() {
    menu = document.getElementById("menu");
    overlay = document.getElementById("menu_overlay");

    menu.style = "transform: translateY(-120%);"
    overlay.style = "opacity:0;"
}