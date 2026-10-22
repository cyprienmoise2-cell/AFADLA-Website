/* =========================================================
   AFADLA - JAVASCRIPT PRINCIPAL
   Association des Femmes Actives pour le Développement de Lafond
   ========================================================= */


/* =========================================================
   1. ATTENDRE LE CHARGEMENT DE LA PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       2. MENU MOBILE
       ===================================================== */

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mainNav = document.getElementById("mainNav");

    if (mobileMenuBtn && mainNav) {

        mobileMenuBtn.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

            mobileMenuBtn.classList.toggle("active");

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        /* Fermer le menu lorsqu'on clique sur un lien */

        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                mobileMenuBtn.classList.remove("active");

                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       3. DROPDOWN MOBILE
       ===================================================== */

    const dropdownParent = document.querySelector(".has-dropdown");

    if (dropdownParent) {

        const dropdownLink = dropdownParent.querySelector(":scope > a");
        const dropdown = dropdownParent.querySelector(".dropdown");

        if (dropdownLink && dropdown) {

            dropdownLink.addEventListener("click", (event) => {

                /* Seulement sur les écrans mobiles */

                if (window.innerWidth <= 900) {

                    event.preventDefault();

                    const isOpen =
                        dropdown.style.maxHeight &&
                        dropdown.style.maxHeight !== "0px";

                    if (isOpen) {

                        dropdown.style.maxHeight = "0px";

                    } else {

                        dropdown.style.maxHeight =
                            dropdown.scrollHeight + "px";

                    }

                }

            });

        }

    }


    /* =====================================================
       4. FERMER LE MENU LORS D'UN CLIC À L'EXTÉRIEUR
       ===================================================== */

    document.addEventListener("click", (event) => {

        if (!mobileMenuBtn || !mainNav) {
            return;
        }

        const clickedInsideNav =
            mainNav.contains(event.target);

        const clickedMenuButton =
            mobileMenuBtn.contains(event.target);

        if (
            window.innerWidth <= 900 &&
            !clickedInsideNav &&
            !clickedMenuButton
        ) {

            mainNav.classList.remove("open");

            mobileMenuBtn.classList.remove("active");

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =====================================================
       5. CHANGEMENT DU HEADER AU DÉFILEMENT
       ===================================================== */

    const header = document.querySelector(".site-header");

    if (header) {

        const handleHeaderScroll = () => {

            if (window.scrollY > 50) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        };

        window.addEventListener(
            "scroll",
            handleHeaderScroll
        );

        handleHeaderScroll();

    }


    /* =====================================================
       6. ANIMATION DES ÉLÉMENTS AU DÉFILEMENT
       ===================================================== */

    const animatedElements = document.querySelectorAll(
        ".program-card, .news-card, .stat-item, .education-item, .partner-placeholders div"
    );


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        animatedElements.forEach(element => {

            element.classList.add("scroll-animation");

            observer.observe(element);

        });

    } else {

        animatedElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       7. ANIMATION DES CHIFFRES
       ===================================================== */

    const statNumbers =
        document.querySelectorAll(".stat-item strong");


    const animateNumber = (element) => {

        const originalText =
            element.textContent.trim();

        /*
         * Pour le moment les chiffres sont des "+",
         * car les statistiques réelles d'AFADLA
         * seront ajoutées plus tard.
         */

        if (!originalText || originalText === "+") {
            return;
        }


        const target =
            parseInt(
                originalText.replace(/\D/g, ""),
                10
            );


        if (isNaN(target)) {
            return;
        }


        let current = 0;

        const duration = 1500;

        const increment =
            target / (duration / 16);


        const update = () => {

            current += increment;

            if (current < target) {

                element.textContent =
                    Math.floor(current) + "+";

                requestAnimationFrame(update);

            } else {

                element.textContent =
                    target + "+";

            }

        };


        update();

    };


    if ("IntersectionObserver" in window) {

        const statsSection =
            document.querySelector(".stats-section");


        if (statsSection) {

            const statsObserver =
                new IntersectionObserver(
                    (entries, observer) => {

                        entries.forEach(entry => {

                            if (entry.isIntersecting) {

                                statNumbers.forEach(
                                    animateNumber
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        });

                    },
                    {
                        threshold: 0.3
                    }
                );


            statsObserver.observe(statsSection);

        }

    }


    /* =====================================================
       8. ANNÉE AUTOMATIQUE DU FOOTER
       ===================================================== */

    const footerYear =
        document.querySelector(".footer-bottom p");


    if (footerYear) {

        const currentYear =
            new Date().getFullYear();


        footerYear.textContent =
            `© ${currentYear} AFADLA. Tous droits réservés.`;

    }


    /* =====================================================
       9. FERMER LES SOUS-MENUS SI ON PASSE EN DESKTOP
       ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            if (mainNav) {

                mainNav.classList.remove("open");

            }

            if (mobileMenuBtn) {

                mobileMenuBtn.classList.remove(
                    "active"
                );

                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            const dropdown =
                document.querySelector(".dropdown");


            if (dropdown) {

                dropdown.style.maxHeight = "";

            }

        }

    });


    /* =====================================================
       10. SMOOTH SCROLL
       ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(link => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       11. PRÉCHARGEMENT DES IMAGES IMPORTANTES
       ===================================================== */

    const importantImages = [
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2000&q=90"
    ];


    importantImages.forEach(imageUrl => {

        const image =
            new Image();

        image.src = imageUrl;

    });


    /* =====================================================
       12. MESSAGE DE DÉBOGAGE
       ===================================================== */

    console.log(
        "AFADLA website - JavaScript chargé avec succès."
    );

});
