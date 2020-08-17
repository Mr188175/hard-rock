let search=document.getElementById('search');
let searchButton=document.getElementById('searchButton');
let songSuggestionList = document.getElementById("songSuggestionList");
let lyricsSongSuggestionList = document.getElementById("lyricsSongSuggestionList");

// lyrics suggestion start
search.addEventListener("keypress",event=>{
    if(search.value.length>0){
        search.style.color="black";
    }
    
    let api=`https://api.lyrics.ovh/suggest/${event.target.value+event.key}`;
    

    fetch(api)
    .then(res=>res.json())
    .then(data=>{
        
        for(let i=1; i<=5; i++){
           document.getElementById("title"+i).innerText=data.data[i].title
           document.getElementById("artist"+i).innerText=data.data[i].artist.name;


           let title=data.data[i].title
            let artist=data.data[i].artist.name
            document.getElementById("lyricsBtn"+i).addEventListener("click",(event)=>{
               let api2=`https://api.lyrics.ovh/v1/${artist}/${title}`;
                fetch(api2)
                .then(res=>res.json())
                .then(data=>{
                    let str=data.lyrics.split(" ");
                    let [a,b,c]=str;
                    if(str.length>10){
                        document.getElementById("lyricsContentTitle").innerText=`${a} ${b} ${c}`;
                    }else{
                        document.getElementById("lyricsContentTitle").innerText=`${a}`;
                    }
                    document.getElementById("textContent").innerText=data.lyrics;
                })
                document.getElementById("lyricsContent").style.display="block";
            })
        }
        songSuggestionList.style.display="block";
    })
})

// lyrics suggestion end


// matched lyrics

searchButton.addEventListener('click',event=>{
    if(search.value.length<1){

        let search = document.getElementById("search");
        search.value="type a lyrics name";
        search.style.color="red";
        document.getElementById("lyricsSongSuggestionList").style.display="none"

       
        
    }else{
        search.style.color="black"
    let api = `https://api.lyrics.ovh/suggest/${search.value}`
    document.getElementById("lyricsContent").style.display="none";
    for(let i=1; i<=15;i++){
        document.getElementById("textContent"+i).style.display="none";
    }
    fetch(api)
    .then(res=>res.json())
    .then(data=>{
      
        if(data.data.length==0){
            document.getElementById("alertUnavailable").innerHTML=`<h4 style="color:red; text-align:center">
           Lyrics is not available</h4>`
        }else{
            for(let i=1; i<=data.data.length; i++){
            
                document.getElementById("lyricsTitle"+i).innerHTML=data.data[i].title
                document.getElementById("lyricsArtist"+i).innerHTML=data.data[i].artist.name
                lyricsSongSuggestionList.style.display="block"
                let count=1;
                document.getElementById("getLyricsBtn"+i).addEventListener("click",()=>{
                    
                    
                    let textContent=document.getElementById("textContent"+i)
    
                    let title=data.data[i].title
                    let artist=data.data[i].artist.name
                    let api2=`https://api.lyrics.ovh/v1/${artist}/${title}`
                    fetch(api2)
                    .then(res=>res.json())
                    .then(data=>{
                        // console.log(data.lyrics)
                        if(data.lyrics==undefined){
                            textContent.innerHTML=`<p style="color:red; text-align:center;">At this time, this lyrics is not available , Please try again later</p>`
                                textContent.style.display="block"
                                
                        }else{
                            if(count%2!==0){
                                textContent.innerHTML=data.lyrics
                                textContent.style.display="block"
                                
                                count++
                               }else{
                                textContent.style.display="none"
                                count++
                               }
                            
                        }
                        
                    })
                    
                })
                
            }
        }
    })
    
    songSuggestionList.style.display="none";

}
   
})


