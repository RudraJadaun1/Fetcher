const apiKey = 'TPTduCA9KpJSf1ECSx2JWR5dEbmQ3XSw5dMM9ofK'; // Your NASA API Key
const rovers = ['curiosity', 'opportunity', 'spirit']; // Mars rovers
let currentRoverIndex = 0; // Start with the first rover
let photoIndex = 0; // Start with the first photo of the current rover
let photos = []; // Array to store photos for the current rover

// Fetch photos for the current rover
async function fetchPhotos() {
    const rover = rovers[currentRoverIndex];
    try {
        const response = await fetch(
            `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=${apiKey}`
        );
        const data = await response.json();
        if (data.photos.length > 0) {
            photos = data.photos;
            photoIndex = 0; // Reset photo index
            displayPhoto(); // Show the first photo
        } else {
            document.getElementById('photo-gallery').innerHTML = `<p>No photos found for ${rover}.</p>`;
        }
    } catch (error) {
        console.error('Error fetching Mars photos:', error);
        document.getElementById('photo-gallery').innerHTML = `<p>Failed to load photos for ${rover}.</p>`;
    }
}

// Display the current photo
function displayPhoto() {
    if (photos.length > 0) {
        const photo = photos[photoIndex];
        const gallery = document.getElementById('photo-gallery');
        gallery.innerHTML = `
            <img src="${photo.img_src}" alt="Mars Photo by ${rovers[currentRoverIndex]}" />
            <p>${rovers[currentRoverIndex].toUpperCase()} Rover - Photo taken on ${photo.earth_date}</p>
        `;
    }
}

// Move to the next photo
function nextPhoto() {
    if (photos.length > 0) {
        photoIndex++;
        if (photoIndex >= photos.length) {
            // Switch to the next rover when photos are exhausted
            currentRoverIndex = (currentRoverIndex + 1) % rovers.length;
            fetchPhotos(); // Fetch photos for the next rover
        } else {
            displayPhoto(); // Display the next photo
        }
    }
}

// Add event listener to the Next Photo button
document.getElementById('next-photo').addEventListener('click', nextPhoto);

// Fetch the first set of photos on page load
fetchPhotos();
