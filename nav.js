
/* =========================================================
   WIRELAB NAVBAR
   LOAD SAVED PROFILE ICON
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const navbarProfile = document.getElementById("navbar-profile");

    if (!navbarProfile) {
        return;
    }

    const savedIcon = localStorage.getItem("wirelabProfileIcon");

    if (!savedIcon) {
        return;
    }


    const path = window.location.pathname;

    let iconPath;

    /*
       ROOT
       /wire-lab/index.html
    */
    if (
        path.endsWith("/") ||
        path.endsWith("/index.html")
    ) {
        iconPath = "z-images/profile-icons/" + savedIcon;
    }

    /*
       TWO LEVELS DEEP
       /wire-lab/study/units/
       /wire-lab/tools/color-wheel/
       /wire-lab/labs/gfci-test-lab/
    */
    else if (
        path.includes("/study/units/") ||
        path.includes("/tools/color-wheel/") ||
        path.includes("/labs/gfci-test-lab/")
    ) {
        iconPath = "../../z-images/profile-icons/" + savedIcon;
    }

    /*
       ONE LEVEL DEEP
       /wire-lab/accounts/
       /wire-lab/labs/
       /wire-lab/solar/
       /wire-lab/study/
       /wire-lab/testing/
       /wire-lab/tools/
    */
    else {
        iconPath = "../z-images/profile-icons/" + savedIcon;
    }

    navbarProfile.innerHTML = "";

    const profileImage = document.createElement("img");

    profileImage.src = iconPath;
    profileImage.alt = "Profile";

    navbarProfile.appendChild(profileImage);

});


