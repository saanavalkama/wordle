import type { Action } from "../reducers/gameReducer";

type StartScreenProps = {
  dispatch: React.Dispatch<Action>,
  isLoading: boolean,
  error: string,
  rightWord: string  
}

export default function StartScreen({dispatch, error, rightWord, isLoading}:StartScreenProps){

  const startClick = function(){
    dispatch({type:'startClick'})
  }

  return(
    <div className="screen">
      <h2>Start new game</h2>
      {isLoading &&
        <div className="screen">
          <div className="loader"></div>
        </div> 
      } 
      {error &&
      <div className="error-div">
        <p>{error}</p>  
      </div>}
      {rightWord &&  (
        <button
          onClick={startClick}
        >Start Game
       </button>
      )}
    </div>
  )
}