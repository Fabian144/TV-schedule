import { createApp } from 'https://unpkg.com/vue@3.5.22/dist/vue.esm-browser.js';

const theApp = createApp({
  data() {
    return {
      channelName: '',
      programs: [],
      loading: false,
      displayingAllPrograms: false,
			showingMenu: false
    };
  },

  computed: {
    sortedPrograms() {
      return this.programs
        .map((program) => ({
          ...program,
          start: new Date(program.start),
        }))
        .sort((firstProgram, secondProgram) => {
          return firstProgram.start - secondProgram.start;
        });
    },

    programsToDisplay() {
      return this.displayingAllPrograms
        ? this.sortedPrograms
        : this.sortedPrograms.filter((program) => this.checkProgramNotAired(program.start));
    },

    anyAiredProgram() {
      return this.sortedPrograms.some((program) => this.checkProgramAired(program.start));
    },
  },

  methods: {
    setChannel(channelName) {
      this.channelName = channelName;
      this.displayingAiredPrograms = false;
      this.fetchPrograms();
    },

    async fetchPrograms() {
      this.loading = true;
      try {
        const response = await fetch(`./data/${this.channelName}.json`);
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        this.programs = await response.json();
        this.loading = false;
      } catch (error) {
        console.error('Fetch failed:', error);
      }
    },

    formatTime(hours, minutes) {
      if (hours < 10) hours = '0' + hours;
      if (minutes < 10) minutes = '0' + minutes;
      return `${hours}:${minutes}`;
    },

    checkProgramNotAired(startTime) {
      return startTime >= new Date('2021-02-10T19:00:00+01:00');
    },

    checkProgramAired(startTime) {
      return startTime < new Date('2021-02-10T19:00:00+01:00');
    },
  },

  mounted() {
    this.setChannel('SVT 1');
  },
});

theApp.mount('#app');
