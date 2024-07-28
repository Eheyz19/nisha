function normalizeWord(word) {
    return word.trim().toLowerCase();
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
        
        let foundWord = null;

        // Check all words for synonyms
        for (const key in words) {
            if (words[key].synonyms.includes(query)) {
                foundWord = words[key];
                break;
            }
        }

        if (foundWord) {
            resultDiv.innerHTML = `
                <div class="word">
                    <h3>Aratılan Kelime: ${query}</h3>
                </div>
                <div class="details">
                    <p>Kelime Türü: ${foundWord.type}</p>
                </div>
                <p class="description">Açıklama: ${foundWord.description}</p>
                <p class="quote">Alıntı: ${foundWord.quote}</p>
            `;
        } else {
            resultDiv.innerHTML = '<p class="error">Word not found.</p>';
        }
    } catch (error) {
        console.error('Error fetching the words:', error);
        resultDiv.innerHTML = '<p class="error">Sorry, there was an error processing your request.</p>';
    }
}
