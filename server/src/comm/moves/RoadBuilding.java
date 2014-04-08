package comm.moves;

import comm.moves.base.Command;
import comm.moves.base.InvalidCommandException;
import comm.moves.form.VertexLocation;
import modelInterfaces.base.Deck;
import modelInterfaces.base.Game;
import modelInterfaces.base.GameInfo;
import modelInterfaces.base.Player;
import server.Server;

import java.io.IOException;

/**
 * Created by: film42 on: 3/13/14.
 */
public class RoadBuilding extends Command {
    private VertexLocation spot1;
    private VertexLocation spot2;

    public VertexLocation getSpot1() {
        return spot1;
    }

    public VertexLocation getSpot2() {
        return spot2;
    }

    @Override
    public String getLogMessage() {
        return " invested heavily in railroads";
    }

    @Override
    public void execute(GameInfo gameInfo) throws IOException, InvalidCommandException {
        super.execute(gameInfo);
        Game game = gameInfo.getData();
        Player curPlayer = game.getPlayerByIndex(playerIndex);
        if(curPlayer.getRoads() < 2){
            Server.log.warning("Attempted to buy roads without roads available");
            throw new InvalidCommandException("Attempted to buy roads without roads available");
        }
        curPlayer.buyRoad(game.getBank(),true);
        curPlayer.buyRoad(game.getBank(),true);
        game.getMap().addRoad(getPlayerIndex(),getSpot1());
        game.getMap().addRoad(getPlayerIndex(),getSpot2());

		// Decrement the amount of RoadBuilding cards the user has
		Deck newCards = game.getPlayerByIndex(playerIndex).getNewDevCards();
		newCards.setRoadBuilding(newCards.getRoadBuilding() - 1);
		Deck deck = game.getPlayerByIndex(playerIndex).getOldDevCards();
		deck.setRoadBuilding(deck.getRoadBuilding() - 1);

        // Prevent additional dev card playing
        curPlayer.setPlayedDevCard(true);

        // Update Longest Road
        game.determineLongestRoad();
    }
}
