// script.js
const apiKey = 'TPTduCA9KpJSf1ECSx2JWR5dEbmQ3XSw5dMM9ofK';

// Function to fetch Astronomy Picture of the Day (APOD)
function fetchAPOD() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const apodContent = document.getElementById('apod-content');
            apodContent.innerHTML = `
                <img src="${data.url}" alt="${data.title}" class="apod-image">
                <p>${data.explanation}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching APOD:', error);
            const apodContent = document.getElementById('apod-content');
            apodContent.innerHTML = '<p>Failed to fetch Astronomy Picture of the Day.</p>';
        });
}

// Function to fetch Mars rover photos
function fetchMarsPhotos() {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const marsPhotos = document.getElementById('mars-photos');
            marsPhotos.innerHTML = '';
            data.photos.forEach(photo => {
                const img = document.createElement('img');
                img.src = photo.img_src;
                img.alt = `Mars Rover Photo taken on ${photo.earth_date}`;
                img.classList.add('mars-photo');
                marsPhotos.appendChild(img);
            });
        })
        .catch(error => {
            console.error('Error fetching Mars photos:', error);
            const marsPhotos = document.getElementById('mars-photos');
            marsPhotos.innerHTML = '<p>Failed to fetch Mars rover photos.</p>';
        });
}

// Execute functions when the page loads
window.onload = function() {
    fetchAPOD();
    fetchMarsPhotos();
};
