var dataObject = [];

// Function to load Surah details based on Surah number
const loadSurahDetails = (surahNo) => {
  const url = `https://quran-endpoint.vercel.app/quran`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let surahData = data.data.find(
        (surah) => surah.number == parseInt(surahNo)
      );
      if (surahData) {
        let ArabicName = surahData.asma.ar.short;
        let EnglishName = surahData.asma.en.short;
        let suraMeaning = surahData.asma.translation.en;
        let ayatCount = surahData.ayahCount;
        let surahAudio = surahData.recitation.full;
        let surahType = surahData.type.en;

        document.getElementById("surahDetailsLabel").innerText = EnglishName;
        document.getElementById("surah-ar-title").innerText = ArabicName;

        const surahBody = document.getElementById("surah-body");
        surahBody.innerHTML = `
            <h6>Surah No: ${surahNo}</h6>
            <h6>Ayat: ${ayatCount}</h6>
            <h6>Surah Type: ${surahType}</h6>
            <p>Listen Surah ${EnglishName}</p>
            <audio controls>
              <source src="${surahAudio}" preload="none" type="audio/ogg">
            </audio>
          `;
      }
    });
};

// Function to filter Surahs based on English name
function filterByName(name) {
  const surahContainer = document.getElementById("search-terms");
  surahContainer.innerHTML = ""; // Clear previous search results

  dataObject.data.forEach((surah) => {
    if (surah.asma.en.short.toLowerCase().includes(name.toLowerCase())) {
      print(surah);
    }
  });
}

// Keyup function to trigger filtering
function keyupFunction(event) {
  const searchText = event.target.value.trim(); // Trim extra white spaces
  if (searchText !== "") {
    filterByName(searchText);
  } else {
    // If search text is empty, display all Surahs
    dataObject.data.forEach((surah) => {
      print(surah);
    });
  }
}

// Add keyup event listener to the input field
document.getElementById("input").addEventListener("keyup", keyupFunction);

// Function to display Surah search results
function print(e) {
  const surahDiv = document.createElement("div");
  const surahContainer = document.getElementById("search-terms");
  surahDiv.innerHTML = `
    <div id="search-terms" class="single-result row align-items-center my-3 p-3">
      <div class="col-md-9">
        <h3>${e.asma.en.short}</h3>
        <p>Meaning: <span>${e.asma.translation.en}</span></p>
      </div>
      <div class="col-md-3 text-md-right text-center">
        <button onclick="loadSurahDetails(${e.number})" class="btn btn-success" data-toggle="modal" data-target="#surahDetails">Listen Surah</button>
      </div>
    </div>
  `;
  surahContainer.appendChild(surahDiv);
}

// Fetch Quran data and display search results
fetch(`https://quran-endpoint.vercel.app/quran`)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data.data[0]);
    dataObject = data;
    dataObject.data.forEach((surah) => {
      print(surah);
    });
  });
document.getElementById("submit-btn").addEventListener("click", () => {
  document.getElementById("input").value = "";
  fetch(`https://quran-endpoint.vercel.app/quran`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.data[0]);
      dataObject = data;
      dataObject.data.forEach((surah) => {
        print(surah);
      });
    });
});
