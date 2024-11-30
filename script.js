const hamburger = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');
const counterContainer = document.querySelectorAll(".counters");

counterContainer.forEach(container => {
  const counterItems = container.querySelectorAll(".counter");
  const counters = container.querySelectorAll("span");
  let activated = false;

  window.addEventListener("scroll", () => {
    if (
      scrollY > container.offsetTop - container.offsetHeight - 200 &&
      activated === false
    ) {
      counterItems.forEach((item, i) => {
        item.style.animation = "fadeUp 600ms ease-in-out forwards";
        item.style.animationDelay = 0.2 * i + "s";
      });

      counters.forEach(counter => {
        counter.innerText = 0;
        let count = 0;

        function updateCount() {
          const target = parseInt(counter.dataset.count);
          const speed = parseInt(counter.dataset.speed);

          if (count < target) {
            count++;
            counter.innerText = count;
            setTimeout(updateCount, speed);
          } else {
            counter.innerText = target;
          }
        }

        updateCount();
        activated = true;
      });
    } else if(
      scrollY < container.offsetTop - container.offsetHeight - 500 || scrollY === 0
      && activated === true
    ) {
      counters.forEach(counter => counter.innerText = 0);

      counterItems.forEach(item => item.style.animation = "none");

      activated = false;
    }
  });
});
hamburger.addEventListener('click', () => {
  if (navMenu.classList.contains('active')) {
   
    navMenu.style.opacity = '0'; 
    navMenu.style.transform = 'translateY(-20px)'; 

  
    setTimeout(() => {
      navMenu.classList.remove('active');
      navMenu.style.visibility = 'hidden';
    }, 300);
  } else {
    navMenu.classList.add('active');
    navMenu.style.visibility = 'visible';

    setTimeout(() => {
      navMenu.style.opacity = '1';
      navMenu.style.transform = 'translateY(0)'; 
    }, 10); 
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {

    navMenu.classList.remove('active');
    navMenu.style.visibility = 'visible'; 
    navMenu.style.opacity = '1';
    navMenu.style.transform = 'translateY(0)';
    hamburger.style.display = 'none'; 
  } else {

    hamburger.style.display = 'block'; 

    if (!navMenu.classList.contains('active')) {
      navMenu.style.visibility = 'hidden';
      navMenu.style.opacity = '0';
      navMenu.style.transform = 'translateY(-20px)';
    }
  }
});


if (window.innerWidth >= 768) {
  navMenu.style.visibility = 'visible';
  navMenu.style.opacity = '1';
  navMenu.style.transform = 'translateY(0)';
  hamburger.style.display = 'none'; 
} else {
  hamburger.style.display = 'block'; 
  navMenu.style.visibility = 'hidden'; 
}

// SHOW ANS

const questions = document.querySelectorAll('.question-head');
const answers= document.querySelectorAll('.ans');
const Qarrows= document.querySelectorAll('.Qarrow');

questions.forEach((question, index) => {
  question.addEventListener('click', function(){
    answers.forEach((ans) => {
      ans.classList.remove('show_ans');
    });
    Qarrows.forEach((arrow) => {
      arrow.classList.remove('rotate_arrow');
    });
    let answer = this.nextElementSibling;
    if(!answer.classList.contains('show_ans')){
      answer.classList.add('show_ans');
      Qarrows[index].classList.add('rotate_arrow');
    }
  });
});

async function fetchCryptoData() {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=idr&order=market_cap_desc&per_page=5&page=1&sparkline=true');
  const data = await response.json();
  console.log(data); // Debugging untuk memeriksa data

  const tbody = document.getElementById('crypto-data');
  tbody.innerHTML = ''; // Hapus data lama

  data.forEach(crypto => {
      const priceChangeClass = crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative';

      // SVG Grafik
      const sparkline = crypto.sparkline_in_7d.price.map((price, index) => {
          const maxPrice = Math.max(...crypto.sparkline_in_7d.price);
          const minPrice = Math.min(...crypto.sparkline_in_7d.price);
          const normalizedY = ((price - minPrice) / (maxPrice - minPrice)) * 20; // Normalkan rentang 0-20 px
          return `<circle cx="${index * 5}" cy="${20 - normalizedY}" r="1" fill="${crypto.price_change_percentage_24h >= 0 ? 'green' : 'red'}"></circle>`;
      }).join('');

      const row = `
          <tr>
              <td>
                  <img src="${crypto.image}" alt="${crypto.name} logo" width="25" style="vertical-align: middle; margin-right: 8px;">
                  <strong>${crypto.symbol.toUpperCase()}</strong> ${crypto.name}
              </td>
              <td>Rp ${crypto.current_price.toLocaleString()}</td>
              <td class="${priceChangeClass}">${crypto.price_change_percentage_24h.toFixed(2)}%</td>
              <td>Rp ${crypto.total_volume.toLocaleString()}</td>
              <td>Rp ${crypto.market_cap.toLocaleString()}</td>
              <td>
                  <svg width="100" height="20">
                      ${sparkline}
                  </svg>
              </td>
          </tr>
      `;
      tbody.innerHTML += row;
  });
}

setInterval(fetchCryptoData, 10000); // Update setiap 10 detik
fetchCryptoData(); // Panggil saat load
