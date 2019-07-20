var movies = [];
var movieLib = new Movies(function(tempMovies){
    movies = tempMovies;
    drawMovies();
});
var lib = new Library();

var a = document.createElement('a');
a.innerHTML = 'Rrefresh';
a.onclick = function(){
    movies = movieLib.movies;
    document.getElementById('search-input').value = "";
    drawMovies();
}
document.querySelector('nav').append(a);

document.getElementById('search-input').onchange = function () {
    var url = 'https://v2.sg.media-imdb.com/suggestion/';
    url = url + this.value[0] + '/' + this.value + '.json';

    fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                movies = [];
                if (result.d) {
                    result.d.forEach(function (movie) {
                        var m = new Movie();
                        m.tags = movie.s;
                        m.title = movie.l;
                        m.poster = (movie.i) ? movie.i.imageUrl : null;
                        m.year = movie.y;
                        movies.push(m);
                    });
                }
                drawMovies();
            },
            (error) => {
                movies = [];
            }
        );
}

function drawMovies() {
    var movieList = document.getElementById('movies-list');
    movieList.innerHTML = "";
    movies.forEach(function (movie) {
        var li = document.createElement('li');
        li.className = 'box';
        var actionBtn = document.createElement('button');
        

        actionBtn.type = 'button';
        actionBtn.className = 'addedInList';
        actionBtn.innerHTML = '&nbsp;';
        if (!movie.watched) {
            actionBtn.className = 'notInList';
        }

        actionBtn.onclick = function () {
            if (actionBtn.className == 'watched') {
                if (movieLib.removeMovieInLib(movie)) {
                    actionBtn.className = 'unwatch';
                    lib.inform('Movie removed from watched list');
                }
            } else {
                if (movieLib.addMovieInLib(movie)) {
                    actionBtn.className = 'watched';
                    lib.inform('Movie Added');
                }
            }
        }

        var watchBtn = document.createElement('button');
        watchBtn.type = 'button';
        watchBtn.className = 'watched';
        watchBtn.innerHTML = '&nbsp;';
        if (!movie.watched) {
            watchBtn.className = 'unwatch';
        }

        watchBtn.onclick = function () {
            if (watchBtn.className == 'watched') {
                if (movieLib.removeMovieInLib(movie)) {
                    watchBtn.className = 'unwatch';
                    lib.inform('Movie removed from watched list');
                }
            } else {
                if (movieLib.addMovieInLib(movie)) {
                    watchBtn.className = 'watched';
                    lib.inform('Movie Added');
                }
            }
        }

        var src = movie.poster ? movie.poster : 'img/poster.jpg';
        var img = document.createElement('img');
        img.src = 'img/poster.jpg';
        li.innerHTML = '<div class="desc"><h3>' + movie.title + '</h3><div class="tags">' + movie.tags + '</div></div><div class="footer"></div>';
        li.prepend(img);
        li.querySelector('.footer').append(watchBtn);
        // li.querySelector('.footer').append(actionBtn);
        movieList.appendChild(li);
        lib.addImage(src, img);
    });
}


