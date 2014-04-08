package comm.moves;

import comm.moves.base.Command;
import comm.moves.base.InvalidCommandException;
import comm.moves.form.CardDeck;
import modelInterfaces.base.Game;
import modelInterfaces.base.GameInfo;
import modelInterfaces.base.Player;
import modelInterfaces.base.Resources;
import modelInterfaces.base.TurnTracker;
import java.io.IOException;

/**
 * Created by: film42 on: 3/13/14.
 */
public class DiscardCards extends Command {

    private CardDeck discardedCards;

    public CardDeck getDiscardedCards() {
        return discardedCards;
    }

    @Override
    public String getLogMessage() {
		return " had to discard cards";
    }

    @Override
    public void execute(GameInfo gameInfo) throws IOException, InvalidCommandException {
        super.execute(gameInfo);
        Game game = gameInfo.getData();
        Player currentPlayer = game.getPlayerByIndex(playerIndex);
        Resources resources = currentPlayer.getResources();

        //check if if he/she is discarding state
        if (currentPlayer.hasDiscarded() && game.getTurnTracker().getStatus() == TurnTracker.DISCARDING){
            server.Server.log.severe("Already discard, attempting a second time");
            return;
        }
        if(game.getTurnTracker().getStatus() != TurnTracker.DISCARDING){
            server.Server.log.severe("Attempting to discard outside of discarding phase");
            return;
        }

        Resources bank = game.getBank();
        for (String type : discardedCards.TYPES) {
            int discardNum = discardedCards.getResourceByString(type);
            if (discardNum > 0 ) {
                if (resources.getResourceByString(type) >= discardNum) {
                    resources.decrementResourceByString(type, discardNum);
                    bank.incrementResourceByString(type, discardNum);
                } else {
                    server.Server.log.severe("No enough resources to discard for " + type);
                }
            }
        }
        currentPlayer.setDiscarded(true);
        // if it is the last on discard the cards, set to robbing state
        TurnTracker tracker = game.getTurnTracker();
        boolean doneDiscarding = true;
        for (Player player : game.getPlayers()) {
            doneDiscarding = doneDiscarding && player.hasDiscarded();
        }
        if(doneDiscarding) {
            tracker.setStatus(TurnTracker.ROBBING);
        }
        
    }

}
