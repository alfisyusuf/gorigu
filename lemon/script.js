// Memuat konten Hero dari JSON
$.getJSON("./json/hero.json", function(data) {
    $("#hero").html(`
        <h1>${data.title}</h1>
        <p>${data.description}</p>
        <a href="${data.buttonLink}" class="btn btn-primary btn-lemon">${data.buttonText}</a>
    `);
});

// Memuat konten Section 1 dari JSON
$.getJSON("./json/section1.json", function(data) {
    $("#section1").html(`<p class="text-center">${data.content}</p>`);
});

// Memuat konten Section 2 dari JSON
$.getJSON("./json/section2.json", function(data) {
    let section2HTML = "";
    data.forEach(function(item) {
        section2HTML += `
            <div class="col-md-3">
                <div class="card">
                    <img src="${item.imageUrl}" class="card-img-top" alt="${item.alt}">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.description}</p>
                        <a href="${item.buttonLink}" class="btn btn-primary">${item.buttonText}</a>
                    </div>
                </div>
            </div>
        `;
    });
    $("#section2").html(`<div class="row">${section2HTML}</div>`);
});

// Memuat data sponsor dari JSON
$.getJSON("./json/sponsors.json", function(data) {
    let sponsorHTML = "";
    data.forEach(function(item) {
        sponsorHTML += `<img src="${item.imageUrl}" alt="${item.alt}" class="mr-4">`;
    });
    $("#sponsor-marquee").html(sponsorHTML);
});
