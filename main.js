// 단순한 모바일 메뉴 토글 (연습용)

const menuButton = document.querySelector(".site-header__menu-button");
const nav = document.querySelector(".site-header__nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav--open");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (isOpen) {
      nav.style.display = "flex";
      nav.style.flexDirection = "column";
      nav.style.position = "absolute";
      nav.style.top = "56px";
      nav.style.right = "16px";
      nav.style.background = "rgba(245,243,240,0.97)";
      nav.style.padding = "12px 16px";
      nav.style.borderRadius = "14px";
      nav.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)";
      nav.style.gap = "12px";
    } else {
      nav.removeAttribute("style");
    }
  });
}

// 뉴스레터 폼 더미 핸들러

const newsletterForm = document.querySelector(".newsletter__form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector(".newsletter__input");
    if (!input) return;
    const email = input.value.trim();
    if (!email) return;
    alert(`Subscribed (practice only): ${email}`);
    input.value = "";
  });
}
