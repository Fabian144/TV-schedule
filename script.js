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
  ); // parseFloat returnerar alla float värden som är före en annan värdetyp ur en sträng, i det här fallet -300 ur "-300px"

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
      }, 0);
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

createListGroupElement();
setChannel('SVT 1');

function createListGroupElement() { // Skapar ul elementet för programmen och lägger in "tidigare program" knappen
  let listGroupElement = `<ul class="list-group list-group-flush">
		<li class="list-group-item show-previous hidden">Visa tidigare program</li>
	</ul>`;

  document.querySelector('#js-schedule').innerHTML = listGroupElement;
}

function setChannel(channelName) {
  document.querySelector('#js-title').innerText = channelName;

  fetchData(`./data/${channelName}.json`).then(setData);
  let dataFromFetch;

  function setData(data) {
    dataFromFetch = data;
  }

  console.log(dataFromFetch);

  // Varje objekt från datat läggs in i variabeln med bara nyckelvärdeparen som ska användas i koden och sedan visas up
  const programs = dataFromFetch.map((program) => ({
    start: new Date(program.start),
    name: program.name,
  }));

  // Sorterar programmen stigande efter datum
  programs.sort((firstProgram, secondProgram) => {
    return firstProgram.start - secondProgram.start;
  });

  // Funktion för programstarts tiden, så timmarna och minuterna visar tvåsiffriga tal även om de är under 10
  function formatTime(hours, minutes) {
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    return `${hours}:${minutes}`;
  }

  let listItems = ``;

  //------ Går igenom alla program objekt och sparar dem i HTML format i övre variabeln
  programs.forEach((program) => {
    /* Elementen läggs till med en klass som gömmer dem om programstartens datum och tid är
			mindre än (alltså före) ett simulerat datum */
    if (program.start < new Date('2021-02-10T19:00:00+01:00')) {
      listItems += `<li class="list-group-item hidden">
					<strong>${formatTime(program.start.getHours(), program.start.getMinutes())}</strong>
					<div>${program.name}</div>
				</li>`;
    } else {
      listItems += `<li class="list-group-item">
				<strong>${formatTime(program.start.getHours(), program.start.getMinutes())}</strong>
				<div>${program.name}</div>
			</li>`;
    }
  });
  //------

  // Sparade program objekten i HTML format läggs in i ett existerande HTML element via variabeln
  document.querySelector('.list-group').innerHTML += listItems;

  // Gömmer loading gif när datan både laddats in och visas upp på sidan
  document.querySelector('#js-loading').classList.add('hidden');

  //------ Knappen "Visa tidigare program" visas och fungerar bara om minst ett av programmen är gömda, alltså redan sända
  let firstProgram = document.querySelectorAll('.list-group-item')[1];

  if (firstProgram.classList.contains('hidden')) {
    document.querySelector('.show-previous').classList.remove('hidden');
  }

  document.querySelector('.show-previous').addEventListener('click', showPrevious);
  //------

  function showPrevious() {
    let listItems = document.querySelectorAll('.list-group-item');

    listItems.forEach((listItem) => {
      listItem.classList.remove('hidden');
    });

    document.querySelector('.show-previous').classList.add('hidden');
  }
}

async function fetchData(url) { // Visar loading gif innan någon data laddats in
  document.querySelector('#js-loading').classList.remove('hidden');

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}
