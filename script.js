const searchBtn = document.querySelector("button");
const searchInput = document.getElementById("search");
const results = document.createElement("div");
document.body.appendChild(results);

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    results.innerHTML = "<p>Please enter a fragrance name.</p>";
    return;
  }

  results.innerHTML = `<p>Searching for <strong>${query}</strong>...</p>`;

  try {
    const response = await fetch("./data/fragrances.json");
    const data = await response.json();

    const match = data.find(item => item.name.toLowerCase().includes(query));

    if (!match) {
      results.innerHTML = `<p>No results found for <strong>${query}</strong>.</p>`;
      return;
    }

    const retailers = match.retailers;
    let table = `
      <h2>${match.name}</h2>
      <table border="1" cellpadding="8" style="margin:auto;">
        <tr><th>Retailer</th><th>Price (USD)</th><th>Buy</th></tr>
    `;

    Object.entries(retailers).forEach(([name, info]) => {
      table += `
        <tr>
          <td>${name}</td>
          <td>$${info.price}</td>
          <td><a href="${info.url}" target="_blank">Buy Now</a></td>
        </tr>
      `;
    });

    table += "</table>";
    results.innerHTML = table;
  } catch (error) {
    console.error(error);
    results.innerHTML = "<p>Error loading data. Please try again later.</p>";
  }
});
