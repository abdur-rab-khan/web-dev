const btn = document.querySelector("#infoBtn");
const popover = document.querySelector("#popover");

btn.addEventListener("click", (e) => {
  const popoverContent = e.target.dataset.popoverContent;
  popover.textContent = popoverContent;

  popover.togglePopover();
});
