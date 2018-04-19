window.addEventListener('load', () => {
    const footerYear = document.getElementById('year');
    const menuDate = document.getElementById('date');
    const toggleShow = document.querySelector('.toggle-show');
    const toggleNavbar = () => {
        const navContainer = document.
            getElementsByClassName('nav-container')[0];
        navContainer.classList.toggle('navbar-toggle-show');
    };

    footerYear.innerText = new Date().getFullYear();

    if (menuDate) {
        menuDate.innerText = new Date().toDateString();
    }
    if (toggleShow) {
        toggleShow.addEventListener('click', toggleNavbar);
    }
});
