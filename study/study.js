/* =========================================================
   CREATE UNIT CHECKMARKS
========================================================= */

document.querySelectorAll(".study-unit").forEach(unit => {

    const check = document.createElement("span");

    check.className = "study-unit-check";
    check.textContent = "✓";

    unit.appendChild(check);

});


/* =========================================================
   WIRELAB STUDY
   STUDY PAGE JAVASCRIPT ONLY
========================================================= */


const TOTAL_UNITS = 35;

const COMPLETED_KEY =
    "wirelab-study-completed";

const CURRENT_KEY =
    "wirelab-study-current";


/* =========================================================
   GET COMPLETED UNITS
========================================================= */

function getCompletedUnits() {

    try {

        const saved =
            localStorage.getItem(
                COMPLETED_KEY
            );

        if (!saved) {
            return [];
        }

        const units =
            JSON.parse(saved);

        if (!Array.isArray(units)) {
            return [];
        }

        return units.filter(unit =>
    unit >= 1 &&
    unit <= TOTAL_UNITS
);

    } catch (error) {

        return [];

    }

}


/* =========================================================
   SAVE COMPLETED UNITS
========================================================= */

function saveCompletedUnits(units) {

    localStorage.setItem(
        COMPLETED_KEY,
        JSON.stringify(units)
    );

}


/* =========================================================
   GET CURRENT UNIT
========================================================= */

function getCurrentUnit() {

    const saved =
        localStorage.getItem(
            CURRENT_KEY
        );

    if (!saved) {
        return null;
    }

    const unit =
        Number(saved);

    if (
    Number.isNaN(unit) ||
    unit < 1 ||
    unit > TOTAL_UNITS
    ) {
    return null;
    }

    return unit;

    }


/* =========================================================
   SAVE CURRENT UNIT
========================================================= */

function saveCurrentUnit(unit) {

    localStorage.setItem(
        CURRENT_KEY,
        String(unit)
    );

}


/* =========================================================
   UPDATE UNIT CARDS
========================================================= */

function updateUnitCards() {

    const completed =
        getCompletedUnits();

    const current =
        getCurrentUnit();

    const cards =
        document.querySelectorAll(
            ".study-unit"
        );


    cards.forEach(card => {

    if (card.classList.contains("safety-reference")) {
        return;
    }

    const unit =
        Number(
            card.dataset.unit
        );

        if (card.classList.contains("safety-reference")) {
        return;
        }


        card.classList.remove(
            "completed"
        );

        card.classList.remove(
            "current"
        );


        const status =
            card.querySelector(
                ".study-unit-status"
            );


        if (
            completed.includes(unit)
        ) {

            card.classList.add(
                "completed"
            );

            if (status) {

                status.textContent =
                    "COMPLETED";

            }

        } else if (
            unit === current
        ) {

            card.classList.add(
                "current"
            );

            if (status) {

                status.textContent =
                    "CURRENT UNIT";

            }

        } else {

            if (status) {

                status.textContent =
                    "START UNIT";

            }

        }

    });

}


/* =========================================================
   UPDATE PROGRESS
========================================================= */

function updateProgress() {

    const completed =
        getCompletedUnits();


    const completedCount =
        completed.length;


    const percentage =
        Math.round(
            (
                completedCount /
                TOTAL_UNITS
            ) * 100
        );


    const progressPercent =
        document.getElementById(
            "progressPercent"
        );


    const progressFill =
        document.getElementById(
            "progressFill"
        );


    const completedText =
        document.getElementById(
            "completedCount"
        );


    if (progressPercent) {

        progressPercent.textContent =
            `${percentage}%`;

    }


    if (progressFill) {

        progressFill.style.width =
            `${percentage}%`;

    }


    if (completedText) {

        completedText.textContent =
            `${completedCount} of ${TOTAL_UNITS} units completed`;

    }

}


/* =========================================================
   UNIT CLICK
========================================================= */

function setupUnitCards() {

    const cards =
        document.querySelectorAll(
            ".study-unit"
        );


    cards.forEach(card => {

        card.addEventListener(
            "click",
            function() {

                const unit =
                    Number(
                        this.dataset.unit
                    );

                if (
                    Number.isNaN(unit)
                ) {
                    return;
                }

                saveCurrentUnit(unit);

            }
        );

    });

}
/* =========================================================
   INITIALIZE
========================================================= */

function initializeStudyPage() {

    /* Create checkmarks for all unit cards */
    document.querySelectorAll(".study-unit").forEach(unit => {

        const check = document.createElement("span");

        check.className = "study-unit-check";
        check.textContent = "✓";

        unit.appendChild(check);

    });

    updateUnitCards();

    updateProgress();

    setupUnitCards();

}


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeStudyPage
);