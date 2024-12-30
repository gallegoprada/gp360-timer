import React, { useState } from "react";

import NumberInput from "../components/NumberInput";
import MainLayout from "../components/MainLayout";
import SetupPageWrapper from "../components/SetupPageWrapper";

const FightSetupContent: React.FC = () => {
  const [rounds, setRounds] = useState(3);
  const [workMinutes, setWorkMinutes] = useState(3);
  const [restSeconds, setRestSeconds] = useState(60);
  const [preparationSeconds, setPreparationSeconds] = useState(10);
  return (
    <SetupPageWrapper
      to={`/fightTimer?work=${workMinutes}&restSeconds=${restSeconds}&rounds=${rounds}&preparationSeconds=${preparationSeconds}`}
      title="Ready To Fight?"
      buttonLabel="Start"
    >
      <NumberInput
        label="Preparacion (s)?"
        defaultValue={preparationSeconds}
        onChange={(value) => {
          setPreparationSeconds(value);
        }}
      />
      <NumberInput
        label="Numero de Rounds"
        defaultValue={rounds}
        onChange={(value) => {
          setRounds(value);
        }}
      />

      <NumberInput
        label="Duracion Round (min)?"
        defaultValue={workMinutes}
        onChange={(value) => {
          setWorkMinutes(value);
        }}
      />
      <NumberInput
        label="Duracion Descanso (s)?"
        defaultValue={restSeconds}
        onChange={(value) => {
          setRestSeconds(value);
        }}
      />
    </SetupPageWrapper>
  );
};

const FightSetup: React.FC = () => {
  return (
    <MainLayout>
      <FightSetupContent />
    </MainLayout>
  );
};

export default FightSetup;
