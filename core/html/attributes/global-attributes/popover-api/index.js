const popover = document.getElementById("my-popover");

function supportsPopover() {
  return Object.hasOwn(HTMLElement.prototype, "popover");
}

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "h") {
    if (popover.matches(":popover-open")) {
      popover.hidePopover();
    } else {
      popover.showPopover();
    }

    // OR
    // popover.togglePopover();
  }
});

const subContainer = document.querySelector(".sub");
const subpopover = document.querySelector(".popover");

// Events to show/hide the subpopover when the mouse moves over and out
subcontainer.addEventListener("mouseover", () => {
  subpopover.showPopover();
});

subcontainer.addEventListener("mouseout", () => {
  if (subpopover.matches(":popover-open")) {
    subpopover.hidePopover();
  }
});
