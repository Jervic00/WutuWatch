/* TMDB SCRIPT */
const API_KEY = 'api_key=661b929be88e845e186868fd7d0b11f7&language=en-US';
const BASE_URL = 'https://api.themoviedb.org/3';
const discoMv_URL = BASE_URL + '/discover/movie?certification_country=US&certification.gte=G&certification.lte=PG-13&' + API_KEY;
const discoTv_URL = BASE_URL + '/discover/tv?certification_country=US&certification.gte=TV-Y&certification.lte=TV-PG&' + API_KEY;
const TopGross_URL = BASE_URL + '/discover/movie?sort_by=revenue.desc&primary_release_year=2021&' + API_KEY;
const Trending_URL = BASE_URL + '/trending/all/day?' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w300';
const MOVIE_URL = BASE_URL + '/movie/';
const TV_URL = BASE_URL + '/tv/';
const PERSON_URL = BASE_URL + '/person/';

const searchType = document.getElementById('multi-search');

/* containers of each details page */
const detail_container = document.getElementById('movie-details');
const tv_detail_container = document.getElementById('tv-details');
const person_detail_container = document.getElementById('person-details');
const casts_container = document.getElementById('movie-casts');
const tv_casts_container = document.getElementById('tv-casts');
const person_casts_container = document.getElementById('person-casts');
const related_movies = document.getElementById('related-movies');
const related_tv = document.getElementById('related-tv');
/* Get div element with id named 'main' */
const carousel_trending = document.getElementById('carousel-inner');
const main = document.getElementById('main');
const main_TopGross = document.getElementById('main-top-gross');
const main_Trending = document.getElementById('main-trending');
const movie_list = document.getElementById('movie-list');
const tv_list = document.getElementById('tv-list');
const search_result = document.getElementById('result');
const page_container = document.getElementById('page-container');
/* Get div element with id named 'searchForm' */
const form = document.getElementById('searchForm');
const search = document.getElementById('searchText');
/* trailer overlay const/s with youtube api */
const overlayBackground = document.getElementById('overlay-background');
const trailerOverlay = document.getElementById('trailer-overlay');
let player;

function loadScript() {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
   if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
      loadScript();
   }
   else{
   player = new YT.Player('trailer-video', {
      events: {
         'onReady': onPlayerReady
      }
   });
   }
}

function onPlayerReady(event) {
   var openButton = document.getElementById('open-button');
   var closeButton = document.getElementById('close-button');
   openButton.addEventListener("click", () => {
      showTrailer();
      player.playVideo();
   });
   closeButton.addEventListener("click", () => {
      closeTrailer();
      player.pauseVideo();
   });
   overlayBackground.addEventListener("click", () => {
      closeTrailer();
      player.pauseVideo();
   })
}

function showTrailer() {
   trailerOverlay.classList.add('active');
   overlayBackground.classList.add('active');
}
function closeTrailer() {
   trailerOverlay.classList.remove('active');
   overlayBackground.classList.remove('active');
}

/* TO GET MOVIE DETAILS http://api.themoviedb.org/3/movie/ID?api_key= */
const provider_region = [
   {
      "iso_3166_1":"AR",
      "english_name":"Argentina",
      "native_name":"Argentina"
   },
   {
      "iso_3166_1":"AT",
      "english_name":"Austria",
      "native_name":"Austria"
   },
   {
      "iso_3166_1":"AU",
      "english_name":"Australia",
      "native_name":"Australia"
   },
   {
      "iso_3166_1":"BE",
      "english_name":"Belgium",
      "native_name":"Belgium"
   },
   {
      "iso_3166_1":"BG",
      "english_name":"Bulgaria",
      "native_name":"Bulgaria"
   },
   {
      "iso_3166_1":"BR",
      "english_name":"Brazil",
      "native_name":"Brazil"
   },
   {
      "iso_3166_1":"CA",
      "english_name":"Canada",
      "native_name":"Canada"
   },
   {
      "iso_3166_1":"CH",
      "english_name":"Switzerland",
      "native_name":"Switzerland"
   },
   {
      "iso_3166_1":"CZ",
      "english_name":"Czech Republic",
      "native_name":"Czech Republic"
   },
   {
      "iso_3166_1":"DE",
      "english_name":"Germany",
      "native_name":"Germany"
   },
   {
      "iso_3166_1":"DK",
      "english_name":"Denmark",
      "native_name":"Denmark"
   },
   {
      "iso_3166_1":"EE",
      "english_name":"Estonia",
      "native_name":"Estonia"
   },
   {
      "iso_3166_1":"ES",
      "english_name":"Spain",
      "native_name":"Spain"
   },
   {
      "iso_3166_1":"FI",
      "english_name":"Finland",
      "native_name":"Finland"
   },
   {
      "iso_3166_1":"FR",
      "english_name":"France",
      "native_name":"France"
   },
   {
      "iso_3166_1":"GB",
      "english_name":"United Kingdom",
      "native_name":"United Kingdom"
   },
   {
      "iso_3166_1":"HK",
      "english_name":"Hong Kong",
      "native_name":"Hong Kong SAR China"
   },
   {
      "iso_3166_1":"HU",
      "english_name":"Hungary",
      "native_name":"Hungary"
   },
   {
      "iso_3166_1":"ID",
      "english_name":"Indonesia",
      "native_name":"Indonesia"
   },
   {
      "iso_3166_1":"IE",
      "english_name":"Ireland",
      "native_name":"Ireland"
   },
   {
      "iso_3166_1":"IN",
      "english_name":"India",
      "native_name":"India"
   },
   {
      "iso_3166_1":"IT",
      "english_name":"Italy",
      "native_name":"Italy"
   },
   {
      "iso_3166_1":"JP",
      "english_name":"Japan",
      "native_name":"Japan"
   },
   {
      "iso_3166_1":"KR",
      "english_name":"South Korea",
      "native_name":"South Korea"
   },
   {
      "iso_3166_1":"LT",
      "english_name":"Lithuania",
      "native_name":"Lithuania"
   },
   {
      "iso_3166_1":"MX",
      "english_name":"Mexico",
      "native_name":"Mexico"
   },
   {
      "iso_3166_1":"NL",
      "english_name":"Netherlands",
      "native_name":"Netherlands"
   },
   {
      "iso_3166_1":"NO",
      "english_name":"Norway",
      "native_name":"Norway"
   },
   {
      "iso_3166_1":"NZ",
      "english_name":"New Zealand",
      "native_name":"New Zealand"
   },
   {
      "iso_3166_1":"PH",
      "english_name":"Philippines",
      "native_name":"Philippines"
   },
   {
      "iso_3166_1":"PL",
      "english_name":"Poland",
      "native_name":"Poland"
   },
   {
      "iso_3166_1":"PT",
      "english_name":"Portugal",
      "native_name":"Portugal"
   },
   {
      "iso_3166_1":"RU",
      "english_name":"Russia",
      "native_name":"Russia"
   },
   {
      "iso_3166_1":"SE",
      "english_name":"Sweden",
      "native_name":"Sweden"
   },
   {
      "iso_3166_1":"TR",
      "english_name":"Turkey",
      "native_name":"Turkey"
   },
   {
      "iso_3166_1":"US",
      "english_name":"United States of America",
      "native_name":"United States"
   },
   {
      "iso_3166_1":"ZA",
      "english_name":"South Africa",
      "native_name":"South Africa"
   }
];
const tv_genres = [
   {
      "id":10759,
      "name":"Action & Adventure"
   },
   {
      "id":16,
      "name":"Animation"
   },
   {
      "id":35,
      "name":"Comedy"
   },
   {
      "id":80,
      "name":"Crime"
   },
   {
      "id":99,
      "name":"Documentary"
   },
   {
      "id":18,
      "name":"Drama"
   },
   {
      "id":10751,
      "name":"Family"
   },
   {
      "id":10762,
      "name":"Kids"
   },
   {
      "id":9648,
      "name":"Mystery"
   },
   {
      "id":10763,
      "name":"News"
   },
   {
      "id":10764,
      "name":"Reality"
   },
   {
      "id":10765,
      "name":"Sci-Fi & Fantasy"
   },
   {
      "id":10766,
      "name":"Soap"
   },
   {
      "id":10767,
      "name":"Talk"
   },
   {
      "id":10768,
      "name":"War & Politics"
   },
   {
      "id":37,
      "name":"Western"
   }
      ];
const genres = [
         {
            "id":28,
            "name":"Action"
         },
         {
            "id":12,
            "name":"Adventure"
         },
         {
            "id":16,
            "name":"Animation"
         },
         {
            "id":35,
            "name":"Comedy"
         },
         {
            "id":80,
            "name":"Crime"
         },
         {
            "id":99,
            "name":"Documentary"
         },
         {
            "id":18,
            "name":"Drama"
         },
         {
            "id":10751,
            "name":"Family"
         },
         {
            "id":14,
            "name":"Fantasy"
         },
         {
            "id":36,
            "name":"History"
         },
         {
            "id":27,
            "name":"Horror"
         },
         {
            "id":10402,
            "name":"Music"
         },
         {
            "id":9648,
            "name":"Mystery"
         },
         {
            "id":10749,
            "name":"Romance"
         },
         {
            "id":878,
            "name":"Science Fiction"
         },
         {
            "id":10770,
            "name":"TV Movie"
         },
         {
            "id":53,
            "name":"Thriller"
         },
         {
            "id":10752,
            "name":"War"
         },
         {
            "id":37,
            "name":"Western"
         }
      ];

      const sortDropdown = document.getElementById('sort-select');

