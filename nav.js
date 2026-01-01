document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".nav-item");
  const underline = document.querySelector(".nav-underline");
  const panels = document.querySelectorAll(".tab-panel");

  function moveUnderline(el) {
    underline.style.width = el.offsetWidth + "px";
    underline.style.transform = `translateX(${el.offsetLeft}px)`;
  }

  function activateTab(tab) {
    const targetId = tab.dataset.tab;

    tabs.forEach(t => t.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(targetId).classList.add("active");

    moveUnderline(tab);
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => activateTab(tab));
  });

  // Initiate on load
  const activeTab = document.querySelector(".nav-item.active");
  if (activeTab) activateTab(activeTab);
});
