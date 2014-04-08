package comm.moves;

import comm.moves.base.Command;
import comm.moves.base.InvalidCommandException;
import comm.moves.form.Location;
import modelInterfaces.base.Game;
import modelInterfaces.base.GameInfo;
import modelInterfaces.base.Player;
import modelInterfaces.base.TurnTracker;
import modelInterfaces.map.Robber;

import java.io.IOException;

/**
 * Created by Jon on 3/24/14.
 */
public class RobPlayer extends Command {
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

        return " incited rebellion in " + victim.getName()+ "'s realm";
    }

    @Override
    public void execute(GameInfo gameInfo) throws IOException, InvalidCommandException {


        Game game = gameInfo.getData();
        //change to playing phase from robbing phase
        if(!game.getTurnTracker().getStatus().equals(TurnTracker.ROBBING)){
            throw new InvalidCommandException("Rob Player called outside of robbing phase");
        }

        // Move robber to Robber Spot
        Robber robber = game.getMap().getRobber();
        robber.setX(getRobberSpot().getX());
        robber.setY(getRobberSpot().getY());

        // Steal one random resource from victim. (make sure they have at least one);
        Player victim = game.getPlayerByIndex(getVictimIndex());
        Player currentPlayer = game.getPlayerByIndex(getPlayerIndex());

        if(victimIndex != Player.NO_PLAYER) {
            Soldier.stealResource(victim.getResources(), currentPlayer.getResources());
        }

        game.getTurnTracker().setStatus(TurnTracker.PLAYING);
        super.execute(gameInfo);
    }


}
