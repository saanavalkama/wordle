import type { Action } from "../reducer";

type StartScreenProps = {
  dispatch: React.Dispatch<Action>,
  status: string,
  isLoading: boolean,
  error: string

};

export default function StartScreen({dispatch, status}:StartScreenProps){

  const startClick = function(){
    dispatch({type:'startClick'})
  }

  return(
    <div className="screen">
      <h2>Start new game</h2>
      {status === 'start' && (
        <button
          onClick={startClick}
        >Start Game
       </button>
      )}
    </div>
  )
}