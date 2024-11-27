import React, { useState } from "react";
import NumberInput from "../components/NumberInput";
import MainLayout from "../components/MainLayout";
import SetupPageWrapper from "../components/SetupPageWrapper";

const TabataSetupContent: React.FC = () => {
  const [warmUp, setWarmUp] = useState(5);
  const [work, setWork] = useState(4);
  const [rest, setRest] = useState(2);
  const [rounds, setRounds] = useState(3);
  const [coolDown, setCoolDown] = useState(6);

  return (
    <SetupPageWrapper
      to={`/tabataTimer?warmUp=${warmUp}&work=${work}&rest=${rest}&rounds=${rounds}&coolDown=${coolDown}`}
      title="Set your Timer"
      buttonLabel="Start"
    >
      <NumberInput
        label="Preparacion?"
        defaultValue={warmUp}
        onChange={(value) => {
          setWarmUp(value);
        }}
      />
      <NumberInput
        label="Trabajo"
        defaultValue={work}
        onChange={(value) => {
          setWork(value);
        }}
      />
      <NumberInput
        label="Descanso"
        defaultValue={rest}
        onChange={(value) => {
          setRest(value);
        }}
      />
      <NumberInput
        label="Rounds (Trabajo & Descanso)"
        defaultValue={rounds}
        onChange={(value) => {
          setRounds(value);
        }}
      />
      <NumberInput
        label="Relajacion"
        defaultValue={coolDown}
        onChange={(value) => {
          setCoolDown(value);
        }}
      />
    </SetupPageWrapper>
  );
};

const TabataSetup: React.FC = () => {
  return (
    <MainLayout>
      <TabataSetupContent />
    </MainLayout>
  );
};

export default TabataSetup;
