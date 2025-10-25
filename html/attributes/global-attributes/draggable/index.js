// SIMPLE TEXT DRAG AND DROP
function simpleTextDrop() {
  const target = document.querySelector("#target");
  const content = document.querySelector("#content");

  // Event fire when drag starts
  content.addEventListener("dragstart", (e) => {
    // OLD WAY
    // Adding Different types of drag data;
    e.dataTransfer.setData("text/plain", e.target.innerText);
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    e.dataTransfer.setData(
      "text/uri-list",
      e.target.ownerDocument.location.href
    );

    e.target.style.opacity = "0.5";

    // SETTING DRAG IMAGE.

    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 50;

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 4;
    ctx.moveTo(0, 0);
    ctx.lineTo(50, 50);
    ctx.moveTo(0, 50);
    ctx.lineTo(50, 0);
    ctx.stroke();

    event.dataTransfer.setDragImage(canvas, 25, 25);

    // NEW WAY
    // e.dataTransfer.items.add(e.target.innerText, "text/plain");
  });

  // Event fire when drag end
  content.addEventListener("dragend", (e) => {
    target.style.border = "none";
    content.style.opacity = "1";
  });

  // Event fire when enter on target area
  target.addEventListener("dragenter", (e) => {
    target.style.border = "1px solid white";
  });

  // Event fire when leave on target area
  target.addEventListener("dragleave", () => {
    target.style.border = "none";
  });

  // Event fire when drag over a drop target
  // ev.preventDefault to cancel default behavior
  target.addEventListener("dragover", (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  });

  target.addEventListener("drop", (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const htmlData = e.dataTransfer.getData("text/html");
    const uris = e.dataTransfer.getData("text/uri-list");

    console.log("Data is: ", data);
    console.log("HTML is: ", htmlData);
    console.log("URL's: ", uris);

    console.log(e.dataTransfer.items);

    e.target.append(`${data} `);
  });
}

// FILE DRAG AND DROP
function fileDrop() {
  const drop = document.querySelector("#drop-zone");
  const clear = document.querySelector("#clear-btn");
  const preview = document.querySelector("#preview");
  const fileInput = document.querySelector("#file-input");

  drop.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      fileInput.click();
    }
  });

  drop.addEventListener("click", () => {
    fileInput.click();
  });

  // When dragover let's change page default behavior if it's file.
  window.addEventListener("dragover", (e) => {
    const fileItems = [...e.dataTransfer.items].filter(
      (i) => i.kind === "file"
    );

    if (fileItems.length > 0) {
      e.preventDefault();
      if (!drop.contains(e.target)) {
        e.dataTransfer.dropEffect = "none";
      }
    }
  });

  // Continuously event fire when selection has been dragged
  drop.addEventListener("dragover", (e) => {
    drop.classList.remove("border-gray-400");
    drop.classList.add("border-blue-500");

    const fileItems = [...e.dataTransfer.items].filter((i) => i.kind == "file");

    if (fileItems.length > 0) {
      if (fileItems.some((item) => item.type.startsWith("image/"))) {
        e.dataTransfer.dropEffect = "copy";
      } else {
        e.dataTransfer.dropEffect = "none";
      }
    }
  });

  // Event fire when mouse is released
  drop.addEventListener("dragend", () => {
    drop.classList.remove("border-blue-500");
    drop.classList.add("border-gray-400");
  });

  drop.addEventListener("dragleave", () => {
    drop.classList.remove("border-blue-500");
    drop.classList.add("border-gray-400");
  });

  drop.addEventListener("drop", (e) => {
    e.preventDefault();
    const files = [...e.dataTransfer.items]
      .map((i) => i.getAsFile())
      .filter((f) => f);

    displayImage(files);

    drop.classList.remove("border-blue-500");
    drop.classList.add("border-gray-400");
  });

  window.addEventListener("drop", (e) => {
    if ([...e.dataTransfer.items].some((i) => i.kind === "file")) {
      e.preventDefault();
    }
  });

  clear.addEventListener("click", () => {
    for (const img of preview.querySelectorAll("img")) {
      URL.revokeObjectURL(img.src);
    }

    preview.textContent = "";
  });

  const displayImage = (files) => {
    for (const file of files) {
      const li = document.createElement("li");
      const img = document.createElement("img");

      img.src = URL.createObjectURL(file);
      img.alt = file.name;
      li.appendChild(img);
      li.appendChild(document.createTextNode(file.name));
      preview.append(li);
    }
  };
}

// KANBAN BOARD
function kanban() {
  const taskColumns = document.querySelectorAll(".task-column");
  const tasks = document.querySelectorAll(".task");

  const handleDragStart = (event, task) => {
    task.id = "dragged-task";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", task.outerHTML);
  };

  const handleDragEnd = (_, task) => {
    task.removeAttribute("id");
  };

  const handleDragLeave = (event, column) => {
    if (column.contains(event.relatedTarget)) return;
    const placeholder = column.querySelector(".placeholder");
    placeholder?.remove();
  };

  const makePlaceholder = (draggedTask) => {
    const placeholder = document.createElement("li");
    placeholder.classList.add("placeholder");
    placeholder.style.height = `${draggedTask.offsetHeight}px`;
    return placeholder;
  };

  const movePlaceholder = (event) => {
    const column = event.currentTarget;
    const draggedTask = document.getElementById("dragged-task");
    const tasks = column.children[1];
    const existingPlaceholder = column.querySelector(".placeholder");

    console.log(existingPlaceholder);

    if (existingPlaceholder) {
      const placeholderRect = existingPlaceholder.getBoundingClientRect();
      if (
        placeholderRect.top <= event.clientY &&
        placeholderRect.bottom >= event.clientY
      ) {
        return;
      }
    }

    for (const task of tasks.children) {
      if (task.getBoundingClientRect().bottom >= event.clientY) {
        if (task === existingPlaceholder) return;
        existingPlaceholder?.remove();
        if (task === draggedTask || task.previousElementSibling === draggedTask)
          return;
        tasks.insertBefore(
          existingPlaceholder ?? makePlaceholder(draggedTask),
          task
        );
        return;
      }
    }
    existingPlaceholder?.remove();
    if (tasks.lastElementChild === draggedTask) return;
    tasks.append(existingPlaceholder ?? makePlaceholder(draggedTask));
  };

  const handleDragOver = (event) => {
    if (event.dataTransfer.types.includes("text/html")) {
      event.preventDefault();
    }
    movePlaceholder(event);
  };

  const handleDrop = (event, column) => {
    const data = event.dataTransfer.getData("text/html");
    const draggedTask = document.getElementById("dragged-task");
    const placeholder = column.querySelector(".placeholder");

    if (!placeholder) return;

    draggedTask.remove();
    column.children[1].insertBefore(draggedTask, placeholder);
    placeholder.remove();
  };

  taskColumns.forEach((v) => {
    // Initializing Events for Column Drop
    v.addEventListener("dragover", handleDragOver);
    v.addEventListener("dragleave", (e) => handleDragLeave(e, v));
    v.addEventListener("drop", (e) => handleDrop(e, v));
  });

  tasks.forEach((v) => {
    // Initializing Event for task drag
    v.addEventListener("dragstart", (e) => handleDragStart(e, v));
    v.addEventListener("dragend", (e) => handleDragEnd(e, v));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  simpleTextDrop();
  fileDrop();
  kanban();
});
