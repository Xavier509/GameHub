document.addEventListener('DOMContentLoaded', function() {
    const gamesContainer = document.getElementById('gamesContainer');
    const searchInput = document.getElementById('searchInput');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    // Function to create game cards
    function createGameCard(gameId, gameData) {
        const card = document.createElement('div');
        card.className = 'game-card';
        
        const link = document.createElement('a');
        link.href = `games/${gameData.source}`;
        
        const title = document.createElement('div');
        title.className = 'game-title';
        title.textContent = gameData.title;
        
        link.appendChild(title);
        card.appendChild(link);
        
        return card;
    }
    
    // Function to display games
    function displayGames(filteredGames = games) {
        gamesContainer.innerHTML = '';
        Object.entries(filteredGames).forEach(([gameId, gameData]) => {
            const card = createGameCard(gameId, gameData);
            gamesContainer.appendChild(card);
        });
    }
    
    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredGames = Object.fromEntries(
            Object.entries(games).filter(([id, game]) => 
                game.title.toLowerCase().includes(searchTerm)
            )
        );
        displayGames(filteredGames);
    });
    
    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.dataset.category;
            if (category === 'all') {
                displayGames();
                return;
            }
            
            // Filter games based on category
            const filteredGames = Object.fromEntries(
                Object.entries(games).filter(([id, game]) => 
                    id.includes(category) || 
                    (category === 'popular' && game.popular)
                )
            );
            displayGames(filteredGames);
        });
    });
    
    // Initial display
    displayGames();
});