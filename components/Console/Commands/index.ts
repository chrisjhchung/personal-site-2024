import { theme } from './Theme';

type FileSystemItem = string | { [key: string]: FileSystemItem };

interface State {
  currentDirectory: string;
  fileSystem: { [key: string]: FileSystemItem };
}

type CommandHandler = (
  args: string[],
  setTheme: (theme: string) => void,
  callbacks: { [key: string]: () => void },
) => string;

const initialState: State = {
  currentDirectory: '/home/user',
  fileSystem: {
    '/': {
      home: {
        user: {
          docs: {
            'README.txt': 'This is the README file for the docs folder.',
          },
          'welcome.txt': 'Welcome to the virtual file system!',
        },
      },
    },
  },
};

let currentState: State = initialState;

const loadState = (): State => {
  const storedState = sessionStorage.getItem('fileSystemState');
  return storedState ? JSON.parse(storedState) : initialState;
};

const saveState = () => {
  if (currentState) {
    sessionStorage.setItem('fileSystemState', JSON.stringify(currentState));
  }
};

const normalizePath = (currentPath: string, targetPath: string): string => {
  const isAbsolute = targetPath.startsWith('/');
  const parts = (
    isAbsolute ? targetPath : `${currentPath}/${targetPath}`
  ).split('/');
  const normalizedParts: string[] = [];

  for (const part of parts) {
    if (part === '' || part === '.') continue;
    if (part === '..') {
      if (
        normalizedParts.length > 0 &&
        normalizedParts[normalizedParts.length - 1] !== '..'
      ) {
        normalizedParts.pop();
      } else if (!isAbsolute) {
        normalizedParts.push('..');
      }
    } else {
      normalizedParts.push(part);
    }
  }

  return `/${normalizedParts.join('/')}`;
};

const getItemAtPath = (
  fileSystem: { [key: string]: FileSystemItem },
  path: string,
): FileSystemItem | null => {
  const parts = path.split('/').filter(Boolean);
  let current: FileSystemItem = fileSystem['/'];

  for (const part of parts) {
    if (typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return null;
    }
  }

  return current;
};

