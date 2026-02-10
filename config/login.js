document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const { data, error } = await window.supabaseClient
      .from("admins")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (error) {
      Swal.fire({
        icon: "error",
        title: "System Error",
        text: "Something went wrong. Please try again."
      });
      console.error(error);
      return;
    }

    if (!data) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "User not found"
      });
      return;
    }

    if (data.password === password) {
      showLoginSuccess("menu/content.html");
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Incorrect password"
      });
    }
  });
});
