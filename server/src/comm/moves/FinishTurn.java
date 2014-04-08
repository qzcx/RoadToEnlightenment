package comm.moves;

import comm.moves.base.Command;
import comm.moves.base.InvalidCommandException;
import modelInterfaces.base.*;

import java.io.IOException;

/**
 * Created by: film42 on: 3/13/14.
 */
public class FinishTurn extends Command {
    @Override
    public String getLogMessage() {
        return "'s turn ended";
    }

    @Override
    public void execute(GameInfo gameInfo) throws IOException, InvalidCommandException {
        super.execute(gameInfo);
        Game game = gameInfo.getData();

        TurnTracker turnTracker = game.getTurnTracker();
        String status = turnTracker.getStatus();

        switch (status) {
            case TurnTracker.PLAYING: game = playing(game); break;
            case TurnTracker.FIRST_ROUND: game = firstTurn(game); break;
            case TurnTracker.SECOND_ROUND: game = secondTurn(game); break;
        }

        // Reset the users dev card list
        for(Player player : game.getPlayers()) {
            player.setPlayedDevCard(false);
        }

        gameInfo.setData(game);
    }

    private Game playing(Game game) {
        TurnTracker tracker = game.getTurnTracker();
        if(game.isLastPlayerIndex(playerIndex)) {
            // Last player played, restart
            tracker.setCurrentTurn(0);
        } else {
            // Loop to next player
            tracker.setCurrentTurn(tracker.getCurrentTurn() + 1);
        }

        // Update status for next player
        tracker.setStatus(TurnTracker.ROLLING);

        // Set and return
        game.setTurnTracker(tracker);

        //Move new dev cards into old dev cards for current player.
        Player player = game.getPlayers().get(getPlayerIndex());
        player.setOldDevCards(player.getNewDevCards().clone());
        return game;
    }

    private Game firstTurn(Game game) {
        TurnTracker tracker = game.getTurnTracker();
        if(game.isLastPlayerIndex(playerIndex)) {
            // Advance to SECOND ROUND if the last player played in first round
            tracker.setStatus(TurnTracker.SECOND_ROUND);
        } else {
            // Else just increment the player order number
            tracker.setCurrentTurn(tracker.getCurrentTurn() + 1);
        }

        // Set and return
        game.setTurnTracker(tracker);
        return game;
    }

    //reminder: The second round goes in opposite order.
    private Game secondTurn(Game game) {
        TurnTracker tracker = game.getTurnTracker();
        if(playerIndex == 0) {
            // Advance to ROLLING (start real game) if First Player just played
            tracker.setStatus(TurnTracker.ROLLING);
            tracker.setCurrentTurn(0);
        } else {
            // Else just decrement the player order number
            tracker.setCurrentTurn(tracker.getCurrentTurn() - 1);
        }

        // Set and return
        game.setTurnTracker(tracker);
        return game;
    }

}
