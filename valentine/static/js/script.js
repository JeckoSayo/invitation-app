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

    // 🔥 IMPORTANT: wait for layout to stabilize, then init ScrollReveal
    setTimeout(() => {
      initScrollReveal();
    }, 300);
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

  // ================== LOADER ==================
  window.addEventListener("load", () => {
    setTimeout(() => {
      const loader = document.getElementById("loader");
      loader.style.opacity = 0;
      setTimeout(() => loader.remove(), 1000);
    }, 3000);
  });

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

      // ❌ Tease answers
      if (choice.classList.contains("tease")) {
        choice.classList.add("clicked");
        sentenceResult.textContent = "Hmm… try again 😌";
        sentenceResult.style.opacity = 1;

        setTimeout(() => {
          choice.classList.remove("clicked");
        }, 400);
        return;
      }

      // ✅ Correct answer
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

  // ------------------ NO BUTTON (PLAYFUL ESCAPE) ------------------
  noBtn.addEventListener("mouseenter", () => {
    const x = Math.random() * 120 - 60;
    const y = Math.random() * 80 - 40;

    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });

  noBtn.addEventListener("click", () => {
    noBtn.textContent = "Nice try 😜";
  });

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


  // ================== SCROLLREVEAL (DELAYED INIT) ==================
  function initScrollReveal() {

  const isMobile = window.innerWidth <= 768;

  const sr = ScrollReveal({
    reset: !isMobile,
    distance: '60px',
    duration: 2500,
    delay: 100,
    easing: 'ease-out'
  });

  sr.clean(
    '#hero, .photo-wrap, .love-timer h2, .timer-card, .timer-caption, .memories-title, .memory'
  );

  sr.reveal('#hero', {
    delay: 500,
    origin: 'left'
  });

  sr.reveal('.photo-wrap', {
    delay: 600,
    origin: 'right'
  });

  sr.reveal('.love-timer h2', {
    origin: 'top',
    delay: 200
  });

  sr.reveal('.timer-card, .love-photo', {
    origin: 'bottom',
    delay: 400,
    distance: '40px'
  });

  sr.reveal('.timer-caption', {
    origin: 'bottom',
    delay: 600,
    distance: '20px'
  });

  sr.reveal('.memories-title', {
    origin: 'top'
  });

  sr.reveal('.memory', {
    origin: 'bottom',
    interval: 300
  });
}


  // ================== SAFETY SYNC ==================
  window.addEventListener('resize', () => {
    if (window.ScrollReveal) ScrollReveal().sync();
  });


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
