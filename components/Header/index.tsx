import { useRouter } from "next/router";
import siteConfig from "@/data/siteConfig";
import Link from "next/link";
import styles from "./index.module.scss";

export const Header: React.FC = () => {
  const { pathname } = useRouter();
  return (
    <header className={styles.header}>
      <Link href="/" className="font-bold"></Link>

      <nav>
        <ul>
          {siteConfig.nav.map((item, index) => {
            const isActive = item.href === pathname;
            return (
              <li key={index}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
