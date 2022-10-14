const category = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  display(data.data.news_category);
};
const display = (data) => {
  const displayName = document.getElementById("category-name");

  data.forEach((category) => {
    // console.log(category.category_id);
    const displayDiv = document.createElement("div");
    displayDiv.innerHTML = `
   
   <p onclick="newsDetail('${category.category_id}')" class="news-btn mt-3" role="button">${category.category_name}</p>
    `;
    displayName.appendChild(displayDiv);
  });
};
const newsDetail = async (id) => {
  spinnerLoading(true);
  const url = ` https://openapi.programming-hero.com/api/news/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetail(data.data);
};

// display detail

const displayDetail = (newsPortal) => {
  const newsPortalDetail = document.getElementById("card-news-detail");
  newsPortalDetail.innerHTML = "";
  const notFound = document.getElementById("no-found");
  if (newsPortal.length === 0) {
    notFound.classList.remove("d-none");
    console.log("ok");
  } else {
    notFound.classList.add("d-none");
    console.log("ok");
  }
  newsPortal.forEach((news) => {
    // console.log(news._id);
    if (news.details.length > 50) {
      news.details = news.details.slice(0, 550);
    } else {
      news.details = news.details;
    }
    const newsDetail = document.createElement("div");
    newsDetail.innerHTML = `
    <div class=" mb-5 shadow">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${
                      news.thumbnail_url
                    }" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text">${news.details} </p>
                        <div class="d-flex justify-content-between align-items-center mt-5">
                            <p class="card-text"><small class="text-muted">Name : ${
                              news.author.name ? news.author.name : "Name hide"
                            }</small></p>
                            <p class="card-text"><small class="text-muted">published_date: ${
                              news.author.published_date
                                ? news.author.published_date
                                : "No published_date"
                            }</small></p>
    
                            <p class="card-text"><small class="text-muted">total_view: ${
                              news.total_view
                            }</small></p>

                            <button  onclick="newsModalDetail('${
                              news._id
                            }')"type="button" class="news-btn btn btn-primary"data-bs-toggle="modal" data-bs-target="#exampleModal" role="button">Details</button>

                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    newsPortalDetail.appendChild(newsDetail);
  });
  spinnerLoading(false);
};

const newsModalDetail = async (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  const res = await fetch(url);
  const data = await res.json();
  modelDetail(data.data);
};
const modelDetail = (modal) => {
  modal.forEach((modalNews) => {
    console.log(modalNews.author.img);
    const newsModal = document.getElementById("newsModalLabel");
    newsModal.innerText = modalNews.author.name;
    const newsBody = document.getElementById("news-body");
    newsBody.innerText = modalNews.title;
    const newsImg = document.getElementById("news-img");
    newsImg.innerHTML = `
    <div class="d-flex gap-5 ">
        <img src="${
          modalNews.author.img
        }" class="img-fluid rounded-start w-25" alt="...">
        <div>
            <p class="card-text"><small class="text-muted">Name : ${
              modalNews.author.name ? modalNews.author.name : "No name"
            }</small></p>
            <p class="card-text"><small class="text-muted">Number : ${
              modalNews.rating.number
            }</small></p>
            <p class="card-text"><small class="text-muted">Badge : ${
              modalNews.rating.badge
            }</small></p>
        </div>
        
    </div>
    `;
  });
};

// Spinner

const spinnerLoading = (spinner) => {
  const loading = document.getElementById("spinner");
  if (spinner) {
    loading.classList.remove("d-none");
  } else {
    loading.classList.add("d-none");
  }
};

category();
