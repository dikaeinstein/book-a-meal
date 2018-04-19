window.addEventListener('load', () => {
    const footerYear = document.getElementById('year');
    const menuDate = document.getElementById('date');
    footerYear.innerText = new Date().getFullYear();
    menuDate.innerText = new Date().toDateString();
    const toggleNavbar = () => {
        const navContainer = document.getElementsByClassName('nav-container')[0];
        navContainer.classList.toggle('navbar-toggle-show');
    };

    document.querySelector('.toggle-show')
        .addEventListener('click', toggleNavbar);
});
