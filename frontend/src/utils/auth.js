export function registerUser(user) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.find(u => u.email === user.email);
  if (exists) return { success: false, message: "Email already exists" };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  return { success: true };
}

export function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const found = users.find(u => u.email === email && u.password === password);

  if (!found) return { success: false, message: "Invalid email or password" };

  localStorage.setItem("currentUser", JSON.stringify(found));

  return { success: true, user: found };
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

export function logoutUser() {
  localStorage.removeItem("currentUser");
}
