import { useTicTacToe } from "../hooks/useTicTacToe";

const TictacToe = () => {
  const { board, resetGame, handleClick, getStatusMsg } = useTicTacToe(8);

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex justify-between w-1/2">
        {getStatusMsg()}
        <button
          type="reset"
          aria-label="resetGame"
          onClick={resetGame}
          className="font-bold py-2 px-4 rounded bg-slate-500 text-white hover:bg-slate-700"
        >
          Reset Game
        </button>
      </div>
      <div
        style={{ gridTemplateColumns: `repeat(${8}, minmax(0, 1fr))` }}
        className={`grid grid-cols-4 gap-1 border border-black`}
      >
        {board.map((board, index) => {
          return (
            <button
              type="submit"
              aria-label={`showBoard${index}`}
              onClick={() => handleClick(index)}
              disabled={board !== null}
              key={index}
              className="flex justify-center items-center text-3xl w-24 h-24 bg-slate-400 hover:bg-slate-600 border border-black text-black"
            >
              {board}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TictacToe;
