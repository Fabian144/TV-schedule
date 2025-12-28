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

createContainerElement();
setChannel('SVT 1');

function createContainerElement() {
  const unorderedListElement = document.createElement('ul');
  unorderedListElement.className = 'list-group list-group-flush';

  const airedProgramsButton = document.createElement('li');
  airedProgramsButton.className = 'list-group-item show-previous';
  airedProgramsButton.innerText = 'Visa tidigare program'
	
	unorderedListElement.append(airedProgramsButton)
	document.querySelector('#js-schedule').append(unorderedListElement)
}

async function setChannel(channelName) {
  setPageHeading(channelName);
  clearPrograms();

  const data = await fetchData(`./data/${channelName}.json`);
  const sortedPrograms = mapAndSort(data);

  addProgramsToHTML(sortedPrograms);
  hideLoadingGif();
  checkShowAiredButton();
}

function setPageHeading(channelName) {
  document.querySelector('#js-title').innerText = channelName;
}

function clearPrograms() {
  const programElements = document.querySelectorAll('.list-group-item');

  programElements.forEach((program) => {
    if (!program.classList.contains('show-previous')) {
      program.remove();
    }
  });
}

async function fetchData(url) {
  showLoadingGif();

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}

function showLoadingGif() {
  document.querySelector('#js-loading').classList.remove('hidden');
}

function mapAndSort(programs) {
  return programs
    .map((program) => ({
      ...program,
      start: new Date(program.start),
      hidden: new Date(program.start) < new Date('2021-02-10T19:00:00+01:00'), // Simulerat datum
    }))
    .sort((firstProgram, secondProgram) => {
      return firstProgram.start - secondProgram.start;
    });
}

function addProgramsToHTML(programs) {
  const programsContainerElement = document.querySelector('.list-group');

  programs.forEach((program) => {
    const li = document.createElement('li');
    li.className = `list-group-item ${program.hidden ? 'hidden' : ''}`;

    const programStartElement = document.createElement('strong');
    programStartElement.innerText = formatTime(
      program.start.getHours(),
      program.start.getMinutes()
    );

    const programNameElement = document.createElement('div');
    programNameElement.innerText = program.name;

    li.append(programStartElement, programNameElement);
    programsContainerElement.append(li);
  });
}

function formatTime(hours, minutes) {
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  return `${hours}:${minutes}`;
}

function hideLoadingGif() {
  document.querySelector('#js-loading').classList.add('hidden');
}

function checkShowAiredButton() {
  const firstProgram = document.querySelectorAll('.list-group-item')[1];

  if (firstProgram.classList.contains('hidden')) {
    showAiredProgramsButton();
  } else {
    hideAiredProgramsButton();
  }
}

function showAiredPrograms() {
  const allProgramElements = document.querySelectorAll('.list-group-item');

  allProgramElements.forEach((programElement) => {
    programElement.classList.remove('hidden');
  });

  hideAiredProgramsButton();
}

function showAiredProgramsButton() {
  const airedProgramsButton = document.querySelector('.show-previous');

  airedProgramsButton.classList.remove('hidden');
  airedProgramsButton.addEventListener('click', showAiredPrograms);
}

function hideAiredProgramsButton() {
  document.querySelector('.show-previous').classList.add('hidden');
}