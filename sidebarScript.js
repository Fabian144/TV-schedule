//--------LÅT STÅ-----------
// Definiera fasta "konstanter" för olika typer av animering av menyn
ANIMATION = {
  NONE: 'none', // Ingen animation
  TIMER: 'timer', // setInterval-baserad animation
  ALTERNATIVE: 'alternative', // ytterligare alternativ
};

// Ändra värdet för att styra vilken meny-animation som ska användas
window.MENU_ANIMATION_MODE ??= ANIMATION.ALTERNATIVE; // ANIMATION.TIMER (Default) = ingen animation (G-nivå), ANIMATION.TIMER // (VG-nivå), ANIMATION.ALTERNATIVE // ytterligare ett alternativ (VG-nivå);

/*
 Användningsexempel för animationer beroende på inställning
*/
if (window.MENU_ANIMATION_MODE === ANIMATION.NONE) {
  console.log('Ingen meny-animation används');

  function toggleMenu() {
    const menu = document.querySelector('ul.menu');
    const menuIcon = document.querySelector('.menu-icon > .fas');

    if (!menu.classList.contains('menu--show')) {
      menu.classList.add('menu--show');
      menuIcon.classList.add('fa-times');
    } else {
      menu.classList.remove('menu--show');
      menuIcon.classList.remove('fa-times');
    }
  }
} else if (window.MENU_ANIMATION_MODE === ANIMATION.TIMER) {
  console.log('Meny-animation med timer används');

  const originalMenuPosition = parseFloat(
    window.getComputedStyle(document.querySelector('ul.menu')).left
  );

  function toggleMenu() {
    let menuPositionLeft = parseFloat(
      window.getComputedStyle(document.querySelector('ul.menu')).left
    );
    const menu = document.querySelector('ul.menu');

    if (menuPositionLeft < 0) {
      document.querySelector('.menu-icon > .fas').classList.add('fa-times');

      const menuIntervalAnimationIn = setInterval(() => {
        if (menuPositionLeft < 0) {
          menuPositionLeft += 20;
          menu.style.left = menuPositionLeft + 'px';
        } else {
          clearInterval(menuIntervalAnimationIn);
        }
      }, 0);
    } else {
      document.querySelector('.menu-icon > .fas').classList.remove('fa-times');

      const menuIntervalAnimationOut = setInterval(() => {
        if (menuPositionLeft > originalMenuPosition) {
          menuPositionLeft -= 20;
          menu.style.left = menuPositionLeft + 'px';
        } else {
          clearInterval(menuIntervalAnimationOut);
        }
      });
    }
  }
} else if (window.MENU_ANIMATION_MODE === ANIMATION.ALTERNATIVE) {
  console.log('Meny-animation med alternativ metod används');

  function toggleMenu() {
    const menu = document.querySelector('ul.menu');
    const menuIcon = document.querySelector('.menu-icon > .fas');

    menu.style.transition = 'left, 500ms';

    if (!menu.classList.contains('menu--show')) {
      menu.classList.add('menu--show');
      menuIcon.classList.add('fa-times');
    } else {
      menu.classList.remove('menu--show');
      menuIcon.classList.remove('fa-times');
    }
  }
}
//--------------------------