var selectedGenre = [];
var selectedProvider = [];
   const tagsList = document.getElementById('tags');
   const genreDropdown = document.getElementById('genre-dropdown');
   const providerDropdown = document.getElementById('provider-dropdown');
   const filterBtn = document.getElementById('Filter');
   const providerTags = document.getElementById('provider-tags');
   const regionDropdown = document.getElementById('region-dropdown');
   const regionDiv = document.getElementById('region-dropdown-div');
   const selectBox = document.getElementById('year-select');
   // loop through years
   if(selectBox)
   {
      addYearList();
   }
   function addYearList(){
      var min = new Date().getFullYear() - 100,
      max = new Date().getFullYear() + 2;
      for (var i = max; i >= min; i--) {
         // create option element
         var option = document.createElement('option');
         // add value and text name
         option.value = i;
         option.innerHTML = i;
         // add the option element to the selectbox
         selectBox.appendChild(option);
      }
   }
         /* TOOLTIPS */
   /* $(function(){
      $('[data-toggle="tooltip"]').tooltip();
   }); */
   $(document).ready(function() {
      $("body").tooltip({ selector: '[data-toggle=tooltip]' });
   });
   /* TOOLTIPS END */
   if(genreDropdown)
      genreDropdown.addEventListener('click', () => {
         let child = tagsList.children;

         for( i = 0; i<tagsList.children.length; i++)
         {
            if(child[i].style.display === 'none')
            child[i].style.display = 'block';
            else
            child[i].style.display = 'none';
         }
      })
   if(providerDropdown)
      providerDropdown.addEventListener('click', () => {
         let child = providerTags.children;
         (regionDiv.style.display !== 'none') ? regionDiv.style.setProperty('display','none','important') : regionDiv.style.setProperty('display','flex','important') ;
         
         for( i = 0; i<providerTags.children.length; i++)
         {
            if(child[i].style.display === 'none')
            child[i].style.setProperty('display', 'block', 'important');
            else
            child[i].style.setProperty('display', 'none', 'important');
         }
      })

   if(tagsList){
   setGenre();
   }
   if(providerTags){
      
      setRegionProvider();
      getProvider();
   }

   if(filterBtn)
   filterBtn.addEventListener('click', () => {
   let selectedYear = selectBox.value;
   let YearString = '';
   let genreString = (selectedGenre.length !== 0) ? '&with_genres=' +encodeURI(selectedGenre.join(',')) : '';
   let providerString = (selectedProvider.length !== 0) ? '&watch_region=' + regionDropdown.value + '&with_watch_providers=' +encodeURI(selectedProvider.join('|')) : '';
   if(movie_list){
      YearString = (selectBox.selectedIndex > 0) ? '&primary_release_year=' + selectedYear :'';
      getMovies(1, discoMv_URL + '&sort_by=' + sortDropdown.value + genreString + providerString + YearString);
   }
   else if(tv_list) {
      YearString = (selectBox.selectedIndex > 0) ? '&first_air_date_year=' + selectedYear :'';
      getMovies(1, discoTv_URL + '&sort_by=' + sortDropdown.value + genreString + providerString + YearString);
      }
   });

            /* ADD GENRE BUTTONS */
   function setGenre(){
      tagsList.innerHTML = '';
      if(movie_list){
      genres.forEach(genre => {
         const tag = document.createElement('div');
         tag.classList.add('tag');
         tag.id = genre.id;
         tag.innerText = genre.name;
         tag.style.setProperty('display', 'block', 'important');
         tag.addEventListener('click', () => {
            if(selectedGenre.length == 0){
               selectedGenre.push(genre.id);
            }
            else{
               if(selectedGenre.includes(genre.id)){
                  selectedGenre.forEach((id, index) => {
                     if(id == genre.id){
                        selectedGenre.splice(index, 1);
                     }
                  })
               }
               else{
                  selectedGenre.push(genre.id);
               }
            }
            highlightTag();
         })
         tagsList.append(tag);
      }) 
      }
      else if(tv_list)
      {
      tv_genres.forEach(genre => {
         const tag = document.createElement('div');
         tag.classList.add('tag');
         tag.id = genre.id;
         tag.innerText = genre.name;
         tag.style.display = 'block';
         tag.addEventListener('click', () => {
            if(selectedGenre.length == 0){
               selectedGenre.push(genre.id);
            }
            else{
               if(selectedGenre.includes(genre.id)){
                  selectedGenre.forEach((id, index) => {
                     if(id == genre.id){
                        selectedGenre.splice(index, 1);
                     }
                  })
               }
               else{
                  selectedGenre.push(genre.id);
               }
            }
            highlightTag();
         })
         tagsList.append(tag);
      })
      }
   }/* GENRE BUTTONS END */
   
   function setProvider() {
      providerTags.innerHTML = '';
      if(movie_list || tv_list){
      Providers_PH.forEach(provider => {
         const {logo_path, provider_id, provider_name} = provider;
         const tag = document.createElement('div');
         tag.classList.add('provider-tag', 'd-flex', 'justify-content-center' ,'align-items-center');
         tag.id = provider_id;
         tag.innerHTML = `
         <a data-toggle="tooltip" data-placement="top" title="${provider_name}" >
            <img src="${'https://image.tmdb.org/t/p/original' + logo_path}" style="width:45px; border-radius: 10px;" />
         </a>
         `;
         tag.style.display = 'block';
         tag.addEventListener('click', () => {
            if(selectedProvider.length == 0){
               selectedProvider.push(provider_id);
            }
            else{
               if(selectedProvider.includes(provider_id)){
                  selectedProvider.forEach((id, index) => {
                     if(id == provider_id){
                        selectedProvider.splice(index, 1);
                     }
                  })
               }
               else{
                  selectedProvider.push(provider_id);
               }
            }
            
            providerHighlight();
         })
         providerTags.append(tag);
      })
      }
   }

   function setRegionProvider(){
      provider_region.forEach(region => {
         const {english_name, iso_3166_1} = region;
         const country_tag = document.createElement('option');
         country_tag.value = iso_3166_1;
         if(country_tag.value === "PH")
         {
            country_tag.selected = true;
         }
         country_tag.textContent = english_name;
         regionDropdown.append(country_tag);
      })
   }

   if(regionDropdown){
   regionDropdown.addEventListener('change', () => {
      getProvider();
   });
   }
   function getProvider(){
      let provider_URL = '';
      if(movie_list){
      provider_URL = BASE_URL + '/watch/providers/movie?api_key=661b929be88e845e186868fd7d0b11f7&watch_region=' + regionDropdown.value;
      }
      else if(tv_list){
      provider_URL = BASE_URL + '/watch/providers/tv?api_key=661b929be88e845e186868fd7d0b11f7&watch_region=' + regionDropdown.value;
      }
      fetch(provider_URL).then(res => res.json()).then(data => {
         showProvider(data.results);
      })
   }

   function showProvider(data){
      Providers_PH = [];
      data.forEach(provider => {
            const {logo_path,provider_id,provider_name} = provider;
            Providers_PH.push({
            'logo_path': logo_path,
            'provider_id': provider_id,
            'provider_name': provider_name
            });
         });
      setProvider();
   }

   function clearBtn(){
      let clr = document.getElementById('clear');
      if(clr)
      {
         clr.classList.add('highlight');
      }
      else{ 
      let clear = document.createElement('div');
      clear.classList.add('tag', 'highlight');
      clear.id= 'clear';
      clear.innerText = 'Clear Selection';
      clear.style.display = 'block';
      clear.addEventListener('click', () => {
         selectedGenre = [];
         setGenre();
      })
      tagsList.append(clear);
      }
   }

   function provider_clearBtn(){
      let clr = document.getElementById('clearProvider');
      if(clr)
      {
         clr.classList.add('provider-highlight', 'rounded', 'rounded-pill');
      }
      else{ 
      let clear = document.createElement('div');
      clear.classList.add('provider-highlight','rounded','rounded-pill', 'p-2');
      clear.id = 'clearProvider';
      clear.innerText = 'Clear Selection';
      clear.style.display = 'block';
      clear.addEventListener('click', () => {
         selectedProvider = [];
         setProvider();
      })
      providerTags.append(clear);
      }
   }

   function highlightTag() {
      const tags = document.querySelectorAll('.tag');
      tags.forEach(tag => {
         tag.classList.remove('highlight');
      })
      clearBtn();
      if(selectedGenre.length != 0){
         selectedGenre.forEach(id => {
            const highlightedTag = document.getElementById(id);
            highlightedTag.classList.add('highlight');
         })
      }
      else{
      document.getElementById('clear').remove()}
      
   }

   function providerHighlight() {
      const provider_tag = document.querySelectorAll('.provider-tag');
      provider_tag.forEach(ptag => {
         ptag.classList.remove('provider-highlight');
      })
      provider_clearBtn();
      if(selectedProvider.length != 0) {
         selectedProvider.forEach(id => {
            const highlightedTag = document.getElementById(id);
            highlightedTag.classList.add('provider-highlight');
         })
      }
      else{
         document.getElementById('clearProvider').remove()}
   }

/* CODE TO CALL FUNCTIONS */
getMovies(1, (movie_list || main) ? discoMv_URL : discoTv_URL);
getTopGross(TopGross_URL);
getTrending(Trending_URL);
getDetails();
getKeyword();  /* FUNCTION FOR SEARCH BOX */

function getTrending(url){
   if(main_Trending){
      fetch(url).then(res=> res.json()).then(data => {
         showTrending(data.results);
         if(carousel_trending)
         {
            carouselTrending(data.results);
         }
      })
   }
}

function carouselTrending(data) {
   var current = window.location.href;
   var lastChar = current.indexOf('/', 8);
   const movieLink = current.substr(0 , lastChar) + '/movie';
   const tvLink =  current.substr(0 , lastChar) + '/tv';
   var index=0;
   data.forEach(movie => {
      const {title, poster_path, vote_average, overview, id , name, media_type, genre_ids, release_date, first_air_date } = movie;
      const movieCard = document.createElement('div');
      let poster_image = '';
      let movie_title = '';
      let link = '';
      let genresArr = [];
      if(genre_ids.length > 0){
         if(media_type == 'movie'){
         genre_ids.forEach(id => {
            genres.forEach(genre => {
               if(id == genre.id)
               {
                  genresArr.push(genre.name);
               }
            })
         });
         }
         else if(media_type == 'tv'){
            genre_ids.forEach(id => {
               tv_genres.forEach(genre => {
                  if(id == genre.id)
                  {
                     genresArr.push(genre.name);
                  }
               })
            });
         }
      }
      if (!isNaN(Date.parse(release_date))) {
         let date = release_date.split('-');
         var formattedDate = moment(date[0]+'-'+date[1]+'-'+date[2]).format('MMMM DD, YYYY');
      } 
      else if (!isNaN(Date.parse(first_air_date))) {
         let date = first_air_date.split('-');
         var formattedDate = moment(date[0]+'-'+date[1]+'-'+date[2]).format('MMMM DD, YYYY');
      } 
      (media_type == 'tv') ? link = tvLink : link = movieLink;
      (title) ? movie_title = title: movie_title = name;
      (poster_path) ? poster_image = IMG_URL + poster_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
      if(index == 0){
      movieCard.classList.add('carousel-item', 'active');
      index++;
      }
      else{
      movieCard.classList.add('carousel-item');}
      movieCard.innerHTML =   `
      <a onclick="movieSelected(${id},'${media_type}')" class="d-flex carousel-img text-white rounded-3" href="${link + '?id=' + id + '&media_type=' + media_type}">
         <img src="${poster_image}" class="d-block mx-lg-auto rounded-10" alt="${movie_title}" loading="lazy">
      </a>`;
      carousel_trending.appendChild(movieCard);
   });
}

