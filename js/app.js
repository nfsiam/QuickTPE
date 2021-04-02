const ratingSel = document.getElementById("rating");
const evalBtn = document.getElementById("evaluate");
const commentInput = document.getElementById("comment");
let selectedVal = 0;
let comment = "";
ratingSel.addEventListener("change", (e) => {
  selectedVal = parseInt(e.target.value || 0);
  switch (selectedVal) {
    case 5:
      comment = "very good";
      break;
    case 4:
      comment = "good";
      break;
    case 3:
      comment = "not bad";
      break;
    case 2:
      comment = "was not that ok for me";
      break;
    case 1:
      comment = "It was not a good experience for me";
      break;
    case 0:
      comment = "";
      break;
    default:
      break;
  }
  commentInput.value = comment;
  if (selectedVal != 0) {
    chrome.tabs.executeScript({
      code: `
      document.querySelectorAll('input[type="radio"][value="${selectedVal}"]').forEach(r => r.checked = true);
      document.getElementById("Comment")?.scrollIntoView();
      if(document.getElementById("Comment")){document.getElementById("Comment").value = "${comment}";}
      `,
    });
  }
  else {
    chrome.tabs.executeScript({
      code: `
      document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
      if(document.getElementById("Comment")){document.getElementById("Comment").value = "";}
      `,
    });
  }
});

evalBtn.addEventListener("click", (e) => {
  if (selectedVal != 0 && commentInput.value && commentInput.value.length > 0) {
    chrome.tabs.executeScript({
      code: `
      document.querySelector('input[type="submit"]').click();
      `,
    });
  }
  else {
    alert("please select an option & enter a comment to proceed");
  }
});
