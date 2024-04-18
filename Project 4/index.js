document.getElementById('fetchArtworks').addEventListener('click', function () {
  const selectedColorHSL = rgbToHsl(document.getElementById('colorPicker').value);
  fetchArtworks(selectedColorHSL);
});

let currentTextColor = '#ffffff';

document.getElementById('colorPicker').addEventListener('input', function () {
  currentTextColor = this.value;
  updateTextColor(currentTextColor);
});

function fetchArtworks(selectedColorHSL) {
  let page = 1;
  let found = false;
  const limit = 100;
  const threshold = 20;

  function fetchPage() {
    fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          let closestMatch = data.data[0];
          let closestDistance = Number.MAX_VALUE;

          data.data.forEach(artwork => {
            if (artwork.color) {
              const artworkHSL = [artwork.color.h, artwork.color.s, artwork.color.l];
              const distance = hslDistance(selectedColorHSL, artworkHSL);

              if (distance < closestDistance) {
                closestMatch = artwork;
                closestDistance = distance;
              }
            }
          });

          if (closestDistance < threshold || !data.pagination.next_url) {
            found = true;
            document.getElementById('artworksContainer').innerHTML = '';
            displayArtwork(closestMatch);
            updateTextColor(currentTextColor);
          } else {
            page++;
            fetchPage();
          }
        } else {
          console.log("No more artworks or no artworks found.");
        }
      })
      .catch(error => {
        console.error('Error fetching artworks:', error);
      });
  }

  fetchPage();
}


function displayArtwork(artwork) {
  const container = document.getElementById('artworksContainer');
  const artworkElement = document.createElement('div');
  artworkElement.className = 'artwork-item';

  const title = document.createElement('h2');
  title.textContent = artwork.title;
  artworkElement.appendChild(title);

  const artist = document.createElement('p');
  artist.textContent = `Artist: ${artwork.artist_title}`;
  artworkElement.appendChild(artist);

  const date = document.createElement('p');
  date.textContent = `Date: ${artwork.date_display}`;
  artworkElement.appendChild(date);

  const medium = document.createElement('p');
  medium.textContent = `Medium: ${artwork.medium_display}`;
  artworkElement.appendChild(medium);

  const dimensions = document.createElement('p');
  dimensions.textContent = `Dimensions: ${artwork.dimensions}`;
  artworkElement.appendChild(dimensions);

  const image = new Image();
  image.onload = function () {
    console.log("Image loaded!");
  };
  image.onerror = function () {
    console.error("Failed to load image");
  };
  image.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
  image.alt = artwork.title;
  image.style.width = "50%";
  image.style.height = "auto";
  artworkElement.appendChild(image);

  container.appendChild(artworkElement);
}

function updateTextColor(color) {
  console.log("Updating text color to: ", color);
  const textElements = document.querySelectorAll('#artworksContainer h2, #artworksContainer p');
  textElements.forEach(element => {
    console.log("Changing color for element: ", element);
    element.style.color = color;
  });
}

function rgbToHsl(rgb) {
  let r = parseInt(rgb.slice(1, 3), 16) / 255;
  let g = parseInt(rgb.slice(3, 5), 16) / 255;
  let b = parseInt(rgb.slice(5, 7), 16) / 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

function hslDistance(hsl1, hsl2) {
  let dh = Math.abs(hsl1[0] - hsl2[0]);
  let ds = Math.abs(hsl1[1] - hsl2[1]);
  let dl = Math.abs(hsl1[2] - hsl2[2]);
  return dh + ds + dl;
}
