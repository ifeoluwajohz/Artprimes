import { Link } from "react-router-dom"

const Settings = () => {
  return (
    <>
      <div>
      <Link to='/Account_update'>Account Update link</Link><br />
      <Link to='/Security_check'>Security_check</Link>
      </div>
    </>
  )
}

export default Settings