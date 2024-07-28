async function searchWord() {
    const searchBox = document.getElementById('searchBox');
    const query = searchBox.value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = ''; // Clear previous result

    if (query === '') {
        resultDiv.innerHTML = '<p class="error">Please enter a word.</p>';
        return;
    }
    
    try {
        const response = await fetch('words.json');
        const words = await response.json();
        
        if (words[query]) {
            const wordDetails = words[query];
            resultDiv.innerHTML = `
                <div class="word">
                    <h3>${query}</h3>
                </div>
                <div class="details">
                    <p>${wordDetails.type}</p>
                </div>
                <p class="description">${wordDetails.description}</p>
                <p class="quote">${wordDetails.quote}</p>
            `;
        } else {
            resultDiv.innerHTML = '<p class="error">Word not found.</p>';
        }
    } catch (error) {
        console.error('Error fetching the words:', error);
        resultDiv.innerHTML = '<p class="error">Sorry, there was an error processing your request.</p>';
    }
}
