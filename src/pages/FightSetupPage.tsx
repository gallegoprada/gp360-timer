import React, { useState } from "react";

import NumberInput from "../components/NumberInput";
import MainLayout from "../components/MainLayout";
import SetupPageWrapper from "../components/SetupPageWrapper";

const FightSetupContent: React.FC = () => {
  const [rounds, setRounds] = useState(3);
  const [workMinutes, setWorkMinutes] = useState(3);
  const [restMinutes, setRestMinutes] = useState(1);

  return (
    <SetupPageWrapper
      to={`/fightTimer?work=${workMinutes}&rest=${restMinutes}&rounds=${rounds}`}
      title="Ready To Fight?"
      buttonLabel="Start"
    >
      <NumberInput
        label="Cuantos Rounds?"
        defaultValue={rounds}
        onChange={(value) => {
          setRounds(value);
        }}
      />

      <NumberInput
        label="De Cuantos Minutos?"
        defaultValue={workMinutes}
        onChange={(value) => {
          setWorkMinutes(value);
        }}
      />
      <NumberInput
        label="Cuantos Minutos de descanso?"
        defaultValue={restMinutes}
        onChange={(value) => {
          setRestMinutes(value);
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
