export const theme = (args: string[], setTheme: (theme: string) => void) => {
  const currentTheme = localStorage.getItem('theme') || 'dark';
  const availableThemes = [
    'dark',
    'light',
    'dracula',
    'solarized-light',
    'nord',
  ];
  if (args.length === 0) {
    return `Available themes: \n\t${availableThemes
      .map((theme) => theme + (theme === currentTheme ? ' (current)' : ''))
      .join('\n\t')}. \nUsage: theme <theme-name>`;
  }
  const theme = args[0].toLowerCase();
  if (availableThemes.includes(theme)) {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    return `Theme changed to ${theme}`;
  } else {
    return `Invalid theme. \nAvailable themes:\n\t${availableThemes
      .map((theme) => theme + (theme === currentTheme ? ' (current)' : ''))
      .join('\n\t')}`;
  }
};
