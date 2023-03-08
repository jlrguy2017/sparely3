// Get form and result elements from HTML
const form = document.querySelector("#spare-parts-form");
const resultsContainer = document.querySelector("#results-container");

// Handle form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent form from submitting

  // Get spare parts input from form
  const sparePartsInput = document.querySelector("#spare-parts-input");
  const spareParts = sparePartsInput.value.trim().split(",").map(part => part.trim());

  // Generate project ideas based on spare parts
  try {
    const ideas = await generateProjectIdeas(spareParts);

    // Display project ideas to user
    const resultsHTML = `
      <h2>Project Ideas</h2>
      <ul>
        <li>${ideas[0]}</li>
        <li>${ideas[1]}</li>
        <li>${ideas[2]}</li>
      </ul>
      <p>Please copy your results and paste them somewhere safe like a text file.</p>
    `;
    resultsContainer.innerHTML = resultsHTML;

  } catch (error) {
    // Handle errors
    resultsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
 
