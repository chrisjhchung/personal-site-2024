interface Command {
  id: string;
  name: string;
  commands: string[];
  perform: () => void;
}

const commands: Command[] = [
  {
    id: "home",
    name: "Home",
    commands: ["/home"],
    perform: () => (window.location.pathname = "/"),
  },
  {
    id: "blog",
    name: "Blog",
    commands: ["/blog"],
    perform: () => (window.location.pathname = "blog"),
  },
  {
    id: "contact",
    name: "Contact",
    commands: ["/contact", "/socials"],
    perform: () => (window.location.pathname = "contact"),
  },
  {
    id: "help",
    name: "Help",
    commands: ["/help"],
    perform: () => {
      console.log("inject");
    },
  },
];

export default commands;
