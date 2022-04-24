const stamps = [
  {
    name: 'Rat Stemp',
    year: 1984,
    price: 100,
    thumbs: 'images/thumbs/img1.jpg',
    image: 'images/fulls/img1.jpg'
  },
  {
    name: 'Ox Stemp',
    year: 1985,
    price: 100,
    thumbs: 'images/thumbs/img2.jpg',
    image: 'images/fulls/img2.jpg'
  },
  {
    name: 'Tiger Stemp',
    year: 1986,
    price: 21600,
    thumbs: 'images/thumbs/img3.jpg',
    image: 'images/fulls/img3.jpg'
  },
  {
    name: 'Rabbit Stemp',
    year: 1987,
    price: 42100,
    thumbs: 'images/thumbs/img4.jpg',
    image: 'images/fulls/img4.jpg'
  },
  {
    name: 'Dragon Stemp',
    year: 1988,
    price: 1400,
    thumbs: 'images/thumbs/img5.jpg',
    image: 'images/fulls/img5.jpg'
  },
  {
    name: 'Snack Stemp',
    year: 1989,
    price: 100,
    thumbs: 'images/thumbs/img6.jpg',
    image: 'images/fulls/img6.jpg'
  },
  {
    name: 'Horse Stemp',
    year: 1990,
    price: 120,
    thumbs: 'images/thumbs/img7.jpg',
    image: 'images/fulls/img7.jpg'
  },
  {
    name: 'Sheep Stemp',
    year: 1991,
    price: 3120,
    thumbs: 'images/thumbs/img8.jpg',
    image: 'images/fulls/img8.jpg'
  },
  {
    name: 'Monkey Stemp',
    year: 1992,
    price: 9999999,
    thumbs: 'images/thumbs/img9.jpg',
    image: 'images/fulls/img9.jpg'
  },
  {
    name: 'Rooster Stemp',
    year: 1993,
    price: 80,
    thumbs: 'images/thumbs/img10.jpg',
    image: 'images/fulls/img10.jpg'
  },
  {
    name: 'Dog Stemp',
    year: 1994,
    price: 10,
    thumbs: 'images/thumbs/img11.jpg',
    image: 'images/fulls/img11.jpg'
  },
  {
    name: 'Pig Stemp',
    year: 1995,
    price: 100,
    thumbs: 'images/thumbs/img12.jpg',
    image: 'images/fulls/img12.jpg'
  }
];

const stampBoxElm = document.querySelector('#main');
const searchBox = document.querySelector('#search-button');
const searchInputElm = document.querySelector('#search-box');

const loadStamps = ()=>{
  const keyword =  searchInputElm.value;
  let stampHtml = '';

  let stampArr = stamps;
  if(keyword !== 'type here...' && keyword !== '') {
    console.log(keyword);
    stampArr = stamps.filter(o => o.name.match(keyword));
  }

  stampArr.map(e=>{
    stampHtml += `
    <article class="thumb">
      <a href="${e.image}" class="image"><img src="${e.thumbs}" alt="" /></a>
      <h2>${e.name}</h2>
      <p>Year: ${e.year} Price: ${e.price}.</p>
    </article>
    `
  });

  stampBoxElm.innerHTML = stampHtml;
};

loadStamps();

searchBox.addEventListener('click', ()=>{
  loadStamps();
})
