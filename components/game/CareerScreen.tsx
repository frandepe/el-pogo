"use client";

import { FormEvent, useMemo, useState } from "react";
import { gameEngine } from "@/game/gameEngine";
import { useGameStore } from "@/game/store";
import Image from "next/image";
import { CareerLayout } from "./career-layout/CareerLayout";
import { CareerStepContent } from "./CareerStepContent";
import { Chapter2Intro } from "./chapters/Chapter2Intro";
import { ChapterIntro } from "./chapters/ChapterIntro";
import { ChapterTransition } from "./chapters/ChapterTransition";
import { roleOptions, type RoleName } from "./data/roleOptions";
import { GameStateDebug } from "./debug/GameStateDebug";
import { RoleCard } from "./role-selection/RoleCard";
import { RoleStyleChoice } from "./role-style/RoleStyleChoice";
import { AlmostAYearTransition } from "./season1/AlmostAYearTransition";
import { BandIdentityTransition } from "./season1/BandIdentityTransition";
import { ChooseBandNameChoice } from "./season1/ChooseBandNameChoice";
import { FirstCachet } from "./season1/FirstCachet";
import { FirstDemoProductionScene } from "./season1/FirstDemoProductionScene";
import { FirstDemoRepercussionSummary } from "./season1/FirstDemoRepercussionSummary";
import { FirstInterviewPublishedSummary } from "./season1/FirstInterviewPublishedSummary";
import { FirstInterviewScene } from "./season1/FirstInterviewScene";
import { FirstInternalConflictChoice } from "./season1/FirstInternalConflictChoice";
import { FirstInternalConflictSummary } from "./season1/FirstInternalConflictSummary";
import { FirstMoneyChoice } from "./season1/FirstMoneyChoice";
import { FirstMoneySummary } from "./season1/FirstMoneySummary";
import { FirstRecitalChoice } from "./season1/FirstRecitalChoice";
import { FirstRecitalSummary } from "./season1/FirstRecitalSummary";
import { FirstReviewChoice } from "./season1/FirstReviewChoice";
import { FirstReviewSummary } from "./season1/FirstReviewSummary";
import { FirstSeriousRehearsalChoice } from "./season1/FirstSeriousRehearsalChoice";
import { PhoneCallTransition } from "./season1/PhoneCallTransition";

