// main.js 맨 위 부분을 이렇게 수정
const menuButton = document.querySelector(".site-header-menu-button");
const nav = document.querySelector(".site-header-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav--open");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");

    // main.js – 메뉴 열릴 때 스타일 최소화
if (isOpen) {
  nav.style.display = "flex";
  nav.style.flexDirection = "column";
  nav.style.position = "absolute";
  nav.style.top = "56px";
  nav.style.left = "0";
  nav.style.right = "0";
  nav.style.background = "rgba(245,243,240,0.97)";
  nav.style.padding = "12px 16px";
  nav.style.borderRadius = "0";       // <- 둥근 모서리 제거
  nav.style.boxShadow = "none";       // <- 그림자 제거
  nav.style.gap = "12px";
} else {
  nav.removeAttribute("style");
}
  });
}

// 데스크톱에서도 클릭으로 서브메뉴 토글 (모바일 공통)
const navToggles = document.querySelectorAll(
  ".nav-item.has-submenu .nav-toggle"
);

navToggles.forEach((btn) => {
  const item = btn.closest(".nav-item");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    const isOpen = item.classList.contains("is-open");

    // 다른 열린 메뉴 닫기
    document
      .querySelectorAll(".nav-item.has-submenu.is-open")
      .forEach((openItem) => {
        if (openItem !== item) openItem.classList.remove("is-open");
      });

    // 현재 메뉴 토글
    if (isOpen) {
      item.classList.remove("is-open");
    } else {
      item.classList.add("is-open");
    }
  });
});

// 바깥 클릭 시 닫기
document.addEventListener("click", () => {
  document
    .querySelectorAll(".nav-item.has-submenu.is-open")
    .forEach((openItem) => openItem.classList.remove("is-open"));
});

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
