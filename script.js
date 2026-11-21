
/* =========================================
   CRYPTO BRIEF AU - MAIN JAVASCRIPT
========================================= */

/* DOM HELPERS */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);


/* =========================================
   01. HISTORICAL WATCHLIST DATA

   Values copied from supplied screenshot.
========================================= */

const watchlist = [
  {
    name: "Bitcoin",
    ticker: "BTC",
    returns: [
      { value: "−16.2%", type: "negative" },
      { value: "+8.8%", type: "positive-low" },
      { value: "+37.3%", type: "positive" },
      { value: "−17.5%", type: "negative" },
      { value: "−3.7%", type: "median-negative" }
    ]
  },

  {
    name: "Ethereum",
    ticker: "ETH",
    returns: [
      { value: "−17.7%", type: "negative" },
      { value: "+13.1%", type: "positive-low" },
      { value: "+47%", type: "positive" },
      { value: "−22.3%", type: "negative" },
      { value: "−2.3%", type: "median-negative" }
    ]
  },

  {
    name: "Solana",
    ticker: "SOL",
    returns: [
      { value: "−56.5%", type: "negative-strong" },
      { value: "+54.4%", type: "positive-strong" },
      { value: "+40.9%", type: "positive" },
      { value: "−28.7%", type: "negative" },
      { value: "+6.1%", type: "median-positive" }
    ]
  },

  {
    name: "XRP",
    ticker: "XRP",
    returns: [
      { value: "−12.1%", type: "negative" },
      { value: "+1.1%", type: "positive-low" },
      { value: "+283%", type: "positive-strong" },
      { value: "−14.1%", type: "negative" },
      { value: "−5.5%", type: "median-negative" }
    ]
  }
];


/* =========================================
   02. RENDER WATCHLIST TABLE
========================================= */

const watchlistBody = $("#watchlistBody");

if (watchlistBody) {

  watchlistBody.innerHTML = watchlist.map((coin) => {

    const returnCells = coin.returns.map((item) => {

      return `
        <td>
          <span class="return-box ${item.type}">
            ${item.value}
          </span>
        </td>
      `;

    }).join("");

    return `
      <tr>

        <td class="crypto-name">
          <strong>${coin.name}</strong>
          <small>${coin.ticker}</small>
        </td>

        ${returnCells}

      </tr>
    `;

  }).join("");

}


/* =========================================
   03. MARKET SCENARIOS
========================================= */

const scenarios = {

  rebound: {
    k: "SCENARIO 01 · REBOUND",

    t: "WATCH SOLANA’S HISTORICAL STRENGTH",

    p:
      "Solana has the strongest median across the four " +
      "completed Novembers, but that does not guarantee " +
      "a rebound. Compare price action and risk before " +
      "drawing conclusions."
  },

  soft: {
    k: "SCENARIO 02 · MARKET STAYS WEAK",

    t: "WATCH BITCOIN’S RELATIVE RESILIENCE",

    p:
      "Bitcoin had lost the least of the four coins " +
      "month-to-date at the time of writing. " +
      "Relative resilience does not prevent further losses."
  },

  volatile: {
    k: "SCENARIO 03 · VOLATILITY RISES",

    t: "WATCH SOLANA’S WIDE HISTORICAL SWINGS",

    p:
      "Solana showed the widest swings in both directions " +
      "across the previous four Novembers. Larger moves " +
      "mean larger downside risk as well as upside potential."
  }

};


/* =========================================
   04. SCENARIO TAB INTERACTION
========================================= */

$$("[data-scenario]").forEach((button) => {

  button.addEventListener("click", () => {

    const scenarioKey = button.dataset.scenario;

    const selected = scenarios[scenarioKey];

    if (!selected) return;

    $$("[data-scenario]").forEach((item) => {

      const isActive = item === button;

      item.classList.toggle("active", isActive);

      item.setAttribute(
        "aria-selected",
        String(isActive)
      );

    });

    const kicker = $("#scenarioKicker");
    const title = $("#scenarioTitle");
    const text = $("#scenarioText");

    if (kicker) {
      kicker.textContent = selected.k;
    }

    if (title) {
      title.textContent = selected.t;
    }

    if (text) {
      text.textContent = selected.p;
    }

  });

});


