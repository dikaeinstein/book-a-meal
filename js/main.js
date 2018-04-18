window.addEventListener('load', () => {
    const footerYear = document.getElementById('year');
    footerYear.innerText = new Date().getFullYear();

    const toggleNavbar = () => {
        const navContainer = document.getElementsByClassName('nav-container')[0];
        navContainer.classList.toggle('navbar-toggle-show');
    };

    document.querySelector('.toggle-show')
        .addEventListener('click', toggleNavbar);
});
