const movies = {
    action: [
        { title: 'Місія нездійсненна', img: 'action1.jpg' },
        { title: 'Термінатор 2', img: 'action2.jpg' },
        { title: 'Темний лицар', img: 'action3.jpg' }
    ],
    thriller: [
        { title: 'Тихе місце', img: 'thriller1.jpg' },
        { title: 'Джокер', img: 'thriller2.jpg' },
        { title: 'Втеча з Шоушенка', img: 'thriller3.jpg' }
    ],
    western: [
        { title: 'Колись на дикому заході', img: 'western1.jpg' },
        { title: 'На декілька доларів більше', img: 'western2.jpg' },
        { title: 'Джанго вільний', img: 'western3.jpg' }
    ],
    comedy: [
        { title: 'Один вдома', img: 'comedy1.jpg' },
        { title: 'Маска', img: 'comedy2.jpg' },
        { title: 'Великий Лебовські', img: 'comedy3.jpg' }
    ],
    drama: [
        { title: 'Зелена миля', img: 'drama1.jpg' },
        { title: 'Форрест Гамп', img: 'drama2.jpg' },
        { title: 'Бійцівський клуб', img: 'drama3.jpg' }
    ]
};

let favorites = [];

function showMovies(genre) {
    const movieListSection = document.getElementById('movies-list');
    movieListSection.innerHTML = `<h2>Фільми жанру: ${genre.charAt(0).toUpperCase() + genre.slice(1)}</h2>`;

    const movieContainer = document.createElement('div');
    movieContainer.className = 'movies';

    movies[genre].forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';

        const img = document.createElement('img');
        img.src = movie.img;
        img.alt = movie.title;

        const title = document.createElement('p');
        title.textContent = movie.title;

        const addToFavoritesButton = document.createElement('button');
        addToFavoritesButton.textContent = 'Додати до обраних';
        addToFavoritesButton.onclick = () => addToFavorites(movie);

        movieCard.appendChild(img);
        movieCard.appendChild(title);
        movieCard.appendChild(addToFavoritesButton);
        movieContainer.appendChild(movieCard);
    });

    movieListSection.appendChild(movieContainer);
}

function addToFavorites(movie, button) {
    // Перевірка чи фільм вже в обраних
    if (!favorites.some(favMovie => favMovie.title === movie.title)) {
        favorites.push(movie);
        alert(`${movie.title} додано до обраних!`);
        button.disabled = true;  // Деактивація кнопки після додавання
        button.textContent = 'Вже в обраних';
    } else {
        alert('Фільм вже додано до обраних.');
    }
}

function showFavorites() {
    const movieListSection = document.getElementById('movies-list');
    movieListSection.innerHTML = `<h2>Обрані фільми</h2>`;

    const movieContainer = document.createElement('div');
    movieContainer.className = 'movies';

    favorites.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';

        const img = document.createElement('img');
        img.src = movie.img;
        img.alt = movie.title;

        const title = document.createElement('p');
        title.textContent = movie.title;

        movieCard.appendChild(img);
        movieCard.appendChild(title);
        movieContainer.appendChild(movieCard);
    });

    movieListSection.appendChild(movieContainer);
}

function showWatchedForm() {
    const movieListSection = document.getElementById('movies-list');
    movieListSection.innerHTML = `
        <h2>Облік переглянутих фільмів</h2>
        <form id="watched-form">
            <label for="movie-title">Назва фільму:</label>
            <input type="text" id="movie-title" required><br><br>
            <label for="director">Режисер:</label>
            <input type="text" id="director" required><br><br>
            <label for="rating">Оцінка (1-10):</label>
            <input type="number" id="rating" min="1" max="10" required><br><br>
            <button type="submit">Додати до переглянутих</button>
    </form>
    <div id="watched-movies">
        <h3>Переглянуті фільми</h3>
        <ul id="watched-list"></ul>
    </div>
    `;

    const form = document.getElementById('watched-form');
    form.onsubmit = function(event) {
        event.preventDefault();
        const title = document.getElementById('movie-title').value;
        const director = document.getElementById('director').value;
        const rating = document.getElementById('rating').value;

        addToWatchedMovies(title, director, rating);
        form.reset();
    };
}

let watchedMovies = [];

function addToWatchedMovies(title, director, rating) {
    const movie = {
        title,
        director,
        rating
    };
    watchedMovies.push(movie);
    updateWatchedMoviesList();
}

function updateWatchedMoviesList() {
    const watchedList = document.getElementById('watched-list');
    watchedList.innerHTML = '';

    watchedMovies.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.textContent = `${movie.title} (Режисер: ${movie.director}, Оцінка: ${movie.rating}/10)`;
        watchedList.appendChild(listItem);
    });
}
