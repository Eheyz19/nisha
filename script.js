async function searchWord() {
    const searchBox = document.getElementById('searchBox');
    const query = searchBox.value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');
    
    if (query === '') {
        resultDiv.innerHTML = '<p>Please enter a word.</p>';
        return;
    }
    
    try {
        const response = await fetch('words.json');
        const words = await response.json();
        
        if (words[query]) {
            resultDiv.innerHTML = `<p><strong>${query}:</strong> ${words[query]}</p>`;
        } else {
            resultDiv.innerHTML = '<p>Word not found.</p>';
        }
    } catch (error) {
        console.error('Error fetching the words:', error);
        resultDiv.innerHTML = '<p>Sorry, there was an error processing your request.</p>';
    }
}
