import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './index.module.scss';
import { handleCommand } from './Commands';

interface ConsoleProps {
  setTheme: (theme: string) => void;
}

interface ConsoleState {
  position: { x: number; y: number };
  isDragging: boolean;
  dragOffset: { x: number; y: number };
  isVisible: boolean;
  inputValue: string;
  consoleOutput: string[];
  isFocused: boolean;
  isPinned: boolean;
  isOverflowing: boolean;
}

const Console: React.FC<ConsoleProps> = ({ setTheme }) => {
  const [state, setState] = useState<ConsoleState>({
    position: { x: 0, y: 0 },
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    isVisible: false,
    inputValue: '',
    consoleOutput: [],
    isFocused: false,
    isPinned: false,
    isOverflowing: false,
  });

  const [isMobile, setIsMobile] = useState(false);

  const consoleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === 'c' &&
        (!state.isVisible || (state.isVisible && !state.isFocused))
      ) {
        e.preventDefault();
        if (window.innerWidth < 650) {
          setState((prev) => ({
            ...prev,
            isPinned: true,
            isVisible: !prev.isVisible,
          }));
        } else {
          setState((prev) => ({ ...prev, isVisible: !prev.isVisible }));
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    if (state.isFocused && inputRef.current) {
      inputRef.current.focus();
    }
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state.isFocused]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 650 && state.isVisible) {
        setState((prev) => ({ ...prev, isPinned: true }));
        setIsMobile(true);
      } else if (window.innerWidth > 650) {
        setState((prev) => ({ ...prev, isPinned: false }));
        setIsMobile(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [state.isVisible]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        state.isVisible &&
        consoleRef.current &&
        !consoleRef.current.contains(e.target as Node)
      ) {
        setState((prev) => ({ ...prev, isFocused: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state.isVisible]);

  useEffect(() => {
    if (state.isVisible) {
      setState((prev) => ({ ...prev, isFocused: true }));
      checkOverflow();
      scrollToBottom();
    }
    if (state.isVisible && state.isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.isVisible, state.isFocused]);

  useEffect(() => {
    setState((prev) => ({ ...prev, isFocused: true }));
  }, [state.isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (consoleRef.current && !state.isPinned) {
      const rect = consoleRef.current.getBoundingClientRect();
      setState((prev) => ({
        ...prev,
        isDragging: true,
        isFocused: true,
        dragOffset: {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        },
      }));
      document.body.style.userSelect = 'none';
    }
  };

  const updatePosition = useCallback(
    (clientX: number, clientY: number) => {
      if (consoleRef.current && !state.isPinned) {
        const consoleWidth = consoleRef.current.offsetWidth;
        const consoleHeight = consoleRef.current.offsetHeight;
        const maxX = window.innerWidth - consoleWidth;
        const maxY = window.innerHeight - consoleHeight;

        setState((prev) => ({
          ...prev,
          position: {
            x: Math.max(0, Math.min(clientX - prev.dragOffset.x, maxX)),
            y: Math.max(0, Math.min(clientY - prev.dragOffset.y, maxY)),
          },
        }));
      }
    },
    [state.isPinned],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (state.isDragging && !state.isPinned) {
        updatePosition(e.clientX, e.clientY);
      }
    };

    const handleMouseUp = () => {
      setState((prev) => ({ ...prev, isFocused: true, isDragging: false }));
      document.body.style.userSelect = '';
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const handleResize = () => {
      if (!state.isPinned) {
        updatePosition(
          state.position.x + state.dragOffset.x,
          state.position.y + state.dragOffset.y,
        );
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        consoleRef.current &&
        !consoleRef.current.contains(e.target as Node)
      ) {
        setState((prev) => ({ ...prev, isFocused: false }));
      } else {
        setState((prev) => ({ ...prev, isFocused: true }));
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    if (state.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [
    state.isDragging,
    state.isPinned,
    state.position,
    state.dragOffset,
    updatePosition,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.inputValue.trim()) {
      const response = handleCommand(state.inputValue.trim(), setTheme);
      setState((prev) => ({
        ...prev,
        consoleOutput: [
          ...prev.consoleOutput,
          `> ${prev.inputValue}`,
          response,
        ],
        inputValue: '',
      }));
      setTimeout(() => {
        checkOverflow();
        scrollToBottom();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const scrollToBottom = useCallback(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, []);

  const checkOverflow = useCallback(() => {
    if (contentRef.current && inputWrapperRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const containerHeight = contentRef.current.clientHeight;
      const inputHeight = inputWrapperRef.current.clientHeight;

      const newIsOverflowing = contentHeight + inputHeight > containerHeight;

      if (newIsOverflowing !== state.isOverflowing) {
        setState((prev) => ({ ...prev, isOverflowing: newIsOverflowing }));
        if (newIsOverflowing) {
          scrollToBottom();
          if (inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 0);
          }
        }
      }
    }
  }, [state.isOverflowing, scrollToBottom]);

  useEffect(() => {
    checkOverflow();
    scrollToBottom();
  }, [state.consoleOutput, checkOverflow, scrollToBottom]);

  const handleConsoleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setState((prev) => ({ ...prev, isFocused: true }));
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div className={styles.consoleContainer}>
      {state.isVisible && (
        <div
          ref={consoleRef}
          className={`${styles.console} ${
            state.isDragging && !state.isPinned ? styles.grabbing : styles.grab
          } ${state.isPinned ? styles.pinned : ''}`}
          style={{
            left: state.isPinned ? 'auto' : `${state.position.x}px`,
            top: state.isPinned ? 'auto' : `${state.position.y}px`,
            right: state.isPinned ? '0' : 'auto',
            bottom: state.isPinned ? '0' : 'auto',
          }}
          onClick={handleConsoleClick}
          onMouseDown={(e) => {
            if (!state.isPinned) {
              handleMouseDown(e);
            }
          }}
          onMouseUp={() => {
            if (state.isDragging) {
              setState((prev) => ({
                ...prev,
                isDragging: false,
                isFocused: true,
              }));
              document.body.style.userSelect = '';
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }
          }}
        >
          <div className={`${styles.consoleDragBar} consoleDragBar`}>
            {!isMobile ? (
              <>
                <button
                  onClick={() =>
                    setState((prev) => ({ ...prev, isPinned: true }))
                  }
                  disabled={state.isPinned}
                >
                  <svg
                    className="Console_icon__qfrHq"
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Align window to bottom</title>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 0H1V1H0V0ZM1 2H0V3H1V2ZM1 5H8V8H1V5ZM0 4H1H8H9V5V8V9H8H1H0V8V5V4ZM3 0H2V1H3V0ZM4 0H5V1H4V0ZM7 0H6V1H7V0ZM8 0H9V1H8V0ZM9 2H8V3H9V2Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() =>
                    setState((prev) => ({ ...prev, isPinned: false }))
                  }
                  disabled={!state.isPinned}
                >
                  <svg
                    className="Console_icon__qfrHq Console_floatIcon__12J6e"
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Float window in corner</title>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1 0H0V1H1V0ZM3 0H2V1H3V0ZM4 0H9V5H4V0ZM1 2H0V3H1V2ZM0 4H1V5H0V4ZM1 6H0V7H1V6ZM0 8H1V9H0V8ZM3 8H2V9H3V8ZM4 8H5V9H4V8ZM7 8H6V9H7V8ZM8 8H9V9H8V8ZM9 6H8V7H9V6Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </>
            ) : (
              <></>
            )}
            <div
              className={styles.dragHandle}
              onMouseDown={handleMouseDown}
            ></div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setState((prev) => ({
                  ...prev,
                  isVisible: false,
                  isFocused: false,
                }));
              }}
              className={styles.closeButton}
            >
              <svg
                className="Console_icon__qfrHq"
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 0H1V1H0V0ZM2 2H1V1H2V2ZM3 3H2V2H3V3ZM4 4H3V3H4V4ZM5 4H4V5H3V6H2V7H1V8H0V9H1V8H2V7H3V6H4V5H5V6H6V7H7V8H8V9H9V8H8V7H7V6H6V5H5V4ZM6 3V4H5V3H6ZM7 2V3H6V2H7ZM8 1V2H7V1H8ZM8 1V0H9V1H8Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
          <div className={styles.consoleContent} ref={contentRef}>
            <div className={styles.consoleOutput}>
              {state.consoleOutput.map((output: string, index: number) => (
                <div style={{ padding: '2px' }} key={index}>
                  {output.split('\n').map((line: string, i: number) => (
                    <div
                      key={i}
                      dangerouslySetInnerHTML={{
                        __html: line.replace(/\t/g, '&emsp;'),
                      }}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
            <div
              ref={inputWrapperRef}
              className={`${styles.consoleInputWrapper}`}
            >
              <span>$</span>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={state.inputValue}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      inputValue: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                  className={styles.consoleInput}
                  placeholder="Enter command..."
                  ref={inputRef}
                />
              </form>
            </div>
          </div>
        </div>
      )}
      <div className={styles.consoleFooter}>
        <button
          onClick={() =>
            setState((prev) => ({ ...prev, isVisible: !prev.isVisible }))
          }
        >
          Console [C]
        </button>
      </div>
    </div>
  );
};

export default Console;