export function CareerScreen() {
  const {
    gameState,
    startCareer,
    advanceStep,
    chooseOption,
    applyEventOption,
    applyInterviewAnswer,
    applyProductionOption,
    applyProductionOutcome,
    applyTimePasses,
    buyShopItem,
    purchaseShopItem,
    receiveFirstCachet,
    finishCareer,
    resetCareer,
  } = useGameStore();
  const [artistName, setArtistName] = useState("");
  const [role, setRole] = useState<RoleName>(roleOptions[0].name);
  const [showChapterIntro, setShowChapterIntro] = useState(false);
  const [showRoleStyleChoice, setShowRoleStyleChoice] = useState(false);
  const [showChapterTransition, setShowChapterTransition] = useState(false);
  const [showFirstSeriousRehearsal, setShowFirstSeriousRehearsal] =
    useState(false);
  const [showBandIdentityTransition, setShowBandIdentityTransition] =
    useState(false);
  const [showChooseBandName, setShowChooseBandName] = useState(false);
  const [showFirstRecital, setShowFirstRecital] = useState(false);
  const [showFirstRecitalSummary, setShowFirstRecitalSummary] = useState(false);
  const [showFirstCachet, setShowFirstCachet] = useState(false);
  const [showFirstMoney, setShowFirstMoney] = useState(false);
  const [showFirstMoneySummary, setShowFirstMoneySummary] = useState(false);
  const [showFirstReview, setShowFirstReview] = useState(false);
  const [showFirstReviewSummary, setShowFirstReviewSummary] = useState(false);
  const [showAlmostAYearTransition, setShowAlmostAYearTransition] =
    useState(false);
  const [showFirstInternalConflict, setShowFirstInternalConflict] =
    useState(false);
  const [showFirstInternalConflictSummary, setShowFirstInternalConflictSummary] =
    useState(false);
  const [showFirstInterview, setShowFirstInterview] = useState(false);
  const [showFirstInterviewPublished, setShowFirstInterviewPublished] =
    useState(false);
  const [showFirstDemoProduction, setShowFirstDemoProduction] = useState(false);
  const [showFirstDemoRepercussion, setShowFirstDemoRepercussion] =
    useState(false);
  const [showPhoneCallTransition, setShowPhoneCallTransition] = useState(false);
  const [showChapter2Intro, setShowChapter2Intro] = useState(false);

  const currentStep = gameEngine.getCurrentStep(gameState);
  const currentEvent = useMemo(
    () => gameEngine.getCurrentEvent(gameState),
    [gameState],
  );
  const visibleShopItems = useMemo(
    () => gameEngine.getVisibleShopItems(gameState),
    [gameState],
  );
  const careerResult = useMemo(
    () => gameEngine.finishCareer(gameState),
    [gameState],
  );

  function handleCreateArtist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startCareer({
      artistName: artistName.trim(),
      role,
    });
    advanceStep();
    setShowChapterIntro(true);
    setShowRoleStyleChoice(true);
    setShowFirstSeriousRehearsal(true);
    setShowChooseBandName(true);
    setShowFirstRecital(true);
    setShowFirstCachet(true);
    setShowFirstMoney(true);
    setShowFirstReview(true);
  }

  function handleResetCareer() {
    setShowChapterIntro(false);
    setShowRoleStyleChoice(false);
    setShowChapterTransition(false);
    setShowFirstSeriousRehearsal(false);
    setShowBandIdentityTransition(false);
    setShowChooseBandName(false);
    setShowFirstRecital(false);
    setShowFirstRecitalSummary(false);
    setShowFirstCachet(false);
    setShowFirstMoney(false);
    setShowFirstMoneySummary(false);
    setShowFirstReview(false);
    setShowFirstReviewSummary(false);
    setShowAlmostAYearTransition(false);
    setShowFirstInternalConflict(false);
    setShowFirstInternalConflictSummary(false);
    setShowFirstInterview(false);
    setShowFirstInterviewPublished(false);
    setShowFirstDemoProduction(false);
    setShowFirstDemoRepercussion(false);
    setShowPhoneCallTransition(false);
    setShowChapter2Intro(false);
    resetCareer();
  }

  function handleFinishCareer() {
    setShowChapterIntro(false);
    setShowRoleStyleChoice(false);
    setShowChapterTransition(false);
    setShowFirstSeriousRehearsal(false);
    setShowBandIdentityTransition(false);
    setShowChooseBandName(false);
    setShowFirstRecital(false);
    setShowFirstRecitalSummary(false);
    setShowFirstCachet(false);
    setShowFirstMoney(false);
    setShowFirstMoneySummary(false);
    setShowFirstReview(false);
    setShowFirstReviewSummary(false);
    setShowAlmostAYearTransition(false);
    setShowFirstInternalConflict(false);
    setShowFirstInternalConflictSummary(false);
    setShowFirstInterview(false);
    setShowFirstInterviewPublished(false);
    setShowFirstDemoProduction(false);
    setShowFirstDemoRepercussion(false);
    setShowPhoneCallTransition(false);
    setShowChapter2Intro(false);
    finishCareer();
  }

  if (currentStep === "CreateArtist") {
    return (
      <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-8 px-6 py-10">
        <form className="flex flex-col gap-5" onSubmit={handleCreateArtist}>
          <Image
            alt="Imagen del logo de la web"
            className="mx-auto object-contain"
            height={200}
            src="/logo/logo_v1.png"
            width={400}
          />
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Nombre artístico</span>
            <input
              className="rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none transition-colors focus:border-ring"
              value={artistName}
              onChange={(event) => setArtistName(event.target.value)}
              required
            />
          </label>

          <section className="flex flex-col gap-3">
            <div>
              <h2 className="font-heading text-2xl font-medium">
                Elegí tu rol
              </h2>
              <p className="text-sm text-muted-foreground">
                Esta decisión define cómo empieza tu leyenda.
              </p>
            </div>

            <div
              aria-label="Rol del artista"
              className="grid grid-cols-2 gap-3"
              role="radiogroup"
            >
              {roleOptions.map((roleOption) => (
                <RoleCard
                  description={roleOption.description}
                  image={roleOption.image}
                  isSelected={role === roleOption.name}
                  key={roleOption.id}
                  name={roleOption.name}
                  onSelect={() => setRole(roleOption.name)}
                />
              ))}
            </div>
          </section>

          <button
            className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            type="submit"
          >
            Empezar carrera
          </button>
        </form>
        <GameStateDebug gameState={gameState} />
      </main>
    );
  }

  return (
    <CareerLayout
      currentStep={currentStep}
      gameState={gameState}
      shopItems={visibleShopItems}
      onBuyShopItem={buyShopItem}
      onRetire={handleFinishCareer}
    >
      {showChapterIntro ? (
        <ChapterIntro onContinue={() => setShowChapterIntro(false)} />
      ) : showRoleStyleChoice ? (
        <RoleStyleChoice
          gameState={gameState}
          role={gameState.role}
          onChoose={(event, option) => {
            applyEventOption(event, option);
            setShowRoleStyleChoice(false);
            setShowChapterTransition(true);
          }}
        />
      ) : showChapterTransition ? (
        <ChapterTransition onContinue={() => setShowChapterTransition(false)} />
      ) : showFirstSeriousRehearsal ? (
        <FirstSeriousRehearsalChoice
          gameState={gameState}
          onChoose={(event, option) => {
            applyEventOption(event, option);
            setShowFirstSeriousRehearsal(false);
            setShowBandIdentityTransition(true);
          }}
        />
      ) : showBandIdentityTransition ? (
        <BandIdentityTransition
          onContinue={() => {
            setShowBandIdentityTransition(false);
          }}
        />
      ) : showChooseBandName ? (
        <ChooseBandNameChoice
          gameState={gameState}
          onChoose={(event, option) => {
            applyEventOption(event, option);
            setShowChooseBandName(false);
          }}
        />
      ) : showFirstRecital ? (
        <FirstRecitalChoice
          gameState={gameState}
          onChoose={(event, option) => {
            applyEventOption(event, option);
            setShowFirstRecital(false);
            setShowFirstRecitalSummary(true);
          }}
        />
      ) : showFirstRecitalSummary ? (
        <FirstRecitalSummary
          gameState={gameState}
          onContinue={() => {
            setShowFirstRecitalSummary(false);
          }}
        />
      ) : showFirstCachet ? (
        <FirstCachet
          onReward={receiveFirstCachet}
          onComplete={() => setShowFirstCachet(false)}
        />
      ) : showFirstMoney ? (
        <FirstMoneyChoice
          gameState={gameState}
          onChoose={(event, option) => {
            applyEventOption(event, option);
            setShowFirstMoney(false);
            setShowFirstMoneySummary(true);
          }}
        />
      ) : showFirstMoneySummary ? (
        <FirstMoneySummary
          gameState={gameState}
          onContinue={() => {
            setShowFirstMoneySummary(false);
          }}
        />
      ) : showFirstReview ? (
        <FirstReviewChoice
          gameState={gameState}
          onChoose={(event, option) => {
            applyEventOption(event, option);
            setShowFirstReview(false);
            setShowFirstReviewSummary(true);
          }}
        />
      ) : showFirstReviewSummary ? (
        <FirstReviewSummary
          gameState={gameState}
          onContinue={() => {
            setShowFirstReviewSummary(false);
            setShowAlmostAYearTransition(true);
          }}
        />
      ) : showAlmostAYearTransition ? (
        <AlmostAYearTransition
          gameState={gameState}
          onApplyTimePasses={applyTimePasses}
          onContinue={() => {
            setShowAlmostAYearTransition(false);
            setShowFirstInternalConflict(true);
          }}
        />
      ) : showFirstInternalConflict ? (
        <FirstInternalConflictChoice
          gameState={gameState}
          onChoose={(event, option) => {
            applyEventOption(event, option);
            setShowFirstInternalConflict(false);
            setShowFirstInternalConflictSummary(true);
          }}
        />
      ) : showFirstInternalConflictSummary ? (
        <FirstInternalConflictSummary
          gameState={gameState}
          onContinue={() => {
            setShowFirstInternalConflictSummary(false);
            setShowFirstInterview(true);
          }}
        />
      ) : showFirstInterview ? (
        <FirstInterviewScene
          onAnswer={applyInterviewAnswer}
          onComplete={() => {
            setShowFirstInterview(false);
            setShowFirstInterviewPublished(true);
          }}
        />
      ) : showFirstInterviewPublished ? (
        <FirstInterviewPublishedSummary
          gameState={gameState}
          onContinue={() => {
            setShowFirstInterviewPublished(false);
            setShowFirstDemoProduction(true);
          }}
        />
      ) : showFirstDemoProduction ? (
        <FirstDemoProductionScene
          gameState={gameState}
          onChooseOption={applyProductionOption}
          onResolveOutcome={applyProductionOutcome}
          onComplete={() => {
            setShowFirstDemoProduction(false);
            setShowFirstDemoRepercussion(true);
          }}
        />
      ) : showFirstDemoRepercussion ? (
        <FirstDemoRepercussionSummary
          gameState={gameState}
          onContinue={() => {
            setShowFirstDemoRepercussion(false);
            setShowPhoneCallTransition(true);
          }}
        />
      ) : showPhoneCallTransition ? (
        <PhoneCallTransition
          onContinue={() => {
            setShowPhoneCallTransition(false);
            setShowChapter2Intro(true);
          }}
        />
      ) : showChapter2Intro ? (
        <Chapter2Intro
          onContinue={() => {
            setShowChapter2Intro(false);
            advanceStep();
          }}
        />
      ) : (
        <CareerStepContent
          careerResult={careerResult}
          currentEvent={currentEvent}
          currentStep={currentStep}
          gameState={gameState}
          shopItems={visibleShopItems}
          onAdvanceStep={advanceStep}
          onChooseOption={chooseOption}
          onFinishCareer={handleFinishCareer}
          onPurchaseShopItem={purchaseShopItem}
          onResetCareer={handleResetCareer}
        />
      )}
    </CareerLayout>
  );
}
