package comm.moves;

import comm.moves.base.Command;
import comm.moves.base.InvalidCommandException;
import modelInterfaces.base.*;
import modelInterfaces.map.Map;

import java.io.IOException;
import java.util.List;

/**
 * Created by: film42 on: 3/12/14.
 */
public class RollNumber extends Command {

    private int number;

    public int getNumber() {
        return number;
    }

    @Override
    public String getLogMessage() {
        return " rolled a " + getNumber();
    }

    @Override
    public void execute(GameInfo gameInfo) throws IOException, InvalidCommandException {
        super.execute(gameInfo);
        Game game = gameInfo.getData();
        game = rolling(game);

        Map map = game.getMap();
        Resources bank = game.getBank();
        if(number != 7){
            List<Resources> playerResources = map.getResourcesByNumber(number);
            for(int i=0; i < game.getPlayers().size(); i++){
                for(String type : Resources.TYPES){
                    int amount = playerResources.get(i).getResourceByString(type);
                    game.getPlayerByIndex(i).getResources().incrementResourceByString(type, amount);
                    bank.decrementResourceByString(type,amount);
                }
            }
        }
        gameInfo.setData(game);
    }

    private Game rolling(Game game) {
        TurnTracker tracker = game.getTurnTracker();

        switch (number) {
            case 7:
                if(game.playersRequireDiscarding()) {
                    tracker.setStatus(TurnTracker.DISCARDING);
                } else {
                    tracker.setStatus(TurnTracker.ROBBING);
                }
                break;
            default: tracker.setStatus(TurnTracker.PLAYING); break;
        }

        // Set and return
        game.setTurnTracker(tracker);
        return game;
    }

}


