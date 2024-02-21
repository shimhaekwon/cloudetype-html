let movieDataArray;

document.addEventListener('DOMContentLoaded', async function () {
  const apiUrl = 'https://port-0-hkshim-node-express-dcse2blie4kwxe.sel4.cloudtype.app/data';
  //const apiUrl = 'http://127.0.0.1:3000/data';
  
  try {
    const response = await fetch(apiUrl);
    movieDataArray = await response.json();

    if (!movieDataArray.success){
      console.error(`No movie data found from ${apiUrl}`);
      alert(`There is no data from node server[${apiUrl}]]`);
      return;
    }else{
      movieDataArray = movieDataArray.data;
    }

    const appElement = document.getElementById('app');
    appElement.classList.add('movie-list');
    
    movieDataArray.forEach((movieData, index) => {
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-item');

      const movieDetails = document.createElement('div');
      movieDetails.classList.add('movie-details');

      movieDetails.innerHTML = `
        <img class="movie-image" src="${movieData.background_image}" alt="${movieData.title}" data-seq="${movieData.seq}" onmouseover="showMoviePop(${movieData.seq});">
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

function showMoviePop(seq){
  const targetMovieData = movieDataArray.find(movieData => movieData.seq === seq);
  const moviePopup = document.getElementById('movie_popup');
  const movieImages = document.querySelectorAll('.movie-item img');

  if (!targetMovieData) {
    console.error(`No movie data found with seq: ${seq}`);
    return;
  }else{

    const movieImages = document.querySelectorAll('.movie-item img');
    movieImages.forEach(img => {
      img.style.pointerEvents = 'none';
      img.removeEventListener('mouseover', showMoviePop);
    });

    moviePopup.innerHTML = `
    <div class="popup-content">
    <div class="popup-image">
      <img src="${targetMovieData.background_image}" alt="${targetMovieData.title}">
    </div>
    <div class="popup-details">
      <h2>${targetMovieData.title}</h2>
      <p>${targetMovieData.reg_year} / ${targetMovieData.genres}</p>
      <p class="popup-summary">${targetMovieData.summary}</p>
    </div>
  </div>
    `;
    moviePopup.style.display = 'block';
  }  
};

function hideMoviePop(){
  const moviePopup = document.getElementById('movie_popup');
  moviePopup.style.display = 'none';

  const movieImages = document.querySelectorAll('.movie-item img');
  movieImages.forEach(img => {
    img.style.pointerEvents = 'auto';
    img.addEventListener('mouseover', showMoviePop(img.dataset.seq));
  });  
}

// document.querySelector('.movieContainer img').addEventListener('mouseover', function () {});
// movie_popup.addEventListener('mouseout', function () {});

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}