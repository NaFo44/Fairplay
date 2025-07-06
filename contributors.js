document.addEventListener('DOMContentLoaded', () => {
    const sidebarMenu = document.getElementById('sidebar-menu');
    const contentSections = document.querySelectorAll('.content-section');
    const headerOffset = document.querySelector('.dev-header').offsetHeight; // Get header height

    // Function to update active link in sidebar
    const updateActiveLink = () => {
        let currentActiveSection = '';
        contentSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Check if section is in viewport and past the header (with a small buffer)
            if (rect.top <= (headerOffset + 70) && rect.bottom >= (headerOffset + 70)) {
                currentActiveSection = section.id;
            }
        });

        // Remove active class from all links
        sidebarMenu.querySelectorAll('a').forEach(link => {
            link.classList.remove('active');
            link.parentElement.classList.remove('active'); // For parent li
        });

        // Add active class to the current section's link
        if (currentActiveSection) {
            const activeLink = sidebarMenu.querySelector(`a[href="#${currentActiveSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                let parentLi = activeLink.parentElement;
                // Also activate parent li if it's a sub-item
                if (parentLi.tagName === 'LI' && parentLi.closest('ul') !== sidebarMenu) {
                    parentLi.classList.add('active');
                    let grandParentLi = parentLi.closest('ul').parentElement;
                    if (grandParentLi && grandParentLi.tagName === 'LI') {
                        grandParentLi.classList.add('active');
                    }
                } else if (parentLi.tagName === 'LI') {
                     parentLi.classList.add('active'); // For top-level li
                }
            }
        }
    };

    // Smooth scrolling for sidebar links
    sidebarMenu.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // Add some padding below header

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Manually update active state after click for instant feedback
                // (Optional: remove this if updateActiveLink on scroll is sufficient, but good for immediate feedback)
                sidebarMenu.querySelectorAll('a').forEach(link => {
                    link.classList.remove('active');
                    link.parentElement.classList.remove('active');
                });
                this.classList.add('active');
                let parentLi = this.parentElement;
                if (parentLi.tagName === 'LI' && parentLi.closest('ul') !== sidebarMenu) {
                    parentLi.classList.add('active');
                    let grandParentLi = parentLi.closest('ul').parentElement;
                    if (grandParentLi && grandParentLi.tagName === 'LI') {
                        grandParentLi.classList.add('active');
                    }
                } else if (parentLi.tagName === 'LI') {
                    parentLi.classList.add('active');
                }
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    // Initial call to set active link on page load (important for initial state)
    updateActiveLink();
});