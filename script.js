function updateBadge() {
  const label = encodeURIComponent(
    document.getElementById("label").value || "This_Badge_Was_Made_with"
  );
  const message = encodeURIComponent(
    document.getElementById("message").value || "Shields_.io"
  );
  const color = encodeURIComponent(
    document.getElementById("color").value || "pink"
  );

  const badgeURL = `https://img.shields.io/badge/${label}-${message}-${color}`;
  document.getElementById("badge").src = badgeURL;
  document.getElementById(
    "badgeLinkDisplay"
  ).textContent = `<img src="${badgeURL}" alt="Badge Preview">`;
  document.getElementById(
    "badgeLinkHidden"
  ).value = `<img src="${badgeURL}" alt="Badge Preview">`;
}

function copyToClipboard() {
  const badgeURL = document.getElementById("badgeLinkHidden");
  badgeURL.select();
  badgeURL.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(badgeURL.value).then(() => {
    document.getElementById("label").value = "";
    document.getElementById("message").value = "";
    document.getElementById("color").value = "";

    const toast = document.getElementById("toast");
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 2000);
    updateBadge();
  });
}