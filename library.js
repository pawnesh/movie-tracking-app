function Library(){

    this.addImage = function(imageUrl, element) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', imageUrl);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            var objURL = URL.createObjectURL(xhr.response);
            element.setAttribute('src', objURL);
        }.bind(this);
        xhr.send();
    }

    this.inform = function(message){
        var div = document.createElement('div');
        div.className = 'toast-messages';
        div.innerHTML = message;
        document.body.append(div);
        setTimeout(function(){
            div.remove();
        },3000);
    }
}