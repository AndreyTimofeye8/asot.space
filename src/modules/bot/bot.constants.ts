export const botCommands = [
  { command: 'start', description: 'Start bot' },
  { command: 'search', description: 'Find episode' },
];

export const commandScenes = {
  search: 'search',
};

export const messages = {
  welcome:
    'Welcome to the unofficial asot.space portal! Here you can find all episodes of A State of Trance. This bot can send you notifications about new episodes and help you search for episodes.',
  findEpisode:
    'Please enter the episode number you are interested in. For example, "001", "010", "100" or "1000"',
  useTextOnly: 'Please use only text in your search query.',
  episodeNotFound:
    'Episode with number {text} not found. Please make sure you are searching for a valid episode number and try again.',
};

export const buttons = {
  startUsing: "Great, let's start using the bot!",
};
