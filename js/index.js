document.getElementById('myform').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    let siteName = document.getElementById('sitename').value;
    let siteUrl = document.getElementById('siteurl').value;

    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    let bookmark = {
        name : siteName,
        url : siteUrl
    }

    if (localStorage.getItem('bookmarks') === null){
        let bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    fetchBookmarks();
    e.preventDefault();
}

function deleteBookmark(url){
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(i=0; i<bookmarks.length;i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i,1);

        }

    } 

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));  
    fetchBookmarks();
}

function fetchBookmarks(){
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let bookmarksResults = document.getElementById('bookmarksResults');
    //bookmarksResults.innerHTML='';
    for(let i=0; i<bookmarks.length; i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div class="well">' +
                                        '<h3>' + name+' '+
                                            '<a class="btn btn-default" target="_blank" href="'+url+'"> Visit</a>'+
                                            '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#"> Delete</a>'+

                                        '</h3>'+                                            
                                        '</div>';

        
    }

}