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

createProgramsContainerElement();
setChannel('SVT 1');

function createProgramsContainerElement() {
  const unorderedListelement = `<ul class="list-group list-group-flush"></ul>`;
  document.querySelector('#js-schedule').innerHTML = unorderedListelement;
}

async function setChannel(channelName) {
  setPageHeading(channelName);
  clearProgramsContainerElement();
  addHiddenPreviousProgramsButton();

  const data = await fetchData(`./data/${channelName}.json`);
  const mappedPrograms = mapPrograms(data);
  const sortedPrograms = sortProgramsByAscendingDate(mappedPrograms);
  const programsAsHTML = saveProgramsInHTMLForm(sortedPrograms);

  addProgramsToHTML(programsAsHTML);
}

function clearProgramsContainerElement() {
  document.querySelector('.list-group').innerHTML = '';
}

function addHiddenPreviousProgramsButton() {
  const previousProgramsButton = `<li class="list-group-item show-previous hidden">Visa tidigare program</li>`;

  document.querySelector('.list-group').innerHTML = previousProgramsButton;
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

function saveProgramsInHTMLForm(programs) {
  let programsInHTMLForm = ``;

  programs.forEach((program) => {
    if (program.start < new Date('2021-02-10T19:00:00+01:00')) { // Simulerat datum
      programsInHTMLForm += `<li class="list-group-item hidden">
					<strong>${formatTime(program.start.getHours(), program.start.getMinutes())}</strong>
					<div>${program.name}</div>
				</li>`;
    } else {
      programsInHTMLForm += `<li class="list-group-item">
				<strong>${formatTime(program.start.getHours(), program.start.getMinutes())}</strong>
				<div>${program.name}</div>
			</li>`;
    }
  });

  return programsInHTMLForm;
}

function addProgramsToHTML(programsAsHTML) {
  const programsContainerElement = document.querySelector('.list-group');

  programsContainerElement.innerHTML += programsAsHTML;
  hideLoadingGif();
  checkShowPreviousProgramsButton();
}

function checkShowPreviousProgramsButton() {
  const firstProgram = document.querySelectorAll('.list-group-item')[1];

  if (firstProgram.classList.contains('hidden')) {
    showPreviousProgramsButton();
  }
}

function showPreviousPrograms() {
  const allProgramElements = document.querySelectorAll('.list-group-item');

  allProgramElements.forEach((programElement) => {
    programElement.classList.remove('hidden');
  });

  hidePreviousProgramsButton();
}

function setPageHeading(channelName) {
  document.querySelector('#js-title').innerText = channelName;
}

function mapPrograms(programs) {
  return programs.map((program) => ({
    ...program,
    start: new Date(program.start),
  }));
}

function sortProgramsByAscendingDate(programs) {
  return programs.sort((firstProgram, secondProgram) => {
    return firstProgram.start - secondProgram.start;
  });
}

function formatTime(hours, minutes) {
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  return `${hours}:${minutes}`;
}

function showPreviousProgramsButton() {
  const previousProgramsButton = document.querySelector('.show-previous');

  previousProgramsButton.classList.remove('hidden');
  previousProgramsButton.addEventListener('click', showPreviousPrograms);
}

function hidePreviousProgramsButton() {
  document.querySelector('.show-previous').classList.add('hidden');
}

function showLoadingGif() {
  document.querySelector('#js-loading').classList.remove('hidden');
}

function hideLoadingGif() {
  document.querySelector('#js-loading').classList.add('hidden');
}
