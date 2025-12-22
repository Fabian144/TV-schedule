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
    const menu = document.querySelector('ul.menu');
    let menuPositionLeft = parseFloat(window.getComputedStyle(menu).left);

    if (menuPositionLeft < 0) {
      showMenu(menuPositionLeft);
    } else {
      hideMenu(menuPositionLeft);
    }
  }

  function showMenu(menuPositionLeft) {
    const menuIcon = document.querySelector('.menu-icon > .fas');
    menuIcon.classList.add('fa-times');
    const menu = document.querySelector('ul.menu');

    const intervalAnimationShow = setInterval(() => {
      if (menuPositionLeft < 0) {
        menuPositionLeft += 20;
        menu.style.left = menuPositionLeft + 'px';
      } else {
        clearInterval(intervalAnimationShow);
      }
    }, 0);
  }

  function hideMenu(menuPositionLeft) {
    const menuIcon = document.querySelector('.menu-icon > .fas');
    menuIcon.classList.remove('fa-times');
    const menu = document.querySelector('ul.menu');

    const intervalAnimationHide = setInterval(() => {
      if (menuPositionLeft > originalMenuPosition) {
        menuPositionLeft -= 20;
        menu.style.left = menuPositionLeft + 'px';
      } else {
        clearInterval(intervalAnimationHide);
      }
    });
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
