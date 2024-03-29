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
        <img src="${movieData.background_image}" alt="${movieData.title}" data-seq="${movieData.seq}" onclick="showMoviePop(${movieData.seq});">
        <h2>${movieData.title}</h2>
        <p>Release Year: ${movieData.reg_year}</p>
        <p>Genre: ${movieData.genres}</p>
        <p>${truncateText(movieData.summary, 100)}</p>
      `;

      movieContainer.appendChild(movieDetails);
      appElement.appendChild(movieContainer);
      movieContainer.addEventListener('mouseover', function () {highlight(this)});
      movieContainer.addEventListener('mouseout', function () {unhighlight(this)});

    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

function showMoviePop(seq){
  const targetMovieData = movieDataArray.find(movieData => movieData.seq === seq);
  const moviePopup = document.getElementById('movie_popup');

  if (!targetMovieData) {
    console.error(`No movie data found with seq: ${seq}`);
    return;
  }else{
    moviePopup.innerHTML = `
    <div class="popup-content">
    <button id="close-button" style="position: absolute; top: 0; right: 0;" onClick="document.getElementById('movie_popup').style.display = 'none';">X</button>
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
}

// div에 마우스 오버 시 튀어나오도록 하는 함수
function highlight(element) {
    element.style.transform = 'scale(1.1)';
    element.style.zIndex = '1';
}

// div에서 마우스 나가면 원래 크기와 위치로 복원하는 함수
function unhighlight(element) {
    element.style.transform = 'scale(1)';
    element.style.zIndex = '0';
}

// document.querySelector('.movieContainer img').addEventListener('mouseover', function () {});
// movie_popup.addEventListener('mouseout', function () {});

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}