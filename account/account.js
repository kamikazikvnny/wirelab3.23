
/* =========================================================
   WIRELAB — ACCOUNT PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PROFILE
       ===================================================== */

    const profileName =
        document.getElementById("profile-name");

    const profileEmail =
        document.getElementById("profile-email");

    const profileImage =
        document.getElementById("profile-image");


    function loadProfile() {

        const savedName =
            localStorage.getItem("wirelabProfileName");

        const savedEmail =
            localStorage.getItem("wirelabProfileEmail");

        const savedIcon =
            localStorage.getItem("wirelabProfileIcon");


        if (savedName && profileName) {
            profileName.textContent = savedName;
        }


        if (savedEmail && profileEmail) {
            profileEmail.textContent = savedEmail;
        }


        if (savedIcon && profileImage) {
            profileImage.src =
                "../z-images/profile-icons/" + savedIcon;
        }
    }


    loadProfile();


    /* =====================================================
       PROGRESS
       ===================================================== */

    function loadProgress() {

        const completedUnits =
            JSON.parse(
                localStorage.getItem("wirelabCompletedUnits") || "[]"
            );


        const completedCount =
            completedUnits.length;


        const totalUnits = 36;


        const percentage =
            Math.round(
                (completedCount / totalUnits) * 100
            );


        const completedUnitsElement =
            document.getElementById(
                "account-completed-units"
            );


        if (completedUnitsElement) {
            completedUnitsElement.textContent =
                completedCount;
        }


        const progressBar =
            document.getElementById(
                "account-progress-bar"
            );


        if (progressBar) {
            progressBar.style.width =
                percentage + "%";
        }


        const progressPercent =
            document.getElementById(
                "account-progress-percent"
            );


        if (progressPercent) {
            progressPercent.textContent =
                percentage + "%";
        }


        const progressDisplay =
            document.getElementById(
                "progress-percent-display"
            );


        if (progressDisplay) {
            progressDisplay.textContent =
                percentage + "%";
        }


        const unitCount =
            document.getElementById(
                "profile-unit-count"
            );


        if (unitCount) {
            unitCount.textContent =
                completedCount;
        }


        const statUnits =
            document.getElementById(
                "stat-units"
            );


        if (statUnits) {
            statUnits.textContent =
                completedCount;
        }
    }


    loadProgress();


    /* =====================================================
       EDIT PROFILE
       ===================================================== */

    const editProfileButton =
        document.getElementById("edit-profile");

    const profileModal =
        document.getElementById("profile-modal");

    const closeProfileModal =
        document.getElementById("close-profile-modal");

    const saveProfile =
        document.getElementById("save-profile");

    const profileNameInput =
        document.getElementById("profile-name-input");

    const profileEmailInput =
        document.getElementById("profile-email-input");

    const modalProfileImage =
        document.getElementById("modal-profile-image");

    const modalProfileOptions =
        document.querySelectorAll(
            ".modal-profile-option"
        );


    /* =====================================================
       OPEN EDIT PROFILE
       ===================================================== */

    if (editProfileButton && profileModal) {

        editProfileButton.addEventListener(
            "click",
            function () {

                profileNameInput.value =
                    profileName.textContent;

                profileEmailInput.value =
                    profileEmail.textContent;


                const currentIcon =
                    localStorage.getItem(
                        "wirelabProfileIcon"
                    ) || "icon-01.png";


                modalProfileImage.src =
                    "../z-images/profile-icons/" +
                    currentIcon;


                modalProfileOptions.forEach(
                    function (option) {

                        option.classList.remove(
                            "selected"
                        );


                        if (
                            option.dataset.icon ===
                            currentIcon
                        ) {

                            option.classList.add(
                                "selected"
                            );
                        }
                    }
                );


                profileModal.classList.add(
                    "active"
                );
            }
        );
    }


    /* =====================================================
       SELECT PROFILE PICTURE
       ===================================================== */

    modalProfileOptions.forEach(
        function (option) {

            option.addEventListener(
                "click",
                function () {

                    const selectedIcon =
                        option.dataset.icon;


                    modalProfileOptions.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );
                        }
                    );


                    option.classList.add(
                        "selected"
                    );


                    modalProfileImage.src =
                        "../z-images/profile-icons/" +
                        selectedIcon;
                }
            );
        }
    );


    /* =====================================================
       CLOSE EDIT PROFILE
       ===================================================== */

    if (closeProfileModal && profileModal) {

        closeProfileModal.addEventListener(
            "click",
            function () {

                profileModal.classList.remove(
                    "active"
                );
            }
        );
    }


    /* =====================================================
       SAVE PROFILE
       ===================================================== */

    if (saveProfile && profileModal) {

        saveProfile.addEventListener(
            "click",
            function () {

                const newName =
                    profileNameInput.value.trim();

                const newEmail =
                    profileEmailInput.value.trim();


                let selectedIcon =
                    localStorage.getItem(
                        "wirelabProfileIcon"
                    ) || "icon-01.png";


                modalProfileOptions.forEach(
                    function (option) {

                        if (
                            option.classList.contains(
                                "selected"
                            )
                        ) {

                            selectedIcon =
                                option.dataset.icon;
                        }
                    }
                );


                /* Save name */

                if (newName) {

                    profileName.textContent =
                        newName;

                    localStorage.setItem(
                        "wirelabProfileName",
                        newName
                    );
                }


                /* Save role */

                if (newEmail) {

                    profileEmail.textContent =
                        newEmail;

                    localStorage.setItem(
                        "wirelabProfileEmail",
                        newEmail
                    );
                }


                /* Save profile picture */

                localStorage.setItem(
                    "wirelabProfileIcon",
                    selectedIcon
                );


profileImage.src =
    "../z-images/profile-icons/" +
    selectedIcon;


/* Update navbar profile icon immediately */

const navbarProfile =
    document.getElementById("navbar-profile");

if (navbarProfile) {

    navbarProfile.innerHTML =
        `<img src="../z-images/profile-icons/${selectedIcon}" alt="Profile">`;
}


profileModal.classList.remove(
    "active"
);


            }
        );
    }


    /* =====================================================
       CLOSE WHEN CLICKING OUTSIDE
       ===================================================== */

    if (profileModal) {

        profileModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === profileModal
                ) {

                    profileModal.classList.remove(
                        "active"
                    );
                }
            }
        );
    }


    /* =====================================================
       RESET PROGRESS
       ===================================================== */

    const resetProgress =
        document.getElementById(
            "reset-progress"
        );


    if (resetProgress) {

        resetProgress.addEventListener(
            "click",
            function () {

                const confirmReset =
                    confirm(
                        "Are you sure you want to reset your WireLab progress?"
                    );


                if (!confirmReset) {
                    return;
                }


                localStorage.removeItem(
                    "wirelabCompletedUnits"
                );


                loadProgress();


                alert(
                    "WireLab progress has been reset."
                );
            }
        );
    }


    /* =====================================================
       TEST STATISTICS
       ===================================================== */

    const statQuestions =
        document.getElementById(
            "stat-questions"
        );


    const statAccuracy =
        document.getElementById(
            "stat-accuracy"
        );


    if (statQuestions) {

        const questionsAnswered =
            localStorage.getItem(
                "wirelabQuestionsAnswered"
            );


        if (questionsAnswered) {

            statQuestions.textContent =
                questionsAnswered;
        }
    }


    if (statAccuracy) {

        const accuracy =
            localStorage.getItem(
                "wirelabAccuracy"
            );


        if (accuracy) {

            statAccuracy.textContent =
                accuracy + "%";
        }
    }

});