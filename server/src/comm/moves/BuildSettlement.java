package comm.moves;

import comm.moves.base.Command;
import comm.moves.base.InvalidCommandException;
import comm.moves.form.VertexLocation;
import model.map.LocationImpl;
import model.map.VertexDirection;
import modelInterfaces.base.*;
import modelInterfaces.map.Direction;
import modelInterfaces.map.Location;
import server.Server;

import java.io.IOException;

/**
 * Created by: film42 on: 3/13/14.
 */
public class BuildSettlement extends Command {

    private boolean free;
    private VertexLocation vertexLocation;

    public boolean isFree() {
        return free;
    }

    public VertexLocation getVertexLocation() {
        return vertexLocation;
    }

    @Override
    public String getLogMessage() {
        return " established a canton";
    }

    @Override
    public void execute(GameInfo gameInfo) throws IOException, InvalidCommandException {
        super.execute(gameInfo);
        Game game = gameInfo.getData();
        Player curPlayer = game.getPlayerByIndex(playerIndex);


        if(curPlayer.getSettlements() < 1){
            Server.log.warning("Attempted to buy road without road available");
            throw new InvalidCommandException("Attempted to buy road without road available");
        }
        curPlayer.buySettlement(game.getBank(), isFree());

        game.getMap().addSettlement(getPlayerIndex(),getVertexLocation());

        //Add resources if it is second round
        TurnTracker turnTracker = game.getTurnTracker();
        if (turnTracker.getStatus().equals(TurnTracker.SECOND_ROUND)) {
            Location loc = new LocationImpl(getVertexLocation().getX(), getVertexLocation().getY());
            Direction dir = new VertexDirection(getVertexLocation().getDirection());
            Resources resources = game.getMap().getResourcesAroundVertex(loc,dir);
            Resources currentResource = curPlayer.getResources();

            for (String type : Resources.TYPES) {
                currentResource.incrementResourceByString(type,resources.getResourceByString(type));
                game.getBank().decrementResourceByString(type, resources.getResourceByString(type));

            }
        }



        gameInfo.setData(game);
    }

}
