function normalizeWord(word) {
    // Normalization logic: convert to lowercase, replace special characters, etc.
    return word.trim().toLowerCase()
        .replace(/ı/g, 'i')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ç/g, 'c')
        .replace(/ö/g, 'o')
        .replace(/ğ/g, 'g')
        .replace(/[^a-z0-9+]/g, ''); // Remove any non-alphanumeric and non-plus characters
}

async function searchWord() {
    const searchBox = document.getElementById('searchBox');
    const query = normalizeWord(searchBox.value);
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = ''; // Clear previous result

    if (query === '') {
        resultDiv.innerHTML = '<p class="error">Please enter a word.</p>';
        return;
    }
    
    try {
        const response = await fetch('words.json');
        const words = await response.json();
        
        // Check if the normalized query exists in the words object
        if (words[query]) {
            const wordDetails = words[query];
            resultDiv.innerHTML = `
                <div class="word">
                    <h3>Aratılan Kelime: ${query}</h3>
                </div>
                <div class="details">
                    <p>Kelime Türü: ${wordDetails.type}</p>
                </div>
                <p class="description">Açıklama: ${wordDetails.description}</p>
                <p class="quote">Alıntı: ${wordDetails.quote}</p>
            `;
        } else {
            resultDiv.innerHTML = '<p class="error">Word not found.</p>';
        }
    } catch (error) {
        console.error('Error fetching the words:', error);
        resultDiv.innerHTML = '<p class="error">Sorry, there was an error processing your request.</p>';
    }
}
