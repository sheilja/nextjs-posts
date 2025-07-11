import Movies from "./movies";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import data from "../Data/game-categories.json";
import { useDispatch, useSelector } from "react-redux";
import gameList from "../Data/game-list.json";
import { useEffect, useState } from "react";
import { DataTableDemo } from "../components/DataTable.js";
import { setSlotsGames } from "../store/movieSlice";

export default function Home({ games }) {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const dispatch = useDispatch();

  const setSelectedSlotgames = (game) => {
    console.log(game);
    dispatch(setSlotsGames(game));
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <div>
        {data.GameCategories.map((gameCategory, index) => {
          return (
            <AccordionItem key={gameCategory.id} value={gameCategory.name}>
              <AccordionTrigger>{gameCategory.name}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <button
                  style={{
                    border: "1px solid black",
                    width: "100px",
                  }}
                  onClick={() => {
                    setIsModelOpen(true);
                  }}
                >
                  Add Games
                </button>
              </AccordionContent>
            </AccordionItem>
          );
        })}
        {isModelOpen && (
          <div>
            <DataTableDemo
              setIsModelOpen={setIsModelOpen}
              games={games}
              setSelectedSlotgames={setSelectedSlotgames}
            />
          </div>
        )}
      </div>
    </Accordion>
  );
}
export async function getStaticProps() {
  const res = gameList.RespObject.Entities;

  return {
    props: {
      games: res,
    },
  };
}
