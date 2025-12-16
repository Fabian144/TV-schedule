import { createApp } from "https://unpkg.com/vue@3.5.22/dist/vue.esm-browser.js";

const theApp = createApp({
	data() {
		return {
		}
	},

	computed: {

	},

	methods: {

	},

	mounted() {

	}
})

theApp.mount("#app");

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
