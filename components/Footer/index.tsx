import { Twitter, Instagram, GitHub, Linkedin } from "react-feather";
import siteConfig from "@/data/siteConfig";
import { cx } from "@/lib/utils";
import { ThemeSelect } from "@/components/ThemeSelect";
import styles from "./index.module.scss";

const iconProps = { className: "w-4 h-4" };

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      {siteConfig.social ? (
        <ul className="flex justify-center space-x-4">
          {Object.entries(siteConfig.social).map(([key, href]) => {
            return (
              <li key={key}>
                <a
                  href={href}
                  className={cx(
                    "w-8 h-8 grid place-items-center rounded-md",
                    "bg-gray-900 text-gray-50",
                    "dark:bg-gray-800 dark:text-gray-50"
                  )}
                  title={key}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  {key}
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
      <p>© 2024 Chris Chung</p>
    </footer>
  );
};
