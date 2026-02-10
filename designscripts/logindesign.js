function showLoginSuccess(redirectTo) {
  Swal.fire({
    icon: "success",
    title: "Login Successful",
    text: "Welcome, admin!",
    timer: 1200,
    showConfirmButton: false
  }).then(() => {
    window.location.replace(redirectTo);
  });
}

function showLogoutConfirm(redirectTo) {
  Swal.fire({
    icon: "warning",
    title: "Log out?",
    text: "You will be returned to the login screen.",
    showCancelButton: true,
    confirmButtonText: "Yes, log out",
    cancelButtonText: "Cancel",
    reverseButtons: true
  }).then((result) => {
    if (!result.isConfirmed) return;

    Swal.fire({
      icon: "success",
      title: "Logged out",
      timer: 1200,
      showConfirmButton: false
    }).then(() => {
      window.location.replace(redirectTo);
    });
  });
}
