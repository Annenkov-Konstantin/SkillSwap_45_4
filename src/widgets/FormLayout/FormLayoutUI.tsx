import { FormStepCounter } from "@/features";
import { Logo } from "@/shared/ui"
import { Icon } from "@/shared/ui/Icon";
import { Outlet } from "react-router-dom";
import styles from "./FormLayout.module.scss";
import { TertiaryButton } from "@/shared/ui/tertiaryButton";
import type { FormLayoutUIProps } from "./type";

export const FormLayoutUI: React.FC<FormLayoutUIProps> = ({
  onClose,
  isLogin,
  isRegister,
  currentStep,
  totalSteps
}) => {
  return (
    <div>
      <header className={styles.layout__header}>
        <Logo/>
        <div className={styles.button__wrapper}>
          <TertiaryButton
            label="Закрыть"
            onClickButton={onClose}
            secondIcon={<Icon name='icon-cross' size={24} />}
            hasIcons={false}
          />
        </div>
      </header>
      <section>
        {isLogin &&
        <h2 className={styles.layout__title}>Вход</h2>}
        {isRegister &&
        <FormStepCounter current={currentStep} total={totalSteps}/>}
      </section>
      <main className={styles.layout__content}>
        <Outlet />
      </main>
    </div>
 )
}
