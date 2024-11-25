const hamburger = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');

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
