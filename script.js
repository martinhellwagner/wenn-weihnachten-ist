const breakpointMedium = 768;
const breakpointMax = 1200;

const snowflakes = [];
const position = [];
const coordinates = [];
const movement = [];

// Initialize snowflakes
initSnow = () => {
  let minSize = 12;
  let maxSize = 24;
  let numberSnowflakes = 20;

  // Mobile first
  if (document.body.clientWidth >= breakpointMedium) {
    minSize = 16;
    maxSize = 32;
    numberSnowflakes = 40;
  }

  // Mobile first
  if (document.body.clientWidth >= breakpointMax) {
    numberSnowflakes = 60;
  }

  const size = maxSize - minSize;

  for (let i = 0; i < numberSnowflakes; i += 1) {
    document.write(`<span id='snowflake${i}' class='snowflake'>&#x2022;</span>`);
    snowflakes[i] = document.querySelector(`#snowflake${i}`);

    position[i] = 0.03 + (Math.random() / 10);
    coordinates[i] = 0;
    movement[i] = Math.random() * 15;

    snowflakes[i].size = this.randomise(size) + minSize;
    snowflakes[i].sink = snowflakes[i].size / 6;
    snowflakes[i].style.fontSize = `${snowflakes[i].size}px`;

    snowflakes[i].x = this.randomise(document.body.clientWidth - snowflakes[i].size);
    snowflakes[i].y = this.randomise(document.body.clientHeight - snowflakes[i].size);
    snowflakes[i].style.left = `${snowflakes[i].x}px`;
    snowflakes[i].style.top = `${snowflakes[i].y}px`;
  }

  this.moveSnow(numberSnowflakes, true);
}

// Move snowflakes
moveSnow = (numberSnowflakes, init) => {
  for (let i = 0; i < numberSnowflakes; i += 1) {
    if (init) {
      snowflakes[i].style.opacity = 0.75;
    }

    coordinates[i] += position[i];

    snowflakes[i].y += snowflakes[i].sink / 2;
    snowflakes[i].style.left = `${snowflakes[i].x + (movement[i] * Math.sin(coordinates[i]))}px`;
    snowflakes[i].style.top = `${snowflakes[i].y}px`;

    if (snowflakes[i].y >= window.innerHeight) {
      snowflakes[i].x = this.randomise(document.body.clientWidth - snowflakes[i].size);
      snowflakes[i].y = snowflakes[i].size * -1;
    }
  }

  setTimeout(() => {
    this.moveSnow(numberSnowflakes);
  }, 50);
}

// Workaround for inconsistent height of mobile browsers
calculateHeight = () => {
  const container = document.querySelector('.container');

  document.body.style.setProperty('--windowHeight', `${window.innerHeight}px`);
  container.style.setProperty('--windowHeight', `${window.innerHeight}px`);
  container.classList.add('container--ready');

  initSnow();
}

// Randomise numbers in range
randomise = (range) => {
  return Math.floor(range * Math.random());
}

// Calculate days until Christmas
calculateChristmas = () => {
  const currentYear = new Date().getFullYear();
  const christmas = new Date(`${currentYear}-12-24T19:00:00`);
  const today = new Date;

  document.querySelector('.counter').innerHTML = Math.round((christmas - today) / (1000 * 60 * 60 * 24));
}

// Call functions
calculateChristmas();
calculateHeight();
