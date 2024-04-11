document.getElementById('fetchArtworks').addEventListener('click', function () {
  const selectedColorHSL = rgbToHsl(document.getElementById('colorPicker').value);
  fetchArtworks(selectedColorHSL);
});

function fetchArtworks(selectedColorHSL) {
  fetch('https://api.artic.edu/api/v1/artworks?page=1&limit=100')
    .then(response => response.json())
    .then(data => {
      if (data.data) {
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

        document.getElementById('artworksContainer').innerHTML = '';
        displayArtwork(closestMatch);
      }
    }).catch(error => console.error('Error fetching artworks:', error));
}

function displayArtwork(artwork) {
  const container = document.getElementById('artworksContainer');
  const artworkElement = document.createElement('div');
  const imageUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;

  artworkElement.innerHTML = `
      <h2>${artwork.title}</h2>
      <img src="${imageUrl}" alt="${artwork.title}" style="max-width: 100px; height: auto;">
      <p>Artist: ${artwork.artist_title}</p>
  `;
  container.appendChild(artworkElement);
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