function showTrending(data) {
   var current = window.location.href;
   var lastChar = current.indexOf('/', 8);
   const movieLink = current.substr(0 , lastChar) + '/movie';
   const tvLink =  current.substr(0 , lastChar) + '/tv';
   data.forEach(movie => {
      const {title, poster_path, vote_average, overview, id , name, media_type, genre_ids, release_date, first_air_date } = movie;
      const movieCard = document.createElement('div');
      let poster_image = '';
      let movie_title = '';
      let link = '';
      let genresArr = [];
      if(genre_ids.length > 0){
         if(media_type == 'movie'){
         genre_ids.forEach(id => {
            genres.forEach(genre => {
               if(id == genre.id)
               {
                  genresArr.push(genre.name);
               }
            })
         });
         }
         else if(media_type == 'tv'){
            genre_ids.forEach(id => {
               tv_genres.forEach(genre => {
                  if(id == genre.id)
                  {
                     genresArr.push(genre.name);
                  }
               })
            });
         }
      }
      if (!isNaN(Date.parse(release_date))) {
         let date = release_date.split('-');
         var formattedDate = moment(date[0]+'-'+date[1]+'-'+date[2]).format('MMMM DD, YYYY');
      } 
      else if (!isNaN(Date.parse(first_air_date))) {
         let date = first_air_date.split('-');
         var formattedDate = moment(date[0]+'-'+date[1]+'-'+date[2]).format('MMMM DD, YYYY');
      } 
      (media_type == 'tv') ? link = tvLink : link = movieLink;
      (title) ? movie_title = title: movie_title = name;
      (poster_path) ? poster_image = IMG_URL + poster_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';

      movieCard.classList.add('col-md','my-2', 'd-flex', 'justify-content-center');
      movieCard.innerHTML = `
      <div class="card bg-custom-1 text-white card-size mx-2">
         <img src="${poster_image}" class="card-img-top img-fluid align-poster-img" alt="${movie_title}">
         <div class="card-body ">
            <div class="mb-2 mt-2 d-flex flex-column justify-content-evenly">
               <div class="d-flex justify-content-between align-items-center">
                  <p class="card-title text-truncate mt-1">${movie_title}</p>
                  <span class="card-text ${getColor(vote_average)} fw-bolder bg-overlay-1 rating">${vote_average}</span>
               </div>
               <small class="card-title text-truncate">${formattedDate}</small>            
            </div>
            <a onclick="movieSelected(${id},'${media_type}')" class="d-flex overview-text text-white rounded-3" href="${link + '?id=' + id + '&media_type=' + media_type}">
               <div class=" overview-div">
               <div class="py-3 px-2 d-flex flex-column text-center bg-custom-1">
               <strong>${movie_title}</strong>
               <small>${genresArr.join(', ')}</small>
               </div>
                  <div class="p-1"><p class="">${overview}</p></div>
                  <div class="more-details p-2"><span>More Details <i class="fas fa-chevron-down"></i></span></div>
               </div>
            </a>
         </div>
      </div>
      `;
      main_Trending.appendChild(movieCard);
   });
}

function getTopGross(url){
   if(main_TopGross){
      fetch(url).then(res => res.json()).then(data => {
         showTopGross(data.results);
      })
   }
}

function showTopGross(data) {
      var current = window.location.href;
      var lastChar = current.indexOf('/', 8);
      const movieLink = current.substr(0 , lastChar) + '/movie';
      data.forEach(movie => {
         const {title, poster_path, vote_average, overview, id, genre_ids, release_date} = movie;
         const movieCard = document.createElement('div');
         let poster_image = '';
         let genresArr = [];
         if(genre_ids.length > 0){
            genre_ids.forEach(id => {
               genres.forEach(genre => {
                  if(id == genre.id)
                  {
                     genresArr.push(genre.name);
                  }
               })
            });
         }
         if (!isNaN(Date.parse(release_date))) {
            let date = release_date.split('-');
            var formattedDate = moment(date[0]+'-'+date[1]+'-'+date[2]).format('MMMM DD, YYYY');
         } 
         (poster_path) ? poster_image = IMG_URL + poster_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
         movieCard.classList.add('col-md','my-2', 'd-flex', 'justify-content-center');
         movieCard.innerHTML = `
            <div class="card bg-custom-1 text-white card-size mx-2">
            <img src="${poster_image}" class="card-img-top img-fluid align-poster-img" alt="${title}">
            <div class="card-body ">
               <div class="mb-2 mt-2 d-flex flex-column justify-content-evenly">
                  <div class="d-flex justify-content-between align-items-center">
                     <p class="card-title text-truncate mt-1">${title}</p>
                     <span class="card-text ${getColor(vote_average)} fw-bolder bg-overlay-1 rating">${vote_average}</span>
                  </div>
                  <small class="card-title text-truncate">${formattedDate}</small>
               </div>
               <a onclick="movieSelected(${id},'movie')" class="d-flex overview-text text-white rounded-3" href="${movieLink + '?id=' + id + '&media_type=movie'}">
                  <div class=" overview-div">
                     <div class="py-3 px-2 d-flex flex-column text-center bg-custom-1">
                        <strong>${title}</strong>
                        <small>${genresArr.join(', ')}</small>
                     </div>
                     <div class="p-1"><p class="">${overview}</p></div>
                     <div class="more-details p-2"><span>More Details <i class="fas fa-chevron-down"></i></span></div>
                  </div>
               </a>
            </div>
            </div>
         `;
         main_TopGross.appendChild(movieCard);
      });
}

/* SHOW RECOMMENDED MOVIES TO HOMEPAGE */
function getMovies(currentPage, url) {
   var maxPage = '';
   if(main){
      fetch(url).then(res=> res.json()).then(data => {
         showMovies(data.results);
      })
   }
   else if(movie_list){
      url += '&page=' + currentPage;
      fetch(url).then(res=> res.json()).then(data => {
         if(data.total_pages != 0){
            (data.total_pages > 500) ? maxPage = 500 : maxPage = data.total_pages;
            showMovies(data.results, url, maxPage, data.page);}
         else{
         movie_list.innerHTML = `<h1 class=" bolder text-center">No Results Found</h1>`;
            page_container.innerHTML = '';
         }
      })
   }
   else if(tv_list){
      url += '&page=' + currentPage;
      fetch(url).then(res=> res.json()).then(data => {
         if(data.total_pages != 0){
            (data.total_pages > 500) ? maxPage = 500 : maxPage = data.total_pages;
         showMovies(data.results, url, maxPage, data.page);}
         else{
         tv_list.innerHTML = `<h1 class=" bolder text-center">No Results Found</h1>`;
            page_container.innerHTML = '';
         }
      })
   }
}

function showMovies(data,url,maxPage,currentPage) {
      if(page_container){
      page_container.innerHTML = '';}
      if(movie_list){
      movie_list.innerHTML = '';}
      else if(tv_list){
      tv_list.innerHTML = '';}
      var current = window.location.href;
      var lastChar = current.indexOf('/', 8);
      const movieLink = current.substr(0 , lastChar) + '/movie';
      const tvLink = current.substr(0 , lastChar) + '/tv';
      if(movie_list || main){
      data.forEach(movie => {
         const {title, poster_path, vote_average, overview, id, genre_ids, release_date} = movie;
         const movieCard = document.createElement('div');
         let poster_image = '';
         let genresArr = [];
         if(genre_ids.length > 0){
         genre_ids.forEach(id => {
            genres.forEach(genre => {
               if(id == genre.id)
               {
                  genresArr.push(genre.name);
               }
            })
         });
         }
         if (!isNaN(Date.parse(release_date))) {
            let date = release_date.split('-');
            var formattedDate = moment(date[0]+'-'+date[1]+'-'+date[2]).format('MMMM DD, YYYY');
         }   
         (poster_path) ? poster_image = IMG_URL + poster_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
         movieCard.classList.add('col-md','my-2', 'd-flex', 'justify-content-center');
         movieCard.innerHTML = `
         <div class="card bg-custom-1 text-white card-size mx-2">
         <img src="${poster_image}" class="card-img-top img-fluid align-poster-img" alt="${title}">
         <div class="card-body ">
            <div class="mb-2 mt-2 d-flex flex-column justify-content-evenly">
               <div class="d-flex justify-content-between align-items-center">
                  <p class="card-title text-truncate">${title}</p>
                  <span class="card-text ${getColor(vote_average)} fw-bolder bg-overlay-1 rating">${vote_average}</span>
               </div>
               <small class="card-title text-truncate">${formattedDate}</small>
            </div>
            <a onclick="movieSelected(${id},'movie')" class="d-flex overview-text text-white rounded-3" href="${movieLink + '?id=' + id + '&media_type=movie'}">
               <div class=" overview-div">
                  <div class="py-3 px-2 d-flex flex-column text-center bg-custom-1">
                  <strong>${title}</strong>
                  <small>${genresArr.join(', ')}</small>
                  </div>
                  <div class="p-1"><p class="">${overview}</p></div>
                  <div class="more-details p-2"><span>More Details <i class="fas fa-chevron-down"></i></span></div>
               </div>
            </a>
         </div>
         </div>
         `;
         if(main){
         main.appendChild(movieCard);}
         else if(movie_list){
         movie_list.appendChild(movieCard);}
      });
      }
      else if(tv_list){
         data.forEach(movie => {
            const {name, poster_path, vote_average, overview, id, genre_ids, first_air_date } = movie;
            const movieCard = document.createElement('div');
            let poster_image = '';
            let genresArr = [];
            if(genre_ids.length > 0){
            genre_ids.forEach(id => {
               tv_genres.forEach(genre => {
                  if(id == genre.id)
                  {
                     genresArr.push(genre.name);
                  }
               })
            });
            }
            if (!isNaN(Date.parse(first_air_date))) {
               let date = first_air_date.split('-');
               var formattedDate = moment(date[0]+'-'+date[1]+'-'+date[2]).format('MMMM DD, YYYY');
            }   
            var rounded_rating = Math.round(vote_average * 10) / 10;
            (poster_path) ? poster_image = IMG_URL + poster_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
            movieCard.classList.add('col-md','my-2', 'd-flex', 'justify-content-center');
            movieCard.innerHTML = `
            <div class="card bg-custom-1 text-white card-size mx-2">
            <img src="${poster_image}" class="card-img-top img-fluid align-poster-img" alt="${name}">
            <div class="card-body ">
            <div class="mb-2 mt-2 d-flex flex-column justify-content-evenly">
               <div class="d-flex justify-content-between align-items-center">
                  <p class="card-title text-truncate">${name}</p>
                  <span class="card-text ${getColor(vote_average)} fw-bolder bg-overlay-1 rating">${rounded_rating}</span>
               </div>
               <small class="card-title text-truncate">${formattedDate}</small>
               </div>

               <a class="d-flex overview-text text-white rounded-3" href="${tvLink + '?id=' + id + '&media_type=tv'}">
                  <div class=" overview-div">
                     <div class="py-3 px-2 d-flex flex-column text-center bg-custom-1">
                        <strong>${name}</strong>
                        <small>${genresArr.join(', ')}</small>
                     </div>
                     <div class="p-1"><p class="">${overview}</p></div>
                     <div class="more-details p-2"><span>More Details <i class="fas fa-chevron-down"></i></span></div>
                  </div>
               </a>
            </div>
            </div>
            `;
            tv_list.appendChild(movieCard);
            });
      }


      for(let i = 1; i<=maxPage;i++){
         const page_button = document.createElement('button');
         page_button.classList.add('btn', 'bg-custom-1', 'p-2');
         page_button.textContent = i;
         
         if(i == maxPage && i != currentPage)
         {
            if(currentPage < maxPage && maxPage>10)
            page_button.textContent = 'Last';
            page_button.onclick = function () {getMovies(i,url)};  
            page_container.appendChild(page_button);
         }
         if(i == 1 && i != currentPage)
         {
            if(currentPage>i+5)
            page_button.textContent = 'First';
            page_button.onclick = function () {getMovies(i,url)};  
            page_container.appendChild(page_button);
         }
         else if(i == currentPage)
         {
            page_button.classList.remove('bg-custom-1');
            page_button.classList.add('active');
            page_container.appendChild(page_button);
         }
         else
         {
            if(i <= currentPage + 3 && i >= currentPage-3){
            page_button.onclick = function () {getMovies(i,url)};  
            page_container.appendChild(page_button);
            }
         }
      }
}
/* END OF SHOWING RECOMMENDED MOVIES TO HOMEPAGE */

