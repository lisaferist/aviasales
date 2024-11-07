import './ErrorBlock.scss'
import { useDispatch, useSelector } from 'react-redux'

import { fetchTickets } from '../../store/TicketsSlice'

function ErrorBlock() {
  const dispatch = useDispatch()
  const errorMessage = useSelector((state) => state.Tickets.errorMessage)
  const tryAgainOnclick = () => {
    dispatch(fetchTickets())
  }
  return (
    <div className="error-block">
      <p className="error-block__text">
        ERROR! <br />
        Что-то пошло не так. Попробуйте еще раз <br />
        {errorMessage}
        <br />
      </p>
      <button className="error-block__try-again-button" onClick={tryAgainOnclick}>
        TRY AGAIN
      </button>
    </div>
  )
}

export default ErrorBlock
