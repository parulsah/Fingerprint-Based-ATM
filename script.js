const users = JSON.parse(localStorage.getItem("users")) || [];

// Display user info on transaction page
if (window.location.pathname.endsWith("transaction.html")) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedInUser) {
    const userInfoDiv = document.getElementById("userInfo");
    userInfoDiv.innerHTML = `
            <h3>User Info</h3>
            <p><strong>Name:</strong> ${loggedInUser.name}</p>
            <p><strong>Account No:</strong> ${loggedInUser.accountNo}</p>
            <p><strong>Balance:</strong> ${loggedInUser.balance}</p>
        `;
  } else {
    alert("You must be logged in to view this page.");
    window.location.href = "login.html";
  }
}

// Registration Form Submission
document
  .getElementById("registerForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const accountNo = document.getElementById("accountNo").value;
    const pin = document.getElementById("pin").value;
    const amount = document.getElementById("amount").value;

    const accountExists = users.some((user) => user.accountNo == accountNo);

    if (accountExists) {
      alert("Account number already exists! Please choose a different one.");
      return;
    }

    const user = {
      name,
      accountNo,
      pin,
      balance: parseFloat(amount),
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    window.location.href = "login.html";
  });

// Fingerprint button logic for Registration
document
  .getElementById("fingerprintButton")
  ?.addEventListener("click", function () {
    const fingerprintAnimation = document.getElementById(
      "fingerprintAnimation"
    );
    const registerButton = document.getElementById("registerButton");

    fingerprintAnimation.style.display = "block";
    registerButton.style.display = "none";

    setTimeout(function () {
      fingerprintAnimation.style.display = "none";
      registerButton.style.display = "block";
    }, 3000);
  });

// Login Form Submission
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const accountNo = document.getElementById("loginAccountNo").value;
  const pin = document.getElementById("loginPin").value;

  const user = users.find((u) => u.accountNo == accountNo && u.pin == pin);

  if (user) {
    alert("Login successful!");
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "transaction.html";
  } else {
    alert("Invalid Account No or Pin");
  }
});

document
  .getElementById("fingerprintButton")
  ?.addEventListener("click", function () {
    const fingerprintAnimation = document.getElementById(
      "fingerprintAnimation"
    );
    const loginButton = document.getElementById("loginButton");

    fingerprintAnimation.style.display = "block";
    loginButton.style.display = "none";

    setTimeout(function () {
      fingerprintAnimation.style.display = "none";
      loginButton.style.display = "block";
    }, 3000);
  });

// Transaction Form Submission
document
  .getElementById("transactionForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const transferAccountNo =
      document.getElementById("transferAccountNo").value;
    const transferAmount = parseFloat(
      document.getElementById("transferAmount").value
    );

    const recipient = users.find((u) => u.accountNo == transferAccountNo);

    if (
      recipient &&
      transferAmount > 0 &&
      loggedInUser.balance >= transferAmount
    ) {
      loggedInUser.balance -= transferAmount;
      recipient.balance += transferAmount;

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      alert(
        `Successfully transferred ${transferAmount} to account ${transferAccountNo}`
      );
    } else {
      alert(
        "Transfer failed: Check recipient account number and your balance."
      );
    }
  });

// Logout Function
function logout() {
  localStorage.removeItem("loggedInUser");
  alert("Logged out successfully!");
  window.location.href = "index.html";
}
