import { useState } from "react";
import styles from "./CommandInput.module.css";
import commands from "../../api/commands";
import React from "react";

const CommandInput = () => {
  const [error, setError] = useState(false);

  const handleCommand = (command: string) => {
    console.log("command", command);
    const validCommand = commands.find((c) => c.commands.includes(command));

    if (validCommand) {
      validCommand.perform();
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 300);
    }
  };
  return (
    <div className={`${styles.container} ${error ? styles.error : ""}`}>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault(); // Prevent the default form submission
          const inputElement = e.currentTarget.elements[0] as HTMLInputElement;
          handleCommand(inputElement?.value);
        }}
      >
        <input
          autoFocus={true}
          className={styles.input}
          placeholder="Enter a command"
        />
      </form>
    </div>
  );
};

export default CommandInput;