/*  SHOW DETAILS FROM MOVIE SELECTED  */
function movieSelected(id,media_type) {
   
   if(media_type == 'tv'){
      sessionStorage.setItem('tvId', id);
   }
   else if(media_type == 'person'){
      sessionStorage.setItem('personId', id);
   }
   else{
      sessionStorage.setItem('movieId', id);
   }
   sessionStorage.setItem('movieType', media_type);
   return false;
}

function getDetails() {
   var movieId, tvId, personId = '';
   var queryArr = window.location.href.split('=');
   if(detail_container || tv_detail_container || person_detail_container){
   var movId = queryArr[1].slice(0, queryArr[1].indexOf('&'));
   var movieType = queryArr[queryArr.length-1];
   (movieType === 'tv' || movieType === 'movie' || movieType === 'person') ? '' : movieType = queryArr[2].slice(0,queryArr[2].indexOf('&'));
   }
   
   if(movieType == 'movie')
   {
      movieId = movId;
   }
   else if(movieType == 'tv')
   {
      tvId = movId;
   }
   else if(movieType == 'person')
   {
      personId = movId;
   }
   let url = '';
   if(detail_container){
      url = MOVIE_URL + movieId + '?' + API_KEY;
      fetch(url).then(res=> res.json()).then(data => {
         showDetails(data); 
         getCredits();
         getRelatedMovies();
      });
   }
   else if (tv_detail_container)
   {
         url = TV_URL + tvId + '?' + API_KEY;                                                    
         fetch(url).then(res=> res.json()).then(data => {
            showDetails(data);
            console.log(data.success);
            getCredits();
            getRelatedMovies();
         });
   }
   else if (person_detail_container){
      url = PERSON_URL + personId + '?' + API_KEY;                                                    
         fetch(url).then(res=> res.json()).then(data => {
            showDetails(data);
            getCredits();
         });
   }
}

function showDetails(data) {
try{
      if(detail_container){
      const {original_title, title, poster_path, vote_average, overview, genres, status, tagline, release_date, budget, revenue, original_language, homepage } = data;
      document.title = title + ' | WutuWatch';
      const movieDetails = document.createElement('div');
      let poster_image = '';
      let homep = '';
      if (!isNaN(Date.parse(release_date))) {
         let date = release_date.split('-');
         var formattedDate = moment(date[0]+'-'+date[1]+'-'+date[2]).format('MMMM DD, YYYY');
      }   
      if(homepage){
      homep = `<a class="ms-3 mb-3 btn btn-info" href="${homepage}" target="_blank">Visit Homepage</a>`;}
      const genresArr = [];
      genres.forEach((genre) => {
         if (genre.name) {
            genresArr.push(genre.name);
         }
         });
      (poster_path) ? poster_image = IMG_URL + poster_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
      movieDetails.classList.add('row', 'movie-details');
      movieDetails.innerHTML = `
         <div class="col-md-4">
            <img src="${poster_image}" class="img-fluid w-100 rounded" alt="${original_title}">
         </div>
         <div class="col-md-8">
            <h3>${(original_title != title) ? original_title + ' (' + title + ')': original_title}</h3>
            <p class="custom-color-5 fst-italic">${tagline}</p>
            <p>${overview}</p>
            <div class="d-flex align-items-between">
               <div id="trailer-button">${getTrailer()}</div>
               ${homep}
            </div>
               <ul class="list-group shadow">
                  <li class="list-group-item list-group-item-dark"><strong>Genre:</strong> ${genresArr.join(',')}</li>
                  <li class="list-group-item list-group-item-dark"><strong>Released:</strong> ${formattedDate}</li>
                  <li class="list-group-item list-group-item-dark"><strong>Status:</strong> ${status}</li>
                  <li class="list-group-item list-group-item-dark"><strong>Budget:</strong> $${thousands_separators(budget)}</li>
                  <li class="list-group-item list-group-item-dark"><strong>Revenue:</strong> $${thousands_separators(revenue)}</li>
                  <li class="list-group-item list-group-item-dark"><strong>TMDB Rating:</strong> ${vote_average}</li>
                  <li class="list-group-item list-group-item-dark"><strong>Original Language:</strong> ${original_language.toUpperCase()}</li>
               </ul>
         </div>
            `;
      detail_container.appendChild(movieDetails);
      }
      else if(tv_detail_container){
      const {name, original_name, poster_path, vote_average, overview, genres, status, tagline, first_air_date, 
            last_air_date, number_of_seasons, number_of_episodes, original_language, homepage } = data;
            document.title = name + ' | WutuWatch';
      const movieDetails = document.createElement('div');
      let poster_image = '';
      let homep = '';
      if (!isNaN(Date.parse(first_air_date))) {
         let date = first_air_date.split('-');
         var formattedDate = moment(date[0]+'-'+date[1]+'-'+date[2]).format('MMMM DD, YYYY');
         if(!isNaN(Date.parse(last_air_date))){
            let date = last_air_date.split('-');
            var formattedDate1 = moment(date[0]+'-'+date[1]+'-'+date[2]).format('MMMM DD, YYYY');
         }
      }   
      if(homepage){
      homep = `<a class="ms-3 mb-3 btn btn-info" href="${homepage}" target="_blank">Visit Homepage</a>`;}
      const genresArr = [];
      genres.forEach((genre) => {
         if (genre.name) {
            genresArr.push(genre.name);
         }
         });
      (poster_path) ? poster_image = IMG_URL + poster_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
      movieDetails.classList.add('row', 'movie-details');
      movieDetails.innerHTML = `
         <div class="col-md-4">
            <img src="${poster_image}" class="img-fluid w-100 rounded" alt="${name}">
         </div>
         <div class="col-md-8">
            <h3>${(original_name != name) ? original_name + ' (' + name + ')': original_name}</h3>
            <p class="custom-color-5 fst-italic">${tagline}</p>
            <p>${overview}</p>
            <div class="d-flex align-items-center">
            <div id="trailer-button">${getTrailer()}</div>
            ${homep}
            </div>
               <ul class="list-group shadow">
                  <li class="list-group-item list-group-item-dark"><strong>Genre:</strong> ${genresArr.join(',')}</li>
                  <li class="list-group-item list-group-item-dark"><strong>First Air:</strong> ${formattedDate}</li>
                  <li class="list-group-item list-group-item-dark"><strong>Last Air:</strong> ${formattedDate1}</li>
                  <li class="list-group-item list-group-item-dark"><strong>Number of Episode(s):</strong> ${number_of_episodes}</li>
                  <li class="list-group-item list-group-item-dark"><strong>Number of Season(s):</strong> ${number_of_seasons}</li>
                  <li class="list-group-item list-group-item-dark"><strong>Status:</strong> ${status}</li>
                  <li class="list-group-item list-group-item-dark"><strong>TMDB Rating:</strong> ${vote_average}</li>
                  <li class="list-group-item list-group-item-dark"><strong>Original Language:</strong> ${original_language.toUpperCase()}</li>
               </ul>
               
         </div>
            `;
      tv_detail_container.appendChild(movieDetails);
      }
      else if(person_detail_container){
         
         const {name, also_known_as, birthday, deathday, gender, place_of_birth, profile_path, known_for_department, biography } = data;
         document.title = name + ' | WutuWatch';
      const movieDetails = document.createElement('div');
      let aka = '';
      let ginger = 'Undecided';
      let age = '';
      let dage = '';
      var dth = '';
      if(birthday != undefined) {
      let birthdate = birthday.split('-');
      var formattedBirthday = moment(birthdate[0]+'-'+birthdate[1]+'-'+birthdate[2]).format('MMMM DD, YYYY');
      const ageDiffM = Date.now() - new Date(birthday).getTime();
      const ageDate = new Date(ageDiffM);
      if(deathday == undefined)
      age = " (" + Math.abs(ageDate.getUTCFullYear() - 1970) + " years old)";
      }

      if(deathday != undefined)
      {  const ageDiffM = new Date(deathday).getTime() - new Date(birthday).getTime();
         const ageDate = new Date(ageDiffM);
         let deathdate = deathday.split('-');
         var formattedDeathday = moment(deathdate[0]+'-'+deathdate[1]+'-'+deathdate[2]).format('MMMM DD, YYYY');
         dage = " (" + Math.abs(ageDate.getUTCFullYear() - 1970) + " years old)";
         dth = '<li class="list-group-item list-group-item-dark"><strong>Died:</strong> ' + formattedDeathday + dage + '</li>'
      }

      (gender == 1) ? ginger = 'Female' : ginger = 'Male';
      if (also_known_as.length > 0) aka = 'Also known as "' + also_known_as[0] + '"';
      let poster_image = '';
      (profile_path) ? poster_image = IMG_URL + profile_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
      movieDetails.classList.add('row', 'movie-details');
      movieDetails.innerHTML = `
         <div class="col-md-4">
            <img src="${poster_image}" class="img-fluid w-100 rounded" alt="${name}">
         </div>
         <div class="col-md-8">
            <h3>${name}</h3>
            <p class="custom-color-5 fst-italic">${aka}</p>
            <ul class="list-group shadow mb-3">
                  <li class="list-group-item list-group-item-dark"><strong>Birthday:</strong> ${formattedBirthday + age }</li>
                  ${dth}
                  <li class="list-group-item list-group-item-dark"><strong>Gender:</strong> ${ginger}</li>
                  <li class="list-group-item list-group-item-dark"><strong>Place of Birth::</strong> ${place_of_birth}</li>
                  <li class="list-group-item list-group-item-dark"><strong>Known For:</strong> ${known_for_department}</li>
               </ul>
            <p>${biography}</p>
         </div>
            `;
      person_detail_container.appendChild(movieDetails);
      }
   }
   catch(exception){
      window.location.href = '/';
   }
   /* if data */
}

function getRelatedMovies()
{  var movieId, tvId = '';
   var queryArr = window.location.href.split('=');
   if(detail_container || tv_detail_container || person_detail_container){
   var movId = queryArr[1].slice(0, queryArr[1].indexOf('&'));}
   var movieType = queryArr[queryArr.length-1];
   (movieType === 'tv' || movieType === 'movie' || movieType === 'person') ? '' : movieType = queryArr[2].slice(0,queryArr[2].indexOf('&'));
   if(movieType == 'movie')
   {
      movieId = movId;
   }
   else if(movieType == 'tv')
   {
      tvId = movId;
   }

   let url = '';
   if(related_movies){
      url = MOVIE_URL + movieId + '/recommendations?' + API_KEY;
      fetch(url).then(res=> res.json()).then(data => {
         showRelatedMovies(data.results, data.total_results);
      })
   }
   else if(related_tv){
      url = TV_URL + tvId + '/recommendations?' + API_KEY;
         fetch(url).then(res=> res.json()).then(data => {
         showRelatedMovies(data.results, data.total_results);
      })
   }
}

