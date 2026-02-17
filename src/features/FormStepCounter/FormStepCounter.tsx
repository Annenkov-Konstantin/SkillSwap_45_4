import React from 'react';
import clsx from 'clsx';
import styles from './FormStepCounter.module.scss';
import type { TFormStepCounterProps } from './types';

const INDICATORS_COUNT = 3;

const normalizeValue = (value: number, fallback: number) => {
  return Number.isFinite(value) ? Math.trunc(value) : fallback;
};

export const FormStepCounter: React.FC<TFormStepCounterProps> = ({
  current,
  total
}: TFormStepCounterProps) => {
  const normalizedTotal = Math.max(1, normalizeValue(total, 1));
  const normalizedCurrent = Math.min(
    Math.max(1, normalizeValue(current, 1)),
    normalizedTotal
  );

  const activeIndicators =
    normalizedTotal <= INDICATORS_COUNT
      ? normalizedCurrent
      : Math.max(1, Math.round((normalizedCurrent / normalizedTotal) * INDICATORS_COUNT));

  return (
    <div className={styles.counter} aria-live='polite'>
      <p className={styles.label}>
        Шаг {normalizedCurrent} из {normalizedTotal}
      </p>
      <div className={styles.indicators} aria-hidden='true'>
        {Array.from({ length: INDICATORS_COUNT }, (_, index) => (
          <div
            className={clsx(styles.indicator, {
              [styles.indicator_active]: index < activeIndicators
            })}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

/*
//Пример использования:
import { useState } from 'react';
import { FormStepCounter } from '@features';

const FormStepCounterDemo: React.FC = () => {
  const totalSteps = 3;
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <section>
      <FormStepCounter current={currentStep} total={totalSteps} />

      <button
        type='button'
        onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
      >
        Назад
      </button>

      <button
        type='button'
        onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
      >
        Далее
      </button>
    </section>
  );
};
*/
