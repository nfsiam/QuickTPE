const ratingSel = document.getElementById("rating");
const evalBtn = document.getElementById("evaluate");
const commentInput = document.getElementById("comment");

ratingSel.addEventListener("change", (e) => {
  const selectedVal = parseInt(e.target.value);
  let comment;
  switch (selectedVal) {
    case 5:
      comment = "very Good";
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
    default:
      break;
  }
  commentInput.value = comment;
  chrome.tabs.executeScript({
    code: `
    document.querySelectorAll('input[type="radio"][value="${selectedVal}"]').forEach(r => r.checked = true);
    document.getElementById("Comment")?.scrollIntoView();
    if(document.getElementById("Comment")){document.getElementById("Comment").value = "${commentInput.value || ''}";}
    `,
  });
})

evalBtn.addEventListener("click", (e) => {
  if (commentInput.value && commentInput.value.length > 0) {
    chrome.tabs.executeScript({
      code: `
      document.querySelector('input[type="submit"]').click();
      `,
    });
  }
  else {
    alert("please enter a comment to proceed");
  }
});
