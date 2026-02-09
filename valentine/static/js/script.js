document.addEventListener("DOMContentLoaded", function () {

  // ================== ELEMENTS ==================
  const el = {
    startBtn: document.getElementById("startBtn"),
    invitation: document.getElementById("invitation"),
    heroImg: document.getElementById("heroImg"),
    hero: document.getElementById("hero"),
    music: document.getElementById("music"),
  };

  // ================== START BUTTON ==================
  el.startBtn.addEventListener("click", () => {
    el.startBtn.disabled = true;
    el.startBtn.innerText = "Opened 💌";
    popImage();
    showInvitation();
    fadeInMusic();
    scrollToInvitation();
  });

  // ================== IMAGE POP ==================
  function popImage() {
    el.heroImg.classList.add("pop");
    setTimeout(() => el.heroImg.classList.remove("pop"), 600);
    createHearts();
  }

  function createHearts() {
    const wrap = document.querySelector(".photo-wrap");
    for (let i = 0; i < 8; i++) {
      const heart = document.createElement("div");
      heart.className = "image-heart";
      heart.innerHTML = "❤️";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.top = Math.random() * 100 + "%";
      wrap.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    }
  }

  // ================== INVITATION ==================
  function showInvitation() {
    el.invitation.classList.remove("locked");
    el.invitation.classList.add("unlocked");
    el.hero.classList.add("fade-out");

    setTimeout(() => {
      AOS.refreshHard();
    }, 200);
  }

  function scrollToInvitation() {
    setTimeout(() => {
      el.invitation.scrollIntoView({ behavior: "smooth" });
    }, 800);
  }

  // ================== MUSIC ==================
  function fadeInMusic() {
    el.music.volume = 0;
    el.music.play().catch(() => {});
    let v = 0;
    const fade = setInterval(() => {
      v += 0.05;
      el.music.volume = Math.min(v, 0.8);
      if (v >= 0.8) clearInterval(fade);
    }, 200);
  }

  // ================== BACKGROUND EFFECTS ==================
  setInterval(() => spawn("heart", "❤️", 10000), 400);
  setInterval(() => spawn("falling-petal", "🌸", 12000), 900);

  function spawn(cls, emoji, ttl) {
    const el = document.createElement("div");
    el.className = cls;
    el.innerHTML = emoji;
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = Math.random() * 25 + 10 + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), ttl);
  }

  // ================== ENVELOPE + LOCK ==================
  const wrapper = document.querySelector(".envelope-scroll");
  const letterP = wrapper.querySelector(".letter p");

  const modal = document.getElementById("letterModal");
  const modalText = document.getElementById("modalText");
  const closeBtn = document.querySelector(".close");

  const lockSeal = document.getElementById("lockSeal");
  const pinModal = document.getElementById("pinModal");
  const pinInput = document.getElementById("pinInput");
  const unlockBtn = document.getElementById("unlockBtn");

  const CORRECT_PIN = "1125";
  let unlocked = false;
  let isOpen = false;
  let modalLocked = false;

  const fullText = letterP.innerHTML;
  letterP.innerHTML = "";

  // ================== LOCK ==================
  lockSeal.addEventListener("click", (e) => {
    e.stopPropagation();
    if (unlocked) return;
    pinModal.classList.add("show");
    pinInput.focus();
  });

  unlockBtn.addEventListener("click", () => {
    if (pinInput.value === CORRECT_PIN) {
      unlocked = true;
      pinModal.classList.remove("show");
      lockSeal.textContent = "💗";
      lockSeal.classList.add("unlocked");
      openEnvelope();
    } else {
      pinInput.value = "";
      pinInput.placeholder = "Wrong ❌";
      pinInput.style.borderColor = "red";
      pinModal.querySelector(".modal-content").classList.add("shake");
      setTimeout(() => {
        pinModal.querySelector(".modal-content").classList.remove("shake");
      }, 400);
    }
  });

  pinModal.addEventListener("click", (e) => {
    if (e.target === pinModal) pinModal.classList.remove("show");
  });

  // ================== ENVELOPE ==================
  wrapper.addEventListener("click", () => {
    if (!unlocked) return;
    if (!isOpen) openEnvelope();
    else closeEnvelope();
  });

  function openEnvelope() {
    if (modalLocked) return;
    modalLocked = true;

    isOpen = true;
    document.querySelector(".lid.one").classList.add("low-z");
    wrapper.classList.add("open");

    burstHearts(wrapper);
    typeLetter();

    setTimeout(() => {
      modalText.innerHTML = fullText;
      modal.classList.add("show");
      modalLocked = false;
    }, 1200);
  }

  function closeEnvelope() {
    isOpen = false;
    wrapper.classList.remove("open");
    document.querySelector(".lid.one").classList.remove("low-z");
    letterP.innerHTML = "";
  }

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    closeEnvelope();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      closeEnvelope();
    }
  });

  // ================== LETTER EFFECTS ==================
  function burstHearts(parent) {
    for (let i = 0; i < 8; i++) {
      const h = document.createElement("div");
      h.className = "burst-heart";
      h.innerHTML = "💖";
      h.style.left = Math.random() * 100 + "%";
      h.style.top = "60%";
      parent.appendChild(h);
      setTimeout(() => h.remove(), 1200);
    }
  }

  function typeLetter() {
    let i = 0;
    const text = fullText.replace(/<br>/g, "\n");
    letterP.innerHTML = "";

    const interval = setInterval(() => {
      letterP.innerHTML += text[i] === "\n" ? "<br>" : text[i];
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 30);
  }

  // ================== AUTO CLOSE ON SCROLL ==================
  // window.addEventListener("scroll", () => {
  //   if (modal.classList.contains("show")) {
  //     modal.classList.remove("show");
  //     closeEnvelope();
  //   }
  // });

  // ================== MEMORY ACTIVE STATE ==================
  const memories = document.querySelectorAll('.memory');

  const memoryObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    },
    { threshold: 0.55 }
  );

  memories.forEach(m => memoryObserver.observe(m));

  // ================== VALENTINE ICE BREAKER ==================

  const HER_NAME = "Beatrix";

  const valentineSection = document.getElementById("valentineSection");
  const typingSentence = document.getElementById("typingSentence");
  const sentenceResult = document.getElementById("sentenceResult");
  const finalQuestion = document.getElementById("finalQuestion");

  const choices = document.querySelectorAll(".choice");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const yesAnimation = document.getElementById("yesAnimation");
  const herNameSpan = document.getElementById("herName");

  herNameSpan.textContent = HER_NAME;

  // ------------------ TYPING EFFECT (ON VIEW) ------------------
  const sentenceText = "My favorite place is...";
  let typeIndex = 0;
  let typingStarted = false;

  function typeSentence() {
    if (typeIndex < sentenceText.length) {
      typingSentence.textContent += sentenceText.charAt(typeIndex);
      typeIndex++;
      setTimeout(typeSentence, 60);
    }
  }

  const valentineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !typingStarted) {
          typingStarted = true;
          typeSentence();
        }
      });
    },
    { threshold: 0.5 }
  );

  valentineObserver.observe(valentineSection);

  // ------------------ HEART PARTICLES ON CHOICE ------------------
  function spawnChoiceHeart(choiceEl) {
    const heart = document.createElement("span");
    heart.className = "choice-heart";
    heart.textContent = "💗";

    heart.style.left = Math.random() * 70 + "%";
    heart.style.top = "50%";

    choiceEl.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
  }

  // ------------------ CHOICE INTERACTION ------------------

  const choicesBox = document.getElementById("choicesBox");

  function shuffleChoices() {
    const choicesArray = Array.from(choicesBox.children);

    // Fisher–Yates shuffle (real random shuffle)
    for (let i = choicesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choicesArray[i], choicesArray[j]] = [choicesArray[j], choicesArray[i]];
    }

    // re-append in new order
    choicesArray.forEach(choice => choicesBox.appendChild(choice));
  }


  let wrongAttempts = 0;

  const wrongMessages = [
    "Hmm… try again 😌",
    "Still wrong… 😢",
    "You’re breaking my heart 😭",
    "Be serious 😣",
    "I thought you knew me 😞",
    "Wow… unbelievable 😮‍💨",
    "Are you doing this on purpose? 😑",
    "This is getting suspicious 😤",
    "Okay now I’m offended 😠",
    "Last chance… 😳",
    "I give up 💀"
  ];


  choices.forEach(choice => {

    choice.addEventListener("mouseenter", () => {
      if (!choice.classList.contains("selected")) {
        spawnChoiceHeart(choice);
      }
    });

    choice.addEventListener("touchstart", () => {
      if (!choice.classList.contains("selected")) {
        spawnChoiceHeart(choice);
      }
    });

    choice.addEventListener("click", () => {
      // WRONG ANSWER CLICK
      if (choice.classList.contains("tease")) {
        wrongAttempts++;

        // pick message based on tries (progressive drama 😆)
        const msgIndex = Math.min(wrongAttempts - 1, wrongMessages.length - 1);
        const message = wrongMessages[msgIndex];

        sentenceResult.textContent = message;
        sentenceResult.style.opacity = 1;

        choice.classList.add("clicked");
        setTimeout(() => choice.classList.remove("clicked"), 400);

        setTimeout(shuffleChoices, 300);

        return;
      }

      // Correct answer
      sentenceResult.textContent = `My favorite place is ${choice.dataset.word}`;
      sentenceResult.style.opacity = 1;

      choice.classList.add("correct");

      choices.forEach(c => {
        c.classList.add("selected");
        c.style.pointerEvents = "none";
      });

      setTimeout(() => {
        finalQuestion.classList.add("show");
      }, 800);
    });
  });

  // ------------------ NO BUTTON (IMPOSSIBLE MODE 😈) ------------------