/* =========================================
   05. USD TO AUD CONVERTER
========================================= */

const AUD_USD_RATE = 0.6677;

const currencyFormatter = new Intl.NumberFormat(
  "en-AU",
  {
    style: "currency",
    currency: "AUD"
  }
);

const usdInput = $("#usd");

const audOutput = $("#audOutput");


function updateCurrency() {

  if (!usdInput || !audOutput) return;

  const inputValue = usdInput.value.trim();

  const usdValue = Number(inputValue);

  if (
    inputValue === "" ||
    !Number.isFinite(usdValue) ||
    usdValue < 0
  ) {

    audOutput.textContent = "A$0.00";
    return;

  }

  const convertedAmount = usdValue / AUD_USD_RATE;

  audOutput.textContent = currencyFormatter.format(
    convertedAmount
  );

}


if (usdInput && audOutput) {

  usdInput.addEventListener(
    "input",
    updateCurrency
  );

  updateCurrency();

}


/* =========================================
   06. MOBILE NAVBAR
========================================= */

const menuBtn = $("#menuBtn");

const mainNav = $("#mainNav");


if (menuBtn && mainNav) {

  menuBtn.addEventListener("click", () => {

    const opened = mainNav.classList.toggle("open");

    menuBtn.setAttribute(
      "aria-expanded",
      String(opened)
    );

    menuBtn.textContent = opened ? "×" : "☰";

  });


  $$("#mainNav a").forEach((link) => {

    link.addEventListener("click", () => {

      mainNav.classList.remove("open");

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

      menuBtn.textContent = "☰";

    });

  });

}


/* =========================================
   07. LEGACY MODAL SUPPORT

   Only runs if the modal exists.
   External DoshX links work directly.
========================================= */

const backdrop = $("#modalBackdrop");

let priorFocus = null;


function closeModal() {

  if (!backdrop) return;

  backdrop.hidden = true;

  document.body.style.overflow = "";

  if (priorFocus) {
    priorFocus.focus();
  }

}


if (backdrop) {

  $$("[data-modal]").forEach((button) => {

    button.addEventListener("click", () => {

      priorFocus = document.activeElement;

      const modalTitle = $("#modalTitle");
      const formStatus = $("#formStatus");
      const fullName = $("#fullName");

      if (modalTitle) {

        modalTitle.textContent =
          button.dataset.modal === "signup"
            ? "Sign up"
            : "Register free";

      }

      if (formStatus) {
        formStatus.textContent = "";
      }

      backdrop.hidden = false;

      document.body.style.overflow = "hidden";

      if (fullName) {
        fullName.focus();
      }

    });

  });


  const modalClose = $("#modalClose");

  if (modalClose) {

    modalClose.addEventListener(
      "click",
      closeModal
    );

  }


  backdrop.addEventListener("click", (event) => {

    if (event.target === backdrop) {
      closeModal();
    }

  });


  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      !backdrop.hidden
    ) {

      closeModal();

    }

  });


  const signupForm = $("#signupForm");

  if (signupForm) {

    signupForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const formStatus = $("#formStatus");

      if (formStatus) {

        formStatus.textContent =
          "This is a frontend demo. Connect an " +
          "authentication service to enable registration.";

      }

    });

  }

}


/* =========================================
   08. SCROLL REVEAL ANIMATION
========================================= */

const revealElements = $$(".reveal");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


if (
  "IntersectionObserver" in window &&
  !prefersReducedMotion
) {

  const observer = new IntersectionObserver(

    (entries, currentObserver) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          currentObserver.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.1,
      rootMargin: "0px 0px 30px 0px"
    }

  );


  revealElements.forEach((element) => {

    observer.observe(element);

  });

} else {

  revealElements.forEach((element) => {

    element.classList.add("visible");

  });

}