function showRelatedMovies(data, total_results)
{     
      var current = window.location.href;
      var lastChar = current.indexOf('/', 8);
      const movieLink = current.substr(0 , lastChar) + '/movie';
      const tvLink = current.substr(0 , lastChar) + '/tv';
      if(total_results >= 0 && total_results <=10)
      {
         /* GET SIMILAR TVSHOWS/MOVIES INSTEAD */
         getSimilar();
      }
      else{
      if(related_movies){
         data.forEach(movie => {
         const {title, poster_path, vote_average, overview, id, media_type, genre_ids, release_date } = movie;
         const movieCard = document.createElement('div');
         let poster_image = '';
         let genresArr = [];
         if(genre_ids.length >0){
            genre_ids.forEach(id => {
               genres.forEach(genre => {
                  if(id == genre.id)
                  {
                     genresArr.push(genre.name);
                  }
               })
            });
         }
         var rounded_rating = Math.round(vote_average * 10) / 10;
         if (!isNaN(Date.parse(release_date))) {
            let date = release_date.split('-');
            var formattedDate = moment(date[0]+'-'+date[1]+'-'+date[2]).format('MMMM DD, YYYY');
         }   
         (poster_path) ? poster_image = IMG_URL + poster_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
         movieCard.classList.add('col-md','my-2', 'd-flex', 'justify-content-center');
         movieCard.innerHTML = `
         <div class="card bg-custom-1 text-white card-size mx-2">
         <img src="${poster_image}" class="card-img-top img-fluid align-poster-img" alt="${title}">
         <div class="card-body ">
            <div class="mb-2 mt-2 d-flex flex-column justify-content-evenly">
               <div class="d-flex justify-content-between align-items-center">
                  <p class="card-title text-truncate">${title}</p>
                  <span class="card-text ${getColor(vote_average)} fw-bolder bg-overlay-1 rating">${rounded_rating}</span>
               </div>
               <small class="card-title text-truncate">${formattedDate}</small>
            </div>
            <a onclick="movieSelected(${id},'${media_type}')" class="d-flex overview-text text-white rounded-3" href="${movieLink + '?id=' + id + '&media_type=' + media_type}">
               <div class=" overview-div">
                  <div class="py-3 px-2 d-flex flex-column text-center bg-custom-1">
                     <strong>${title}</strong>
                     <small>${genresArr.join(', ')}</small>
                  </div>
                  <div class="p-1"><p class="">${overview}</p></div>
                  <div class="more-details p-2"><span>More Details <i class="fas fa-chevron-down"></i></span></div>
               </div>
            </a>
         </div>
         </div>
         `;
         related_movies.appendChild(movieCard);
         });
      }
      else if(related_tv){
         data.forEach(movie => {
         const {name, poster_path, vote_average, overview, id, genre_ids, first_air_date} = movie;
         const movieCard = document.createElement('div');
         let poster_image = '';
         let genresArr = [];
         if(genre_ids.length >0){
            genre_ids.forEach(id => {
               tv_genres.forEach(genre => {
                  if(id == genre.id)
                  {
                     genresArr.push(genre.name);
                  }
               })
            });
         }
         var rounded_rating = Math.round(vote_average * 10) / 10;
         if (!isNaN(Date.parse(first_air_date))) {
            let date = first_air_date.split('-');
            var formattedDate = moment(date[0]+'-'+date[1]+'-'+date[2]).format('MMMM DD, YYYY');
         }  
         (poster_path) ? poster_image = IMG_URL + poster_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
         movieCard.classList.add('col-md','my-2', 'd-flex', 'justify-content-center');
         movieCard.innerHTML = `
         <div class="card bg-custom-1 text-white card-size mx-2">
         <img src="${poster_image}" class="card-img-top img-fluid align-poster-img" alt="${name}">
         <div class="card-body ">
            <div class="mb-2 mt-2 d-flex flex-column justify-content-evenly">
               <div class="d-flex justify-content-between align-items-center">
                  <p class="card-title text-truncate">${name}</p>
                  <span class="card-text ${getColor(vote_average)} fw-bolder bg-overlay-1 rating">${rounded_rating}</span>
               </div>
               <small class="card-title text-truncate">${formattedDate}</small>
            </div>
            <a onclick="movieSelected(${id},'tv')" class="d-flex overview-text text-white rounded-3" href="${tvLink + '?id=' + id + '&media_type=tv'}">
               <div class=" overview-div">
                  <div class="py-3 px-2 d-flex flex-column text-center bg-custom-1">
                     <strong>${name}</strong>
                     <small>${genresArr.join(', ')}</small>
                  </div>
                  <div class="p-1"><p class="">${overview}</p></div>
                  <div class="more-details p-2"><span>More Details <i class="fas fa-chevron-down"></i></span></div>
               </div>
            </a>
         </div>
         </div>
         `;
         related_tv.appendChild(movieCard);
         });
      }
      }
}

function getSimilar() {
   var movieId, tvId = '';
   var queryArr = window.location.href.split('=');
   if(detail_container || tv_detail_container || person_detail_container){
   var movId = queryArr[1].slice(0, queryArr[1].indexOf('&'));}
   var movieType = queryArr[queryArr.length-1];
   (movieType === 'tv' || movieType === 'movie' || movieType === 'person') ? '' : movieType = queryArr[2].slice(0,queryArr[2].indexOf('&'));

   if(movieType == 'movie')
   {
      movieId = movId;
   }
   else if(movieType == 'tv')
   {
      tvId = movId;
   }
   let url = '';
   if(related_movies){
      url = MOVIE_URL + movieId + '/similar?' + API_KEY;
   }
   else if (related_tv){
      url = TV_URL + tvId + '/similar?' + API_KEY;
   }
   fetch(url).then(res=> res.json()).then(data => {
      showSimilar(data.results);
   });
}

function showSimilar(data){
      var current = window.location.href;
      var lastChar = current.indexOf('/', 8);
      const movieLink = current.substr(0 , lastChar) + '/movie';
      const tvLink = current.substr(0 , lastChar) + '/tv';
   if(related_movies){
      data.forEach(movie => {
         const {title, poster_path, vote_average, overview, id, media_type,genre_ids, release_date } = movie;
         const movieCard = document.createElement('div');
         let poster_image = '';
         var rounded_rating = Math.round(vote_average * 10) / 10;
         (poster_path) ? poster_image = IMG_URL + poster_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
         let genresArr = [];
         if(genre_ids.length >0){
            genre_ids.forEach(id => {
               genres.forEach(genre => {
                  if(id == genre.id)
                  {
                     genresArr.push(genre.name);
                  }
               })
            });
         }

         if (!isNaN(Date.parse(release_date))) {
            let date = release_date.split('-');
            var formattedDate = moment(date[0]+'-'+date[1]+'-'+date[2]).format('MMMM DD, YYYY');
         }   

         movieCard.classList.add('col-md','my-2', 'd-flex', 'justify-content-center');
         movieCard.innerHTML = `
         <div class="card bg-custom-1 text-white card-size mx-2">
         <img src="${poster_image}" class="card-img-top img-fluid align-poster-img" alt="${title}">
         <div class="card-body ">
            <div class="mb-2 mt-2 d-flex flex-column justify-content-evenly">
               <div class="d-flex justify-content-between align-items-center">
                  <p class="card-title text-truncate">${title}</p>
                  <span class="card-text ${getColor(vote_average)} fw-bolder bg-overlay-1 rating">${rounded_rating}</span>
               </div>
               <small class="card-title text-truncate">${formattedDate}</small>
            </div>
            <a onclick="movieSelected(${id},'movie')" class="d-flex overview-text text-white rounded-3" href="${movieLink + '?id=' + id + '&media_type=movie'}">
               <div class=" overview-div">
                  <div class="py-3 px-2 d-flex flex-column text-center bg-custom-1">
                     <strong>${title}</strong>
                     <small>${genresArr.join(', ')}</small>
                  </div>
                  <div class="p-1"><p class="">${overview}</p></div>
                  <div class="more-details p-2"><span>More Details <i class="fas fa-chevron-down"></i></span></div>
               </div>
            </a>
         </div>
         </div>
         `;
         related_movies.appendChild(movieCard);
         });
   }
   else if(related_tv){
      data.forEach(movie => {
         const {name, poster_path, vote_average, overview, id, genre_ids, first_air_date} = movie;
         const movieCard = document.createElement('div');
         let poster_image = '';
         var rounded_rating = Math.round(vote_average * 10) / 10;
         (poster_path) ? poster_image = IMG_URL + poster_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
         let genresArr = [];
         if(genre_ids.length >0){
            genre_ids.forEach(id => {
               tv_genres.forEach(genre => {
                  if(id == genre.id)
                  {
                     genresArr.push(genre.name);
                  }
               })
            });
         }

         if (!isNaN(Date.parse(first_air_date))) {
            let date = first_air_date.split('-');
            var formattedDate = moment(date[0]+'-'+date[1]+'-'+date[2]).format('MMMM DD, YYYY');
         } 
         movieCard.classList.add('col-md','my-2', 'd-flex', 'justify-content-center');
         movieCard.innerHTML = `
         <div class="card bg-custom-1 text-white card-size mx-2">
         <img src="${poster_image}" class="card-img-top img-fluid align-poster-img" alt="${name}">
         <div class="card-body ">
            <div class="mb-2 mt-2 d-flex flex-column justify-content-evenly">
               <div class="d-flex justify-content-between align-items-center">
                  <p class="card-title text-truncate">${name}</p>
                  <span class="card-text ${getColor(vote_average)} fw-bolder bg-overlay-1 rating">${rounded_rating}</span>
               </div>
                  <small class="card-title text-truncate">${formattedDate}</small>
            </div>
            <a onclick="movieSelected(${id},'tv')" class="d-flex overview-text text-white rounded-3" href="${tvLink + '?id=' + id + '&media_type=tv'}">
               <div class=" overview-div">
               <div class="py-3 px-2 d-flex flex-column text-center bg-custom-1">
                  <strong>${name}</strong>
                  <small>${genresArr.join(', ')}</small>
               </div>
                  <div class="p-1 bg-overlay-1"><p class="">${overview}</p></div>
                  <div class="more-details p-2"><span>More Details <i class="fas fa-chevron-down"></i></span></div>
               </div>
            </a>
         </div>
         </div>
         `;
         related_tv.appendChild(movieCard);
         });
   }
}

/* END OF SHOWING DETAILS MOVIE SELECTED */
function thousands_separators(num)
   {
      var num_parts = num.toString().split(".");
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return num_parts.join(".");
   }

   /* GETTING TRAILER FROM MOVIE SELECTED */
