import styles from "./CommandInput.module.css";

const CommandInput = () => {
  const handleCommand = (command: string) => {
    console.log(command);
  };
  return (
    <div className={styles.container}>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault(); // Prevent the default form submission
          const inputElement = e.currentTarget.elements[0] as HTMLInputElement;
          handleCommand(inputElement?.value);
        }}
      >
        <input className={styles.input} placeholder="Enter a command" />
      </form>
    </div>
  );
};

export default CommandInput;
