import { Link } from "react-router-dom";

const DashBoard = () => {
  return (
    <div>
      <h1 className="text-slate-950">DashBoard</h1>
      <div className="flex justify-around text-sm">
        <Link to='/cart'>Cart</Link>
        <Link>Open order</Link>
        <Link>Close order</Link>
        <Link>Favorite</Link>
        <Link>Suggested deals</Link>
      </div>
    </div>
  );
  };
  
  export default DashBoard;