function getTrailer(){
   var movieId, tvId = '';
   var queryArr = window.location.href.split('=');
   if(detail_container || tv_detail_container || person_detail_container){
      var movId = queryArr[1].slice(0, queryArr[1].indexOf('&'));}
      var movieType = queryArr[queryArr.length-1];
      (movieType === 'tv' || movieType === 'movie' || movieType === 'person') ? '' : movieType = queryArr[2].slice(0,queryArr[2].indexOf('&'));
   
   if(movieType == 'movie'){
      movieId = movId;
   }
   else if(movieType == 'tv'){
      tvId = movId;
   }

   let url = '';
   if(detail_container){
      url = MOVIE_URL + movieId + '/videos?' + API_KEY;
      fetch(url).then(res=> res.json()).then(data => {
         loadScript();
         findTrailer(data.results);
      })
   }
   else if(tv_detail_container){
      url = TV_URL + tvId + '/videos?' + API_KEY;
      fetch(url).then(res=> res.json()).then(data => {
         loadScript();
         findTrailer(data.results);  
      })
   }
   return '';
}

function findTrailer(data) {

   if(detail_container){
      data.every((video) => {
         const {site, type,  key} = video;
         let trailer = 0;
         if(trailer == 0){
            if(site == "YouTube" && type == "Trailer")
            {  
               document.getElementById('trailer-video').src = `https://www.youtube-nocookie.com/embed/${key}?enablejsapi=1&html5=1&showinfo=0&rel=0&cc_load_policy=1&autoplay=0`;
               document.getElementById('trailer-button').innerHTML = `<button class="btn btn-dark mb-3 " id="open-button"><i class="fas fa-play"></i> Play Trailer</button>`;
               trailer++;
            }
            else if (site == "YouTube" && type == "Teaser")
            {
               document.getElementById('trailer-video').src = `https://www.youtube-nocookie.com/embed/${key}?enablejsapi=1&html5=1&showinfo=0&rel=0&cc_load_policy=1&autoplay=0`;
               document.getElementById('trailer-button').innerHTML = `<button class="btn btn-dark mb-3 " id="open-button"><i class="fas fa-play"></i> Play Trailer</button>`;
               return true;
            }
            else{
               return true;
            }
         }
      })
   }
   else if(tv_detail_container){
      data.every((video) => {
         const {site, type,  key} = video;
         let trailer = 0;
         if(trailer == 0){
            if(site == "YouTube" && type == "Trailer")
            {  
               document.getElementById('trailer-video').src = `https://www.youtube-nocookie.com/embed/${key}?enablejsapi=1&html5=1&showinfo=0&rel=0&cc_load_policy=1&autoplay=0`;
               document.getElementById('trailer-button').innerHTML = `<button class="btn btn-dark mb-3 " id="open-button"><i class="fas fa-play"></i> Play Trailer</button>`;
               trailer++;
            }
            else if (site == "YouTube" && type == "Teaser")
            {
               document.getElementById('trailer-video').src = `https://www.youtube-nocookie.com/embed/${key}?enablejsapi=1&html5=1&showinfo=0&rel=0&cc_load_policy=1&autoplay=0`;
               document.getElementById('trailer-button').innerHTML = `<button class="btn btn-dark mb-3 " id="open-button"><i class="fas fa-play"></i> Play Trailer</button>`;
               return true;
            }
            else{
               return true;
            }
         }
      })
   }
}

   /* GETTING TRAILER FROM MOVIE SELECTED END */

/* GETTING CREDITS FROM MOVIE SELECTED */
function getCredits(){
   var movieId, tvId, personId = '';
   var queryArr = window.location.href.split('=');
   if(detail_container || tv_detail_container || person_detail_container){
      var movId = queryArr[1].slice(0, queryArr[1].indexOf('&'));}
      var movieType = queryArr[queryArr.length-1];
      (movieType === 'tv' || movieType === 'movie' || movieType === 'person') ? '' : movieType = queryArr[2].slice(0,queryArr[2].indexOf('&'));
   
   if(movieType == 'movie')
   {
      movieId = movId;
   }
   else if(movieType == 'tv')
   {
      tvId = movId;
   }
   else if(movieType == 'person')
   {
      personId = movId;
   }
   let url = '';
   
   if(casts_container){
      url = MOVIE_URL + movieId + '/credits?' + API_KEY;
   fetch(url).then(res=> res.json()).then(data => {
      showCredits(data.crew, data.cast); 
   })
   }
   else if(tv_casts_container){
      url = TV_URL + tvId + '/credits?' + API_KEY + '&sort_by=popularity.desc';
   fetch(url).then(res=> res.json()).then(data => {
      showCredits(data.crew, data.cast); 
   })
   }
   else if(person_casts_container){
      url = PERSON_URL + personId + '/combined_credits?' + API_KEY + '&sort_by=popularity.desc';
      fetch(url).then(res=> res.json()).then(data => {
         showCredits(data.crew, data.cast); 
      })
   }
}

