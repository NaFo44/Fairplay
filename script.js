document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = document.querySelector('.main-header').offsetHeight; // Get header height
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset - 20; // -20px for a bit more padding

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const closeSidebarBtn = document.querySelector('.close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const sidebarLinks = sidebar.querySelectorAll('a');

    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    hamburgerMenu.addEventListener('click', openSidebar);
    closeSidebarBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar); // Close sidebar when clicking overlay

    // Close sidebar when a link inside it is clicked
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
    // Optional: Add a subtle animation to feature icons on hover
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
});
