const form = document.querySelector('form');
const searchInput = document.querySelector('.form-control');
const cityInformationDiv = document.getElementById('cityInformation');
const newsApiToken = 'fee3805d20864aac832bfa378f590396'

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityName = searchInput.value.trim();
    fetchCityTime(cityName)
    fetchNewsData(cityName);
});

function fetchNewsData(city) {
    const today = new Date();
    const previousDay = new Date(today);
    previousDay.setDate(today.getDate() - 1);

    const date = previousDay.toISOString().split('T')[0];

    const url = `https://newsapi.org/v2/everything?q=${city}&from=${date}&sortBy=publishedAt&apiKey=${newsApiToken}`;
    console.log(url)

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === "ok") {
                displayNews(data.articles);
            } else {
                console.error('Error fetching news:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    articles.slice(0, 3).forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.innerHTML = `
                <div class="article-info">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank" class="article_link">Read more</a>
                </div>
            `;
        newsContainer.appendChild(articleElement);
    });
}

function fetchCityTime(city) {
    var url = `https://worldtimeapi.org/api/timezone/Europe/${city}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.datetime) {
                displayCityTime(data.datetime);
            } else {
                console.error('Error fetching time:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));

    var url = `https://worldtimeapi.org/api/timezone/Asia/${city}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.datetime) {
                displayCityTime(data.datetime);
            } else {
                console.error('Error fetching time:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));

    var url = `https://worldtimeapi.org/api/timezone/America/${city}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.datetime) {
                displayCityTime(data.datetime);
            } else {
                console.error('Error fetching time:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));

}

function displayCityTime(datetime) {
    const cityTimeContainer = document.getElementById('city-time-container');
    const formattedTime = new Date(datetime).toLocaleTimeString(); // Adjust formatting as needed
    cityTimeContainer.innerHTML = `<p>Current time: ${formattedTime}</p>`;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityName = searchInput.value.trim();
    fetchNewsData(cityName);
    fetchCityTime(cityName); // Fetch the city time when searching for a city
});

