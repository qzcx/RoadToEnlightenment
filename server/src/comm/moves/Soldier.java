package comm.moves;

import comm.moves.base.Command;
import comm.moves.base.InvalidCommandException;
import comm.moves.form.Location;
import modelInterfaces.base.*;
import modelInterfaces.map.Robber;


import java.io.IOException;
import java.util.*;

/**
 * Created by: film42 on: 3/13/14.
 */
public class Soldier extends Command {

    private int victimIndex;
    private Player victim;
    private Location location;

    public int getVictimIndex() {
        return victimIndex;
    }

    public Location getRobberSpot() {
        return location;
    }

    @Override
    public String getLogMessage() {

        return " sent privateers to rob from " +victim.getName();
    }

    @Override
    public void execute(GameInfo gameInfo) throws IOException, InvalidCommandException {
        super.execute(gameInfo);
        // Move robber to robber spot
        Game game = gameInfo.getData();
        Robber robber = game.getMap().getRobber();
        robber.setX(getRobberSpot().getX());
        robber.setY(getRobberSpot().getY());

        Player currentPlayer = game.getPlayerByIndex(getPlayerIndex());

        if(victimIndex != Player.NO_PLAYER) {
            // Steal one random resource from victim.
            // (make sure they have at least one)
            // TODO: Logic check this for soldier
            Player victim = game.getPlayerByIndex(getVictimIndex());
            stealResource(victim.getResources(), currentPlayer.getResources());
        }

        currentPlayer.setSoldiers(currentPlayer.getSoldiers() + 1);

        // Reduce soldier card count
        Deck newCards = currentPlayer.getNewDevCards();
        newCards.setSoldier(newCards.getSoldier()-1);
        Deck oldCards = currentPlayer.getOldDevCards();
        oldCards.setSoldier(oldCards.getSoldier()-1);

        // Prevent additional dev card playing
        currentPlayer.setPlayedDevCard(true);

        // Determine largest army
        game.determineLargestArmy();
    }

    //This method is shared by Soldier and RobPlayer.
    //It is just util, so I figure inheritance wasn't needed.
    public static void stealResource(Resources stealFrom, Resources giveTo) throws InvalidCommandException {

        List<String> availableList = stealFrom.getAvailibleResources();

        if(availableList.size() <= 0){
			return;
        }

        int index = (int)(Math.random()*availableList.size());
        String type = availableList.get(index);
        stealFrom.decrementResourceByString(type, 1);
        giveTo.incrementResourceByString(type, 1);
    }
}
