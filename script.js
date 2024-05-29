document.addEventListener('DOMContentLoaded', function () {
    getData();
});
let splide;
let header = document.querySelector('header');

const getData = async () => {
    const response = await fetch("home.json");
    const data = await response.json();
    console.log(data);

    createHeaderSection(data);
    createMainSection(data);
}

// funciton to create page contents..
function createHeaderSection(data) {

    const headerData = data.header;
    const headerTag = document.querySelector('header');

    console.log(headerData);
   
    const logo = document.createElement('img');
    logo.classList.add('logo');
    logo.src = headerData.logoURL;
    headerTag.appendChild(logo);

    // Create navigation links
    const nav = document.createElement('nav');
    data.header.nav.forEach(item => {
        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = item.title;
        nav.appendChild(link);
    });
    headerTag.appendChild(nav);

    // Create sign-up button if showSignUpButton is true
    if (data.header.showSignUpButton) {
        const signUpButton = document.createElement('button');
        signUpButton.classList.add('btn');
        signUpButton.textContent = 'sign up';
        nav.appendChild(signUpButton);
    }
}

function createMainSection(data) {
    const mainSectionData = data.main_section[0]; 
    // Create product list
    const productList = mainSectionData.product_list;
    console.log(productList);

    const splideSlideImg = document.querySelectorAll('.splide__slide img');
    productList.forEach((product, index) => {
        splideSlideImg[index].src = product.imageURL;
    });
    
    // Create social icons
    const socialIcons = mainSectionData['social-icons'];
    const socialIconsContainer = document.createElement('div');
    socialIconsContainer.classList.add('social-icons');
    socialIcons.forEach(icon => {
        const iconLink = document.createElement('a');
        const iconImg = document.createElement('img');
        iconImg.src = icon.logo;
        iconImg.alt = icon.link;
        iconLink.href = icon.link;
        iconLink.appendChild(iconImg);
        socialIconsContainer.appendChild(iconLink);
    });
    document.body.appendChild(socialIconsContainer);

    creatElementsForDetails(productList);
}

function creatElementsForDetails(details) {
    // Initialize splide slider
    splide = new Splide('.splide', {
        type       : 'slide',
        perPage    : 1,
        perMove    : 1,
        autoplay   : false,
        interval   : 5000,
        pauseOnHover: true,
        easing     : 'linear',
        arrows     : true,
        pagination : false,
    }).mount();

    // Update product details initially
    updateProductDetails(details);

    // Listen for slide change event
    splide.on('moved', () => updateProductDetails(details));
}

function updateProductDetails(details) {
    console.log(details);
    let title = document.querySelector(".title");
    let tag1 = document.querySelector(".tag1");
    let tag2 = document.querySelector(".tag2");
    let desc = document.querySelector(".desc");
    let price = document.querySelector(".price");

    const visibleSlideIndex = splide.index;
    console.log(details[visibleSlideIndex].tag2);
    

    title.innerHTML = details[visibleSlideIndex].title;
    tag1.innerHTML = details[visibleSlideIndex].tag1;
    tag2.innerHTML = details[visibleSlideIndex].tag2;
    desc.innerHTML = details[visibleSlideIndex].desc;
    price.innerHTML = details[visibleSlideIndex].price;
    document.body.style.background = details[visibleSlideIndex].background;
}