let escapeCount = 0;

noBtn.addEventListener("mouseenter", escapeNoButton);
noBtn.addEventListener("touchstart", escapeNoButton);
noBtn.addEventListener("pointerdown", e => {
  e.preventDefault(); // prevent click before escape
  escapeNoButton();
});

function escapeNoButton() {
  const container = document.getElementById("valentineSection");
  const rect = container.getBoundingClientRect();

  // small playful movement range (so it never disappears)
  const moveX = (Math.random() - 0.5) * rect.width * 0.4;
  const moveY = (Math.random() - 0.5) * rect.height * 0.3;

  noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;

  escapeCount++;

  if (escapeCount === 3) noBtn.textContent = "Naku po 🙈";
  if (escapeCount === 6) noBtn.textContent = "Stop chasing me 😭";
  if (escapeCount === 9) noBtn.textContent = "YES na kasi 💖";
}
  // ------------------ YES BUTTON (ROMANTIC, CLEAN) ------------------
  let yesLocked = false;

  yesBtn.addEventListener("click", () => {
    if (yesLocked) return;
    yesLocked = true;

    // Hide buttons gently
    document.querySelector(".valentine-buttons").style.opacity = "0";
    document.querySelector(".valentine-buttons").style.pointerEvents = "none";

    // Show YES message
    yesAnimation.classList.add("show");

    // Floating hearts celebration
    let heartInterval = setInterval(spawnValentineHearts, 400);

    // Stop hearts after 4 seconds
    setTimeout(() => {
      clearInterval(heartInterval);
    }, 4000);
  });
  // ------------------ FLOATING HEARTS CELEBRATION ------------------
  function spawnValentineHearts() {
    for (let i = 0; i < 12; i++) {
      const heart = document.createElement("div");
      heart.textContent = "💖";
      heart.style.position = "fixed";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.bottom = "-20px";
      heart.style.fontSize = "22px";
      heart.style.animation = "floatUp 3s ease forwards";
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 3000);
    }
  }

  // ================== LOVE TIMER ==================
  const startDate = new Date(2025, 6, 27);

  function updateLoveTimer() {
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += prevMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
  }

  // update once on load
  updateLoveTimer();

  // update daily (no ticking seconds — romantic, not stressful)
  setInterval(updateLoveTimer, 1000 * 60 * 60 * 24);

});

// ================== LOADER TYPING EFFECT ==================
document.addEventListener("DOMContentLoaded", () => {
  const loaderMessages = [
    "Preparing our little love story… 💖",
    "Gathering our sweetest memories… 🌸",
    "Adding a sprinkle of magic… ✨",
    "Almost ready for you… 💕"
  ];

  const loaderTextEl = document.getElementById("loaderText");

  // 💖 pick ONE random message per page load
  const randomMessage =
    loaderMessages[Math.floor(Math.random() * loaderMessages.length)];

  let charIndex = 0;

  function typeLoaderText() {
    if (charIndex < randomMessage.length) {
      loaderTextEl.textContent += randomMessage.charAt(charIndex);
      charIndex++;
      setTimeout(typeLoaderText, 55);
    }
  }

  // start typing
  typeLoaderText();
});



setTimeout(() => {
  const loader = document.getElementById("loader");
  loader.style.opacity = 0;

  setTimeout(() => {
    loader.remove();

    AOS.init({
      once: false,
      duration: 1200,
      easing: "ease-out-cubic",
      offset: 120
    });

    AOS.refresh();
  }, 1000);

}, 3000);