const commands: { [key: string]: CommandHandler } = {
  hello: () => 'Hello! How can I help you?',
  echo: (args) => args.join(' '),
  date: () => new Date().toLocaleString(),
  help: () => `Available commands:
      help        : Displays this help message
      theme       : Changes the theme of the site
      close       : Closes the terminal
      clear       : Clears the terminal
      ls          : Lists the files in the current directory
      cd          : Changes the current directory
      cat         : Displays the contents of a file
      pwd         : Prints the current working directory
      mkdir       : Creates a new directory
      touch       : Creates a new file
      rm          : Removes a file or directory
      edit        : Edits the contents of a file`,
  theme: (args, setTheme) => theme(args, setTheme),
  close: (args, setTheme, callbacks) => {
    if (callbacks && 'close' in callbacks) {
      callbacks.close();
    }
    return 'Closing terminal...';
  },
  clear: (args, setTheme, callbacks) => {
    if (callbacks && 'clear' in callbacks) {
      callbacks.clear();
    }
    return '';
  },
  ls: (args) => {
    const path =
      args.length > 0
        ? normalizePath(currentState.currentDirectory, args[0])
        : currentState.currentDirectory;
    const item = getItemAtPath(currentState.fileSystem, path);

    if (item && typeof item === 'object') {
      return Object.keys(item).join('\n');
    } else {
      return `Cannot list '${path}': No such directory`;
    }
  },
  cd: (args) => {
    if (args.length === 0) {
      currentState.currentDirectory = '/home/user';
      saveState();
      return `Changed directory to /home/user`;
    }

    const newPath = normalizePath(currentState.currentDirectory, args[0]);
    const item = getItemAtPath(currentState.fileSystem, newPath);

    if (item && typeof item === 'object') {
      currentState.currentDirectory = newPath;
      saveState();
      return `Changed directory to ${newPath}`;
    } else {
      return `Cannot change to '${newPath}': No such directory`;
    }
  },
  cat: (args) => {
    if (args.length === 0) {
      return 'Please specify a file.';
    }

    const path = normalizePath(currentState.currentDirectory, args[0]);
    const item = getItemAtPath(currentState.fileSystem, path);

    if (typeof item === 'string') {
      return item;
    } else if (item === null) {
      return `Cannot display '${path}': No such file`;
    } else {
      return `Cannot display '${path}': Is a directory`;
    }
  },
  pwd: () => currentState.currentDirectory,
  mkdir: (args) => {
    if (args.length === 0) {
      return 'Please specify a directory name.';
    }

    const newDirPath = normalizePath(currentState.currentDirectory, args[0]);
    const parentPath = newDirPath.substring(0, newDirPath.lastIndexOf('/'));
    const dirName = newDirPath.substring(newDirPath.lastIndexOf('/') + 1);

    const parent = getItemAtPath(currentState.fileSystem, parentPath);

    if (parent && typeof parent === 'object') {
      if (dirName in parent) {
        return `Cannot create directory '${newDirPath}': File exists`;
      }
      parent[dirName] = {};
      saveState();
      return `Directory created: ${newDirPath}`;
    } else {
      return `Cannot create directory '${newDirPath}': No such file or directory`;
    }
  },
  touch: (args) => {
    if (args.length === 0) {
      return 'Please specify a file name.';
    }

    const newFilePath = normalizePath(currentState.currentDirectory, args[0]);
    const parentPath = newFilePath.substring(0, newFilePath.lastIndexOf('/'));
    const fileName = newFilePath.substring(newFilePath.lastIndexOf('/') + 1);

    const parent = getItemAtPath(currentState.fileSystem, parentPath);

    if (parent && typeof parent === 'object') {
      if (fileName in parent) {
        return `File '${newFilePath}' already exists`;
      }
      parent[fileName] = '';
      saveState();
      return `File created: ${newFilePath}`;
    } else {
      return `Cannot create file '${newFilePath}': No such directory`;
    }
  },
  rm: (args) => {
    if (args.length === 0) {
      return 'Please specify a file or directory to remove.';
    }

    const path = normalizePath(currentState.currentDirectory, args[0]);
    const parentPath = path.substring(0, path.lastIndexOf('/'));
    const itemName = path.substring(path.lastIndexOf('/') + 1);

    const parent = getItemAtPath(currentState.fileSystem, parentPath);

    if (parent && typeof parent === 'object' && itemName in parent) {
      delete parent[itemName];
      saveState();
      return `Removed: ${path}`;
    } else {
      return `Cannot remove '${path}': No such file or directory`;
    }
  },
  edit: (args) => {
    if (args.length < 2) {
      return 'Usage: edit <file> <new content>';
    }

    const filePath = normalizePath(currentState.currentDirectory, args[0]);
    const newContent = args.slice(1).join(' ');

    const parentPath = filePath.substring(0, filePath.lastIndexOf('/'));
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);

    const parent = getItemAtPath(currentState.fileSystem, parentPath);

    if (parent && typeof parent === 'object') {
      if (typeof parent[fileName] === 'string') {
        parent[fileName] = newContent;
        saveState();
        return `File '${filePath}' updated`;
      } else if (fileName in parent) {
        return `Cannot edit '${filePath}': Is a directory`;
      } else {
        return `Cannot edit '${filePath}': File does not exist`;
      }
    } else {
      return `Cannot edit '${filePath}': No such directory`;
    }
  },
};

export function initializeFileSystem(): void {
  currentState = loadState();
}

export function handleCommand(
  input: string,
  setTheme: (theme: string) => void,
  callbacks: { [key: string]: () => void },
): string {
  const [command, ...args] = input.trim().split(/\s+/);
  const handler = commands[command.toLowerCase()];

  if (handler) {
    return handler(args, setTheme, callbacks);
  } else {
    return `Unknown command: ${command}. Type 'help' for a list of commands.`;
  }
}
