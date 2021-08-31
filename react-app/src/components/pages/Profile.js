import React, { useState, useEffect } from "react";
import { Redirect, useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { getFavoriteGames } from "../../utils/API";

function Profile() {
  const { userId } = useParams();
  // Get the user's information from locations
  let jwt_token = localStorage.getItem('arcadeRunnerJWTToken');
  let decoded = jwt_decode(jwt_token);
  const [goToGames, setGoToGames] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getFavoriteGames().then((result) => {
      console.log(result);
      setData(result);
    }
    )
  }, []);

  const onGamesButtonClick = (e) => {
    console.log("Profile")
    setGoToGames(true);
  };

  if (goToGames) {
    let pathToRedirect = "/games/" + userId;
    return <Redirect to={pathToRedirect} />
  } else {
    const listItems = data.map((game) =>
      <li key={game.id}>{game.name}</li>
    );
    return (
      <div>
        <button onClick={onGamesButtonClick} className="clickableIcon"><i class="fa fa-arrow-left fa-5x" aria-hidden="true"></i></button>
        <h1>{decoded.username}</h1>
        <h3>{decoded.email}</h3>
        <h2>Favorite Games</h2>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
}

export default Profile;