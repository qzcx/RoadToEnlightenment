package comm.moves;

import comm.moves.base.Command;
import comm.moves.base.InvalidCommandException;
import modelInterfaces.base.Game;
import modelInterfaces.base.GameInfo;
import modelInterfaces.base.Player;
import modelInterfaces.base.Resources;

import java.io.IOException;

/**
 * Created by: film42 on: 3/24/14.
 */
public class MaritimeTrade extends Command {

    public int ratio;
    public String inputResource;
    public String outputResource;

    public int getRatio() {
        return ratio;
    }

    public String getInputResource() {
        return inputResource;
    }

    public String getOutputResource() {
        return outputResource;
    }

    @Override
    public String getLogMessage() {
        return null;
    }

    @Override
    public void execute(GameInfo gameInfo) throws IOException, InvalidCommandException {
        super.execute(gameInfo);
        Game game = gameInfo.getData();

        // Check to make sure the Bank has enough resource cards
        Resources bank = game.getBank();
        if(bank.getResourceByString(outputResource) == 0) {
            throw new InvalidCommandException("Bank does not have enough cards");
        }

        // We can now make the trade
        Player player = game.getPlayerByIndex(playerIndex);
        Resources cardsInHand = player.getResources();
        if(cardsInHand.getResourceByString(inputResource) < ratio) {
            throw new InvalidCommandException("Player does not have enough cards");
        }

        // Update the players cards
        cardsInHand.decrementResourceByString(inputResource, ratio);
        cardsInHand.incrementResourceByString(outputResource, 1);

        // Update the banks cards
        bank.incrementResourceByString(inputResource, ratio);
        bank.decrementResourceByString(outputResource, 1);
    }
}
