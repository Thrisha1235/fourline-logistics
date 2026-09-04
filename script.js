// ========================================
// FOUR LINE LOGISTICS - SCRIPT.JS
// ========================================


// ========================================
// 1. MOBILE MENU
// ========================================

const menuToggle = document.getElementById("menuToggle");
const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", function () {

        navbar.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (icon) {

            if (navbar.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");

            } else {

                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");

            }

        }

    });


    document.querySelectorAll(".nav-link").forEach(function (link) {

        link.addEventListener("click", function () {

            navbar.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");

            }

        });

    });

}


// ========================================
// 2. LANGUAGE SWITCH - ENGLISH / ARABIC
// ========================================

const languageBtn = document.getElementById("languageBtn");

let currentLanguage =
    localStorage.getItem("language") || "en";


function changeLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang = language;


    if (language === "ar") {

        document.documentElement.dir = "rtl";

        if (languageBtn) {

            languageBtn.textContent = "English";

        }

    } else {

        document.documentElement.dir = "ltr";

        if (languageBtn) {

            languageBtn.textContent = "العربية";

        }

    }


    document.querySelectorAll("[data-en]").forEach(function (element) {

        if (language === "ar") {

            const arabicText =
                element.getAttribute("data-ar");

            if (arabicText) {

                element.innerHTML = arabicText;

            }

        } else {

            const englishText =
                element.getAttribute("data-en");

            if (englishText) {

                element.innerHTML = englishText;

            }

        }

    });


    localStorage.setItem("language", language);

}


if (languageBtn) {

    languageBtn.addEventListener("click", function () {

        if (currentLanguage === "en") {

            changeLanguage("ar");

        } else {

            changeLanguage("en");

        }

    });

}


changeLanguage(currentLanguage);



// ========================================
// 3. QUOTE FORM → EMAIL + THANK YOU
// ========================================

const quoteForm = document.getElementById("quoteForm");

if (quoteForm) {

    quoteForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // ========================================
        // GET FORM VALUES
        // ========================================

        const fullName =
            document.getElementById("fullName").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const service =
            document.getElementById("service").value;

        const shipmentType =
            document.getElementById("shipmentType").value;

        const origin =
            document.getElementById("origin").value.trim();

        const destination =
            document.getElementById("destination").value.trim();

        const shipmentDetails =
            document.getElementById("shipmentDetails").value.trim();


        // ========================================
        // CREATE EMAIL MESSAGE
        // ========================================

        const message =
`Hello Four Line Logistics,

I would like to request a logistics quote.

Name: ${fullName}
Contact Number: ${phone}
Email: ${email || "Not provided"}

Service Required: ${service}
Shipment Type: ${shipmentType}

Origin: ${origin || "Not provided"}
Destination: ${destination || "Not provided"}

Shipment Details:
${shipmentDetails || "Not provided"}

Thank you.`;


        // ========================================
        // CREATE EMAIL
        // ========================================

        const companyEmail =
            "ops@four-line.com";

        const emailSubject =
            "Logistics Quote Request - " + fullName;

        const emailURL =
            `mailto:${companyEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(message)}`;


        // ========================================
        // OPEN EMAIL
        // ========================================

        window.location.href = emailURL;


        // ========================================
        // GO TO THANK YOU PAGE
        // ========================================

        setTimeout(function () {

            window.location.href = "thank-you.html";

        }, 2000);

    });

}

// ========================================
// 4. SMOOTH SCROLLING
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");


        if (targetId === "#") {

            return;

        }


        const targetElement =
            document.querySelector(targetId);


        if (targetElement) {

            event.preventDefault();

            targetElement.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

});



// ========================================
// 5. HEADER SHADOW ON SCROLL
// ========================================

const header =
    document.querySelector(".header");


window.addEventListener("scroll", function () {

    if (!header) {

        return;

    }


    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});



// ========================================
// 6. CLOSE MENU WHEN CLICKING OUTSIDE
// ========================================

document.addEventListener("click", function (event) {

    if (!navbar || !menuToggle) {

        return;

    }


    const clickedInsideNavbar =
        navbar.contains(event.target);

    const clickedMenuButton =
        menuToggle.contains(event.target);


    if (
        navbar.classList.contains("active") &&
        !clickedInsideNavbar &&
        !clickedMenuButton
    ) {

        navbar.classList.remove("active");


        const icon =
            menuToggle.querySelector("i");


        if (icon) {

            icon.classList.remove("fa-times");

            icon.classList.add("fa-bars");

        }

    }

});



// ========================================
// 7. CURRENT YEAR
// ========================================

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}



// ========================================
// 8. PAGE LOAD
// ========================================

window.addEventListener("load", function () {

    document.body.classList.add("loaded");

});

// ========================================
// LANGUAGE SELECTION POPUP
// ========================================

const languagePopup = document.getElementById("languagePopup");
const languageChoices = document.querySelectorAll(".language-choice");

languageChoices.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedLanguage = this.dataset.language;

        // Change website language
        changeLanguage(selectedLanguage);

        // Close popup
        if (languagePopup) {
            languagePopup.style.display = "none";
        }

    });

});