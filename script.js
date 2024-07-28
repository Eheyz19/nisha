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
            resultDiv.innerHTML = `
                <div class="word">
                    <h3>${query}</h3>
                </div>
                <div class="details">
                    <p>Meaning:</p>
                </div>
                <p class="word-meaning">${words[query]}</p>
            `;
        } else {
            resultDiv.innerHTML = '<p class="error">Word not found.</p>';
        }
    } catch (error) {
        console.error('Error fetching the words:', error);
        resultDiv.innerHTML = '<p class="error">Sorry, there was an error processing your request.</p>';
    }
}
