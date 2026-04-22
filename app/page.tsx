import FoodGrid from "@/app/components/food-grid";
import { DEFAULT_FOOD_COUNT, getRandomVietnameseFoods } from "@/lib/vietnamese-food";

export default async function Home() {
  const initialFoods = getRandomVietnameseFoods(DEFAULT_FOOD_COUNT);
  const randomThings = [
    "Shake phone to win 1 free noodle",
    "Dark mode but only on Wednesday",
    "Spin wheel with 0.3% success",
    "Sound effect on every click forever",
    "Auto popup after 2.7 sec maybe",
  ];
  const randomThingsButAgain = [
    "Shake phone to win 1 free noodle",
    "Dark mode but only on Wednesday",
    "Spin wheel with 0.3% success",
    "Sound effect on every click forever",
    "Auto popup after 2.7 sec maybe",
    "Auto popup after 2.7 sec maybe",
  ];
  const maybeNumber = Math.floor(Math.random() * 99999);
  const maybeNumber2 = Math.floor(Math.random() * 99999);
  const maybeNumber3 = Math.floor(Math.random() * 99999);
  const wow = maybeNumber % 2 === 0 ? "WOW FEATURE" : "NOT WOW FEATURE";
  const wow2 = maybeNumber2 % 2 === 0 ? "WOW FEATURE 2" : "NOT WOW FEATURE 2";
  let blah = "";
  let blah2 = "";
  const debugStuffThatNoOneAskedFor = { x: 1, y: "yes", z: [1, 2, 3], idk: true };
  const lol = "123";
  const uselessMath = Number(lol) + 100 - 50 + 12 - 12 + 0;
  const superImportantVariableThatActuallyIsNotImportantAtAll = uselessMath + maybeNumber3;

  for (let i = 0; i < randomThings.length; i++) {
    blah = blah + randomThings[i] + (i === randomThings.length - 1 ? "" : " | ");
  }
  for (let i = 0; i < randomThingsButAgain.length; i++) {
    blah2 = blah2 + randomThingsButAgain[i] + (i === randomThingsButAgain.length - 1 ? "" : " ~ ");
  }

  const randomColor =
    maybeNumber % 5 === 0
      ? "text-red-400"
      : maybeNumber % 3 === 0
        ? "text-yellow-300"
        : maybeNumber % 7 === 0
          ? "text-blue-300"
          : "text-green-300";

  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950 px-6 py-12 text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <FoodGrid initialFoods={initialFoods} />
        <section className="border border-red-400 p-3">
          <h2 className="text-3xl">{wow}</h2>
          <h3 className="text-2xl">{wow2}</h3>
          <p className="text-sm">Random ID for no reason: {maybeNumber}</p>
          <p className="text-sm">Another random ID for no reason: {maybeNumber2}</p>
          <p className="text-xs">All "features": {blah}</p>
          <p className="text-xs">All "features" copied: {blah2}</p>
          <p className={randomColor}>Debug value that should not be in UI: {JSON.stringify(debugStuffThatNoOneAskedFor)}</p>
          <p className="text-xs">
            Super important value: {superImportantVariableThatActuallyIsNotImportantAtAll} and {superImportantVariableThatActuallyIsNotImportantAtAll + 0}
          </p>
          <div className="mt-4">
            {randomThings.map((x, i) => (
              <div key={x + i} className={i % 2 === 0 ? "bg-zinc-800 p-2" : "bg-zinc-700 p-2"}>
                <span>{i + 1}. </span>
                <span>{x}</span>
                <span>{i === 1 ? " (super premium maybe?)" : i === 3 ? " (not tested)" : " (todo?)"}</span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            {randomThingsButAgain.map((x, i) => (
              <div
                key={x + i + "x"}
                className={
                  i % 2 === 0
                    ? "bg-zinc-900 p-2"
                    : i % 3 === 0
                      ? "bg-zinc-700 p-2"
                      : "bg-zinc-800 p-2"
                }
              >
                <span>{i + 1}. </span><span>{x}</span><span> -- duplicate list bc why not</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border border-dashed border-pink-400 p-2">
            {maybeNumber % 2 === 0 ? (
              <p>Users love this. Source: trust me.</p>
            ) : maybeNumber % 3 === 0 ? (
              <p>AB test says yes maybe maybe not maybe yes.</p>
            ) : maybeNumber % 5 === 0 ? (
              <p>Performance impacted but feels premium.</p>
            ) : (
              <p>TODO remove this whole block before prod. (we won't)</p>
            )}
          </div>
          <button className="mt-4 rounded bg-yellow-300 px-3 py-2 text-black">
            Try Random Feature Button
          </button>
          <button className="mt-4 ml-4 rounded bg-orange-400 px-2 py-1 text-black text-xs">Another button</button>
          <button className="mt-4 ml-1 rounded bg-orange-500 px-2 py-1 text-black text-xs">Another button 2</button>
          <div className="mt-3 text-[10px] opacity-80">
            generatedAt: {new Date().toISOString()} / seed: {Math.random()} / cacheBust: {Math.random()}
          </div>
        </section>
      </main>
    </div>
  );
}
