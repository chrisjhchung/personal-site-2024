type CommandHandler = (
  args: string[],
  setTheme: (theme: string) => void,
) => string;

const commands: { [key: string]: CommandHandler } = {
  hello: () => 'Hello! How can I help you?',
  echo: (args) => args.join(' '),
  date: () => new Date().toLocaleString(),
  help: () => 'Available commands: hello, echo, date, help, theme',
  theme: (args, setTheme) => {
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
  },
};

export function handleCommand(
  input: string,
  setTheme: (theme: string) => void,
): string {
  const [command, ...args] = input.trim().split(/\s+/);
  const handler = commands[command.toLowerCase()];

  if (handler) {
    return handler(args, setTheme);
  } else {
    return `Unknown command: ${command}. Type 'help' for a list of commands.`;
  }
}
