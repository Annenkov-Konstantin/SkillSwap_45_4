import { Logo } from "@/shared/ui/logo";
import { DropdownTrigger, Input } from "@/shared/ui";
import { useContext, type FC } from "react";
import moon from '@assets/icons/moon.svg';
import styles from './Header.module.scss';
import { NavLink } from "react-router-dom";
import { HeaderActions } from "@/features/HeaderActions/HeaderActions";
import type { THeaderUIProps } from "./type";

export const HeaderUI: FC<THeaderUIProps> = ({
  searchQuery,
  setSearchQuery,
  handleModalOpen,
  isModalOpen
 }) => {

  return (
    <header className={styles.header}>
      <nav className={styles.menue}>
        <div className={styles.menue_part_left}>
          <Logo />
          <ul className={styles.nav}>
            <li>
              <NavLink to='#' className={styles.link}>
                <p>О проекте</p>
              </NavLink>
            </li>
            <li className={styles.skills_container} onClick={handleModalOpen}>
              <NavLink to='#' className={styles.link}>
                <p>Все навыки</p>
              </NavLink>
              <DropdownTrigger
                onClick={handleModalOpen}
                isOpen={isModalOpen}
                invert={true}
                />
            </li>
          </ul>
        </div>
        <div className={styles.input_container}>
          <Input className={styles.input}
            type="text"
            placeholder="Искать навык"
            onChange={setSearchQuery}
            value={searchQuery}
            name='search'
            isSearch={true} />
        </div>
        <button type="button" className={styles.theme_button}>
          <img src={moon} alt="Иконка месяца" />
        </button>
        <div className={styles.menue_part_right}>
          <HeaderActions/>
        </div>
      </nav>
    </header>
  );
};
