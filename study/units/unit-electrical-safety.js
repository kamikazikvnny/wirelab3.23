/* =========================================================
   WIRELAB — ELECTRICAL SAFETY
   SAFETY COMPLETION
========================================================= */

const SAFETY_COMPLETED_KEY =
    "wirelab-safety-completed";


document.addEventListener("DOMContentLoaded", function () {

    const completeButton =
        document.getElementById("completeUnit");

    if (!completeButton) {
        return;
    }


    /* =====================================================
       UPDATE BUTTON
    ====================================================== */

    function updateSafetyButton() {

        const safetyCompleted =
            localStorage.getItem(
                SAFETY_COMPLETED_KEY
            ) === "true";


        if (safetyCompleted) {

            completeButton.textContent =
                "SAFETY COMPLETED";

            completeButton.classList.add(
                "completed"
            );

        } else {

            completeButton.textContent =
                "COMPLETE SAFETY";

            completeButton.classList.remove(
                "completed"
            );

        }

    }


    /* =====================================================
       LOAD SAVED STATUS
    ====================================================== */

    updateSafetyButton();


    /* =====================================================
       TOGGLE SAFETY COMPLETION
    ====================================================== */

    completeButton.addEventListener(
        "click",
        function () {

            const safetyCompleted =
                localStorage.getItem(
                    SAFETY_COMPLETED_KEY
                ) === "true";


            if (safetyCompleted) {

                localStorage.removeItem(
                    SAFETY_COMPLETED_KEY
                );

            } else {

                localStorage.setItem(
                    SAFETY_COMPLETED_KEY,
                    "true"
                );

            }


            updateSafetyButton();

        }
    );

});