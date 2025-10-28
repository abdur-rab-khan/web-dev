const narrowBtn = document.querySelector(".width-adjust");
const reader = document.querySelector(".easy-reader");

narrowBtn.addEventListener("click", () => {
  const hasWider = reader.classList.contains("wider");
  const hasNarrower = reader.classList.contains("narrower");

  if (!hasWider && !hasNarrower) {
    reader.classList.add("narrower");
    narrowBtn.textContent = "Wider";
  } else if (hasWider) {
    reader.classList.replace("wider", "narrower");
    narrowBtn.textContent = "Wider";
  } else if (hasNarrower) {
    reader.classList.replace("narrower", "wider");
    narrowBtn.textContent = "Narrower";
  }
});
