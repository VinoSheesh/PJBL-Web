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