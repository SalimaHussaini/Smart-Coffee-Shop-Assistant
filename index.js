document.addEventListener("DOMContentLoaded", function () {
  
  const username = prompt("Enter your username (admin/user):");
  const password = prompt("Enter your password:");

  if (!["admin", "user"].includes(username) || password !== "1234") {
    alert("Access denied. Invalid credentials.");
    return;
  }

  
  const form = document.getElementById("coffeeForm");
  const resultBox = document.getElementById("result");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const age = parseInt(document.getElementById("age").value);
    const coffeeType = document.getElementById("coffeeType").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const split = parseInt(document.getElementById("split").value);
    const tipPercent = parseInt(document.getElementById("tip").value);

    let price = 0;
    if (coffeeType === "espresso") price = 2.5;
    else if (coffeeType === "latte") price = 3.5;
    else if (coffeeType === "cappuccino") price = 4.0;
    else {
      alert("Invalid coffee type.");
      return;
    }

    const originalTotal = price * quantity;
    let discount = 0;
    if (age < 18 || age > 60) {
      discount = originalTotal * 0.1;
    }

    const finalTotal = originalTotal - discount;
    const tip = finalTotal * (tipPercent / 100);
    const totalWithTip = finalTotal + tip;
    const perPerson = totalWithTip / split;

    const summary = `
      <strong>Hello ${name}!</strong><br/>
      You ordered <strong>${quantity} ${coffeeType}(s)</strong>.<br/>
      Original total: $${originalTotal.toFixed(2)}<br/>
      Discount: $${discount.toFixed(2)}<br/>
      Tip: $${tip.toFixed(2)}<br/>
      <strong>Total with Tip: $${totalWithTip.toFixed(2)}</strong><br/>
      Split between ${split} people: <strong>$${perPerson.toFixed(2)} each</strong>
    `;

    resultBox.innerHTML = summary;

    // Save to localStorage
    const orderData = {
      name,
      coffeeType,
      quantity,
      originalTotal: originalTotal.toFixed(2),
      discount: discount.toFixed(2),
      tip: tip.toFixed(2),
      totalWithTip: totalWithTip.toFixed(2),
      perPerson: perPerson.toFixed(2)
    };

    localStorage.setItem("lastOrder", JSON.stringify(orderData));
  });

  // Load last order on page load
  const lastOrder = localStorage.getItem("lastOrder");
  if (lastOrder) {
    const data = JSON.parse(lastOrder);
    resultBox.innerHTML = `
      <em>Last Order Loaded:</em><br/>
      Hello ${data.name}!<br/>
      You ordered ${data.quantity} ${data.coffeeType}(s).<br/>
      Original total: $${data.originalTotal}<br/>
      Discount: $${data.discount}<br/>
      Tip: $${data.tip}<br/>
      Total with Tip: $${data.totalWithTip}<br/>
      Split: $${data.perPerson} each
    `;
  }
});
