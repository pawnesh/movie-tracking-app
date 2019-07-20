function Movies(callback){
    this.movies = [];
    this.callback = callback;

    this.addMovieInLib = (movie) => {
        movie.watched = true;
        this.movies.push(movie);
        this.saveInDB();
        return true;
    }
    
    this.removeMovieInLib = (movie) =>{
        for(var i=0;i < this.movies.length; i++){
            if(this.movies[i].title == movie.title){
                this.movies.splice(i,1);
                this.saveInDB();
                return true;
            }
        }
    }

    this.saveInDB = () => {
        var storage = {};
        storage.movies = this.movies;
        chrome.storage.local.set( storage, function() {
        });
    }

    this.reloadFromDB = () => {
        var self = this;
        chrome.storage.local.get('movies', function(data) {
            if(data.movies){
                self.movies = data.movies;
                if(self.callback){
                    self.callback(self.movies);
                }
            }
            
        });
    }

    this.reloadFromDB();
}