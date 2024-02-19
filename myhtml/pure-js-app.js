document.addEventListener('DOMContentLoaded', async function () {
  const apiUrl = 'https://port-0-hkshim-node-express-dcse2blie4kwxe.sel4.cloudtype.app/data';
  //const apiUrl = 'http://127.0.0.1:3000/data';
  
  try {
    const response = await fetch(apiUrl);
    const movieDataArray = await response.json();

    const appElement = document.getElementById('app');
    appElement.classList.add('movie-list');
    
    movieDataArray.data.forEach((movieData, index) => {
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-item');

      const movieDetails = document.createElement('div');
      movieDetails.classList.add('movie-details');

      movieDetails.innerHTML = `
        <img src="${movieData.background_image}" alt="${movieData.title}">
        <h2>${movieData.title}</h2>
        <p>Release Year: ${movieData.reg_year}</p>
        <p>Genre: ${movieData.genres}</p>
        <p>${truncateText(movieData.summary, 100)}</p>
      `;

      movieContainer.appendChild(movieDetails);
      appElement.appendChild(movieContainer);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}