function showCredits(crews, casts) {
   var current = window.location.href;
   var lastChar = current.indexOf('/', 8);
   const movieLink = current.substr(0 , lastChar) + '/movie';
   const tvLink = current.substr(0 , lastChar) + '/tv';
   const personLink = current.substr(0 , lastChar) + '/person';
   
   let counter = 0;
   if(casts_container){
      crews.forEach(crew => {
      const {job, name, profile_path, id} = crew;
      if(job == 'Director')
      {
         let poster_image = '';
         (profile_path) ? poster_image = IMG_URL + profile_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
         const castCard = document.createElement('div');
         castCard.classList.add('col-md', 'd-flex', 'justify-content-start', 'cast-card', 'mb-3', 'px-3' );
         castCard.innerHTML = `
         <div class="card bg-custom-1 text-white shadow cast-card-size p-1">
         <a onclick="movieSelected(${id},'person')" class="d-flex flex-column overview-text-1 text-white rounded-3" href="${personLink + '?id=' + id + '&media_type=person'}"></a>
         <img src="${poster_image}" class="card-img-top img-fluid" alt="${name}">
         <strong>${name}</strong>
         <span>${job}</span>
         
         </div>
         `;
         casts_container.appendChild(castCard);
      }
      });
   
      casts.slice(0 , 10).forEach(cast => {
      const {character, name, id, profile_path} = cast;
      let poster_image = '';
      (profile_path) ? poster_image = IMG_URL + profile_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
         const castCard = document.createElement('div');
         castCard.classList.add('col-md', 'd-flex', 'justify-content-start', 'cast-card', 'mb-3', 'px-3' );
         castCard.innerHTML = `
         <div class="card bg-custom-1 text-white shadow cast-card-size p-1">
         <a onclick="movieSelected(${id},'person')" class="d-flex flex-column overview-text-1 text-white rounded-3" href="${personLink + '?id=' + id + '&media_type=person'}"></a>
         <img src="${poster_image}" class="card-img-top img-fluid" alt="${name}">
         <strong>${name}</strong>
         <span>${character}</span>
         </div>
         `;
         casts_container.appendChild(castCard);
      });
   }
   else if(tv_casts_container){
      crews.forEach(crew => {
         const {job, name, profile_path, id} = crew;
         if(job == 'Director')
         {
            let poster_image = '';
            let credit_label = document.createElement('h5');
            credit_label.classList.add('mt-3');
            if(counter == 0)
            {
               credit_label.innerText = 'Casts & Director';
               $(credit_label).insertBefore(tv_casts_container);
               counter++;
            }
            (profile_path) ? poster_image = IMG_URL + profile_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
            const castCard = document.createElement('div');
            castCard.classList.add('col-md', 'd-flex', 'justify-content-start', 'cast-card', 'mb-3', 'px-3' );
            castCard.innerHTML = `
            <div class="card bg-custom-1 text-white shadow cast-card-size mx-2 p-1">
            <a onclick="movieSelected(${id},'person')" class="d-flex flex-column overview-text-1 text-white rounded-3" href="${personLink + '?id=' + id + '&media_type=person'}"></a>
            <img src="${poster_image}" class="card-img-top img-fluid" alt="${name}">
            <strong>${name}</strong>
            <span>${job}</span>
            </div>
            `;
            tv_casts_container.appendChild(castCard);
         }
         });
      
         casts.slice(0 , 10).forEach(cast => {
         const {character, name, profile_path, id} = cast;
         let poster_image = '';
         let credit_label = document.createElement('h5');
         credit_label.classList.add('mt-3');
         if(counter == 0)
         { 
            credit_label.innerText = 'Casts & Director';
            $(credit_label).insertBefore(tv_casts_container);
            counter++;
         }
         (profile_path) ? poster_image = IMG_URL + profile_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
            const castCard = document.createElement('div');
            castCard.classList.add('col-md', 'd-flex', 'justify-content-start', 'cast-card', 'mb-3', 'px-3' );
            castCard.innerHTML = `
            <div class="card bg-custom-1 text-white shadow cast-card-size mx-2 p-1">
            <a onclick="movieSelected(${id},'person')" class="d-flex flex-column overview-text-1 rounded-3" href="${personLink + '?id=' + id + '&media_type=person'}"></a>
            <img src="${poster_image}" class="card-img-top img-fluid" alt="${name}">
            <strong>${name}</strong>
            <span>${character}</span>
            </div>
            `;
            tv_casts_container.appendChild(castCard);
         });
   }
   else if(person_casts_container){
      casts.slice(0 , 20).forEach(cast => {
         const {id,title,name, overview,poster_path, vote_average, character ,media_type,genre_ids} = cast;
         if(media_type == 'movie'){
            const movieCard = document.createElement('div');
            let poster_image = '';
            var rounded_rating = Math.round(vote_average * 10) / 10;
            let genresArr = [];
            if(genre_ids.length >0){
               genre_ids.forEach(id => {
                  genres.forEach(genre => {
                     if(id == genre.id)
                     {
                        genresArr.push(genre.name);
                     }
                  })
               });
            }
            let credit_label = document.createElement('h5');
            credit_label.classList.add('mt-3');
            if(counter == 0)
            {
               credit_label.innerText = 'Credited Shows/Movies';
               $(credit_label).insertBefore(person_casts_container);
               counter++;
            }
            (poster_path) ? poster_image = IMG_URL + poster_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
            movieCard.classList.add('col-md','my-2', 'd-flex', 'justify-content-center');
            movieCard.innerHTML = `
            <div class="card bg-custom-1 text-white card-size mx-2">
            <img src="${poster_image}" class="card-img-top img-fluid align-poster-img" alt="${title}">
            <div class="card-body ">
               <div class="mb-2 mt-2 d-flex justify-content-evenly">
               <div class='d-flex flex-column text-truncate'>
                  <p class="card-title text-truncate mt-1">${title}</p>
                  <small>${character}</small>
               </div>
                  <span class="card-text ${getColor(vote_average)} fw-bolder bg-overlay-1 rating">${rounded_rating}</span>
               </div>
               <a onclick="movieSelected(${id},'${media_type}')" class="d-flex overview-text text-white rounded-3" href="${movieLink + '?id=' + id + '&media_type=' + media_type}">
                  <div class=" overview-div">
                     <div class="py-3 px-2 d-flex flex-column text-center bg-custom-1">
                        <strong>${title}</strong>
                        <small>${genresArr.join(', ')}</small>
                     </div>
                     <div class="p-1 bg-overlay-1"><p class="">${overview}</p></div>
                     <div class="more-details p-2"><span>More Details <i class="fas fa-chevron-down"></i></span></div>
                  </div>
               </a>
            </div>
            </div>
            `;
            person_casts_container.appendChild(movieCard);
         }
         else if(media_type == 'tv') {
         const movieCard = document.createElement('div');
         let poster_image = '';
         var rounded_rating = Math.round(vote_average * 10) / 10;
         let genresArr = [];
         if(genre_ids.length >0){
            genre_ids.forEach(id => {
               tv_genres.forEach(genre => {
                  if(id == genre.id)
                  {
                     genresArr.push(genre.name);
                  }
               })
            });
         }
         (poster_path) ? poster_image = IMG_URL + poster_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
         movieCard.classList.add('col-md','my-2', 'd-flex', 'justify-content-center');
         movieCard.innerHTML = `
         <div class="card bg-custom-1 text-white card-size mx-2">
         <img src="${poster_image}" class="card-img-top img-fluid align-poster-img" alt="${name}">
         <div class="card-body ">
            <div class="mb-2 mt-2 d-flex justify-content-evenly">
            <div class='d-flex flex-column text-truncate'>
               <p class="card-title text-truncate mt-1">${name}</p>
               <small>${character}</small>
            </div>
               <span class="card-text ${getColor(vote_average)} fw-bolder bg-overlay-1 rating">${rounded_rating}</span>
            </div>
            <a onclick="movieSelected(${id},'${media_type}')" class="d-flex overview-text text-white rounded-3" href="${tvLink + '?id=' + id + '&media_type=' + media_type}">
               <div class=" overview-div">
                  <div class="py-3 px-2 d-flex flex-column text-center bg-custom-1">
                     <strong>${name}</strong>
                     <small>${genresArr.join(', ')}</small>
                  </div>
                  <div class="p-1 bg-overlay-1"><p class="">${overview}</p></div>
                  <div class="more-details p-2"><span>More Details <i class="fas fa-chevron-down"></i></span></div>
               </div>
            </a>
         </div>
         </div>
         `;
         person_casts_container.appendChild(movieCard);
         }
      });
      crews.slice(0 , 20).forEach(crew => { 
         const {id,title,name, overview,poster_path, vote_average, job ,media_type, genre_ids} = crew;
         if(media_type == 'movie' && job == 'Director'){
         const movieCard = document.createElement('div');
         let poster_image = '';
         var rounded_rating = Math.round(vote_average * 10) / 10;
         let genresArr = [];
         if(genre_ids.length >0){
            genre_ids.forEach(id => {
               genres.forEach(genre => {
                  if(id == genre.id)
                  {
                     genresArr.push(genre.name);
                  }
               })
            });
         }
         let credit_label = document.createElement('h5');
         credit_label.classList.add('mt-3');
         if(counter == 0)
         {
            credit_label.innerText = 'Credited Shows/Movies';
            $(credit_label).insertBefore(person_casts_container);
            counter++;
         }
         (poster_path) ? poster_image = IMG_URL + poster_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
         movieCard.classList.add('col-md','my-2', 'd-flex', 'justify-content-center');
         movieCard.innerHTML = `
         <div class="card bg-custom-1 text-white card-size mx-2">
         <img src="${poster_image}" class="card-img-top img-fluid align-poster-img" alt="${title}">
         <div class="card-body ">
            <div class="mb-2 mt-2 d-flex justify-content-evenly">
            <div class='d-flex flex-column text-truncate'>
               <p class="card-title text-truncate mt-1">${title}</p>
               <small>${job}</small>
            </div>
               <span class="card-text ${getColor(vote_average)} fw-bolder bg-overlay-1 rating">${rounded_rating}</span>
            </div>
            <a onclick="movieSelected(${id},'${media_type}')" class="d-flex overview-text text-white rounded-3" href="${movieLink + '?id=' + id + '&media_type=' + media_type}">
               <div class=" overview-div">
                  <div class="py-3 px-2 d-flex flex-column text-center bg-custom-1">
                     <strong>${title}</strong>
                     <small>${genresArr.join(', ')}</small>
                  </div>
                  <div class="p-1 bg-overlay-1"><p class="">${overview}</p></div>
                  <div class="more-details p-2"><span>More Details <i class="fas fa-chevron-down"></i></span></div>
               </div>
            </a>
         </div>
         </div>
         `;
         person_casts_container.appendChild(movieCard);
         }
         else if(media_type == 'tv' && job == 'Director'){
            const movieCard = document.createElement('div');
            let poster_image = '';
            var rounded_rating = Math.round(vote_average * 10) / 10;
            let genresArr = [];
            if(genre_ids.length >0){
               genre_ids.forEach(id => {
                  tv_genres.forEach(genre => {
                     if(id == genre.id)
                     {
                        genresArr.push(genre.name);
                     }
                  })
               });
            }
            let credit_label = document.createElement('h5');
            credit_label.classList.add('mt-3');
            if(counter == 0)
            {
               credit_label.innerText = 'Credited Shows/Movies';
               $(credit_label).insertBefore(person_casts_container);
               counter++;
            }
            (poster_path) ? poster_image = IMG_URL + poster_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
            movieCard.classList.add('col-md','my-2', 'd-flex', 'justify-content-center');
            movieCard.innerHTML = `
            <div class="card bg-custom-1 text-white card-size mx-2">
            <img src="${poster_image}" class="card-img-top img-fluid align-poster-img" alt="${name}">
            <div class="card-body ">
               <div class="mb-2 mt-2 d-flex justify-content-evenly">
               <div class='d-flex flex-column text-truncate'>
                  <p class="card-title text-truncate mt-1">${name}</p>
                  <small>${job}</small>
               </div>
                  <span class="card-text ${getColor(vote_average)} fw-bolder bg-overlay-1 rating">${rounded_rating}</span>
               </div>
               <a onclick="movieSelected(${id},'${media_type}')" class="d-flex overview-text text-white rounded-3" href="${movieLink + '?id=' + id + '&media_type=' + media_type}">
                  <div class=" overview-div">
                  <div class="py-3 px-2 d-flex flex-column text-center bg-custom-1">
                     <strong>${name}</strong>
                     <small>${genresArr.join(', ')}</small>
                  </div>
                     <div class="p-1 bg-overlay-1"><p class="">${overview}</p></div>
                     <div class="more-details p-2"><span>More Details <i class="fas fa-chevron-down"></i></span></div>
                  </div>
               </a>
            </div>
            </div>
            `;
            person_casts_container.appendChild(movieCard);
         }
         });
   } 
   }
   /* END OF GETTING CREDITS FROM MOVIE SELECTED */

/* GET KEYWORD FROM SEARCHBOX */
   function getKeyword(search_Type, currentPage)
   {  if(!search_Type){
      search_Type = 'Movies';
      }
      const movieSearch_url = BASE_URL + '/search/movie?' + API_KEY;
      const tvSearch_url = BASE_URL + '/search/tv?' + API_KEY;
      const personSearch_url = BASE_URL + '/search/person?' + API_KEY;
      const multiSearch_url = BASE_URL + '/search/multi?' + API_KEY;
      let search_key = localStorage.getItem('Keyword');
      let multiSearch = multiSearch_url + '&query=' + search_key;
      let movieSearch = movieSearch_url + '&query=' + search_key;
      let tvSearch = tvSearch_url + '&query=' + search_key;
      let personSearch = personSearch_url + '&query=' + search_key;
      if(currentPage){
         
         if(search_Type == 'Movies'){
            movieSearch = movieSearch_url + '&query=' + search_key + '&page=' + currentPage;
         }
         else if(search_Type == 'TV Shows'){
            tvSearch = tvSearch_url + '&query=' + search_key + '&page=' + currentPage;
         }
         else if(search_Type == 'People'){
            personSearch = personSearch_url + '&query=' + search_key + '&page=' + currentPage;
         }
      }
      if(search_key)
      {/* MOVIE SEARCH URL */
         getSearchResult(multiSearch, movieSearch,tvSearch,personSearch,search_Type);
      }
   }
/* END OF GET KEYWORD FROM SEARCHBOX */

   /* SEARCH RESULT */
   function getSearchResult(url,url1,url2,url3,search_Type) {
      const total_movie = document.getElementById('movie-count');
      const total_tv = document.getElementById('tv-count');
      const total_people = document.getElementById('people-count');

      if(search_result){
         if(search_Type == 'Movies'){
            fetch(url1).then(res=> res.json()).then(data => {
               if(data.results.length !== 0)
               showSearchResult(data.results, search_Type,url1, data.total_pages, data.page);
               else{
                  search_result.innerHTML = `<h1 class=" bolder text-center">No Results Found</h1>`;
                     page_container.innerHTML = '';
                  }
            })}
         else if(search_Type == 'TV Shows'){
            fetch(url2).then(res=> res.json()).then(data => {
               if(data.results.length !== 0)
               showSearchResult(data.results, search_Type,url2, data.total_pages, data.page);
               else{
                  search_result.innerHTML = `<h1 class=" bolder text-center">No Results Found</h1>`;
                     page_container.innerHTML = '';
                  }
            })}
         else if(search_Type == 'People'){
            fetch(url3).then(res=> res.json()).then(data => {
               if(data.results.length !== 0)
               showSearchResult(data.results, search_Type,url3, data.total_pages, data.page);
               else{
                  search_result.innerHTML = `<h1 class=" bolder text-center">No Results Found</h1>`;
                     page_container.innerHTML = '';
                  }
            })}
      
      fetch(url1).then(res=> res.json()).then(data => {
         if(data.total_results) {
         total_movie.textContent = data.total_results;}
      })
      fetch(url2).then(res=> res.json()).then(data => {
         if(data.total_results) {
         total_tv.textContent = data.total_results; }
      })
      fetch(url3).then(res=> res.json()).then(data => {
         if(data.total_results)  {
         total_people.textContent = data.total_results;}
      })
      }
}

