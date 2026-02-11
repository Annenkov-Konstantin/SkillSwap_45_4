// import { Button, Input, Card } from '@/shared/ui';
import { type FC } from 'react';
import { useState } from 'react';
import styles from './exampleComponent.module.scss';
import { Button, DropdownTrigger } from '@/shared/ui';
import { Input } from '@/shared/ui';
import { SkillActionModal } from '../skillActionModal/skillActionModal';

export const ExampleComponent: FC = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [isModalOpen, setModalOpen] = useState(true);

  return (
    <div>
      <p className={styles.test}>Компонент внутри главной страницы</p>
      <DropdownTrigger onClick={() => setOpen(!open)} isOpen={open} />
      <Input value={value} onChange={setValue} isSearch={true} />
      <Button status='primary' children='Нажать' />
      <SkillActionModal
        image='src/assets/img/done.svg'
        maintText='Пожалуйста, войдите в аккаунт'
        secondaryText='Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми'
        secondaryBtnText='Отмена'
        primaryBtnText='Войти'
        onClose={() => setModalOpen(false)}
        isOpen={isModalOpen}
      ></SkillActionModal>
      <DropdownTrigger
        onClick={()=>setOpen(!open)}
        isOpen={open}
        />
      <Input value={value} onChange={setValue} isSearch={true}/>
      <Button status='primary' children='Войти'/>
    </div>
  );
};
