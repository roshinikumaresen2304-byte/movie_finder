async function searchMovie() {

    const query = document.getElementById("searchInput").value;
    const movieContainer = document.getElementById("movieContainer");
    const loading = document.getElementById("loading");

    movieContainer.innerHTML = "";

    if(query === ""){
        alert("Sila masukkan nama filem");
        return;
    }

    loading.innerText = "Loading...";

    try{

        const response = await fetch(
            `https://api.tvmaze.com/search/shows?q=${query}`
        );

        const data = await response.json();

        loading.innerText = "";

        if(data.length === 0){
            movieContainer.innerHTML = "<p>Filem tidak dijumpai</p>";
            return;
        }

        data.forEach(item => {

            const show = item.show;

            movieContainer.innerHTML += `
                <div class="card">
                    <img src="${show.image ? show.image.medium : ''}">
                    <h3>${show.name}</h3>
                    <p>${show.premiered || 'Tiada Tahun'}</p>
                </div>
            `;
        });

    } catch(error){
        loading.innerText = "Error mendapatkan data";
    }
}
