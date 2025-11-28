function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.querySelector(".sidebar-overlay");
  const screenWidth = window.innerWidth;

  if (screenWidth <= 768) {
    sidebar.classList.toggle("active");
    if (overlay) {
      overlay.classList.toggle("active");
    }
  } else {
    sidebar.classList.toggle("collapsed");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.querySelector(".sidebar-overlay");
  const sidebar = document.getElementById("sidebar");

  if (overlay) {
    overlay.addEventListener("click", function () {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
    });
  }
});

function refreshUserData() {
  const btn = event.currentTarget.querySelector("i");
  btn.classList.add("fa-spin");
  setTimeout(() => {
    btn.classList.remove("fa-spin");
    alert("Làm mới dữ liệu người dùng thành công!");
  }, 1000);
}
function refreshHotelData() {
  const btn = event.currentTarget.querySelector("i");
  btn.classList.add("fa-spin");
  setTimeout(() => {
    btn.classList.remove("fa-spin");
    alert("Làm mới dữ liệu khách sạn thành công!");
  }, 1000);
}
function refreshBookingData() {
  const btn = event.currentTarget.querySelector("i");
  btn.classList.add("fa-spin");
  setTimeout(() => {
    btn.classList.remove("fa-spin");
    alert("Làm mới dữ liệu đặt phòng thành công!");
  }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".sidebar__nav-link");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("sidebar__nav-link--active");
    } else {
      link.classList.remove("sidebar__nav-link--active");
    }

    link.addEventListener("click", function (e) {
      navLinks.forEach((l) => l.classList.remove("sidebar__nav-link--active"));
      this.classList.add("sidebar__nav-link--active");

      if (window.innerWidth <= 768) {
        document.getElementById("sidebar").classList.remove("active");
        const overlay = document.querySelector(".sidebar-overlay");
        if (overlay) overlay.classList.remove("active");
      }
    });
  });
});