function showSearchResult(data, search_Type,url,maxPage,currentPage) {
   search_result.innerHTML = '';
   page_container.innerHTML = '';
      var current = window.location.href;
      var lastChar = current.indexOf('/', 8);
      const movieLink = current.substr(0 , lastChar) + '/movie';
      const tvLink = current.substr(0 , lastChar) + '/tv';
      const personLink = current.substr(0 , lastChar) + '/person';
      /* if list-item selected is movie */
      for(let i = 1; i<=maxPage;i++){
         const page_button = document.createElement('button');
         page_button.classList.add('btn', 'bg-custom-1', 'p-2');
         page_button.textContent = i;
         
         if(i == maxPage && currentPage+6 != maxPage)
         {
            page_button.onclick = function () {getKeyword(search_Type, i)};  
            page_container.appendChild(page_button);
         }
         if(i == 1 && i != currentPage)
         {
            page_button.onclick = function () {getKeyword(search_Type, i)};  
            page_container.appendChild(page_button);
         }
         else if(i == currentPage)
         {
            page_button.classList.remove('bg-custom-1');
            page_button.classList.add('active');
            page_container.appendChild(page_button);
         }
         else
         {
            if(i < currentPage + 5 && i > currentPage-5){
            page_button.onclick = function () {getKeyword(search_Type, i)};  
            page_container.appendChild(page_button);
            }
         }
      }

      if(search_Type == 'Movies'){
      data.forEach(movie => {
         
         const {title, poster_path, vote_average, overview, id,genre_ids, release_date } = movie;
         const movieCard = document.createElement('div');
         let poster_image = '';
         (poster_path) ? poster_image = IMG_URL + poster_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
         let genresArr = [];
         if(genre_ids.length >0){
            genre_ids.forEach(id => {
               genres.forEach(genre => {
                  if(id == genre.id)
                  {
                     genresArr.push(genre.name);
                  }
               })
            });
         }
         if (!isNaN(Date.parse(release_date))) {
            let date = release_date.split('-');
            var formattedDate = moment(date[0]+'-'+date[1]+'-'+date[2]).format('MMMM DD, YYYY');
         } 
         movieCard.classList.add('col-md','my-2', 'd-flex', 'justify-content-center');
         movieCard.innerHTML = `
         <div class="card bg-custom-1 text-white card-size">
                  <img src="${poster_image}" class="card-img-top img-fluid align-poster-img" alt="${title}">
            <div class="card-body ">
               <div class="mb-2 mt-2 d-flex flex-column justify-content-evenly">
                  <div class="d-flex justify-content-between align-items-center">
                     <p class="card-title text-truncate mt-1">${title}</p>
                     <span class="card-text ${getColor(vote_average)} fw-bolder bg-overlay-1 rating">${vote_average}</span>
                  </div>
                  <small class="card-title text-truncate">${formattedDate}</small>
               </div>
               <a onclick="movieSelected(${id}, 'movie')" class="d-flex overview-text text-white rounded-3" href="${movieLink + '?id=' + id + '&media_type=movie'}">
                  <div class=" overview-div">
                  <div class="py-3 px-2 d-flex flex-column text-center bg-custom-1">
                     <strong>${title}</strong>
                     <small>${genresArr.join(', ')}</small>
                  </div>
                     <div class="p-1"><p class="">${overview}</p></div>
                     <div class="more-details p-2"><span>More Details <i class="fas fa-chevron-down"></i></span></div>
                  </div>
               </a>
            </div>
         </div>
         `;
         search_result.appendChild(movieCard);
      });
      }
      else if(search_Type == 'TV Shows')
      {
         data.forEach(movie => {
            const {name, poster_path, vote_average, overview, id,genre_ids, first_air_date} = movie;
            const movieCard = document.createElement('div');
            let poster_image = '';
            var rounded_rating = Math.round(vote_average * 10) / 10;
            (poster_path) ? poster_image = IMG_URL + poster_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
            let genresArr = [];
            if(genre_ids.length >0){
               genre_ids.forEach(id => {
                  tv_genres.forEach(genre => {
                     if(id == genre.id)
                     {
                        genresArr.push(genre.name);
                     }
                  })
               });
            }
            if (!isNaN(Date.parse(first_air_date))) {
               let date = first_air_date.split('-');
               var formattedDate = moment(date[0]+'-'+date[1]+'-'+date[2]).format('MMMM DD, YYYY');
            }  
            movieCard.classList.add('col-md','my-2', 'd-flex', 'justify-content-center');
            movieCard.innerHTML = `
            <div class="card bg-custom-1 text-white card-size mx-2">
            <img src="${poster_image}" class="card-img-top img-fluid align-poster-img" alt="${name}">
            <div class="card-body ">
               <div class="mb-2 mt-2 d-flex flex-column justify-content-evenly">
                  <div class="d-flex justify-content-between align-items-center">
                     <p class="card-title text-truncate">${name}</p>
                     <span class="card-text ${getColor(vote_average)} fw-bolder bg-overlay-1 rating">${rounded_rating}</span>
                  </div>
                  <small class="card-title text-truncate">${formattedDate}</small>
               </div>
               <a onclick="movieSelected(${id},'tv')" class="d-flex overview-text text-white rounded-3" href="${tvLink + '?id=' + id + '&media_type=tv'}">
                  <div class=" overview-div">
                  <div class="py-3 px-2 d-flex flex-column text-center bg-custom-1">
                     <strong>${name}</strong>
                     <small>${genresArr.join(', ')}</small>
                  </div>
                     <div class="p-1"><p class="">${overview}</p></div>
                     <div class="more-details p-2"><span>More Details <i class="fas fa-chevron-down"></i></span></div>
                  </div>
               </a>
            </div>
            </div>
            `;
            search_result.appendChild(movieCard);
         });
      }
      else if(search_Type == 'People')
      {
         data.forEach(movie => { 
            const {name, profile_path, id, known_for} = movie;
               const movieCard = document.createElement('div');
               let poster_image = '';
               const known_forArr = [];
               if(known_for.length > 0){
               known_for.forEach((known) => {
               if (known.title) {
               known_forArr.push(' "' + known.title + '"');
               }
               });
               }
               const knownList = known_forArr.slice(0, known_for.length);
               (profile_path) ? poster_image = IMG_URL + profile_path : poster_image = 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
               movieCard.classList.add('col-md','my-2', 'd-flex', 'justify-content-center');
               movieCard.innerHTML = `
               <div class="card bg-custom-1 text-white card-size mx-2">
               <img src="${poster_image}" class="card-img-top img-fluid align-poster-img" alt="${name}">
               <div class="card-body ">
                  <div class="mb-2 mt-2 d-flex justify-content-evenly">
                     <p class="card-title text-truncate mt-1">${name}</p>
                  </div>
                  <a onclick="movieSelected(${id},'person')" class="d-flex overview-text text-white rounded-3" href="${personLink + '?id=' + id + '&media_type=person'}">
                     <div class=" overview-div">
                        <div class="py-3 px-2 text-center bg-custom-1">${name}</div>
                        <div class="p-1"><p class="">Known For ${knownList}</p></div>
                        <div class="more-details p-2"><span>More Details <i class="fas fa-chevron-down"></i></span></div>
                     </div>
                  </a>
               </div>
               </div>
               `;
               search_result.appendChild(movieCard);
         });
      }
}
   /* END OF SEARCH RESULT */

   function getColor(vote) {
         if(vote >=9 ) {
            return 'rating-1';
         }
         else if(vote >= 7) {
            return "rating-2";
         }
         else if(vote >= 5){
            return 'rating-3';
         }
         else if(vote >= 3)
         {
            return 'rating-4';
         }
         else{
            return 'rating-5';
         }
   }
   
   form.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchTerm = search.value;
      var current = window.location.href;
      var lastChar = current.indexOf('/', 8);
      localStorage.setItem('Keyword', searchTerm);
      if(searchTerm)
      window.location = current.substr(0 , lastChar) + '/search?search_query=' + searchTerm;
   });

   if(searchType){
   searchType.addEventListener('click', (e) => {
      var elems = document.querySelectorAll(".active");
      if (e.target && e.target.matches('.search-list-text') && !(e.target.closest('li').matches('.active'))) {
         [].forEach.call(elems, function(el) {
         el.classList.remove("active");
         });
         e.target.closest('li').classList.add("active");
         getKeyword(e.target.textContent);
      }
   });}

   const postedFrom = document.getElementsByName('comment-from');
   const movieThumbnail = document.getElementsByName('thumbnail');
   if(postedFrom){
      getName();
   }
   async function getName(){
      for (var i=0; i < postedFrom.length; i++){
      var link = postedFrom[i].getAttribute('href');
      var queryArr = link.split('=');
      var media_type = queryArr[queryArr.length-1];
      var movId = queryArr[1].slice(0, queryArr[1].indexOf('&'));
      if(media_type == 'movie')
      {
         url = MOVIE_URL + movId + '?' + API_KEY;
      }
      else if( media_type =='tv')
      {
         url = TV_URL + movId + '?' + API_KEY;
      }
      movieThumbnail[i].src = await fetch(url).then(res=> res.json()).then(data => {
         if(data.poster_path)
         return IMG_URL + data.poster_path;
         else
         return 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
      });
      postedFrom[i].innerText = await fetch(url).then(res=> res.json()).then(data => {
         if(data.title)
         return data.title + ' - Movie';
         else
         return data.name + ' - TV Show';
      });
      
      }
   }
   const movie_card = document.getElementsByName('movie-card');
   if(movie_card)
   {
      getWatchlist();
   }
   async function getWatchlist(){
      const poster_img = document.getElementsByName('poster-img');
      const thumbnail_title = document.getElementsByName('thumbnail-title');
      const movie_rating = document.getElementsByName('rating');
      const movie_link = document.getElementsByName('movie-link');
      const overview_title = document.getElementsByName('overview-title');
      const genres = document.getElementsByName('genres');
      const overview = document.getElementsByName('overview');
      const date_released = document.getElementsByName('date-released');
      for(var i=0; i < movie_card.length; i++){
         let link = movie_link[i].getAttribute('href');
         let queryArr = link.split('=');
         let media_type = queryArr[queryArr.length-1];
         let movId = queryArr[1].slice(0, queryArr[1].indexOf('&'));
         let rating = '';
         let genresArr = [];
         if(media_type == 'movie')
         {
            url = MOVIE_URL + movId + '?' + API_KEY;
         }
         else if( media_type =='tv')
         {
            url = TV_URL + movId + '?' + API_KEY;
         }

         poster_img[i].src = await fetch(url).then(res=> res.json()).then(data => {
            if(data.poster_path)
            return IMG_URL + data.poster_path;
            else
            return 'https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage';
         });

         thumbnail_title[i].innerText = await fetch(url).then(res=> res.json()).then(data => {
            if(data.title)
            return data.title;
            else
            return data.name;
         });

         rating = await fetch(url).then(res=> res.json()).then(data => {
            return data.vote_average;
         });

         movie_rating[i].innerText = rating;
         movie_rating[i].classList.add(getColor(rating));

         overview_title[i].innerText = await fetch(url).then(res=> res.json()).then(data => {
            if(data.title)
            return data.title;
            else
            return data.name;
         });
         
         
         genres[i].innerText = await fetch(url).then(res=> res.json()).then(data => {
            (data.genres).forEach(genre => {
               genresArr.push(genre.name);
            });
            return genresArr.join(',');
         });

         overview[i].innerText = await fetch(url).then(res=> res.json()).then(data => {
            return data.overview;
         });

         date_released[i].innerText = await fetch(url).then(res=> res.json()).then(data => {
            if (!isNaN(Date.parse(data.release_date))) {
               let date = data.release_date.split('-');
               var formattedDate = moment(date[0]+'-'+date[1]+'-'+date[2]).format('MMMM DD, YYYY');
            }   
            else if (!isNaN(Date.parse(data.first_air_date))) {
               let date = data.first_air_date.split('-');
               var formattedDate = moment(date[0]+'-'+date[1]+'-'+date[2]).format('MMMM DD, YYYY');
            }  
            
            return formattedDate;
         });
      }
   }